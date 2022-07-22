import Weapon from "../Weapon";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Domain extends Weapon {

    start() {
        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.size
    }

    move() {
        cc.tween(this.node)
            .to(0.5, { scale: 25 })
            .removeSelf()
            .start()
    }
}
