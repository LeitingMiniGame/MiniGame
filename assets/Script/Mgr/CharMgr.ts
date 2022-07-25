import Char from "../Char/Char";
import { Data, deepCopyJson } from "../Tools/Tools";
const { ccclass, property } = cc._decorator;

@ccclass
export default class CharMgr {
    protected static _instance: CharMgr = null;
    private _mapChar: Map<string, Char> = new Map();
    private _mapCharById: Map<string, cc.Node> = new Map();

    CharData: any
    HeroData: any

    public static getInstance() {
        if (!this._instance) {
            this._instance = new CharMgr();
            this._instance._init();
        }
        return this._instance;
    }

    public static releaseInstance() {
        if (this._instance) {
            this._instance = undefined
        }
    }

    protected _init() {
        this.HeroData = deepCopyJson(Data.Gamer.query_Temp("Role"))

        let enemyData = Data.Config.GetConfig("enemy")
        this.CharData = {[this.HeroData.name]:this.HeroData}
        this.CharData = Object.assign(this.CharData, enemyData);
    }

    public createChar(charType: string, name: string) {
        let node = new cc.Node(name)
        let char = node.addComponent(name)
        if (this.CharData[charType]) {
            let newData = deepCopyJson(this.CharData[charType])
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
