
import NumImage from "../Control/NumImage";
import CharMgr from "../Mgr/CharMgr";
import MapMgr from "../Mgr/MapMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {
    isLoadFinish: number = 0
    allFinish: number = 0

    onLoad() {
        this.addLayerRoot()

        this.addHero()
        this.addMapLayer()
        this.addBulletLayer()
        this.addMonsterLayer()

        // 开启碰撞检测
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;


        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        // physicsManager.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        cc.director.getPhysicsManager().gravity = cc.v2(0, -960);


        NumImage.getInstance()
    }

    // 添加角色
    addHero() {
        let hero = CharMgr.getInstance().createChar("HeroTest", "Hero")
        let layerRoot = MapMgr.getInstance().getLayerByName('LayerRoot')
        hero.node.parent = layerRoot
        hero.node.zIndex = 200
    }

    // 添加 layer 的根节点
    addLayerRoot() {
        let node = new cc.Node('LayerRoot')
        node.addComponent("LayerRoot")
        node.parent = this.node
        node.zIndex = 0
        MapMgr.getInstance().addLayerMap('LayerRoot', node)

    }

    // 添加地图层
    addMapLayer() {
        cc.resources.load("Prefab/MapPrefab/MapBlock1", cc.Prefab, (error, assets) => {
            if (error) {
                return
            }
            let node = new cc.Node('MapLayer')
            let mapLayer = node.addComponent("MapLayer")
            mapLayer.mapBlock = assets
            let layerRoot = MapMgr.getInstance().getLayerByName('LayerRoot')
            node.parent = layerRoot
            node.zIndex = 100
            MapMgr.getInstance().addLayerMap('MapLayer', node)
        })
    }

    // 添加子弹层
    addBulletLayer() {
        let node = new cc.Node('BulletLayer')
        let layerRoot = MapMgr.getInstance().getLayerByName('LayerRoot')
        node.parent = layerRoot
        node.zIndex = 300
        MapMgr.getInstance().addLayerMap('BulletLayer', node)
    }

    // 添加怪物层
    addMonsterLayer() {
        let node = new cc.Node('MonsterLayer')
        node.addComponent("MonsterLayer")
        let layerRoot = MapMgr.getInstance().getLayerByName('LayerRoot')
        node.parent = layerRoot
        node.zIndex = 200
        MapMgr.getInstance().addLayerMap('MonsterLayer', node)
    }

}
