const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    HeroID: string = "error";

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on(cc.Node.EventType.MOUSE_UP, this.ShowHeroDetail, this);
    }

    // update (dt) {}
    ShowHeroDetail (event) {
        //console.log("选择的英雄ID为"+this.HeroID);
        // 得到全局控制脚本
        let RoleChoiceScene = cc.find("Canvas/Main Layout/RoleSystem/Data").getComponent("RoleScene");
        RoleChoiceScene.LoadHeroData(parseInt(this.HeroID))
    }

    onDestroy(){
        this.node.off(cc.Node.EventType.MOUSE_UP, this.ShowHeroDetail, this);
    }

    init(ID:number){
        this.HeroID = String(ID)
    }
}
