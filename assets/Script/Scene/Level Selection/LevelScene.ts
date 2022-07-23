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

        let size = 10;
        console.log("原本的高度为:",this.LevelList.node.height)
        console.log("LevelData的高度为:",this.LevelData.data.getContentSize().height)
        // 每层间隔5 上下间隔5
        this.LevelList.node.height = (size + 1) * 5 + size * this.LevelData.data.getContentSize().height;
        console.log("修改后的的高度为:",this.LevelList.node.height)

        // 初始化
        for(let index = 0;index < size ;index++){
            let LevelData = cc.instantiate(this.LevelData)

            LevelData.parent = this.LevelList.node

            LevelData.getComponent('LevelChoice').init(String(index+1));
        }
    }

    LoadHeroData(HeroID:number){
        console.log("准备开始加载关卡（ID:",HeroID,"）的数据")
    }

    // update (dt) {}
}
