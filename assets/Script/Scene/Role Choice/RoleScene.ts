
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


                this.MaxLife.getComponent(cc.RichText).string = Data["maxHp"].toString()
                this.Recover.getComponent(cc.RichText).string = Data["recovery"].toString()
                this.MovingSpeed.getComponent(cc.RichText).string = Data["speed"].toString()
                this.Power.getComponent(cc.RichText).string = Data["power"].toString()
                this.RateOfFire.getComponent(cc.RichText).string = Data["RateOfFire"].toString()
                this.Range.getComponent(cc.RichText).string = Data["Range"].toString()
                this.Cooldowm.getComponent(cc.RichText).string = Data["coolDown"].toString()
                this.NumberOfBullets.getComponent(cc.RichText).string = Data["bulletCount"].toString()

                this.PickupRange.getComponent(cc.RichText).string = Data["PickupRange"].toString()
                this.Lucky.getComponent(cc.RichText).string = Data["luckly"].toString()

                this.ExperienceGain.getComponent(cc.RichText).string = Data["ExperienceGain"].toString()
                // console.log("修改完毕")
                break;
            }
        }
    }


    OpenGame(){
        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");

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
            let CurrentHero = Data.Hero.GetAllAttribute(self.CurrentHeroID)
            console.log("英雄数据: ",CurrentHero)

            // 开始处理道具信息
            // 先获取玩家道具信息
            let BufferList = Data.Gamer.query("buffer")// 表示玩家身上的道具
            if(!BufferList){
                console.log("开始重新初始化道具")
                GlobalDataNote.getComponent("GlobalData").InitGame()
                console.log("初始化道具结束")
                BufferList = Data.Gamer.query("buffer")// 表示玩家身上的道具
            }
            console.log("buffer : ",BufferList)
            let BufferIDList = Object.keys(BufferList)
            console.log("bufferIDList : ",BufferIDList)
            // // 预处理要用到的数据
            // // 获取道具配置
            // let ProductList = Data.Config.GetConfig("ProductList")
            // console.log("ProductList : ",ProductList)
            // let ProductKeys = Object.keys(ProductList)
            // let BufferConfigMap = new Map<number,Object>();
            // // 将其处理为ID=>Object 的形式
            // for(let index = 0;index < ProductKeys.length; index++){
            //     let Key = parseInt(ProductKeys[index]);
            //     let Value = ProductList[Key];
            //     console.log("Key : ",Key,"  Value : ",Value)
            //     BufferConfigMap.set(ProductList[Key]["ID"], Value)
            // }

            // 获取道具等级配置

            for(let index = 0;index < BufferIDList.length; index++){
                let CurrentID = parseInt(BufferIDList[index]);
                let CurrentLevel = BufferList[CurrentID];
                // console.log("CurrentID : ",CurrentID,"  CurrentLevel : ",CurrentLevel)
                let TempBuffer = Data.Buffer.GetBufferAttribute(CurrentID, CurrentLevel )
                TempBuffer["ID"] = undefined
                console.log("TempBuffer: ",TempBuffer )
                // console.log("CurrentHero: ",CurrentHero )
                // CurrentHero+=TempBuffer
                // this.SetBuffer(CurrentHero, TempBuffer)
                {
                    CurrentHero["bulletCount"]+=TempBuffer["bulletCount"]
                    CurrentHero["coolDown"]+=TempBuffer["coolDown"]
                    CurrentHero["ExperienceGain"]+=TempBuffer["ExperienceGain"]
                    CurrentHero["growth"]+=TempBuffer["growth"]
                    CurrentHero["luckly"]+=TempBuffer["luckly"]
                    CurrentHero["magnet"]+=TempBuffer["magnet"]
                    CurrentHero["maxHp"]+=TempBuffer["maxHp"]
                    CurrentHero["power"]+=TempBuffer["power"]
                    CurrentHero["RateOfFire"]+=TempBuffer["RateOfFire"]
                    CurrentHero["Range"]+=TempBuffer["Range"]
                    CurrentHero["recovery"]+=TempBuffer["recovery"]
                    CurrentHero["speed"]+=TempBuffer["speed"]
                }
                // 现在开始获取相关数据
            }

            console.log("Hero: ",CurrentHero)
            // return;

            //进入游戏界面
            console.log("准备开始游戏");

            Data.Gamer.set_Temp("Role", CurrentHero)
            console.log("Data.Gamer : ",Data.Gamer.queryAllTemp())

            // 否则说明要回到首页
            cc.director.loadScene('Main', function(){
                console.log("切换到游戏界面啦");
            });
            return;
        });

    }
    // update (dt) {}
}
