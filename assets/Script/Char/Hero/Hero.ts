import Char from "../Char";
import DataMgr from "../../Mgr/DataMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends Char {
    state: string
    hpProgress: any;
    onLoad() {
        super.onLoad()
        this.loadImage("Item/" + this.data.icon)
        if (this.data.animate) {
            this.loadAnimate(this.data.animate, true)
        }
        this.data.level = 1
        this.data.exp = 0

        cc.resources.load('Prefab/MapPrefab/CharHpBar', cc.Prefab, (err, assets: cc.Prefab) => {
            if (err) {
                return
            }

            let hpProgress = cc.instantiate(assets)
            hpProgress.name = 'hpProgress'
            hpProgress.parent = this.node
            hpProgress.y = -this.data.size.height / 2 - 5
        })
    }

    start() {
        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.data.size
        this.node.group = 'Hero'
        this.state = 'stateStay'
        this.startRecovery()

        if (this.data.initWeapon) {
            this.addWeapon(this.data.initWeapon)
        }
    }

    // 开始恢复血量
    startRecovery() {
        this.schedule(() => {
            this.data.hp = Math.min(this.data.hp + this.data.recovery, this.data.maxHp)
            this.updateHpProess()
        }, 1, cc.macro.REPEAT_FOREVER)
    }

    // 计算伤害加成
    getAddDamage(damage) {
        return Math.round(damage * (1 + this.data.power / 100))
    }

    // 计算开火间隔加成
    getFireInterval(intervalTime) {
        return intervalTime * (1 - this.data.coolDown / 100)
    }

    // 计算子弹数量加成
    getFireCount(fireCount) {
        return fireCount + this.data.bulletCount
    }

    // 获得武器
    addWeapon(typeName) {
        DataMgr.getInstance().addWeapon(typeName)
    }

    // 受伤的函数
    injured(damage) {
        this.data.hp -= damage
        if (this.data.hp < 0) {
            cc.find('/Canvas').getComponent('GameScene').gameOver(false)
        }
        this.updateHpProess()
    }

    // 更新血量进度
    updateHpProess() {
        let hpProgress = this.node.getChildByName('hpProgress').getComponent(cc.ProgressBar)
        if (hpProgress) {
            hpProgress.progress = this.data.hp / this.data.maxHp
        }
    }

    // 增加经验
    addExp(exp) {
        exp *= (1 + this.data.growth)
        this.data.exp += exp
        DataMgr.getInstance().addExp(this.data)
    }

    // 改变状态
    changeState(state) {
        if (state == this.state) {
            return
        }
        if (state != 'stateStay') {
            let animate = this.animateLayer.getComponent(cc.Animation);
            animate.play('HeroMove1');
        }
        this.state = state
        if (typeof (this[state]) === 'function') {
            this[state]()
        }
    }

    stateStay() {
        let animate = this.animateLayer.getComponent(cc.Animation);
        if (animate) {
            animate.setCurrentTime(0, 'HeroMove1');
            animate.stop('HeroMove1');
        }
    }

    moveLeft() {
        this.animateLayer.scaleX = -1
    }

    moveRight() {
        this.animateLayer.scaleX = 1
    }

    move() {
    }

    pause() {
        let animate = this.animateLayer.getComponent(cc.Animation)
        animate.stop('HeroMove1');
        this.state = 'stateStay'
    }

    resume() {
    }
}
