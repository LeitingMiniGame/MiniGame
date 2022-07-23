import Char from "../Char";
import DataMgr from "../../Mgr/DataMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends Char {
    state: string
    onLoad() {
        super.onLoad()
        this.loadImage("Item/" + this.data.icon)
        if (this.data.animate) {
            this.loadAnimate(this.data.animate, true)
        }
    }

    start() {
        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.data.size
        this.node.group = 'Hero'
        this.state = 'stateStay'
        this.startRecovery()

        if(this.data.initWeapon){
            this.addWeapon(this.data.initWeapon)
        }
    }

    // 开始恢复血量
    startRecovery() {
        this.schedule(() => {
            this.data.hp = Math.min(this.data.hp + this.data.recovery, this.data.maxHp)
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

    addWeapon(typeName) {
        DataMgr.getInstance().addWeapon(typeName)
    }

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
        this.node.scaleX = -1
    }

    moveRight() {
        this.node.scaleX = 1
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.node.scaleX = -1
                break
            case cc.macro.KEY.d:
                this.node.scaleX = 1
                break
        }
    }

    // 受伤的函数
    injured(damage) {
        this.data.hp -= damage
        console.log(this.data.hp);
    }

    move() {
    }

}
