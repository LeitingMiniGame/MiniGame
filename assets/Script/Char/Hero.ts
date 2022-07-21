// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Char from "./Char";
import Clover from "../Weapon/Clover";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends Char {

    speed: number = 200
    fireInterval: number = 1

    onLoad() {
        this.loadImage("Image/Hero")
        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .call(() => this.fire())
                    .delay(this.fireInterval)
            )
            .start()
    }

    // 攻击函数
    fire() {
        let bullet = new cc.Node()
        bullet.addComponent(Clover)
        bullet.parent = this.node
    }

    move() { }

    update(dt) {

    }

}
