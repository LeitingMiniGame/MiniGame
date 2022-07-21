
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
        // this.allFinish = this.loadList.length
        this.addHero()
        this.addMapLayer()
        // this.loadResource()
    }

    // loadResource(){
    //     if(this.isLoadFinish == this.allFinish){
    //         this.loadFinishCallBack()
    //         return
    //     }
    //     let name = this.loadList[this.isLoadFinish].name
    //     let path = this.loadList[this.isLoadFinish].path
    //     let zOrder = this.loadList[this.isLoadFinish].zOrder
    //     // 加载地图
    //     cc.resources.load(path, cc.Prefab, (error, assets) =>{
    //         if(error){
    //             return
    //         }
    //         assets.data.zIndex = zOrder
    //         this[name] = assets
    //         this.isLoadFinish++
    //         this.loadResource()
    //     })
    // }

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
