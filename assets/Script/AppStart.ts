
import CharMgr from "./Mgr/CharMgr";
import MapMgr from "./Mgr/MapMgr";
const {ccclass, property} = cc._decorator;

@ccclass
export default class AppStart extends cc.Component {
    // loadList = [
    //     {
    //         name : 'hero',
    //         path : 'Prefab/Char/Hero',
    //         zOrder : 200
    //     },
    //     {
    //         name : 'mapLayer',
    //         path : 'Prefab/MapPrefab/MapLayer',
    //         zOrder : 0
    //     },
    // ]
    isLoadFinish:number = 0
    allFinish:number = 0

    start () {
        this.addHero()
        this.addMapLayer()
    }

    // 添加角色
    addHero(){
        let hero = CharMgr.getInstance().createChar("Hero", "Hero")
        hero.node.parent = this.node
        hero.node.zIndex = 200
    }

    // 添加地图层
    addMapLayer(){
        cc.resources.load("Prefab/MapPrefab/MapBlock", cc.Prefab, (error, assets) =>{
            if(error){
                return
            }
            let mapLayer = MapMgr.getInstance().createrMap()
            mapLayer.node.parent = this.node
            mapLayer.mapBlock = assets
        })
    }

    loadFinishCallBack(){
        this.addHero()
        this.addMapLayer()
    }

    // update (dt) {
    // }
}
