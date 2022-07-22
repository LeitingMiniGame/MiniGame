import Char from "../Char";
import BulletMgr from "../../Mgr/BulletMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends Char {
    speed: number
    hp: number
    luckly: number
    size: cc.Size
    fireInterval: number
    state: string;
    bag: any
    maxCapacity: number = 6

    start() {
        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.size
        this.node.group = 'Hero'
        this.state = 'stateStay'
    }

    loadResources(animateName,ImageName) {
        this.loadImage('Image/'+ImageName)
        this.loadAnimate("Animate/" + animateName, animateName, true)
    }

    addWeapon(typeName) {
        for (let i = 0; i < Math.min(6, this.bag.length); i++) {
            if (this.bag[i].name == typeName) {
                this.bag[i].level++
                return
            }
        }
        this.bag.push({ name: typeName, level: 1 })
    }

    changeState(state) {
        if (state == this.state) {
            return
        }
        if (state != 'stateStay') {
            let animate = this.getComponent(cc.Animation);
            animate.play('HeroMove1');
        }
        this.state = state
        if (typeof (this[state]) === 'function') {
            this[state]()
        }
    }

    stateStay() {
        let animate = this.getComponent(cc.Animation);
        if (animate) {
            animate.setCurrentTime(0, 'HeroMove1');
            animate.stop('HeroMove1');
        }
    }

    moveLeft() {
        this.node.scaleX = -1
    }

    moveRight() {
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
        for (let i = 0; i < this.bag.length; i++) {
            BulletMgr.getInstance().createBullet(this.bag[i].name, this.getWorldPos())
        }
    }

    // 受伤的函数
    injured(damage) {
        this.hp -= damage
        console.log(this.hp);

    }

    move() {
    }

}
