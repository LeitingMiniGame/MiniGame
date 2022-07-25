import JsonManager from "../Mgr/JsonManager";
import { OpenPopups, Data } from "../Tools/Tools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    // }


    @property(cc.Node)
    ZZRNode: cc.Node = null;

    start () {
        // cc.director.preloadScene("ControlSystem", function () {
        //     //console.log("控制界面预加载好了");
        // });

    }

    SwitchScene(event, Para:string){
        // console.log("准备跳转到",Para,"界面")
        if(Para == "SettlementSystem"){
            cc.director.loadScene('SettlementSystem', function(){
                console.log("切换到结算界面啦");
                return
            });
            return
        }
        this.SwitchToControl(Para)
        return
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

        // 切换到系统
        cc.director.loadScene("ControlSystem");
    }

    /** 暂时用不到 根据数据Temp数据库中记录的PreviousScene标记返回上一个场景 */
    SwitchToPreviousScene(){
        if(this.IsGaming()){
            //------------- 玩家正在游戏中，需要判断返回哪个场景，后续完成
            cc.director.loadScene('Main', function(){
                console.log("切换回游戏界面");
            });
            return;
        }

        // 否则说明要回到首页
        cc.director.loadScene('HomePage', function(){
            console.log("切换到初始界面啦");
        });
    }

    /** 返回是否在游戏中 */
    IsGaming(){
        return JsonManager.getInstance().hasTemp("IsGaming");
    }

    /** 删除存档，慎重使用 ， 暂时不开放此功能*/
    DeleteArchive(){
        OpenPopups(1,"你确定要删除存档数据嘛(一旦删除无法恢复)",this.do_DeleteArchive_OK,this.do_DeleteArchive_Cancel);
    }

    /** 执行确认删除存档逻辑 */
    do_DeleteArchive_OK(){
        console.log("开始删除存档")
        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        GlobalDataObject = null // 可能是这里导致的报错
        JsonManager.getInstance().clear();
        JsonManager.getInstance().SaveDB();

        OpenPopups(2,"存档删除成功",function(){
            cc.director.loadScene('HomePage', function(){
                console.log("切换到初始界面啦");
            });
        });

    }

    OpenZhiZuoRen(){
        cc.find("Canvas/CommonPopups").active = true;
    }
    CloseZhiZuoRen(){
        cc.find("Canvas/CommonPopups").active = false;
    }

    /** 执行取消删除存档逻辑 */
    do_DeleteArchive_Cancel(){
        console.log("取消删除存档")
    }

    // update (dt) {}
}
