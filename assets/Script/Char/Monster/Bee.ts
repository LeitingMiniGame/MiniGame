import Monster from "./Monster";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Bee extends Monster {
    start() {
        this.loadAnimate("Animate/BeeMove")
    }

}
