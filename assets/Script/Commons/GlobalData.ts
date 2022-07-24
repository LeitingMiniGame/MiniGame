import JsonManager from "../Mgr/JsonManager";
import {Data} from "../Tools/Tools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    Data: Object = null;

    @property(cc.Prefab)
    CommonPop: cc.Prefab = null;

    onLoad () {
        //添加DataNode为常驻节点
        this.Data = new Object();
        cc.game.addPersistRootNode(this.node);

        // 加载全局可修改数据
        this.LoadJson("SetUp");
        this.LoadJson("AchieveList");
        this.LoadJson("RoleList");
        this.LoadJson("LevelList");
        this.LoadJson("ProductList");
        this.LoadJson("lineweapon");
        this.LoadJson("weapon");

        // 加载全局静态数据
        Data.Config.Init();
    }

    start () {

    }

    LoadJson(para:string){
        JsonManager.getInstance().LoadJson("Config/"+para,this.RegisterJson,[para])
    }

    RegisterJson(Paras:any[]){

        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        let JsonName:string = Paras[1][0]
        let JsonObj:Object = Paras[0]
        console.log("JsonName:",JsonName)
        console.log("JsonObj:",JsonObj)
        GlobalDataObject[JsonName] = JsonObj
        console.log("GlobalDataObject:",GlobalDataObject)
    }

    onDestroy(){
        console.warn("游戏即将结束,开始保存数据")
        JsonManager.getInstance().SaveDB();
    }

    // update (dt) {}
}
