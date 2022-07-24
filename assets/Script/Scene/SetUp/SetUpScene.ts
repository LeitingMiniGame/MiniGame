import JsonManager from "../../Mgr/JsonManager";
import {Data} from "../../Tools/Tools";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Slider)
    Sound: cc.Slider = null;

    @property(cc.Slider)
    Music: cc.Slider = null;

    @property(cc.Toggle)
    ShowJoystick: cc.Toggle = null;

    @property(cc.Toggle)
    ShowDamage: cc.Toggle = null;

    @property(cc.Toggle)
    FullScreen: cc.Toggle = null;

    GlobalDataObject:Object = null

    onLoad () {
        // 在这里初始化SetUp
        // 从常驻节点中获取配置信息

        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        if(!GlobalDataNote){
            console.warn("SetUp start 中 GlobalData 不存在")
            // 切换回主界面
            cc.director.loadScene('HomePage', function(){
                console.log("切换到初始界面啦");
            });
        }
        this.GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        if(!this.GlobalDataObject){
            console.warn("SetUp start 中 GlobalDataObject 不存在")
            // 切换回主界面
            cc.director.loadScene('HomePage', function(){
                console.log("切换到初始界面啦");
            });
        }
        console.warn(this.GlobalDataObject["SetUp"]);
        // if(!this.GlobalDataObject["SetUp"]){
        //     console.warn("SetUp start 中 GlobalDataObject.SetUp 不存在")

        //     // 切换回主界面
        //     cc.director.loadScene('HomePage', function(){
        //         console.log("切换到初始界面啦");
        //     });
        // }
        // console.log(this.GlobalDataObject);

        // 需要从用户数据中查找是否存在SetUp相关配置,若不存在则初始化用户数据
        if(!JsonManager.getInstance().has("SetUp")){
            // let SetUp = new Object();
            // SetUp["IsFullScreen"] = this.GlobalDataObject["SetUp"]["IsFullScreen"];
            // SetUp["IsShowDamage"] = this.GlobalDataObject["SetUp"]["IsShowDamage"];
            // SetUp["IsShowJoystick"] = this.GlobalDataObject["SetUp"]["IsShowJoystick"];
            // SetUp["Music"] = this.GlobalDataObject["SetUp"]["Music"];
            // SetUp["Sound"] = this.GlobalDataObject["SetUp"]["Sound"];
            JsonManager.getInstance().set("SetUp", this.GlobalDataObject["SetUp"])
            return;
        }

        // 运行到这里说明用户身上有过相关配置，无论是否与配置有出入，都将常驻节点中的配置信息更新为用户身上的配置
        // 这里是引用，所以以后更新常驻节点数据只需要调用JsonManager即可
        this.GlobalDataObject["SetUp"] = JsonManager.getInstance().query("SetUp");
        // console.log("SetUp：",JsonManager.getInstance().query("SetUp"))
        // console.log("GlobalDataObject：",this.GlobalDataObject)
        // 现在开始初始化界面

    }

    /**
     * 暂时没用到
     * 提供给子部件调用的，用于同步常驻节点和JsonManager中的数据
     */
    DataSync(Key:string,Value:any){
        let SetUp = JsonManager.getInstance().query("SetUp");
        console.log("同步前:SetUp：",SetUp)
        console.log("同步前:GlobalDataObject：",this.GlobalDataObject)
        this.GlobalDataObject["SetUp"][Key] = SetUp[Key]
        console.log("同步后:SetUp：",SetUp)
        console.log("同步后:GlobalDataObject：",this.GlobalDataObject)
    }

    ShowGlobalData(){
        // let IsShowDamage = Data.SetUp.IsShowDamage()
        // console.log("IsShowDamage : ",IsShowDamage)
        // console.log("IsFullScreen : ",Data.SetUp.IsFullScreen())
        // console.log("IsShowJoystick : ",Data.SetUp.IsShowJoystick())
        // console.log("Music : ",Data.SetUp.GetMusicNum())
        // console.log("Sound : ",Data.SetUp.GetSoundNum())


        // console.log("准备开始修改IsShowDamage")
        // IsShowDamage = true
        // console.log("修改IsShowDamage完毕")
        // console.log("IsShowDamage : ",Data.SetUp.IsShowDamage())

        // let SetUp =Data.Config.GetConfig("SetUp")
        // let AchieveList =Data.Config.GetConfig("AchieveList")
        // let LevelList =Data.Config.GetConfig("RoleList")
        // let ProductList =Data.Config.GetConfig("ProductList")
        // let lineweapon =Data.Config.GetConfig("lineweapon")
        // let weapon =Data.Config.GetConfig("weapon")
        // Data
        // console.log("SetUp : ",SetUp)
        // console.log("AchieveList : ",AchieveList)
        // console.log("LevelList : ",LevelList)
        // console.log("ProductList : ",ProductList)
        // console.log("lineweapon : ",lineweapon)
        // console.log("weapon : ",weapon)
    }

    onDestroy(){

        console.warn("设置完成,开始保存数据")
        JsonManager.getInstance().SaveDB();
    }
    // update (dt) {}
}
