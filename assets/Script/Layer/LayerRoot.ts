import CharMgr from "../Mgr/CharMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerRoot extends cc.Component {

    //方向
    direStack = []
    speed: number = 0
    upVec: number;
    leftVec: number;

    // onLoad(params?: any) {
      
    // }

    start() {
        this.speed = CharMgr.getInstance().getCharByName("Hero").speed
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
        let nextX = this.node.x
        let nextY = this.node.y

        let state = 'stateStay'

        if (upVec != 0) {
            nextY += this.speed * dt * upVec;
            state = upVec == 1 ? 'moveUp' : 'moveDown'
        }

        if (leftVec != 0) {
            nextX += this.speed * dt * leftVec;
            state = leftVec == 1 ? 'moveLeft' : 'moveRight'
        }
        this.upVec = upVec
        this.leftVec = leftVec

        this.node.x = nextX
        this.node.y = nextY
        
        // 将移动同步头hero
        let hero = CharMgr.getInstance().getCharByName("Hero").getComponent('Hero')
        hero.node.x = -nextX
        hero.node.y = -nextY        
        if (hero.state != state) {
            hero.changeState(state)
        }
    }
    getMoveVec() {
        return { up: this.upVec, left: this.leftVec, speed: this.speed }
    }

    update(dt) {
        this.moveMap(dt)
    }
}
