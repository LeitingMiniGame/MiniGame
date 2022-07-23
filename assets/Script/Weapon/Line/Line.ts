import MonsterMgr from "../../Mgr/MonsterMgr";
import Weapon from "../Weapon";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Line extends Weapon {

    start() {        
        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.data.size
    }

    move() {
        let targetPos = this.getTarget().mulSelf(cc.winSize.width * 2)
        let time = targetPos.len() / this.data.speed
        this.node.runAction(cc.sequence(cc.moveBy(time, targetPos), cc.removeSelf()))
    }
}
