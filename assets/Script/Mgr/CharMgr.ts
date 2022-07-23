import Char from "../Char/Char";
const { ccclass, property } = cc._decorator;

@ccclass
export default class CharMgr {
    protected static _instance: CharMgr = null;
    private _mapChar: Map<string, Char> = new Map();
    private _mapCharById: Map<string, cc.Node> = new Map();

    CharData = {
        ['HeroTest']: {
            image: 'Char/HeroStay1',
            animate: 'HeroMove1',
            initWeapon: 'DomainTest',
            maxHp: 100,
            recovery: 1,
            speed: 250,
            power: 0,
            coolDown: 1,
            bulletCount: 0,
            growth: 1,
            luckly: 20,
            magnet: 200,
            size: cc.size(100, 100)
        },

        ['Bee']: {
            animate: 'BeeMove',
            speed: 100,
            maxHp: 10,
            damage: 10,
            quality: 20,
            size: cc.size(68, 68),
        },
        ['Crow']: {
            animate: 'CrowMove',
            speed: 100,
            maxHp: 10,
            damage: 10,
            quality: 20,
            size: cc.size(68, 68),
        },
        ['Vine']: {
            animate: 'VineMove',
            speed: 100,
            maxHp: 10,
            damage: 10,
            quality: 20,
            size: cc.size(68, 68),
        }
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new CharMgr();
            this._instance._init();
        }
        return this._instance;
    }

    protected _init() {
    }

    public createChar(charType: string, name: string) {
        let node = new cc.Node(name)
        let char = node.addComponent(name)
        if (this.CharData[charType]) {
            let newData = Object.create(this.CharData[charType])
            char.data = newData
        }
        char.name = name
        this._mapCharById.set(node.uuid, node)
        this._mapChar.set(name, char)
        return char
    }

    public getCharByName(name: string) {
        return this._mapChar.get(name)
    }

    public releaseChar(uuid) {
        let node = this._mapCharById.get(uuid)
        if (!node) {
            return false
        }
        node.removeFromParent()
        this._mapCharById.delete(uuid)
        return true
    }
}
