const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.RichText)
    Situation: cc.RichText = null;

    @property(cc.Label)
    Describe: cc.Label = null;

    @property(cc.Sprite)
    AchieveIcon: cc.Sprite = null;

    @property
    AchieveIconNum: number = -1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on(cc.Node.EventType.MOUSE_UP, this.ShowAchieveDetail, this);

    }

    onDestroy(){
        this.node.off(cc.Node.EventType.MOUSE_UP, this.ShowAchieveDetail, this);
    }

    ShowAchieveDetail (event) {
        console.log("选择的成就描述为"+this.Describe);
        // 得到全局控制脚本
        let AchieveScene = cc.find("Canvas/Main Layout/AchieveSystem/Data").getComponent("AchieveScene");
        AchieveScene.LoadAchieveData(this.Situation.string, this.Describe.string, this.AchieveIconNum)
    }

    init(Situation:string, Describe:string, AchieveIconNum:number){
        this.Situation.string =Situation
        this.Describe.string =Describe
        this.AchieveIconNum = AchieveIconNum
    }

    // update (dt) {}
}
