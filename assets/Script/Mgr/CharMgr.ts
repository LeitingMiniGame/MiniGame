// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Char from "../Char/Char";
const {ccclass, property} = cc._decorator;

@ccclass
export default class CharMgr {
    protected static _instance:CharMgr = null;
    private _mapChar:Map<string, Char> = new Map();

    public static getInstance(){
        if(!this._instance){
            this._instance = new CharMgr();
            this._instance._init();
        }
        return this._instance;
    }


    protected _init(){  
    }


    public GenNonDuplicateID(){
        return Math.random().toString()
    }

    public createChar(charType:string, name:string){
        let node = new cc.Node
        let char = node.addComponent(charType)
        char.name = name
        this._mapChar.set(name, char)
        return char
    }

    public getCharByName(name:string){
        return this._mapChar.get(name)
    }

}
