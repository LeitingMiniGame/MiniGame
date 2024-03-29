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

        let angle = Math.atan2(targetPos.y, targetPos.x);
        var ang = angle * (180 / Math.PI) - 90;

        this.node.angle = ang

        this.moveTween = cc.tween(this.node)
            .by(time, { position: cc.v3(targetPos.x, targetPos.y) })
            .removeSelf()
            .start()
    }
}
