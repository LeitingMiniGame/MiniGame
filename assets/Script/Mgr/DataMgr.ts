import WeaponMgr from "./WeaponMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DataMgr {
    protected static _instance: DataMgr = null;

    bag: any[]
    coin: number
    kullNum: number
    coinLabel: any
    killLabel: any
    timeLabel: any
    levelLabel: any
    expPress: cc.ProgressBar
    weaponList: cc.Node

    bulletData = {
        ['LineTest']: [
            {
                name: 'LineTest',
                type: 'Line',
                icon: 'Dart',
                bulletIcon: 'Hero',
                level: 1,
                interval: 1,
                preInterval: 0.05,
                preCount: 1,
                hp: 10,
                minDamage: 5,
                maxDamage: 10,
                speed: 600,
                size: cc.size(20, 20)
            }
        ],
        ['DomainTest']: [
            {
                name: 'DomainTest',
                type: 'Domain',
                icon: 'MagicWand',
                bulletIcon: 'Hero',
                level: 1,
                interval: 1,
                preInterval: 0.05,
                preCount: 1,
                hp: 100000000,
                minDamage: 5,
                maxDamage: 5,
                speed: 100,
                maxSize: cc.size(800, 800), // 领域型武器 领域的最大值
                size: cc.size(20, 20)
            }
        ],
        ['ProjectileTest']: [
            {
                name: 'ProjectileTest',
                type: 'Projectile',
                icon: 'MagicWand1',
                bulletIcon: 'Hero',
                level: 1,
                interval: 1,
                preInterval: 0.05,
                preCount: 1,
                hp: 1000000,
                minDamage: 5,
                maxDamage: 5,
                speed: 600,
                size: cc.size(20, 20)
            }
        ]
    }

    weaponIcon = [
        'Dart', 'MagicWand', 'MagicWand1'
    ]

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
        this.kullNum = 0

        this.coinLabel = cc.find('/UILayer/CoinPanel/CoinLabel').getComponent(cc.Label)
        this.coinLabel.string = 0

        this.killLabel = cc.find('/UILayer/KillPanel/KillLabel').getComponent(cc.Label)
        this.killLabel.string = 0

        this.timeLabel = cc.find('/UILayer/TimeLabel').getComponent(cc.Label)
        this.timeLabel.string = '00:00'

        this.levelLabel = cc.find('/UILayer/LevelBar/LevelLabel').getComponent(cc.Label)
        this.levelLabel.string = 1

        this.expPress = cc.find('/UILayer/LevelBar').getComponent(cc.ProgressBar)
        this.expPress.progress = 0

        this.weaponList = cc.find('/UILayer/WeaponList')

        for (let i = 0; i < this.weaponIcon.length; i++) {
            let path = 'Image/Weapon/' + this.weaponIcon[i]
            cc.resources.preload(path, cc.SpriteFrame)
        }

    }

    getData(obj) {
        return Object.assign(obj)
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

        let iconPath = 'Image/Weapon/' + newWeapon.icon
        let parentNode = this.weaponList.getChildByName('Item' + this.bag.length)
        cc.resources.load(iconPath, cc.SpriteFrame, (error, assets:cc.SpriteFrame)=>{
            let node = new cc.Node
            let sprite = node.addComponent(cc.Sprite)
            sprite.spriteFrame = assets
            node.parent = parentNode
            node.setContentSize(25, 25)
        })
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
        this.coinLabel.string = this.coin
    }

    // 增加击杀数
    addKillNum(number) {
        this.kullNum += number
        this.killLabel.string = this.kullNum
    }


    // 增加时间
    setTimeLabel(time: number) {
        function padNumber(num: number, fill: number) {
            var len = ('' + num).length;
            return (Array(
                fill > len ? fill - len + 1 || 0 : 0
            ).join('0') + num);
        }

        let minute = Math.floor(time / 60)
        let secon = Math.floor(time % 60)
        let minuteStr = padNumber(minute, 2)
        let seconStr = padNumber(secon, 2)
        this.timeLabel.string = minuteStr + ':' + seconStr
    }

}
