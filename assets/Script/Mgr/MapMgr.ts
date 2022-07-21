// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Map from "../Map/Map";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MapMgr {
    private static _instance:MapMgr = null;
    private mapLayer:Map = null
    public static getInstance(){
        if(!this._instance){
            this._instance = new MapMgr();
            this._instance._init();
        }
        return this._instance;
    }

    private _init(){  
    }

    public createrMap(){
        let node = new cc.Node
        let mapLayer = node.addComponent("Map")
        this.mapLayer = mapLayer
        return mapLayer
    }

    public getMap(){
        return this.mapLayer
    }
}
