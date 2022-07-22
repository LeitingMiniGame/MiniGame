const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Layout)
    HeroList: cc.Layout = null;

    @property(cc.Prefab)
    HeroCoin: cc.Prefab = null;

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
        console.log("Recover",this.Recover);
        let RecoverRichText = this.Recover.getComponent(cc.RichText)
        RecoverRichText.string = "300"
        console.log("Recover",this.Recover);
        // 初始化30个英雄
        for(let index = 0;index < 30 ;index++){
            let HeroCoin = cc.instantiate(this.HeroCoin)

            HeroCoin.parent = this.HeroList.node

            HeroCoin.getComponent('HeroChoice').init(String(index+1));
        }
    }

    LoadHeroData(HeroID:number){
        console.log("准备开始加载英雄（ID:",HeroID,"）的数据")
    }

    // update (dt) {}
}
