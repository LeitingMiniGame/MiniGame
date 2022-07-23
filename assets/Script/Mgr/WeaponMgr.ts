import CharMgr from "./CharMgr";
import MapMgr from "./MapMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WeaponMgr {
    protected static _instance: WeaponMgr = null;

    tweenMap: Map<string, cc.Tween> = null

    public static getInstance() {
        if (!this._instance) {
            this._instance = new WeaponMgr();
            this._instance._init();
        }
        return this._instance;
    }

    protected _init() {
        this.tweenMap = new Map
    }

    // 生成攻击的缓动系统
    createFireTween(weapon) {
        let bulletLayer = MapMgr.getInstance().getLayerByName("BulletLayer")
        let char = CharMgr.getInstance().getCharByName('Hero').getComponent('Hero')
        let interval = char.getFireInterval(weapon.interval)
        let fireCount = char.getFireCount(weapon.preCount)
        let self = this
        let tween = cc.tween(bulletLayer)
            .repeatForever(
                cc.tween()
                    .call(() => {
                        for (let i = 0; i < fireCount; i++) {
                            cc.tween(bulletLayer)
                                .delay(i * weapon.preInterval)
                                .call(() => {
                                    self.createBullet(weapon)
                                }).start()
                        }
                    }).delay(interval)
            )
        return tween
    }

    // 增加武器
    addWeapon(weapon) {
        let tween = this.createFireTween(weapon)
        this.tweenMap.set(weapon.name, tween)
        tween.start()
    }

    // 升级武器
    upWeapon(weapon) {
        // 处理缓动
        let name = weapon.name
        let oldTween = this.tweenMap.get(name)
        oldTween.stop()
        let newTween = this.createFireTween(weapon)
        this.tweenMap.set(name, newTween)
        newTween.start()
    }

    // 生成子弹
    public createBullet(weapon) {
        let pos = CharMgr.getInstance().getCharByName('Hero').getWorldPos()
        let bullet = new cc.Node(weapon.name)
        bullet.addComponent(weapon.type)

        let weaponComp = bullet.getComponent('Weapon')
        weaponComp.data = Object.create(weapon)

        let bulletLayer = MapMgr.getInstance().getLayerByName('BulletLayer')
        bullet.x = bulletLayer.convertToNodeSpaceAR(pos).x
        bullet.y = bulletLayer.convertToNodeSpaceAR(pos).y
        bullet.parent = bulletLayer
    }
}
