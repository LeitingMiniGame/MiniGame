// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import CharMgr from "../Mgr/CharMgr";
import Char from "./Char";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Monster extends Char {
    speed: number = 100
    targetPos: cc.Vec2 = cc.v2(0, 0)
    getTargetInterval: number = 0.1

    onLoad() {
        this.loadImage("Image/Monster")
    }

    getTaget() {
        let hero = CharMgr.getInstance().getCharByName("Hero")
        let heroPos = hero.node.convertToWorldSpaceAR(cc.v2(0, 0))
        let myPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0))
        return heroPos.subtract(myPos)
    }

    move() {
        this.schedule(() => {
            let nor = this.getTaget().normalizeSelf()
            let scale = this.speed * this.getTargetInterval
            this.targetPos = nor.multiply(cc.v2(scale, scale))
            cc.tween(this.node)
                .by(this.getTargetInterval, { position: this.targetPos })
                .start()
        }, this.getTargetInterval, cc.macro.REPEAT_FOREVER)

    }

    // start () {

    // }

    // update (dt) {}
}
