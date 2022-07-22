import WeaponMgr from "./WeaponMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DataMgr {
    protected static _instance: DataMgr = null;

    protected bag: any[]

    // [
    //     {
    //         name : '',
    //         level: 1,
    //         interval: 1,
    //         hp: number,
    //         damage: number,
    //         speed: number,
    //         size: cc.Size
    //     }
    // ]

    tempData = {
        ['LineTest']: {
            name: 'LineTest',
            level: 1,
            interval:1,
            hp: 10,
            damage: 10,
            speed: 600,
            size: cc.size(20, 20)
        },
        ['DomainTest']: {
            name: 'DomainTest',
            level: 1,
            interval:1,
            hp: 100000000,
            damage: 5,
            speed: 80,
            maxSize: cc.size(500, 500),
            size: cc.size(20, 20)
        },
        ['ProjectileTest']:{
            name: 'ProjectileTest',
            level: 1,
            interval:1,
            hp: 1000000,
            damage: 10,
            speed: 600,
            size: cc.size(20, 20)
        }
    }



    public static getInstance() {
        if (!this._instance) {
            this._instance = new DataMgr();
            this._instance._init();
        }
        return this._instance;
    }

    protected _init() {
        this.bag = []
    }

    // 增加武器
    addWeapon(typeName) {
        for (let i = 0; i < Math.min(6, this.bag.length); i++) {
            if (this.bag[i].name == typeName) {
                this.upWeapon(i)
                return
            }
        }
        let newWeapon = this.tempData[typeName]
        this.bag.push(newWeapon)

        WeaponMgr.getInstance().addWeapon(newWeapon)
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

        WeaponMgr.getInstance().upWeapon(this.bag[typeName])
    }

}
