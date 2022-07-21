// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class AppStart extends cc.Component {
    loadList = [
        {
            name : 'hero',
            path : 'Prefab/Char/Hero',
            zOrder : 200
        },
        {
            name : 'mapLayer',
            path : 'Prefab/MapPrefab/MapLayer',
            zOrder : 0
        },
    ]
    isLoadFinish:number = 0
    allFinish:number = 0

    start () {
        this.allFinish = this.loadList.length
        this.loadResource()
    }

    loadResource(){
        if(this.isLoadFinish == this.allFinish){
            this.loadFinishCallBack()
            return
        }
        let name = this.loadList[this.isLoadFinish].name
        let path = this.loadList[this.isLoadFinish].path
        let zOrder = this.loadList[this.isLoadFinish].zOrder
        // 加载地图
        cc.resources.load(path, cc.Prefab, (error, assets) =>{
            if(error){
                return
            }
            assets.data.zIndex = zOrder
            this[name] = assets
            this.isLoadFinish++
            this.loadResource()
        })
    }

    addHero(){
        this.hero.data.parent = this.node
    }

    addMapLayer(){
        this.mapLayer.data.getComponent('Map').char = this.hero.data
        this.mapLayer.data.parent = this.node
    }

    loadFinishCallBack(){
        this.addHero()
        this.addMapLayer()
    }

    // update (dt) {
    // }
}
