
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    LevelID: string = "error";


    start () {
        this.node.on(cc.Node.EventType.MOUSE_UP, this.ShowHeroDetail, this);
    }

    // update (dt) {}
    ShowHeroDetail (event) {
        //console.log("选择的关卡ID为"+this.LevelID);
        // 得到全局控制脚本
        let RoleChoiceScene = cc.find("Canvas/Main Layout/LevelSelectionSystem/Data").getComponent("LevelScene");
        RoleChoiceScene.LoadHeroData(parseInt(this.LevelID))
    }

    onDestroy(){
        this.node.off(cc.Node.EventType.MOUSE_UP, this.ShowHeroDetail, this);
    }

    init(ID:number){
        this.LevelID = String(ID)
    }

    // update (dt) {}
}
