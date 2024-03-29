import CharMgr from "../Mgr/CharMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerRoot extends cc.Component {

    //方向
    direStack = []
    speed: number = 0
    upVec: number;
    leftVec: number;
    isPause: boolean;

    // onLoad(params?: any) {

    // }

    start() {
        this.speed = CharMgr.getInstance().getCharByName("Hero").data.speed
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }

    // 监听按键
    onKeyDown(event) {
        if (this.direStack.indexOf(event.keyCode) == -1) {
            this.direStack.push(event.keyCode)
        }
    }
    onKeyUp(event) {
        let index = this.direStack.indexOf(event.keyCode)
        if (index != -1) {
            this.direStack.splice(index, 1);
        }
    }

    // 移动地图
    moveMap(dt) {
        let leftVec = 0
        let upVec = 0
        for (let i = 0; i < this.direStack.length; i++) {
            switch (this.direStack[i]) {
                case cc.macro.KEY.w:
                    upVec = -1
                    break
                case cc.macro.KEY.s:
                    upVec = 1
                    break
                case cc.macro.KEY.a:
                    leftVec = 1
                    break
                case cc.macro.KEY.d:
                    leftVec = -1
                    break
            }
        }
        let addX = 0
        let addY = 0

        let state = 'stateStay'

        if (upVec != 0) {
            addY = this.speed * dt * upVec;
            state = upVec == 1 ? 'moveUp' : 'moveDown'
        }

        if (leftVec != 0) {
            addX = this.speed * dt * leftVec;
            state = leftVec == 1 ? 'moveLeft' : 'moveRight'
        }
        this.upVec = upVec
        this.leftVec = leftVec

        let addVec = cc.v2(addX, addY).normalizeSelf().mulSelf(this.speed * dt)

        this.node.x += addVec.x
        this.node.y += addVec.y

        // 将移动同步头hero
        let hero = CharMgr.getInstance().getCharByName("Hero").getComponent('Hero')
        hero.node.x -= addVec.x
        hero.node.y -= addVec.y
        if (hero.state != state) {
            hero.changeState(state)
        }
    }

    getMoveVec() {
        return { up: this.upVec, left: this.leftVec, speed: this.speed }
    }

    pause(){
        this.isPause = true
    }

    resume(){
        this.isPause = false
    }

    update(dt) {
        if(this.isPause){
            return
        }
        this.moveMap(dt)
    }
}
