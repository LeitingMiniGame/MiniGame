import MonsterMgr from "../Mgr/MonsterMgr";
import Weapon from "./Weapon";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Clover extends Weapon {

    flySpeed: number = 600

    onLoad() {
        this.loadImage('Image/Hero')
    }


    getTarget() {
        let worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0))
        let targetPos = MonsterMgr.getInstance().getNearestMonsterPos(worldPos)
        if(!targetPos){
            return cc.v2(Math.random(), Math.random())
        }
        return targetPos.sub(worldPos)
    }

    move() {
        let targetPos = this.getTarget()
        let time = targetPos.len() / this.flySpeed
        this.node.runAction(cc.sequence(cc.moveBy(time, targetPos), cc.removeSelf()))
        cc.tween(this.node)
            .by(time, { position: cc.v3(targetPos.x, targetPos.y) })
            .removeSelf()
            .start()
    }

    start() {

    }

    // update (dt) {

    // }
}
