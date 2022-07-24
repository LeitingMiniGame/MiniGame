const {ccclass, property} = cc._decorator;
import { OpenPopups, Data } from "../../Tools/Tools";

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    AchieveSystem: cc.Prefab = null;

    @property(cc.Prefab)
    RoleSystem: cc.Prefab = null;

    @property(cc.Prefab)
    LevelSystem: cc.Prefab = null;

    @property(cc.Prefab)
    SetUpSystem: cc.Prefab = null;

    @property(cc.Prefab)
    ShopSystem: cc.Prefab = null;

    @property(cc.Layout)
    MainLayout: cc.Layout = null;

    @property(cc.Button)
    CloseBtn: cc.Button = null;

    GlobalDataNote:cc.Node = null;
    GlobalDataObject:cc.Node = null;


    onLoad(){
        console.log("Control要onLoad啦")
        console.log("准备开始获取常驻节点")


        // 在这里寻找金币的数量
        let GoldCoinNode = cc.find("Canvas/Main Layout/Top Layout/Gold coin/Coin Num");
        console.log("金币数节点： ", GoldCoinNode);
        let Basic = Data.Gamer.query("basic");
        GoldCoinNode.getComponent(cc.Label).string = Basic["Coin"]

        this.GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        if(!this.CheckGlobalNode())
            return;

        this.GlobalDataObject = this.GlobalDataNote.getComponent("GlobalData").Data;
        if(!this.CheckGlobalObject())
            return;

        if(!this.CheckGlobalObjectScenePara())
            return;


    }


    onEnable(){
        console.log("Control要onEnable啦")
    }

    start () {
        console.log("Control要start啦")
        if(!this.CheckGlobal())
            return;

        switch (this.GlobalDataObject["FunctionalScene"]) {
            case "AchieveSystem":
                this.OpenAchieveSystem();
                break;
            case "RoleChoice":
                this.OpenRoleSystem();
                break;
            case "SetUp":
                this.OpenSetUpSystem();
                break;
            case "LevelSelection":
                this.OpenLevelSystem();
                break;
            case "Shop":
                    this.OpenShop();
                    break;
            default:
                break;
        }
        // this.OpenAchieveSystem();
    }

    private OpenShop(){
        if(!this.SetUpSystem){
            console.warn("商店系统挂载异常");
            return;
        }

        let ShopSystem = cc.instantiate(this.ShopSystem)
        ShopSystem.parent =this.MainLayout.node
        ShopSystem.setPosition(cc.v2(0,0))
    }

    private OpenSetUpSystem(){
        if(!this.SetUpSystem){
            console.warn("设置系统挂载异常");
            return;
        }

        let SetUpSystem = cc.instantiate(this.SetUpSystem)
        SetUpSystem.parent =this.MainLayout.node
        SetUpSystem.setPosition(cc.v2(0,0))
    }

    private OpenLevelSystem(){
        if(!this.AchieveSystem){
            console.warn("关卡选择系统挂载异常");
            return;
        }

        let LevelSystem = cc.instantiate(this.LevelSystem)
        LevelSystem.parent =this.MainLayout.node
        LevelSystem.setPosition(cc.v2(0,0))
    }

    private OpenRoleSystem(){
        if(!this.AchieveSystem){
            console.warn("人物选择系统挂载异常");
            return;
        }

        let RoleSystem = cc.instantiate(this.RoleSystem)
        RoleSystem.parent =this.MainLayout.node
        RoleSystem.setPosition(cc.v2(0,0))
    }

    private OpenAchieveSystem(){
        if(!this.AchieveSystem){
            console.warn("成就系统挂载异常");
            return;
        }

        let AchieveSystem = cc.instantiate(this.AchieveSystem)
        AchieveSystem.parent =this.MainLayout.node
        AchieveSystem.setPosition(cc.v2(0,0))
        //this.MainLayout.node.insertChild(AchieveSystem,2);
    }

    onDisable(){
        console.log("Control要被关闭啦")
    }

    onDestroy(){
        if(!this.GlobalDataObject["FunctionalScene"])
            this.GlobalDataObject["FunctionalScene"] = null
        console.log("Control要被销毁啦")
    }

    /** 检查全局数据是否存在 */
    CheckGlobal(){
        if(!this.CheckGlobalNode())
            return false;
        if(!this.CheckGlobalObject())
            return false;
        if(!this.CheckGlobalObjectScenePara())
            return false;
        console.warn("CheckGlobal this.GlobalDataObject SetUp: ",this.GlobalDataObject["SetUp"])
        return true;
    }

     /** 检查常驻节点数据对象是否存在 */
     CheckGlobalObjectScenePara(){
        if(!this.GlobalDataObject["FunctionalScene"]){
            console.warn("GlobalData.Data.FunctionalScene参数异常:",this.GlobalDataObject["FunctionalScene"]);

            // 切换回主界面
            cc.director.loadScene('HomePage', function(){
                console.log("切换到初始界面啦");
            });
            return false;
        }
        return true;
    }

     /** 检查常驻节点数据对象是否存在 */
     CheckGlobalObject(){
        if(!this.GlobalDataObject){
            console.warn("常驻节点数据对象异常");

            // 切换回主界面
            cc.director.loadScene('HomePage', function(){
                console.log("切换到初始界面啦");
            });

            return false;
        }
        return true;
    }

    /** 检查常驻节点是否存在 */
    CheckGlobalNode(){
        if(!this.GlobalDataNote){
            console.warn("常驻节点异常");

            // 切换回主界面
            cc.director.loadScene('HomePage', function(){
                console.log("切换到初始界面啦");
            });

            return false;
        }
        return true;
    }

    // Close(){

    //     if(!this.CheckGlobal())
    //         return;

    //     if(!this.GlobalDataObject["FunctionalScene"]){
    //         console.log("参数异常");
    //         return;
    //     }

    //     // 关闭关联的系统
    //     switch (this.GlobalDataObject["FunctionalScene"]) {
    //         case "AchieveSystem":
    //             this.CloseAchieveSystem();
    //             break;

    //         default:
    //             break;
    //     }

    //     // 切换回主界面
    //     cc.director.loadScene('HomePage', function(){
    //         console.log("切换到初始界面啦");
    //     });
    // }

    // CloseAchieveSystem(){
    //     if(!this.AchieveSystem){
    //         console.log("成就系统挂载异常");
    //         return;
    //     }

    //     let AchieveSystem = this.MainLayout.node.getChildByName("AchieveSystem");
    //     AchieveSystem.parent = null;
    //     AchieveSystem.destroy();
    // }


    // update (dt) {}
}
