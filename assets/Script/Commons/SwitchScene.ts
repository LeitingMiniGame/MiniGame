import JsonManager from "../Mgr/JsonManager";
import PopupManager from "../Mgr/PopupManager";
import ConfirmPopup, { ConfirmPopupOptions } from "./ConfirmPopup"

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    // }

    start () {
        // cc.director.preloadScene("ControlSystem", function () {
        //     console.log("控制界面预加载好了");
        // });
    }

    SwitchToSetUp(){

        this.SwitchToControl("SetUp")
        // cc.director.loadScene('SetUp', function(){
        //     console.log("切换到设置界面啦");
        // });
    }

    SwichToAchieve(){
        this.SwitchToControl("AchieveSystem")
    }

    SwichToRoleChoice(){
        this.SwitchToControl("RoleChoice")
    }

    SwichToLevelSelection(){
        this.SwitchToControl("LevelSelection")
    }

    SwichToShop(){
        this.SwitchToControl("Shop")
    }

    private SwitchToControl(Para:string){
        let GlobalData = cc.director.getScene().getChildByName("GlobalData").getComponent("GlobalData");
        let GlobalDataObj:object = GlobalData.Data;
        //设置DataNode要传递的数据
        if(!GlobalDataObj){
            console.log("GlobalData.Data为空");
            return;
        }
        GlobalDataObj["FunctionalScene"] = Para;
        console.log("SwitchToControl GlobalDataObj : ",GlobalDataObj)

        // 切换到系统
        cc.director.loadScene("ControlSystem");
    }

    /** 根据数据Temp数据库中记录的PreviousScene标记返回上一个场景 */
    SwitchToPreviousScene(){
        if(this.IsGaming()){
            ////------------- 玩家正在游戏中，需要判断返回哪个场景，后续完成
            cc.director.loadScene('Main', function(){
                console.log("切换到游戏界面啦");
            });
            return;
        }

        console.log("运行到SwitchToPreviousScene");

        // 否则说明要回到首页
        cc.director.loadScene('HomePage', function(){
            console.log("切换到初始界面啦");
        });
    }

    /** 返回是否在游戏中 */
    IsGaming(){
        return JsonManager.getInstance().hasTemp("IsGaming");
    }

    /** 删除存档，慎重使用 */
    DeleteArchive(){
        console.log("准备跳出删除存档确认框1")
        let ConfirmPopupOp:ConfirmPopupOptions = {
            title: "删除存档",
            content: "你确定要删除存档数据嘛(一旦删除无法恢复)",
            confirmCallback: this.do_DeleteArchive_OK,
            cancelCallback: this.do_DeleteArchive_Cancel,
        };

        console.log("准备跳出删除存档确认框2")
        const params = {
            mode: PopupManager.CacheMode.Once,
            /** 立刻展示（将会挂起当前展示中的弹窗） */
            immediately : true
        };

        console.log("准备跳出删除存档确认框3")
        PopupManager.show('Prefab/UI/Popup', ConfirmPopupOp, params);
        console.log("准备跳出删除存档确认框4")
        // let ShowResult:
        // console.log("准备跳出删除存档确认框结果:",PopupManager.ShowResult())
    }

    /** 执行确认删除存档逻辑 */
    do_DeleteArchive_OK(){
        console.log("开始删除存档")
        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        console.log("存档删除前 GlobalDataObject : ",GlobalDataObject)
        console.log("存档删除前 JsonManager : ",JsonManager.getInstance().queryAll())
        GlobalDataObject = null
        JsonManager.getInstance().clear();
        console.log("存档已删除,开始保存数据")
        console.log("存档删除后 GlobalDataObject : ",GlobalDataObject)
        console.log("存档删除后 JsonManager : ",JsonManager.getInstance().queryAll())
        JsonManager.getInstance().SaveDB();

        cc.director.loadScene('HomePage', function(){
            console.log("切换到初始界面啦");
        });

    }

    /** 执行取消删除存档逻辑 */
    do_DeleteArchive_Cancel(){
        console.log("取消删除存档")
    }
    // update (dt) {}
}
