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

    createInterval = 1
    createNum = 3

    private _mapCharById:Map<number, Char> = new Map();
    
    static _instance:MonsterMgr = null;
    static monsterCounter:number = 0
    monsterLayer: any;

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

    // 获取生成位置
    getCreatePos() {
        let winSize = cc.winSize
        let rMin = Math.sqrt(winSize.width * winSize.width + winSize.height * winSize.height) / 2
        let theta = Math.random() * 360
        let r = Math.random() * rMin + rMin

        // 将角度转换为弧度
        let radian = cc.misc.degreesToRadians(theta)
        // 一个水平向右的对比向量
        let comVec = cc.v2(0, 1);
        // 将对比向量旋转给定的弧度返回一个新的向量
        let dirVec = comVec.rotate(-radian);
        let pos = dirVec.mulSelf(r)
        let hero = CharMgr.getInstance().getCharByName("Hero")
        let worldPos = hero.getWorldPos()

        return this.monsterLayer.convertToNodeSpaceAR(worldPos).addSelf(pos)
    }

    // 添加怪物
    addMonster() {
        for (let i = 0; i < this.createNum; i++) {
            let monster = MonsterMgr.getInstance().createMonster("Bee", "Bee")
            monster.node.parent = this.monsterLayer
            monster.node.setPosition(this.getCreatePos())
        }
    }

    // 开始生成怪物
    beginCreateMonster(monsterLayer){
        this.monsterLayer = monsterLayer
        cc.tween(monsterLayer)
        .repeatForever(
            cc.tween()
                .call(() => {
                    MonsterMgr.getInstance().addMonster()
                })
                .delay(this.createInterval)
        )
        .start()
    }

}
