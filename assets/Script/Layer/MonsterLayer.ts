import MonsterMgr from "../Mgr/MonsterMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterLayer extends cc.Component {
    start(): void {
        MonsterMgr.getInstance().beginCreateMonster(this.node)
    }
}
