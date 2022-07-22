import Line from "./Line";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LineTest extends Line {
    start(){
        super.start()
        this.loadImage('Image/Hero')
    }
}
