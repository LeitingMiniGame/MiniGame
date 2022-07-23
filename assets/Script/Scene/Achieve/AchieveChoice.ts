const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    AchieveID: number = -1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on(cc.Node.EventType.MOUSE_UP, this.ShowAchieveDetail, this);

    }

    onDestroy(){
        this.node.off(cc.Node.EventType.MOUSE_UP, this.ShowAchieveDetail, this);
    }

    ShowAchieveDetail (event) {
        console.log("选择的成就ID:"+this.AchieveID);
        // 得到全局控制脚本
        let AchieveScene = cc.find("Canvas/Main Layout/AchieveSystem/Data").getComponent("AchieveScene");
        AchieveScene.LoadAchieveData(this.AchieveID)
    }

    init(AchieveID:number){
        this.AchieveID = AchieveID
    }

    // update (dt) {}
}
