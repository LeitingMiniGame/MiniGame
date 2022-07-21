import Monster from "./Monster";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends Monster {
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.loadImage('Animate/BeeMove1')
        this.loadAnimate("Animate/BeeMove")
    }


    // update (dt) {}
}
