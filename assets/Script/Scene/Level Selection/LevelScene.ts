const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Layout)
    LevelList: cc.Layout = null;

    @property(cc.Prefab)
    LevelData: cc.Prefab = null;

    @property(cc.Label)
    CountDown: cc.Label = null;

    @property(cc.Label)
    EventFlowRate: cc.Label = null;

    @property(cc.Label)
    MovingSpeed: cc.Label = null;

    @property(cc.Label)
    GoldReward: cc.Label = null;

    @property(cc.Label)
    Lucky: cc.Label = null;

    @property(cc.Label)
    ExpReward: cc.Label = null;

    @property(cc.Label)
    EnemyHP: cc.Label = null;


    start () {

        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        console.log("GlobalDataObject : ", GlobalDataObject)

        console.log("GlobalDataObject[LevelList] : ",GlobalDataObject["LevelList"])
        let LevelConfigList = GlobalDataObject["LevelList"];
        let size = LevelConfigList.length;

        console.log("原本的高度为:",this.LevelList.node.height)
        console.log("LevelData的高度为:",this.LevelData.data.getContentSize().height)
        // 每层间隔5 上下间隔5
        this.LevelList.node.height = (size + 1) * 5 + size * this.LevelData.data.getContentSize().height;
        console.log("修改后的的高度为:",this.LevelList.node.height)

        // 初始化
        for(let index = 0;index < size ;index++){
            let LevelData = cc.instantiate(this.LevelData)
            let Data = LevelConfigList[index];
            console.log("Data:",Data)

            cc.loader.loadRes(Data["IMG"], cc.SpriteFrame, (err: any, spriteFrame) => {
                cc.find("Left Layout",LevelData).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            // 获取组件的layout
            cc.find("Left Layout/LevelName Label",LevelData).getComponent(cc.Label).string = Data["Name"]

            cc.find("Right Layout/Level Introduce Label",LevelData).getComponent(cc.Label).string = Data["Introduce"]

            LevelData.parent = this.LevelList.node

            LevelData.getComponent('LevelChoice').init(String(Data["ID"]));
        }
    }

    LoadHeroData(HeroID:number){
        console.log("准备开始加载关卡（ID:",HeroID,"）的数据")

        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        let LevelConfigList = GlobalDataObject["LevelList"];
        for(let index = 0;index<LevelConfigList.length;index++){
            if(LevelConfigList[index]["ID"] == HeroID){
                // console.log("LevelConfigList[index]:",LevelConfigList[index])
                this.CountDown.getComponent(cc.Label).string = LevelConfigList[index]["CountDown"]
                this.EventFlowRate.getComponent(cc.Label).string = "X"+ LevelConfigList[index]["EventFlowRate"].toString()
                this.MovingSpeed.getComponent(cc.Label).string = this.ConvertNum(LevelConfigList[index]["MovingSpeed"])
                this.GoldReward.getComponent(cc.Label).string = this.ConvertNum(LevelConfigList[index]["GoldReward"])
                this.Lucky.getComponent(cc.Label).string = this.ConvertNum(LevelConfigList[index]["Lucky"])
                this.ExpReward.getComponent(cc.Label).string = this.ConvertNum(LevelConfigList[index]["ExpReward"])
                this.EnemyHP.getComponent(cc.Label).string = this.ConvertNum(LevelConfigList[index]["EnemyHP"])

                break;
            }
        }
    }

    ConvertNum(num:number){
        if(num>=0){
            return "+"+num.toString()+"%";
        }
        return num.toString()+"%";
    }

    // update (dt) {}
}
