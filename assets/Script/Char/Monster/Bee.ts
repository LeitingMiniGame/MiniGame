import Monster from "./Monster";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Bee extends Monster {
    speed:number = 100
    hp:number = 10
    damage:number = 10

    start() {

        this.loadAnimate("Animate/BeeMove")
    }

}
