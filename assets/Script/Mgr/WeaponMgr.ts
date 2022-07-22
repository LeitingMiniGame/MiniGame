import CharMgr from "./CharMgr";
import MapMgr from "./MapMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WeaponMgr {
    protected static _instance: WeaponMgr = null;

    tweenMap: Map<string, cc.Tween> = null

    // [
    //     {
    //         name : '',
    //         level: 1,
    //         interval: 1,
    //     }
    // ]
    bag: any[];

    public static getInstance() {
        if (!this._instance) {
            this._instance = new WeaponMgr();
            this._instance._init();
        }
        return this._instance;
    }

    protected _init() {
        this.bag = []
        this.tweenMap = new Map
    }

    createFireTween(typeName) {
        let bulletLayer = MapMgr.getInstance().getLayerByName("BulletLayer")
        return cc.tween(bulletLayer)
            .repeatForever(
                cc.tween()
                    .call(() => {
                        this.createBullet(typeName)
                    }).delay(1)
            )
    }

    // 增加武器
    addWeapon(typeName) {
        for (let i = 0; i < Math.min(6, this.bag.length); i++) {
            if (this.bag[i].name == typeName) {
                this.upWeapon(i)
                return
            }
        }
        this.bag.push({ name: typeName, level: 1, interval: 1 })
        let tween = this.createFireTween(typeName)
        this.tweenMap.set(typeName, tween)
        tween.start()
    }

    // 升级武器
    upWeapon(typeName: string | number) {
        let name
        if (typeof (typeName) === 'number') {
            this.bag[typeName].level++
            name = this.bag[typeName].name
        } else {
            for (let i = 0; i < Math.min(6, this.bag.length); i++) {
                if (this.bag[i].name == typeName) {
                    this.bag[i].level++
                }
            }
            name = typeName
        }

        let oldTween = this.tweenMap.get(name)
        oldTween.stop()
        let newTween = this.createFireTween(name)
        this.tweenMap.set(name, newTween)
        newTween.start()
    }

    public createBullet(typeName: string) {
        let pos = CharMgr.getInstance().getCharByName('Hero').getWorldPos()
        let bullet = new cc.Node(typeName)
        bullet.addComponent(typeName)
        let bulletLayer = MapMgr.getInstance().getLayerByName('BulletLayer')
        bullet.x = bulletLayer.convertToNodeSpaceAR(pos).x
        bullet.y = bulletLayer.convertToNodeSpaceAR(pos).y
        bullet.parent = bulletLayer
    }
}
