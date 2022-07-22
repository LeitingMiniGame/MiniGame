import MonsterMgr from "../../Mgr/MonsterMgr";
import Weapon from "../Weapon";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Line extends Weapon {

    start() {        
        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.size
    }

    getTarget() {
        let worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0))
        let targetPos = MonsterMgr.getInstance().getNearestMonsterPos(worldPos)
        if (!targetPos) {
            return cc.v2(Math.random(), Math.random())
        }
        return targetPos.sub(worldPos).normalizeSelf()
    }

    move() {
        let targetPos = this.getTarget().mulSelf(cc.winSize.width * 2 / 3)
        let time = targetPos.len() / this.speed
        this.node.runAction(cc.sequence(cc.moveBy(time, targetPos), cc.removeSelf()))
        cc.tween(this.node)
            .by(time, { position: cc.v3(targetPos.x, targetPos.y) })
            .removeSelf()
            .start()
    }
}
