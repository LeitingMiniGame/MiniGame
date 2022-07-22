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
        this.schedule(() => {
            // 向量归一化*移动距离 = 本次移动的目标
            let nor = this.getTaget().normalizeSelf()
            let scale = this.speed * this.getTargetInterval
            this.targetPos = nor.multiply(cc.v2(scale, scale))
            this.node.scaleX = this.targetPos.x < 0 ? -1 : 1
            cc.tween(this.node)
                .by(this.getTargetInterval, { position: cc.v3(this.targetPos.x, this.targetPos.y) })
                .start()
        }, this.getTargetInterval, cc.macro.REPEAT_FOREVER)
    }

    injured(damage){
        this.hp -= damage
        if (this.hp <= 0) {
            MonsterMgr.getInstance().removeMonster(this)
        }
    }


    onCollisionEnter(other, self) {
        if (other.node.group == "Weapon") {
            let weapon = other.node.getComponent(other.node.name)
            let monster = self.node.getComponent(self.node.name)
            weapon.injured(monster.damage)
            monster.injured(weapon.damage)
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
