import Item from "../Char/Item/Item";
import { randByWeight } from "../Tools/Tools";
import CharMgr from "./CharMgr";
import MapMgr from "./MapMgr";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemMgr {
    protected static _instance: ItemMgr = null;
    private _mapItemById: Map<string, Item> = new Map();

    //// 临时数据
    itemDatas = {
        ['Coin1']: {
            comType: 'Coin',
            icon: 'Grapes',
            value: 1,
            size: cc.size(40, 20)
        },
        ['Coin2']: {
            comType: 'Coin',
            icon: 'Grapes',
            value: 10,
            size: cc.size(40, 20)
        },
        ['Exp1']: {
            comType: 'Exp',
            icon: 'Clover',
            value: 1,
            size: cc.size(40, 20)
        }
    }

    //// 临时数据
    itemPool = [
        {
            time: 0,
            itemWeights: [
                {
                    name: 'Coin1',
                    weight: 100,
                },
                {
                    name: 'Exp1',
                    weight: 100
                }
            ],
        },
        {
            time: 60,
            itemWeights: [
                {
                    name: 'Coin1',
                    weight: 100,
                },
                {
                    name: 'Coin2',
                    weight: 100,
                },
                {
                    name: 'Exp1',
                    weight: 100
                }
            ],
        },
    ]


    isPause: boolean;
    curItemWeight: any

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
        if (s <= 0.6) {
            let index = randByWeight(this.curItemWeight)
            let itemName = this.curItemWeight[index].name
            let itemData = this.itemDatas[itemName]
            let itemLayer = MapMgr.getInstance().getLayerByName('ItemLayer')
            let item = this.createItem(itemData.comType, itemData.comType)
            item.data = itemData
            item.node.parent = itemLayer
            item.node.setPosition(itemLayer.convertToNodeSpaceAR(wordPos))
        }
    }

    createItem(charType: string, name: string) {
        let item = CharMgr.getInstance().createChar(charType, name)
        item.isPause = this.isPause
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

    pause() {
        this.isPause = true
        this._mapItemById.forEach((item, key) => {
            item.getComponent('Item').pause()
        });
    }

    resume() {
        this.isPause = false
        this._mapItemById.forEach((item, key) => {
            item.getComponent('Item').resume()
        });
    }

    updateItemPool(time) {
        for (let i = 0; i < this.itemPool.length; i++) {
            let itemData = this.itemPool[i]
            if (time == itemData.time) {
                this.curItemWeight = itemData.itemWeights
                break
            }
        }
    }
}
