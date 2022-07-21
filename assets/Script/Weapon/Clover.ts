// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Weapon from "./Weapon";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Clover extends Weapon {

    flySpeed: number = 600

    onLoad() {
        this.loadImage('Image/Hero')
    }


    getTarget() {
        return cc.v2(0, 1000)
    }

    move() {
        let targetPos = this.getTarget()
        let time = targetPos.len() / this.flySpeed
        this.node.runAction(cc.sequence(cc.moveBy(time, targetPos), cc.removeSelf()))
        cc.tween(this.node)
            .by(time, { position: targetPos })
            .removeSelf()
            .start()
    }

    start() {

    }

    // update (dt) {

    // }
}
