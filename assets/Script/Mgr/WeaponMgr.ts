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

    // 生成攻击的缓动系统
    createFireTween(typeName) {
        let bulletLayer = MapMgr.getInstance().getLayerByName("BulletLayer")
        let fireInterval = this.getWeapon(typeName).interval
        return cc.tween(bulletLayer)
            .repeatForever(
                cc.tween()
                    .call(() => {
                        this.createBullet(typeName)
                    }).delay(fireInterval)
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

    // 获取武器数据
    getWeapon(typeName: string | number) {
        if (typeof (typeName) === 'number') {
            return this.bag[typeName]
        }

        for (let i = 0; i < Math.min(6, this.bag.length); i++) {
            if (this.bag[i].name == typeName) {
                return this.bag[i]
            }
        }
    }

    // 升级武器
    upWeapon(typeName: string | number) {
        if (typeof (typeName) === 'string') {
            for (let i = 0; i < Math.min(6, this.bag.length); i++) {
                if (this.bag[i].name == typeName) {
                    this.upWeapon(i)
                    return
                }
            }

        }

        // 处理升级的逻辑
        this.bag[typeName].level++
        this.bag[typeName].interval -= 0.5

        // 处理缓动
        let name = this.bag[typeName].name
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
