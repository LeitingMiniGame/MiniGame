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



        let size = 30;
        console.log("原本的高度为:",this.HeroList.node.height)
        console.log("HeroCoin的高度为:",this.HeroCoin.data.getContentSize().height)
        // 每三个组件间间隔5 上隔开1 下隔开10
        // 先获取一共多少层 如果是三的倍数则说明是刚好整数层
        let floor = size%3 == 0 ? size/3 : size/3 + 1;
        console.log(`一共${floor}层`)
        this.HeroList.node.height = (floor-1) * 5 + floor * this.HeroCoin.data.getContentSize().height + 11;
        console.log("修改后的的高度为:",this.HeroList.node.height)

        // 初始化30个英雄
        for(let index = 0;index < 30 ;index++){
            let HeroCoin = cc.instantiate(this.HeroCoin)

            HeroCoin.parent = this.HeroList.node

            HeroCoin.getComponent('RoleChoice').init(String(index+1));
        }
    }

    LoadHeroData(HeroID:number){
        console.log("准备开始加载英雄（ID:",HeroID,"）的数据")
    }

    // update (dt) {}
}
