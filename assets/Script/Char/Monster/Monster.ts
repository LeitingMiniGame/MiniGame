import CharMgr from "../../Mgr/CharMgr";
import Char from "../Char";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Monster extends Char {
    targetPos: cc.Vec2 = cc.v2(0, 0)
    getTargetInterval: number = 0.1

    // 获取目标位置
    getTaget() {
        let hero = CharMgr.getInstance().getCharByName("Hero")
        let heroPos = hero.node.convertToWorldSpaceAR(cc.v2(0, 0))
        let myPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0))
        return heroPos.subtract(myPos)
    }

    // 怪物移动逻辑
    move() {
        this.schedule(() => {
            // 向量归一化*移动距离 = 本次移动的目标
            let nor = this.getTaget().normalizeSelf()
            let scale = this.speed * this.getTargetInterval
            this.targetPos = nor.multiply(cc.v2(scale, scale))
            this.node.scaleX = this.targetPos.x < 0 ? -1 : 1
            cc.tween(this.node)
                .by(this.getTargetInterval, { position: cc.v3(this.targetPos.x, this.targetPos.y) })
                .start()
        }, this.getTargetInterval, cc.macro.REPEAT_FOREVER)
    }

    // start () {

    // }

    // update (dt) {}
}
