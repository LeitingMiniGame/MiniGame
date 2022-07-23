import Item from "../Char/Item/Item";
import CharMgr from "./CharMgr";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemMgr {
    protected static _instance:ItemMgr = null;
    private _mapItem:Map<string, Item> = new Map();

    public static getInstance(){
        if(!this._instance){
            this._instance = new ItemMgr();
            this._instance._init();
        }
        return this._instance;
    }
    private _init() {

    }

    public createItem(charType:string, name:string){
        let item = CharMgr.getInstance().createChar(charType, name)
        this._mapItem.set(name, item)
        return item
    }

    public getItemByName(name:string){
        return this._mapItem.get(name)
    }

}
