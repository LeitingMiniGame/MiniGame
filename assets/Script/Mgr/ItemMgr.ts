import Item from "../Char/Item/Item";
import CharMgr from "./CharMgr";
import MapMgr from "./MapMgr";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemMgr {
    protected static _instance: ItemMgr = null;
    private _mapItemById: Map<string, Item> = new Map();

    itemDatas = {
        ['Coin1'] : {
            comType: 'Coin',
            icon: 'Grapes',
            value: 1,
            size: cc.size(40, 20)
        }
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new ItemMgr();
            this._instance._init();
        }
        return this._instance;
    }

    _init() {

    }

    tryCreateItem(wordPos) {
        let s = Math.random()
        let itemName = 'Coin1'
        let itemData = this.itemDatas[itemName]
        if (s >= 0) {
            let itemLayer = MapMgr.getInstance().getLayerByName('ItemLayer')
            let item = this.createItem(itemData.comType, 'Item')
            item.data = itemData
            item.node.parent = itemLayer
            item.node.setPosition(itemLayer.convertToNodeSpaceAR(wordPos))
        }
    }

    createItem(charType: string, name: string) {
        let item = CharMgr.getInstance().createChar(charType, name)
        this._mapItemById.set(item.uuid, item)
        return item
    }

    removeItem(item) {
        this._mapItemById.delete(item.uuid)
        return CharMgr.getInstance().releaseChar(item.node.uuid)
    }

    getItemByName(name: string) {
        return this._mapItemById.get(name)
    }
}
