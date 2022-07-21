// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MapMgr {
    private static _instance:MapMgr = null;
    private layerMap:Map<string, cc.Node> = new Map()
    public static getInstance(){
        if(!this._instance){
            this._instance = new MapMgr();
            this._instance._init();
        }
        return this._instance;
    }

    private _init(){  
    }

    public addLayerMap(name:string, node:cc.Node){
        this.layerMap.set(name, node)
    }

    public getLayerByName(name:string){
        return this.layerMap.get(name)
    }
}
