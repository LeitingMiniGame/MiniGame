const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    AchieveSystem: cc.Prefab = null;

    @property(cc.Layout)
    MainLayout: cc.Layout = null;

    @property(cc.Button)
    CloseBtn: cc.Button = null;

    start () {
        // let GlobalData = cc.director.getScene().getChildByName("GlobalData").getComponent("GlobalData");
        // let Para = GlobalData.FunctionalScene
        // if(!Para){
        //     console.log("参数异常");
        //     return;
        // }
        // switch (Para) {
        //     case "AchieveSystem":
        //         this.OpenAchieveSystem();
        //         break;

        //     default:
        //         break;
        // }
        this.OpenAchieveSystem();
    }

    Close(){
        let GlobalData = cc.director.getScene().getChildByName("GlobalData").getComponent("GlobalData");
        let Para = GlobalData.FunctionalScene
        if(!Para){
            console.log("参数异常");
            return;
        }

        // 关闭关联的系统
        switch (Para) {
            case "AchieveSystem":
                this.CloseAchieveSystem();
                break;

            default:
                break;
        }

        // 切换回主界面
        cc.director.loadScene('HomePage', function(){
            console.log("切换到初始界面啦");
        });
    }
    OpenAchieveSystem(){
        if(!this.AchieveSystem){
            console.log("成就系统挂载异常");
            return;
        }

        let AchieveSystem = cc.instantiate(this.AchieveSystem)
        AchieveSystem.parent =this.MainLayout.node
        AchieveSystem.setPosition(cc.v2(0,0))
        //this.MainLayout.node.insertChild(AchieveSystem,2);
    }

    CloseAchieveSystem(){
        if(!this.AchieveSystem){
            console.log("成就系统挂载异常");
            return;
        }

        let AchieveSystem = this.MainLayout.node.getChildByName("AchieveSystem");
        AchieveSystem.parent = null;
        AchieveSystem.destroy();
    }

    // update (dt) {}
}
