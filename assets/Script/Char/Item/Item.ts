import ItemMgr from "../../Mgr/ItemMgr";
import Char from "../Char";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends Char {

    onLoad(){
        super.onLoad()
        this.loadImage("Item/" + this.data.icon)
    }

    start() {
        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.data.size
        this.node.group = 'Item'
    }

    onCollisionEnter(other, self) {
        if (other.node.group == "Hero") {
            this.bePickUp()
            let isRelease = ItemMgr.getInstance().removeItem(this)
            if(!isRelease){
                this.node.removeFromParent()
            }
        }
    }

    bePickUp(){}
}
