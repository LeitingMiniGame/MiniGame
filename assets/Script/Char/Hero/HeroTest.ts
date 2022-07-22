import Hero from "./Hero";
const { ccclass, property } = cc._decorator;

@ccclass
export default class HeroTest extends Hero {
    speed: number = 250
    hp: number = 100
    luckly: number = 20
    size: cc.Size = cc.size(100, 100)

    fireInterval: number = 1
    state: string;

    bag = []

    maxCapacity: number = 6
    start() {
        super.start()
        this.loadResources('HeroMove1', 'Hero1Stay')

        // this.addWeapon("LineTest")
        // this.addWeapon("ProjectileTest")
        this.addWeapon("DomainTest")

    }
}
