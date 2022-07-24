import JsonManager from "../../Mgr/JsonManager";
import {Data, deepCopyJson} from "../../Tools/Tools";

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

    @property(cc.Node)
    BuyBtn: cc.Node = null;

    Product:cc.Node = null

    ProductID: number = -1

    start () {




        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        // //console.log("GlobalDataObject : ", GlobalDataObject)

        // //console.log("GlobalDataObject[ProductList] : ",GlobalDataObject["ProductList"])
        // 获取道具静态配置
        let ProductConfigList = GlobalDataObject["ProductList"];
        // 获取玩家道具信息
        let BufferList = Data.Gamer.query("buffer")// 表示玩家身上的道具
        let size = ProductConfigList.length;
        if(!BufferList){
            //console.log("开始重新初始化道具")
            GlobalDataNote.getComponent("GlobalData").InitGame()
            //console.log("初始化道具结束")
            BufferList = Data.Gamer.query("buffer")// 表示玩家身上的道具
        }



        // //console.log("原本的高度为:",this.ProductList.node.height)
        // //console.log("CommodityCoin的高度为:",this.CommodityCoin.data.getContentSize().height)
        // 每个组件间间隔2.5 上隔开2.5 下隔开2.5
        // 先获取一共多少层 如果是4的倍数则说明是刚好整数层
        let floor = Math.ceil(size/4);
        // //console.log(`一共${floor}层`)
        this.ProductList.node.height = (floor-1) * 2.5 + floor * this.CommodityCoin.data.getContentSize().height + 11;
        // //console.log("修改后的的高度为:",this.ProductList.node.height)

        // 初始化30个商品
        for(let index = 0;index < size ;index++){
            let CommodityCoin = cc.instantiate(this.CommodityCoin)
            let Data = ProductConfigList[index];
            // //console.log("Data:",Data)
            cc.loader.loadRes(Data["Icon"], cc.SpriteFrame, (err: any, spriteFrame) => {
                cc.find("Top Layout/Product Icon",CommodityCoin).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            // //console.log("Index: ",index,"Data:",Data)
            // 获取组件的layout
            cc.find("Top Layout/Product Name",CommodityCoin).getComponent(cc.Label).string = Data["Name"]


            // //console.log("Level:",Level)
            // 先获取等级
            // let MaxLevel = Data["Level"] // 这里是配置的道具等级上限
            // //console.log("BufferList:",BufferList)
            let CurLevel = BufferList[Data["ID"]] // 获取玩家拥有对应道具的等级
            // //console.log("开始设置等级2")
            // //console.log("CurLevel:",CurLevel)

            CommodityCoin.parent = this.ProductList.node

            CommodityCoin.getComponent('ProductChoice').init(Data["ID"], CurLevel);

            if(index == 0){
                this.LoadproductData(Data["ID"], 0, CommodityCoin);
                let self = this
                // 开启购买按钮监听
                this.BuyBtn.on(cc.Node.EventType.MOUSE_DOWN, this.BuyProduct,  self);
            }
        }
        if(size == 0){
            this.BuyBtn.on(cc.Node.EventType.MOUSE_DOWN, function name() {
                //console.log("不存在商品数据")
                return;
            });
        }

    }

    LoadproductData(ProductID:number, LevelNum:number, currentNode:cc.Node){
        //console.log("准备开始加载商品（ID:",ProductID,"）的数据")


        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        let GlobalDataObject = GlobalDataNote.getComponent("GlobalData").Data;
        let ProductConfigList = GlobalDataObject["ProductList"];
        for(let index = 0;index<ProductConfigList.length;index++){
            if(ProductConfigList[index]["ID"] == ProductID){
                this.ProductID = ProductID
                this.Product = currentNode
                // //console.log("LevelConfigList[index]:",LevelConfigList[index])
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

    BuyProduct(){
        // //console.log("this.Product:",this.Product)
        //console.log(`准备购买ID:${this.ProductID}的商品`)

        let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
        // //console.log("GlobalDataNote: ", GlobalDataNote)
        // 开始检测玩家的道具数据
        let BufferList = Data.Gamer.query("buffer")// 表示玩家身上的道具
        if(!BufferList){
            //console.log("开始重新初始化道具")
            GlobalDataNote.getComponent("GlobalData").InitGame()
            //console.log("初始化道具结束")
            BufferList = Data.Gamer.query("buffer")// 表示玩家身上的道具
        }
        // //console.log("BufferList: ", BufferList)
        // 获取配置信息
        let ProductList = Data.Config.GetConfig("ProductList")
        let bufferConfigArray = Object.values(ProductList)
        let TargetProduct = null;
        // //console.log("this.ProductID: ", this.ProductID)
        // //console.log("bufferConfigArray: ", bufferConfigArray)
        for(let index = 0 ;index< bufferConfigArray.length;index++){
            if(bufferConfigArray[index]["ID"] == this.ProductID){
                TargetProduct =  deepCopyJson(bufferConfigArray[index]) ;
                break;
            }
        }
        // //console.log("TargetProduct: ", TargetProduct)
        if(!TargetProduct){
            //console.log("不存在相对应的道具")
            return;
        }
        // //console.log("BufferList : ", BufferList)

        // 判断是否超出了等级上限
        if(BufferList[this.ProductID] >= TargetProduct["Level"]){
            //console.log("已到达道具等级上限");
            return;
        }

        // 获取升级需要的金币数
        let Money = TargetProduct["Money"][BufferList[this.ProductID]]
        // 判断金币数是否足够
        let Basic = Data.Gamer.query("basic")
        if(!Basic){
            //console.log("开始重新初始化玩家基础数据")
            GlobalDataNote.getComponent("GlobalData").InitGame()
            //console.log("初始化玩家基础数据结束")
            BufferList = Data.Gamer.query("basic")// 表示玩家身上的道具
        }
        if(Basic["Coin"] < Money){
            //console.log("不好意思，你的金币数不足，请继续努力");
            return ;
        }
        // 开始扣除金币
        Basic["Coin"] -= Money

        // 开始修改金币显示
        let GoldCoinNode = cc.find("Canvas/Main Layout/Top Layout/Gold coin/Coin Num");
        // //console.log("GoldCoinNode:",GoldCoinNode)
        GoldCoinNode.getComponent(cc.Label).string = Basic["Coin"]
        // //console.log("this.Product:",this.Product)
        // 开始修改当前道具等级
        // 获取组件的layout
        let Level = cc.find("Buttom Layout/Level", this.Product).getComponent(cc.Label);
        // //console.log("Level:",Level)
        // 开始修改玩家身上的道具数据
        BufferList[this.ProductID] +=1
        // //console.log("BufferList : ", BufferList)
        Data.Gamer.set("buffer",BufferList)
        Level.string = String( BufferList[this.ProductID]);
        //console.log("购买成功")
        // 结束
        return;
    }

    // update (dt) {}
}
