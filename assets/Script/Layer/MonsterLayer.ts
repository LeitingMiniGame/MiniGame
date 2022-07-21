import CharMgr from "../Mgr/CharMgr";
import MonsterMgr from "../Mgr/MonsterMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterLayer extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    createInterval = 1
    createNum = 2

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
        return this.node.convertToNodeSpaceAR(worldPos).addSelf(pos)
    }

    addMonster() {
        for (let i = 0; i < this.createNum; i++) {
            let monster = MonsterMgr.getInstance().createMonster("Bee", "bee")
            monster.node.parent = this.node
            monster.node.setPosition(this.getCreatePos())
        }
    }

    start() {
        // 开始生成怪物
        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .call(() => this.addMonster())
                    .delay(this.createInterval)
            )
            .start()
    }

}
