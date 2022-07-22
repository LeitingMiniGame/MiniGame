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
    static monsterCounter:number = 0

    public static getInstance(){
        if(!this._instance){
            this._instance = new MonsterMgr();
            this._instance._init();
        }
        return this._instance;
    }


    public createMonster(type, name){
        let monster = this.createChar(type, name)
        monster.id = MonsterMgr.monsterCounter++
        monster.name = name
        this._mapCharById.set(monster.id, monster)
        return monster
    }

    public removeMonster(monster){
        this._mapCharById.delete(monster.id)
        monster.node.removeFromParent()
    }

    public getNearestMonsterPos(worldPos:cc.Vec2){
        let nearestLen = 99999999
        let nearest:cc.Vec2
        this._mapCharById.forEach((char, number) => {
            let charPos = char.node.convertToWorldSpaceAR(cc.v2(0, 0))
            let len = worldPos.sub(charPos).len()
            if(len < nearestLen){
                nearestLen = len
                nearest = charPos
            }
        });
        return nearest
    }
}
