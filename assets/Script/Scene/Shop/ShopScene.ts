const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // 需要从CommodityCoin中获取
    // @property(cc.Layout)
    // ProductList: cc.Layout = null;

    @property(cc.Layout)
    ProductList: cc.Layout = null;

    @property(cc.Prefab)
    CommodityCoin: cc.Prefab = null;

    @property(cc.Prefab)
    LevelIcon: cc.Prefab = null;

    @property(cc.Label)
    ProductName: cc.Label = null;

    @property(cc.Sprite)
    ProductIcon: cc.Sprite = null;

    @property(cc.Label)
    SkillDescription: cc.Label = null;

    @property(cc.Label)
    MoneyNum: cc.Label = null;

    start () {

        let size = 30;
        console.log("原本的高度为:",this.ProductList.node.height)
        console.log("CommodityCoin的高度为:",this.CommodityCoin.data.getContentSize().height)
        // 每个组件间间隔2.5 上隔开2.5 下隔开2.5
        // 先获取一共多少层 如果是4的倍数则说明是刚好整数层
        let floor = Math.ceil(size/4);
        console.log(`一共${floor}层`)
        this.ProductList.node.height = (floor-1) * 2.5 + floor * this.CommodityCoin.data.getContentSize().height + 11;
        console.log("修改后的的高度为:",this.ProductList.node.height)

        // 初始化30个商品
        for(let index = 0;index < 30 ;index++){
            let CommodityCoin = cc.instantiate(this.CommodityCoin)

            CommodityCoin.parent = this.ProductList.node

            // 开始获取等级相关数据
            let level = Math.ceil(Math.random()* 5) ;

            // 获取组件的layout
            let ProductLevelList = cc.find("Buttom Layout/Product Level List", CommodityCoin);;

            // console.log("level为:",level )
            // console.log("原本的宽度为:",ProductLevelList.width )
            // 加载等级图标前先修改layout的宽度
            ProductLevelList.width = this.LevelIcon.data.width * level + (level - 1) * 2;
            // console.log("LevelIcon的宽度为:",this.LevelIcon.data.width )
            // console.log("现在的宽度为:",ProductLevelList.width )
            // console.log("-----------------next-----------------")
            for(let time = 0 ; time < level ;time ++){
                let LevelIcon = cc.instantiate(this.LevelIcon)

                LevelIcon.parent = ProductLevelList
            }

            CommodityCoin.getComponent('ProductChoice').init(index+1);
        }
    }

    LoadproductData(HeroID:number){
        console.log("准备开始加载商品（ID:",HeroID,"）的数据")
    }

    // update (dt) {}
}
