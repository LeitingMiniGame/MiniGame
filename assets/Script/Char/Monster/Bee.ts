import Monster from "./Monster";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Bee extends Monster {
    speed:number = 100
    hp:number = 10
    damage:number = 10
    size:cc.Size = cc.size(68, 68)

    start() {
        super.start()
        this.loadAnimate("Animate/BeeMove", "BeeMove")
    }

    move(): void {
        
    }

}
