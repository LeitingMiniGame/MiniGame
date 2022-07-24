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
        cc.debug.setDisplayStats(false);

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
        this.LoadJson("enemy");
        this.LoadJson("levelup")
        this.LoadJson("itemDatas")
        this.LoadJson("wavedrop")
        this.LoadJson("waveEnemy")
        this.LoadJson("attribute")
        this.LoadJson("event")


        // 加载全局静态数据
        Data.Config.Init();

        // Data.Hero.Init();

        cc.resources.load("Radio/Home", cc.AudioClip, (error, assets:cc.AudioClip)=>{
            if(error){
                return
            }
            cc.audioEngine.playMusic(assets, true);
        })
    }
    InitGame(){
        // 玩家基础数据
        let Basic = Data.Gamer.query("basic");
        if(!Basic)
        {
            //console.log("开始初始化玩家基础数据")
            Basic = new Object();
            Basic["Coin"] = 10000;// 初始金币设为100
            Data.Gamer.set("basic",Basic);
        }else{
            Basic["Coin"] = 10000;// 初始金币设为100
            Data.Gamer.set("basic",Basic);
        }

        // 玩家道具信息
        let BufferList = Data.Gamer.query("buffer");
        if(!BufferList){
            // 初始化道具
            //console.log("开始初始化道具")
            let ProductList = Data.Config.GetConfig("ProductList");
            if(!ProductList){
                //console.log("初始化道具失败，道具配置未加载完成")
                return
            }
            //console.log("重新生成用户道具信息")
            BufferList = new Object();

            //console.log("ProductList",ProductList)
            //console.log("Typeof ProductList",typeof ProductList)
            let bufferConfigArray = Object.values(ProductList)
            // 初始化用户拥有的道具配置
            for(let index = 0;index < bufferConfigArray.length ;index++){
                // 标记道具ID的等级
                BufferList[bufferConfigArray[index]["ID"]] = 0;// 设置等级为0
            }

            //console.log("BufferList：",BufferList)
            Data.Gamer.set("buffer",BufferList);
        }

    }
    start () {
        this.InitGame();
    }

    LoadJson(para:string){
        JsonManager.getInstance().LoadJson("Config/"+para,this.RegisterJson,[para])
    }

    RegisterJson(Paras:any[]){

        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        let JsonName:string = Paras[1][0]
        let JsonObj:Object = Paras[0]
        // //console.log("JsonName:",JsonName)
        // //console.log("JsonObj:",JsonObj)
        GlobalDataObject[JsonName] = JsonObj
        // //console.log("GlobalDataObject:",GlobalDataObject)
    }

    onDestroy(){
        console.warn("游戏即将结束,开始保存数据")
        JsonManager.getInstance().SaveDB();
    }

    // update (dt) {}
}
