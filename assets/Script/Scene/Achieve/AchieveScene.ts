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


    start () {
        let size = 30;
        console.log("原本的高度为:",this.AchieveList.node.height)
        console.log("achieve layout的高度为:",this.Achieve.data.getContentSize().height)
        // 每个组件间间隔5 上下隔开5 所以一共增加了size+1个5
        this.AchieveList.node.height = (this.Achieve.data.getContentSize().height+5) * size +5;
        console.log("修改后的的高度为:",this.AchieveList.node.height)
        for(let index = 0;index < size ;index++){
            let Achieve = cc.instantiate(this.Achieve)

            Achieve.parent = this.AchieveList.node

            Achieve.getComponent("AchieveChoice").init(String(index+1),"测试数据",index+1);
        }
    }

    LoadAchieveData(Situation:string, Describe:string, AchieveIconNum:number){
        console.log("准备开始加载成就数据")
        console.log("Situation：",Situation)
        console.log("Describe：",Describe)
        console.log("准备加载ID为",AchieveIconNum,"的成就图标")
    }

    // update (dt) {}
}
