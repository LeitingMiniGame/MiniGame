import Char from "../Char";
import DataMgr from "../../Mgr/DataMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends Char {
    data:any

    state: string

    start() {
        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.data.size
        this.node.group = 'Hero'
        this.state = 'stateStay'
    }

    // loadResources(animateName, ImageName) {
    //     this.loadImage('Image/' + ImageName)
    //     this.loadAnimate("Animate/" + animateName, animateName, true)
    // }

    addWeapon(typeName) {
        DataMgr.getInstance().addWeapon(typeName)
    }

    changeState(state) {
        if (state == this.state) {
            return
        }
        if (state != 'stateStay') {
            let animate = this.animateLayer.getComponent(cc.Animation);
            animate.play('HeroMove1');
        }
        this.state = state
        if (typeof (this[state]) === 'function') {
            this[state]()
        }
    }

    stateStay() {
        let animate = this.animateLayer.getComponent(cc.Animation);
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

    // 受伤的函数
    injured(damage) {
        this.data.hp -= damage
        console.log(this.data.hp);
    }

    move() {
    }

}
