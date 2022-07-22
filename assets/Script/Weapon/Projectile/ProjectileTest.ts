import Projectile from "./Projectile";
const { ccclass, property } = cc._decorator;

@ccclass
export default class ProjectileTest extends Projectile {
    start() {
        super.start()
        this.loadImage('Image/Hero')
    }
}
