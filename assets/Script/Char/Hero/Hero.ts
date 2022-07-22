import Char from "../Char";
import BulletMgr from "../../Mgr/BulletMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends Char {

    speed: number = 250
    hp:number = 100
    luckly:number = 20
    size:cc.Size = cc.size(100, 100)

    fireInterval: number = 1
    state: string;

    start() {
        this.loadImage("Image/Hero1Stay")
        this.loadAnimate("Animate/HeroMove1", "HeroMove1", true)
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
        this.state = 'stateStay'
    }

    changeState(state){
        if(state == this.state){
            return
        }
        if(state!='stateStay'){
            let animate = this.getComponent(cc.Animation);
            animate.play('HeroMove1');
        }
        this.state = state
        if(typeof(this[state]) === 'function'){
            this[state]()
        }
    }

    stateStay(){
        let animate = this.getComponent(cc.Animation);
        animate.setCurrentTime(0, 'HeroMove1');
        animate.stop('HeroMove1');
    }

    moveLeft(){
        this.node.scaleX = -1
    }

    moveRight(){
        this.node.scaleX = 1
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
        BulletMgr.getInstance().createBullet('Projectile', this.getWorldPos())
    }

    // 受伤的函数
    injured(damage){
        this.hp -= damage
        console.log(this.hp);
        
    }

    move() {
    }

}
