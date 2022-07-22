import NumImage from "../../Control/NumImage";
import CharMgr from "../../Mgr/CharMgr";
import MonsterMgr from "../../Mgr/MonsterMgr";
import Char from "../Char";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Monster extends Char {
    targetPos: cc.Vec2 = cc.v2(0, 0)
    getTargetInterval: number = 0.1

    start() {
        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.size
        this.node.group = 'Monster'

        this.moveCallFunc = () => {
            // 向量归一化*移动距离 = 本次移动的目标
            let nor = this.getTaget().normalizeSelf()
            let scale = this.speed * this.getTargetInterval
            this.targetPos = nor.multiply(cc.v2(scale, scale))
            this.animateLayer.scaleX = this.targetPos.x < 0 ? -1 : 1
            this.moveTween = cc.tween(this.node)
                .by(this.getTargetInterval, { position: cc.v3(this.targetPos.x, this.targetPos.y) })
                .start()
        }
    }

    // 获取目标位置
    getTaget() {
        let hero = CharMgr.getInstance().getCharByName("Hero")
        let heroPos = hero.node.convertToWorldSpaceAR(cc.v2(0, 0))
        let myPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0))
        return heroPos.subtract(myPos)
    }

    // 怪物移动逻辑
    move() {
        this.schedule(this.moveCallFunc, this.getTargetInterval, cc.macro.REPEAT_FOREVER)
    }

    injured(damage, backPos) {
        this.hp -= damage
        this.playInjured(damage)

        let quality = 20
        backPos.mulSelf(quality)

        if(this.moveTween){
            this.moveTween.stop()
        }
        this.unschedule(this.moveCallFunc)
        if (this.hp <= 0) {
            this.animateLayer.active = false
            this.node.group = 'Default'
        } else {
            cc.tween(this.node)
                .by(0.1, { position: cc.v3(backPos.x, backPos.y, 0) })
                .call(() => {
                    this.schedule(this.moveCallFunc, this.getTargetInterval, cc.macro.REPEAT_FOREVER)
                })
                .start()
        }
    }

    // 播放受击动画
    playInjured(damage) {
        cc.tween(this.animateLayer)
            .to(0.3, { opacity: 100 })
            .to(0.3, { opacity: 255 })
            .start()
        let imageNode = NumImage.getInstance().getNumImage(damage, () => {
            if (this.hp <= 0) {
                MonsterMgr.getInstance().removeMonster(this)
            }
        })
        imageNode.parent = this.node
        imageNode.y = this.size.height / 2
    }

    getRandInt(min, max){
        var range = max - min;
		var rand = Math.random();
		return (min + Math.round(rand * range));
    }

    onCollisionEnter(other, self) {
        if (other.node.group == "Weapon") {
            let weapon = other.node.getComponent(other.node.name)
            let monster = self.node.getComponent(self.node.name)
            weapon.injured(monster.damage)
            let damage = this.getRandInt(weapon.data.minDamage, weapon.data.maxDamage)

            let backPos = this.getWorldPos().subSelf(weapon.getWorldPos()).normalizeSelf()
            monster.injured(damage, backPos)
        }
        if (other.node.group == "Hero") {
            let hero = other.node.getComponent(other.node.name)
            let monster = self.node.getComponent(self.node.name)
            hero.injured(monster.damage)
        }
    }

    // start () {

    // }

    // update (dt) {}
}
