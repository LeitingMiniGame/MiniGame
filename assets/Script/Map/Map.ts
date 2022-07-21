const { ccclass, property } = cc._decorator

@ccclass
export default class Map extends cc.Component {

    @property({
        type: cc.Prefab
    })
    mapBlock: cc.Prefab = null

    @property(cc.Node)
    char:cc.Node = null;

    private _mapBlockPool: cc.NodePool

    //方向
    direStack = []
    speed:number = 0

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
        this.speed = this.char.getComponent("Hero").speed
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

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
        // var follow = cc.follow(this.char, cc.rect(0,0, 1500,1500));
        // this.node.runAction(follow);
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

    update (dt) {
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
        console.log(this.node.x);
    }
}
