import Char from "../Char/Char";
import MonsterLayer from "../Layer/MonsterLayer";
import { Data, randByWeight } from "../Tools/Tools";
import CharMgr from "./CharMgr";
import DataMgr from "./DataMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterMgr {

    private _mapMonsterById: Map<string, Char>
    static _instance: MonsterMgr = null
    monsterLayer: MonsterLayer

    // 临时数据
    randData = [
        {
            time: 0,
            interval: 0.3,
            maxMonster: 100,
            monsterData: [
                {
                    name: 'bcrow',
                    weight: 80,
                },
                {
                    name: 'bspider',
                    weight: 100
                },
            ],
        }
        // },
        // {
        //     time: 10,
        //     interval: 0.1,
        //     maxMonster: 200,
        //     monsterData: [
        //         {
        //             name: 'Crow',
        //             weight: 100,
        //         },
        //         {
        //             name: 'Bee',
        //             weight: 80,
        //         },
        //         {
        //             name: 'Vine',
        //             weight: 100
        //         },
        //     ],
        // },
    ]

    // 临时数据
    waveData:any

    waveTypeFunc = {
        Group: 'createGroup',
        Disperse: 'createDisperse',
        Circle: 'createCircle'
    }
    curRandData: any
    curWaveData: any
    randTween: any

    public static getInstance() {
        if (!this._instance) {
            this._instance = new MonsterMgr();
            this._instance._init();
        }
        return this._instance;
    }

    _init() {
        this._mapMonsterById = new Map()
        this.randData = Data.Config.GetConfig('waveEnemy')
        this.waveData = {}
    }

    public createMonster(type, name) {
        let monster = CharMgr.getInstance().createChar(type, name)
        this._mapMonsterById.set(monster.node.uuid, monster)
        return monster
    }

    public removeMonster(monster) {
        this._mapMonsterById.delete(monster.node.uuid)
        return CharMgr.getInstance().releaseChar(monster.node.uuid)
    }

    public getNearestMonsterPos(worldPos: cc.Vec2) {
        let nearestLen = 99999999
        let nearest: cc.Vec2
        this._mapMonsterById.forEach((char, number) => {
            let charPos = char.node.convertToWorldSpaceAR(cc.v2(0, 0))
            let len = worldPos.sub(charPos).len()
            if (len < nearestLen) {
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

        return this.monsterLayer.node.convertToNodeSpaceAR(worldPos).addSelf(pos)
    }

    // 添加怪物
    addMonster(monsterType: string, createNum: number, pos?: cc.Vec2) {
        for (let i = 0; i < createNum; i++) {
            let monster = MonsterMgr.getInstance().createMonster(monsterType, "Monster")
            monster.node.parent = this.monsterLayer.node
            monster.node.setPosition(pos || this.getCreatePos())
        }
    }

    setMonsterLayer(monsterLayer) {
        this.monsterLayer = monsterLayer
    }

    // 检测是否需要改变随机生成的逻辑
    checkRandomChange(curTime) {
        let self = MonsterMgr.getInstance()
        let keys = Object.keys(self.randData)
        for (let i = 0; i < keys.length; i++) {
            if (curTime != self.randData[i].time) {
                continue
            }
            self.curRandData = self.randData[i]
            if (self.randTween) {
                self.randTween.stop()
            }
            self.randTween =
                cc.tween(self.monsterLayer.node)
                    .repeatForever(
                        cc.tween()
                            .call(() => {
                                if (self._mapMonsterById.size >= self.curRandData.maxMonster) {
                                    return
                                }
                                let index = randByWeight(self.curRandData.monsterData)
                                let monsterData = self.curRandData.monsterData[index]
                                self.addMonster(monsterData.name, 1)
                            })
                            .delay(self.curRandData.interval || 1)
                    ).start()
        }
    }

    // 检测是否到达波次的时间
    checkWaveChange(curTime) {
        let self = MonsterMgr.getInstance()
        let keys = Object.keys(self.waveData)
        for (let i = 0; i < keys.length; i++) {
            if (curTime != self.waveData[i].time) {
                continue
            }
            self.curWaveData = self.waveData[i]
            let func = self[self.waveTypeFunc[self.curWaveData.type]]
            if (func && typeof (func) === 'function') {
                func.call(self, this.curWaveData.monsterData)
            }
        }
    }

    // 创建分散的敌人
    createDisperse(monsterData) {
        for (let i = 0; i < monsterData.length; i++) {
            let monster = monsterData[i]
            this.addMonster(monster.name, monster.count)
        }
    }

    // 创建抱团的敌人
    createGroup(monsterData) {
        for (let i = 0; i < monsterData.length; i++) {
            let circleCenter = this.getCreatePos()
            let monster = monsterData[i]
            for (let j = 0; j < monster.count; j++) {
                let diffX = (Math.random() - 0.5) * monster.count * 5
                let diffY = (Math.random() - 0.5) * monster.count * 5
                let diffPos = cc.v2(diffX, diffY)
                this.addMonster(monster.name, 1, circleCenter.addSelf(diffPos))
            }
        }
    }

    // 创建包围的敌人
    createCircle(monsterData) {
        for (let i = 0; i < monsterData.length; i++) {
            let monster = monsterData[i]
            let step = Math.round(360 / monster.count)
            for (let j = 0; j < monster.count; j++) {
                let winSize = cc.winSize
                let r = Math.sqrt(winSize.width * winSize.width + winSize.height * winSize.height) / 2
                let theta = j * step
                // 将角度转换为弧度
                let radian = cc.misc.degreesToRadians(theta)
                // 一个水平向右的对比向量
                let comVec = cc.v2(0, 1);
                // 将对比向量旋转给定的弧度返回一个新的向量
                let dirVec = comVec.rotate(-radian);
                let pos = dirVec.mulSelf(r)
                let hero = CharMgr.getInstance().getCharByName("Hero")
                let worldPos = hero.getWorldPos()
                let createPos = this.monsterLayer.node.convertToNodeSpaceAR(worldPos).addSelf(pos)
                this.addMonster(monster.name, 1, createPos)
            }
        }
    }

    // 开始生成怪物
    beginCreateMonster(curTime) {
        // 定时生成怪物
        this.checkRandomChange(curTime)
        // 按波次生成怪物
        this.checkWaveChange(curTime)
    }

    pause() {
        this.randTween.stop()
        this._mapMonsterById.forEach((monster, key)=>{
            monster.getComponent('Monster').pause()
        })
    }

    resume() {
        this.randTween.start()
        this._mapMonsterById.forEach((monster, key)=>{
            monster.getComponent('Monster').resume()
        })
    }

}
