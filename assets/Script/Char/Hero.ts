import Char from "./Char";
import BulletMgr from "../Mgr/BulletMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends Char {

    speed: number = 200
    hp:number = 100
    luckly:number = 20

    fireInterval: number = 1

    start() {
        this.loadAnimate("Animate/BeeMove")
        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .call(() => this.fire())
                    .delay(this.fireInterval)
            )
            .start()
        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.size
        this.node.group = 'Hero'
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.node.scaleX = -1
                break
            case cc.macro.KEY.d:
                this.node.scaleX = 1
                break
        }
    }

    // 攻击函数
    fire() {
        BulletMgr.getInstance().createBullet('Clover', this.getWorldPos())
    }

    // 受伤的函数
    injured(damage){
        this.hp -= damage
        console.log(this.hp);
        
    }

    move() { }

    // update(dt) {
    // }
}
