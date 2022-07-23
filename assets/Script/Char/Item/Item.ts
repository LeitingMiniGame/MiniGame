import Char from "../Char";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends Char {
    start() {
        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.size
        this.node.group = 'Hero'
        this.state = 'stateStay'

        this.loadImage("Image/Grapes")
    }

}
