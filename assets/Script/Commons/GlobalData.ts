import JsonManager from "../Mgr/JsonManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    Data: Object = null;

    onLoad () {
        //添加DataNode为常驻节点
        this.Data = new Object();
        cc.game.addPersistRootNode(this.node);

        this.LoadJson("SetUp");
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
