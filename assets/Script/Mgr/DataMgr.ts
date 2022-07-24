import { Data, deepCopyJson, getRandomIntInclusive } from "../Tools/Tools";
import JsonManager from "./JsonManager";
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
    level: any
    selectItemPanel: any
    randWeapon: any

    bulletData: any

    //// 临时数据
    levelExp = [
        2,
        4,
        8,
        16,
        32,
        64,
        128
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
        this.coinLabel = cc.find('/UILayer/CoinPanel/CoinLabel').getComponent(cc.Label)
        this.coinLabel.string = 0

        this.kullNum = 0
        this.killLabel = cc.find('/UILayer/KillPanel/KillLabel').getComponent(cc.Label)
        this.killLabel.string = 0

        this.level = 1
        this.levelLabel = cc.find('/UILayer/LevelBar/LevelLabel').getComponent(cc.Label)
        this.levelLabel.string = 1

        this.timeLabel = cc.find('/UILayer/TimeLabel').getComponent(cc.Label)
        this.timeLabel.string = '00:00'

        this.expPress = cc.find('/UILayer/LevelBar').getComponent(cc.ProgressBar)
        this.expPress.progress = 0

        this.selectItemPanel = cc.find('/UILayer/LevelUpPanel/SelectPanel')
        for (let i = 1; i <= 3; i++) {
            let itemNode = this.selectItemPanel.getChildByName('SelectItem' + i)
            itemNode.index = i
            itemNode.on('click', this.onSelectItem, this);
        }

        this.weaponList = cc.find('/UILayer/WeaponList')


        this.bulletData = Data.Config.GetConfig("weapon")

    }

    getData(obj): any {
        return deepCopyJson(obj)
    }

    // 增加武器
    addWeapon(typeName) {
        for (let i = 0; i < Math.min(6, this.bag.length); i++) {
            if (this.bag[i].name == typeName) {
                this.upWeapon(typeName)
                return
            }
        }
        let newWeapon = this.getData(this.bulletData[typeName][0])
        this.bag.push(newWeapon)

        let iconPath = 'Image/Weapon/' + newWeapon.icon
        let parentNode = this.weaponList.getChildByName('Item' + this.bag.length)
        cc.resources.load(iconPath, cc.SpriteFrame, (error, assets: cc.SpriteFrame) => {
            let node = new cc.Node
            let sprite = node.addComponent(cc.Sprite)
            sprite.spriteFrame = assets
            node.parent = parentNode
            let levelLabel = parentNode.getChildByName('ItemLevelLabel')
            levelLabel.active = true
            levelLabel.getComponent(cc.Label).string = 'lv.' + 1
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

        let level = this.bag[typeName].level
        // 处理升级的逻辑
        this.bag[typeName] = this.getData(this.bulletData[typeName][level])

        let panelIndex = typeName as number + 1
        let parentNode = this.weaponList.getChildByName('Item' + panelIndex)
        let levelLabel = parentNode.getChildByName('ItemLevelLabel')
        levelLabel.getComponent(cc.Label).string = 'lv.' + level

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

    // 增加经验
    addExp(data) {
        let maxExp = this.levelExp[data.level - 1]
        let oldLevel = data.level
        while (data.exp >= maxExp) {
            data.exp -= maxExp
            data.level++
            maxExp = this.levelExp[data.level - 1]
        }
        let diffLevel = data.level - oldLevel
        if (diffLevel > 0) {
            this.selectItemPanel.parent.active = true
            cc.find('/Canvas').getComponent('GameScene').pauseAll()
            this.levelUp(diffLevel)
        }
        this.levelLabel.string = data.level
        this.expPress.progress = data.exp / maxExp
    }

    levelUp(num) {
        if (num == 0) {
            this.selectItemPanel.parent.active = false
            cc.find('/Canvas').getComponent('GameScene').resumeAll()
            return
        }

        let allBulletName = Object.keys(this.bulletData)
        this.randWeapon = []

        for (let i = 1; i <= 3; i++) {
            let index = getRandomIntInclusive(0, allBulletName.length - 1)
            this.randWeapon.push(allBulletName[index])
            allBulletName.splice(index, 1)
        }

        for (let i = 1; i <= 3; i++) {
            let self = DataMgr.getInstance()
            let itemNode = self.selectItemPanel.getChildByName('SelectItem' + i)
            itemNode.num = num


            let index = self.getWeapon(this.randWeapon[i - 1])
            let lelvelLabel = itemNode.getChildByName('LevelLabel').getComponent(cc.Label)
            if (!index) {
                lelvelLabel.string = '新！'
            } else {
                lelvelLabel.string = '等级：' + index.level
            }

            let weaponData = self.bulletData[this.randWeapon[i - 1]][0]
            let iconPath = 'Image/Weapon/' + weaponData.icon
            let iconNode = itemNode.getChildByName('Icon')

            itemNode.getChildByName('NameLabel').getComponent(cc.Label).string = weaponData.name


            itemNode.getChildByName('InfoLabel').getComponent(cc.Label).string = weaponData.describe

            cc.resources.load(iconPath, cc.SpriteFrame, (error, assets: cc.SpriteFrame) => {
                let node = new cc.Node
                let sprite = node.addComponent(cc.Sprite)
                sprite.spriteFrame = assets
                node.parent = iconNode
                node.setContentSize(25, 25)
            })


        }
    }

    onSelectItem(button) {
        this.addWeapon(this.randWeapon[button.node.index - 1])
        this.levelUp(button.node.num - 1)
    }

}
