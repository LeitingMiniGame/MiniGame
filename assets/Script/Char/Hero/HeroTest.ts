import Hero from "./Hero";
const { ccclass, property } = cc._decorator;

@ccclass
export default class HeroTest extends Hero {
    start() {
        super.start()
        // this.loadResources('HeroMove1', 'HeroStay1')

        this.addWeapon("LineTest")
        this.addWeapon("ProjectileTest")
        // this.addWeapon("DomainTest")

    }
}
