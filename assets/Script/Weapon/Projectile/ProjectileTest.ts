import Projectile from "./Projectile";
const { ccclass, property } = cc._decorator;

@ccclass
export default class ProjectileTest extends Projectile {
    speed: number = 600
    size: cc.Size = cc.size(20, 20)
    damage: number = 10
    hp: number = 100000000

    start() {
        super.start()
        this.loadImage('Image/Hero')
    }
}
