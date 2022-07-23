const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Layout)
    HeroList: cc.Layout = null;

    @property(cc.Prefab)
    HeroCoin: cc.Prefab = null;

    @property(cc.RichText)
    HeroName: cc.RichText = null;

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
            let HeroCoinSprite = HeroCoin.getComponent(cc.Sprite);

            cc.loader.loadRes(Data["Icon"], cc.SpriteFrame, (err: any, spriteFrame) => {
                HeroCoinSprite.spriteFrame = spriteFrame;
            });

            HeroCoin.parent = this.HeroList.node

            HeroCoin.getComponent('RoleChoice').init(String(Data["ID"]));
        }
    }

    LoadHeroData(HeroID:number){
        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        let RoleConfigList = GlobalDataObject["RoleList"];
        for(let index = 0;index<RoleConfigList.length;index++){
            if(RoleConfigList[index]["ID"] == HeroID){
                let Data = RoleConfigList[index];
                // console.log("Data : ", Data)
                this.HeroName.getComponent(cc.RichText).string = Data["Name"]

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

    // update (dt) {}
}
