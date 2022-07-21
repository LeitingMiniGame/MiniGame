import MapMgr from "./MapMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletMgr  {
    protected static _instance:BulletMgr = null;

    public static getInstance(){
        if(!this._instance){
            this._instance = new BulletMgr();
            this._instance._init();
        }
        return this._instance;
    }


    protected _init(){  
    }

    public createBullet(typeName:string, pos:cc.Vec2){
        let bullet = new cc.Node()
        bullet.addComponent(typeName)
        let bulletLayer = MapMgr.getInstance().getLayerByName('BulletLayer')
        bullet.x = bulletLayer.convertToNodeSpaceAR(pos).x
        bullet.y = bulletLayer.convertToNodeSpaceAR(pos).y
        bullet.parent = bulletLayer
    }
}
