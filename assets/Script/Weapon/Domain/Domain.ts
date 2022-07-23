import Weapon from "../Weapon";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Domain extends Weapon {

    start() {
        let boxCollider = this.addComponent(cc.CircleCollider)
        boxCollider.radius = this.data.size.width / 2
    }

    move() {
        let scale = this.data.maxSize.width / this.data.size.width
        let time = scale / this.data.speed
        cc.tween(this.node)
            .to(time, { scale: scale, opacity: 100 })
            .removeSelf()
            .start()
    }
}
