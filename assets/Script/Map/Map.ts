import CharMgr from "../Mgr/CharMgr"
import MonsterMgr from "../Mgr/MonsterMgr"

const { ccclass, property } = cc._decorator

@ccclass
export default class Map extends cc.Component {

    @property({
        type: cc.Prefab
    })
    mapBlock: cc.Prefab = null

    private _mapBlockPool: cc.NodePool

    //方向
    direStack = []
    speed:number = 0

    onLoad(params?: any) {
        this.speed = CharMgr.getInstance().getCharByName("Hero").speed
    }

    start(params?: any) {
        // 创建对象池
        this._mapBlockPool = new cc.NodePool()
        let blockSize = cc.instantiate(this.mapBlock).getContentSize()
        let row = Math.floor(cc.winSize.height / blockSize.height * 2)
        let col = Math.floor(cc.winSize.width / blockSize.width * 2)
        let initCount = row * col
        for (let i = 0; i < initCount; i++) {
            let mapBlock = cc.instantiate(this.mapBlock)
            this._mapBlockPool.put(mapBlock)
        }

        // 将地图贴上
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let mapBlock = this.getMapBlock()
                mapBlock.parent = this.node
                mapBlock.setPosition(blockSize.width * j - cc.winSize.width, blockSize.height * i - cc.winSize.height)
            }
        }

        // 监听事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)

        // 开始生成怪物
        cc.tween(this.node)
        .call(()=>{
            let monster = MonsterMgr.getInstance().createMonster("Monster", "putao")
            monster.node.parent = this.node
        }).start()
    }

    createMonster(){
        let monster = CharMgr.getInstance().createChar("Monster", "monster")
    }

    // 获取地图块
    getMapBlock() {
        let mapBlock = null
        if (this._mapBlockPool.size() > 0) {
            mapBlock = this._mapBlockPool.get()
        } else {
            mapBlock = cc.instantiate(this.mapBlock)
        }
        return mapBlock
    }

    // 回收地图块
    recycleMapBlock(mapBlock) {
        this._mapBlockPool.put(mapBlock);
    }

    // 添加新的地图快
    addNewMapBlock(oldX:number, oldY:number, worldPos){
        let mapBlock = this.getMapBlock()
        let blockSize = mapBlock.getContentSize()
        let col = Math.floor(cc.winSize.width / blockSize.width * 2)
        let row = Math.floor(cc.winSize.height / blockSize.height * 2)
        let newPos
        if(worldPos.x < - cc.winSize.width / 2){
            newPos = new cc.Vec2(oldX + blockSize.width * col, oldY)            
        }else if(worldPos.x > cc.winSize.width * 1.5){
            let col = Math.floor(cc.winSize.width / blockSize.width * 2)
            newPos = new cc.Vec2(oldX - blockSize.width * col, oldY)  
        }else if(worldPos.y < - cc.winSize.height / 2){
            newPos = new cc.Vec2(oldX, oldY + blockSize.width * row)
        }else if(worldPos.y > cc.winSize.height * 1.5){
            newPos = new cc.Vec2(oldX, oldY - blockSize.width * row)
        }
        mapBlock.parent = this.node
        mapBlock.setPosition(newPos)
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
    moveMap(dt){
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
        if (leftVec != 0) {
            this.node.x += this.speed * dt * leftVec;
        }
        if (upVec != 0) {
            this.node.y += this.speed * dt * upVec;
        }
    }

    update (dt) {
        this.moveMap(dt)
    }
}
