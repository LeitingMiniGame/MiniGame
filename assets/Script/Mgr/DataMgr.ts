import WeaponMgr from "./WeaponMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DataMgr {
    protected static _instance:DataMgr = null;

    protected bag:any[]

    public static getInstance(){
        if(!this._instance){
            this._instance = new DataMgr();
            this._instance._init();
        }
        return this._instance;
    }

    protected _init(){  
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
        let newWeapon = { name: typeName, level: 1, interval: 1 }
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
