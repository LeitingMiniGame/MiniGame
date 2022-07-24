import Weapon from "../Weapon";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Domain extends Weapon {

    start() {
        let boxCollider = this.addComponent(cc.CircleCollider)
        boxCollider.radius = this.data.width / 2
        this.data.maxSize = cc.size(this.data.maxWidth, this.data.maxHeight)
    }

    move() {
        let scale = this.data.maxSize.width / this.data.size.width
        let time = scale / this.data.speed
        this.moveTween = cc.tween(this.node)
            .to(time, { scale: scale, opacity: 100 })
            .removeSelf()
            .start()
    }
}
