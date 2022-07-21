import MonsterMgr from "../Mgr/MonsterMgr";
import Weapon from "./Weapon";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Clover extends Weapon {

    speed: number = 600
    size: cc.Size = cc.size(20, 20)
    hp: number = 10
    damage: number = 10

    start() {
        this.loadImage('Image/Hero')

        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.size

        this.hp = 10
        this.damage = 10

    }

    getTarget() {
        let worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0))
        let targetPos = MonsterMgr.getInstance().getNearestMonsterPos(worldPos)
        if (!targetPos) {
            return cc.v2(Math.random(), Math.random())
        }
        return targetPos.sub(worldPos)
    }

    move() {
        let targetPos = this.getTarget()
        let time = targetPos.len() / this.speed
        this.node.runAction(cc.sequence(cc.moveBy(time, targetPos), cc.removeSelf()))
        cc.tween(this.node)
            .by(time, { position: cc.v3(targetPos.x, targetPos.y) })
            .removeSelf()
            .start()
    }
}
