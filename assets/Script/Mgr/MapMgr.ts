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

    public static releaseInstance() {
        if (this._instance) {
            this._instance = undefined
        }
    }

    public addLayerMap(name:string, node:cc.Node){
        this.layerMap.set(name, node)
    }

    public getLayerByName(name:string){
        return this.layerMap.get(name)
    }
}
