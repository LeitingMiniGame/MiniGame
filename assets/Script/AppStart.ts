
import CharMgr from "./Mgr/CharMgr";
import MapMgr from "./Mgr/MapMgr";
const {ccclass, property} = cc._decorator;

@ccclass
export default class AppStart extends cc.Component {
    isLoadFinish:number = 0
    allFinish:number = 0

    onLoad () {
        this.addHero()
        this.addMapLayer()
        this.addBulletLayer()
    }

    // 添加角色
    addHero(){
        let hero = CharMgr.getInstance().createChar("Hero", "Hero")
        hero.node.parent = this.node
        hero.node.zIndex = 200
    }

    // 添加地图层
    addMapLayer(){
        cc.resources.load("Prefab/MapPrefab/mapBlock1", cc.Prefab, (error, assets) =>{
            if(error){
                return
            }
            let node = new cc.Node('mapLayer')
            let mapLayer = node.addComponent("Map")
            mapLayer.node.parent = this.node
            mapLayer.mapBlock = assets
            MapMgr.getInstance().addLayerMap('mapLayer', node)
        })
    }

    addBulletLayer(){
        let node = new cc.Node('BulletLayer')
        node.parent = this.node
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
