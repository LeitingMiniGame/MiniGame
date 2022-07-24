import JsonManager from "../../Mgr/JsonManager";

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

    @property(cc.Label)
    ProductName: cc.Label = null;

    @property(cc.Sprite)
    ProductIcon: cc.Sprite = null;

    @property(cc.Label)
    SkillDescription: cc.Label = null;

    @property(cc.Label)
    MoneyNum: cc.Label = null;

    start () {
        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        console.log("GlobalDataObject : ", GlobalDataObject)

        console.log("GlobalDataObject[ProductList] : ",GlobalDataObject["ProductList"])
        // 获取道具配置
        let ProductConfigList = GlobalDataObject["ProductList"];
        let size = ProductConfigList.length;

        let ProductList = JsonManager.getInstance().query("ProductList")
        if(!ProductList){
            ProductList = new Object();
            // 初始化用户拥有的道具配置
            for(let index = 0;index < size ;index++){
                // 标记道具ID的等级
                ProductList[ProductConfigList[index]["ID"]] = 0;
            }
        }

        console.log("原本的高度为:",this.ProductList.node.height)
        console.log("CommodityCoin的高度为:",this.CommodityCoin.data.getContentSize().height)
        // 每个组件间间隔2.5 上隔开2.5 下隔开2.5
        // 先获取一共多少层 如果是4的倍数则说明是刚好整数层
        let floor = Math.ceil(size/4);
        console.log(`一共${floor}层`)
        this.ProductList.node.height = (floor-1) * 2.5 + floor * this.CommodityCoin.data.getContentSize().height + 11;
        console.log("修改后的的高度为:",this.ProductList.node.height)

        // 初始化30个商品
        for(let index = 0;index < size ;index++){
            let CommodityCoin = cc.instantiate(this.CommodityCoin)
            let Data = ProductConfigList[index];
            console.log("Data:",Data)


            cc.loader.loadRes(Data["Icon"], cc.SpriteFrame, (err: any, spriteFrame) => {
                cc.find("Top Layout/Product Icon",CommodityCoin).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            console.log("Data:",Data)
            // 获取组件的layout
            cc.find("Top Layout/Product Name",CommodityCoin).getComponent(cc.Label).string = Data["Name"]

            console.log("开始设置等级")
            // 获取组件的layout
            let Level = cc.find("Buttom Layout/Level", CommodityCoin).getComponent(cc.Label);

            // 先获取等级
            // let MaxLevel = Data["Level"] // 这里是配置的道具等级上限
            let CurLevel = ProductList[Data["ID"]] // 获取玩家拥有对应道具的等级
            console.log("开始设置等级2")
            // console.log("level为:",level )
            // console.log("原本的宽度为:",ProductLevelList.width )
            // 加载等级图标前先修改layout的宽度
            // console.log("ProductLevelList: ",ProductLevelList)
            // ProductLevelList.width = this.LevelYes.data.width * MaxLevel + 8;
            // console.log("LevelIcon的宽度为:",this.LevelIcon.data.width )
            // console.log("现在的宽度为:",ProductLevelList.width )
            // console.log("-----------------next-----------------")

            // cc.find("Buttom Layout/Product Level",CommodityCoin).getComponent(cc.Label).string =
            // 开始处理等级图标
            // for(let NowLevel = 1 ; NowLevel <= MaxLevel ;NowLevel ++){
            //     console.log(`NowLevel : ${NowLevel} ,CurLevel : ${CurLevel} ,MaxLevel : ${MaxLevel} , `)
            //     let LevelIcon = NowLevel <= CurLevel ? cc.instantiate(this.LevelYes):cc.instantiate(this.LevelNo)
            //     LevelIcon.parent = ProductLevelList
            // }
            Level.string = CurLevel.toString();

            CommodityCoin.parent = this.ProductList.node

            CommodityCoin.getComponent('ProductChoice').init(Data["ID"], 0);

            if(index == 0){
                this.LoadproductData(Data["ID"], 0);
            }
        }
    }

    LoadproductData(ProductID:number, LevelNum:number){
        console.log("准备开始加载商品（ID:",ProductID,"）的数据")


        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        let ProductConfigList = GlobalDataObject["ProductList"];
        for(let index = 0;index<ProductConfigList.length;index++){
            if(ProductConfigList[index]["ID"] == ProductID){
                // console.log("LevelConfigList[index]:",LevelConfigList[index])
                this.ProductName.getComponent(cc.Label).string = ProductConfigList[index]["Name"]
                this.SkillDescription.getComponent(cc.Label).string = ProductConfigList[index]["Description"]
                this.MoneyNum.getComponent(cc.Label).string = ProductConfigList[index]["Money"][LevelNum]

                cc.loader.loadRes(ProductConfigList[index]["Icon"], cc.SpriteFrame, (err: any, spriteFrame) => {
                    this.ProductIcon.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });

                break;
            }
        }

    }

    // update (dt) {}
}
