const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.RichText)
    CurrentNum: cc.RichText = null;

    @property(cc.RichText)
    TotalNum: cc.RichText = null;

    @property(cc.Sprite)
    AchieveIcon: cc.Sprite = null;

    @property(cc.RichText)
    AchieveName: cc.RichText = null;

    @property(cc.RichText)
    AchieveCondition: cc.RichText = null;

    @property(cc.RichText)
    AchieveContent: cc.RichText = null;

    @property(cc.Layout)
    AchieveList: cc.Layout = null;

    @property(cc.Prefab)
    Achieve: cc.Prefab = null;


    onLoad(){
        //console.log("AchieveScene要onLoad啦")

    }


    onEnable(){
        //console.log("AchieveScene要onEnable啦")
    }

    start () {
        //console.log("AchieveScene要start啦")

        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        //console.log("GlobalDataObject : ", GlobalDataObject)

        //console.log("GlobalDataObject[AchieveList] : ",GlobalDataObject["AchieveList"])
        let AchieveConfigList = GlobalDataObject["AchieveList"];
        let size = AchieveConfigList.length;
        // //console.log("原本的高度为:",this.AchieveList.node.height)
        // //console.log("achieve layout的高度为:",this.Achieve.data.getContentSize().height)
        // 每个组件间间隔5 上下隔开5 所以一共增加了size+1个5
        this.AchieveList.node.height = (this.Achieve.data.getContentSize().height+5) * size +5;
        // //console.log("修改后的的高度为:",this.AchieveList.node.height)

        // this.CurrentNum // 需要获取玩家数据
        this.TotalNum.getComponent(cc.RichText).string = AchieveConfigList.length.toString()

        for(let index = 0;index < size ;index++){
            let Achieve = cc.instantiate(this.Achieve)
            let Data = AchieveConfigList[index];
            //console.log("Data:",Data)

            //console.log("Achieve:",Achieve)
            cc.find("Situation",Achieve).getComponent(cc.RichText).string = Data["IsLock"]==true?"未解锁":"已解锁";

            cc.find("Describe",Achieve).getComponent(cc.Label).string = Data["Describe"]

            cc.loader.loadRes(Data["Icon"], cc.SpriteFrame, (err: any, spriteFrame) => {
                cc.find("Achieve Icon",Achieve).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            Achieve.parent = this.AchieveList.node

            Achieve.getComponent("AchieveChoice").init(Data["ID"]);
        }
    }

    onDisable(){
        //console.log("AchieveScene要被关闭啦")
    }

    onDestroy(){
        //console.log("AchieveScene要被销毁啦")
    }

    LoadAchieveData(AchieveID:number){
        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        let AchieveConfigList = GlobalDataObject["AchieveList"];

        for(let index = 0;index<AchieveConfigList.length;index++){
            if(AchieveConfigList[index]["ID"] == AchieveID){
                let Data = AchieveConfigList[index];
                //console.log("Data:",Data)

                cc.loader.loadRes(Data["Icon"], cc.SpriteFrame, (err: any, spriteFrame) => {
                    this.AchieveIcon.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                // //console.log("RoleConfigList[index]:",RoleConfigList[index])
                this.AchieveName.getComponent(cc.RichText).string = Data["Name"]
                this.AchieveCondition.getComponent(cc.RichText).string = Data["Condition"]
                this.AchieveContent.getComponent(cc.RichText).string = Data["Content"]
                break;
            }
        }
    }

    // update (dt) {}
}
