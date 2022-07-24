
import {Data, OpenPopups} from "../../Tools/Tools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Layout)
    HeroList: cc.Layout = null;

    @property(cc.Prefab)
    HeroCoin: cc.Prefab = null;

    @property(cc.Label)
    HeroName: cc.Label = null;

    @property(cc.Sprite)
    HeroIMG: cc.Sprite = null;

    @property(cc.Sprite)
    WeaponIcon: cc.Sprite = null;

    @property(cc.RichText)
    Introduction: cc.RichText = null;

    @property(cc.RichText)
    PassiveEffect: cc.RichText = null;

    @property(cc.RichText)
    MaxLife: cc.RichText = null;

    @property(cc.RichText)
    Recover: cc.RichText = null;

    @property(cc.RichText)
    MovingSpeed: cc.RichText = null;

    @property(cc.RichText)
    Power: cc.RichText = null;

    @property(cc.RichText)
    RateOfFire: cc.RichText = null;

    @property(cc.RichText)
    Range: cc.RichText = null;

    @property(cc.RichText)
    Cooldowm: cc.RichText = null;

    @property(cc.RichText)
    NumberOfBullets: cc.RichText = null;

    @property(cc.RichText)
    PickupRange: cc.RichText = null;

    @property(cc.RichText)
    Lucky: cc.RichText = null;

    @property(cc.RichText)
    ExperienceGain: cc.RichText = null;

    @property(cc.Node)
    OpenGameBtn: cc.Node = null;


    CurrentHeroID:number = -1;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    start () {
        // console.log("Recover",this.Recover);
        // let Lucky = this.Lucky.getComponent(cc.RichText)
        // Lucky.string = "300"
        // console.log("Recover",this.Recover);

        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        console.log("GlobalDataObject : ", GlobalDataObject)

        console.log("GlobalDataObject[RoleList] : ",GlobalDataObject["RoleList"])
        let RoleConfigList = GlobalDataObject["RoleList"];
        let size = RoleConfigList.length;

        console.log("原本的高度为:",this.HeroList.node.height)
        console.log("HeroCoin的高度为:",this.HeroCoin.data.getContentSize().height)
        // 每三个组件间间隔5 上隔开1 下隔开10
        // 先获取一共多少层 如果是三的倍数则说明是刚好整数层
        let floor = Math.ceil(size/3);
        console.log(`一共${floor}层`)
        this.HeroList.node.height = (floor-1) * 5 + floor * this.HeroCoin.data.getContentSize().height + 11;
        console.log("修改后的的高度为:",this.HeroList.node.height)

        // 初始化英雄
        for(let index = 0;index < size ;index++){
            let HeroCoin = cc.instantiate(this.HeroCoin)
            let Data = RoleConfigList[index];
            // console.log("Data : ", Data)
            // 获取组件的layout
            let HeroCoinSprite = cc.find("Icon",HeroCoin).getComponent(cc.Sprite);

            cc.loader.loadRes(Data["Icon"], cc.SpriteFrame, (err: any, spriteFrame) => {
                HeroCoinSprite.spriteFrame = spriteFrame;
            });

            HeroCoin.parent = this.HeroList.node
            // HeroCoin.active = true
            // HeroCoin.opacity = 255

            HeroCoin.getComponent('RoleChoice').init(String(Data["ID"]));

            if(index == 0){
                this.LoadHeroData(Data["ID"])
            }
        }


        // 开启游戏按钮监听
        this.OpenGameBtn.on(cc.Node.EventType.MOUSE_DOWN, this.OpenGame, this);

    }

    LoadHeroData(HeroID:number){
        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        let RoleConfigList = GlobalDataObject["RoleList"];
        for(let index = 0;index<RoleConfigList.length;index++){
            if(RoleConfigList[index]["ID"] == HeroID){
                this.CurrentHeroID = HeroID
                console.log("this.CurrentHeroID : ",this.CurrentHeroID)

                let Data = RoleConfigList[index];
                // console.log("Data : ", Data)
                this.HeroName.getComponent(cc.Label).string = Data["Name"]

                cc.loader.loadRes(Data["IMG"], cc.SpriteFrame, (err: any, spriteFrame) => {
                    this.HeroIMG.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });

                cc.loader.loadRes(Data["WeaponIcon"], cc.SpriteFrame, (err: any, spriteFrame) => {
                    this.WeaponIcon.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                this.Introduction.getComponent(cc.RichText).string = Data["Introduction"]
                this.PassiveEffect.getComponent(cc.RichText).string = Data["PassiveEffect"]


                this.MaxLife.getComponent(cc.RichText).string = Data["MaxLife"].toString()
                this.Recover.getComponent(cc.RichText).string = Data["Recover"].toString()
                this.MovingSpeed.getComponent(cc.RichText).string = Data["MovingSpeed"].toString()
                this.Power.getComponent(cc.RichText).string = Data["Power"].toString()
                this.RateOfFire.getComponent(cc.RichText).string = Data["RateOfFire"].toString()
                this.Range.getComponent(cc.RichText).string = Data["Range"].toString()
                this.Cooldowm.getComponent(cc.RichText).string = Data["Cooldown"].toString()
                this.NumberOfBullets.getComponent(cc.RichText).string = Data["NumberOfBullets"].toString()

                this.PickupRange.getComponent(cc.RichText).string = Data["PickupRange"].toString()
                this.Lucky.getComponent(cc.RichText).string = Data["Lucky"].toString()

                this.ExperienceGain.getComponent(cc.RichText).string = Data["ExperienceGain"].toString()
                // console.log("修改完毕")
                break;
            }
        }
    }


    OpenGame(){
        // 在这里暂存游戏人物数据，然后跳转到游戏界面
        // 子弹、怪物、角色、
        if(this.CurrentHeroID < 0){
            OpenPopups(2, "发生错误，还未选择英雄",function(){
                //不做处理
                return;
            });
            return;
        }
        let self = this
        OpenPopups(1, "你确定使用此英雄开始游戏吗",function(){
            // 绑定英雄ID
            console.log("this.CurrentHeroID : ",self.CurrentHeroID)
            // 生成临时数据
            console.log("打印需要的英雄数据")
            console.log("Hero : ",Data.Hero.GetAllAttribute(self.CurrentHeroID))


            //进入游戏界面
            console.log("准备开始游戏");

            // 否则说明要回到首页
            cc.director.loadScene('Main', function(){
                console.log("切换到游戏界面啦");
            });
            return;
        });

    }
    // update (dt) {}
}
