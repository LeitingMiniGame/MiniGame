import MonsterMgr from "../Mgr/MonsterMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterLayer extends cc.Component {
    onLoad(): void {
        MonsterMgr.getInstance().setMonsterLayer(this)
    }

    start(): void{

    }
}
