import Line from "./Line";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LineTest extends Line {

    speed: number = 600
    size: cc.Size = cc.size(20, 20)
    hp: number = 20
    damage: number = 20

    start(){
        super.start()
        this.loadImage('Image/Hero')
    }
}
