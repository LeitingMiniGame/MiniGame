
import JsonManager from "../../Mgr/JsonManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MyCheckBox extends cc.Component {

    @property
    key: string = "";

    my_toggle: cc.Toggle = null;
    DB:JsonManager = null;
    // LIFE-CYCLE CALLBACKS:

    /**
     * 首先判断key是否存在，key就是在全局数据库中对应的数据，统一放在SetUp字段下
     */
    onLoad () {
        if(this.key == ""){
            console.warn(this.node.name,"中存在组件MyCheckBox发生异常: 未设置key");
            return false;
        }

        this.DB = JsonManager.getInstance();
        if(!this.DB.has("SetUp")){
            // 若没有相关设置则初始化
            this.DB.set("SetUp", new Object())
        }

        let SetUp = this.DB.query("SetUp");
        if(!SetUp.hasOwnProperty(this.key) || SetUp[this.key] == undefined){
            // 若没有相关设置则初始化
            SetUp[this.key] = true;
        }

        this.my_toggle = this.node.getComponent(cc.Toggle);
        this.my_toggle.isChecked = SetUp[this.key]==null?true:SetUp[this.key];
    }

    UpdateCheckStatus(){
        //console.log(this.node.name,"勾选框被改变了:",this.my_toggle.isChecked);
        this.SetStatus(this.my_toggle.isChecked)
    }

    SetStatus(IsCheck:boolean){

        let SetUp = this.DB.query("SetUp");
        SetUp[this.key] = IsCheck;

        //console.log("SetUp[",this.key,"]:",SetUp[this.key]);

        //console.log("Data.SetUp[",this.key,"]",cc.director.getScene().getChildByName("GlobalData").getComponent("GlobalData").Data.SetUp[this.key])

    }
    start () {

    }

    // update (dt) {}
}
