
import CharMgr from "./Mgr/CharMgr";
import MapMgr from "./Mgr/MapMgr";
const {ccclass, property} = cc._decorator;

@ccclass
export default class AppStart extends cc.Component {
    isLoadFinish:number = 0
    allFinish:number = 0

    onLoad () {
        this.addHero()
        this.addLayerRoot()
    }

    // 添加角色
    addHero(){
        let hero = CharMgr.getInstance().createChar("Hero", "Hero")
        hero.node.parent = this.node
        hero.node.zIndex = 200
    }

    addLayerRoot(){
        let node = new cc.Node('layerRoot')
        node.addComponent("LayerRoot")
        node.parent = this.node
        node.zIndex = 0
        MapMgr.getInstance().addLayerMap('layerRoot', node)

        this.addMapLayer()
        this.addBulletLayer()
    }

    // 添加地图层
    addMapLayer(){
        cc.resources.load("Prefab/MapPrefab/MapBlock", cc.Prefab, (error, assets) =>{
            if(error){
                return
            }
            let node = new cc.Node('mapLayer')
            let mapLayer = node.addComponent("MapLayer")
            mapLayer.mapBlock = assets
            let layerRoot = MapMgr.getInstance().getLayerByName('layerRoot')
            node.parent = layerRoot
            MapMgr.getInstance().addLayerMap('mapLayer', node)
        })
    }

    addBulletLayer(){
        let node = new cc.Node('BulletLayer')
        let layerRoot = MapMgr.getInstance().getLayerByName('layerRoot')
        node.parent = layerRoot
        node.zIndex = 200
        MapMgr.getInstance().addLayerMap('BulletLayer', node)
    }

    loadFinishCallBack(){
        this.addHero()
        this.addMapLayer()
    }

    // update (dt) {
    // }
}
