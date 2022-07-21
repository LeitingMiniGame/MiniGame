// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Char from "./Char";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Monster extends Char {
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.loadImage("Image/Monster")
    }

    move() {
    }

    // start () {

    // }

    // update (dt) {}
}
