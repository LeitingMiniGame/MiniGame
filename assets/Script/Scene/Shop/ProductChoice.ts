// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    ProductID: string = "error";

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on(cc.Node.EventType.MOUSE_UP, this.ShowProductDetail, this);
    }

    // update (dt) {}
    ShowProductDetail (event) {
        console.log("选择的商品ID为"+this.ProductID);
        // 得到全局控制脚本
        let ShopScene = cc.find("Canvas/Main Layout/ShopSystem/Data").getComponent("ShopScene");
        let LevelNode = cc.find("Buttom Layout/Level", this.node).getComponent(cc.Label);
        ShopScene.LoadproductData(parseInt(this.ProductID),parseInt(LevelNode.string))
    }

    onDestroy(){
        this.node.off(cc.Node.EventType.MOUSE_UP, this.ShowProductDetail, this);
    }

    init(ID:number,Level:number){
        this.ProductID = String(ID)

        let LevelNode = cc.find("Buttom Layout/Level", this.node).getComponent(cc.Label);
        LevelNode.string = Level.toString();
    }
}
