import CharMgr from "../Mgr/CharMgr"

const { ccclass, property } = cc._decorator
const MAP_BLOCK_ZINDEX = 100

@ccclass
export default class Map extends cc.Component {

    @property({
        type: cc.Prefab
    })
    mapBlock: cc.Prefab = null

    private _mapBlockPool: cc.NodePool

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

    }

    createMonster() {
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
        mapBlock.zIndex = MAP_BLOCK_ZINDEX
        return mapBlock
    }

    // 回收地图块
    recycleMapBlock(mapBlock) {
        this._mapBlockPool.put(mapBlock);
    }

    // 添加新的地图快
    addNewMapBlock(oldX: number, oldY: number, worldPos) {
        let mapBlock = this.getMapBlock()
        let blockSize = mapBlock.getContentSize()
        let col = Math.floor(cc.winSize.width / blockSize.width * 2)
        let row = Math.floor(cc.winSize.height / blockSize.height * 2)
        let newPos
        if (worldPos.x < - cc.winSize.width / 2) {
            newPos = new cc.Vec2(oldX + blockSize.width * col, oldY)
        } else if (worldPos.x > cc.winSize.width * 1.5) {
            let col = Math.floor(cc.winSize.width / blockSize.width * 2)
            newPos = new cc.Vec2(oldX - blockSize.width * col, oldY)
        } else if (worldPos.y < - cc.winSize.height / 2) {
            newPos = new cc.Vec2(oldX, oldY + blockSize.width * row)
        } else if (worldPos.y > cc.winSize.height * 1.5) {
            newPos = new cc.Vec2(oldX, oldY - blockSize.width * row)
        }
        mapBlock.parent = this.node
        mapBlock.setPosition(newPos)
    }
}
