// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Char from "../Char/Char";
import CharMgr from "./CharMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MonsterMgr extends CharMgr{
    private _mapCharById:Map<number, Char> = new Map();

    static _instance:MonsterMgr = null;

    public static getInstance(){
        if(!this._instance){
            this._instance = new MonsterMgr();
            this._instance._init();
        }
        return this._instance;
    }


    public createMonster(type, name){
        let monster = this.createChar(type, name)
        monster.id = this.GenNonDuplicateID()
        monster.name = name
        this._mapCharById.set(monster.id, monster)
        return monster
    }
}
