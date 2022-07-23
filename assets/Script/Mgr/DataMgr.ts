import WeaponMgr from "./WeaponMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DataMgr {
    protected static _instance: DataMgr = null;

    protected bag: any[]
    protected coin: number


    bulletData = {
        ['LineTest']: [
            {
                name: 'LineTest',
                bulletIcon: 'Hero',
                level: 1,
                interval: 1,
                hp: 10,
                minDamage: 10,
                maxDamage: 10,
                speed: 600,
                size: cc.size(20, 20)
            }
        ],
        ['DomainTest']: [
            {
                name: 'DomainTest',
                bulletIcon: 'Hero',
                level: 1,
                interval: 1,
                hp: 100000000,
                minDamage: 5,
                maxDamage: 5,
                speed: 80,
                maxSize: cc.size(500, 500), // 领域型武器 领域的最大值
                size: cc.size(20, 20)
            }
        ],
        ['ProjectileTest']: [
            {
                name: 'ProjectileTest',
                bulletIcon: 'Hero',
                level: 1,
                interval: 1,
                hp: 1000000,
                minDamage: 5,
                maxDamage: 5,
                speed: 600,
                size: cc.size(20, 20)
            }
        ]
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
        this.coin = 0
    }

    getData(obj){
        return Object.create(obj)
    }

    // 增加武器
    addWeapon(typeName) {
        for (let i = 0; i < Math.min(6, this.bag.length); i++) {
            if (this.bag[i].name == typeName) {
                this.upWeapon(i)
                return
            }
        }
        let newWeapon = this.getData(this.bulletData[typeName][0])
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

        let level = this.bag[typeName].level
        // 处理升级的逻辑
        this.bag[typeName] = this.getData(this.bulletData[typeName][level])

        WeaponMgr.getInstance().upWeapon(this.bag[typeName])
    }

    // 增加金币
    addCoin(number) {
        this.coin += number
    }

}
