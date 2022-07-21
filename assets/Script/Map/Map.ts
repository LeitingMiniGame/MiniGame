const { ccclass, property } = cc._decorator

@ccclass
export default class Map extends cc.Component {

    // 这个属性引用了星星预制资源
    @property({
        type: cc.Prefab
    })
    mapBlock: cc.Prefab = null


    @property(cc.Node)
    char:cc.Node = null;

    private _mapBlockPool: cc.NodePool

    //方向
    direStack = []
    speed = 20


    //第一进来。
    onLoad(params?: any) {
        this._mapBlockPool = new cc.NodePool()
        let blockSize = cc.instantiate(this.mapBlock).getContentSize()
        let row = cc.winSize.height / blockSize.height * 2
        let col = cc.winSize.width / blockSize.width * 2
        let initCount = row * col
        for (let i = 0; i < initCount; i++) {
            let mapBlock = cc.instantiate(this.mapBlock)
            this._mapBlockPool.put(mapBlock)
        }
    }

    start(params?: any) {
        let blockSize = this.getMapBlock().getContentSize()
        let row = cc.winSize.height / blockSize.height * 2
        let col = cc.winSize.width / blockSize.width * 2
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let mapBlock = this.getMapBlock()
                mapBlock.parent = this.node
                mapBlock.setPosition(blockSize.width * i - cc.winSize.width / 2, blockSize.height * j - cc.winSize.height / 2)
            }
        }

        //add keyboard input listener to jump, turnLeft and turnRight
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
        // touch input
        // this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this)
        // this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this)

        var follow = cc.follow(this.char, cc.rect(0,0, 1500,1500));
        this.node.runAction(follow);
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

    onKeyDown(event) {
        this.direStack.push(event.keyCode)
    }

    onKeyUp(event) {
        for(let i = 0; i < this.direStack.length; i++){
            if(this.direStack[i] = event.keyCode){
                this.direStack.splice(i, 1);
                break
            }
        }
        // switch (event.keyCode) {
        //     case cc.macro.KEY.w:
        //         this.direction[0] = false
        //         break
        //     case cc.macro.KEY.s:
        //         this.direction[1] = false
        //         break
        //     case cc.macro.KEY.a:
        //         this.direction[2] = false
        //         break
        //     case cc.macro.KEY.d:
        //         this.direction[3] = false
        //         break
        // }
    }

    // update (dt) {

    // }
}
