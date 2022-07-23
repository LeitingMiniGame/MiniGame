import DataMgr from "../../Mgr/DataMgr";
import Item from "./Item";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Coin extends Item {
    bePickUp(){
        DataMgr.getInstance().addCoin(this.data.value)
    }
}
