import CharMgr from "../../Mgr/CharMgr";
import Item from "./Item";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Exp extends Item {
    bePickUp(){
        CharMgr.getInstance().getCharByName('Hero').getComponent('Hero').addExp(this.data.value)
    }
}
