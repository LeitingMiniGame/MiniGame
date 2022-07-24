import CharMgr from "../../Mgr/CharMgr";
import ItemMgr from "../../Mgr/ItemMgr";
import Char from "../Char";
const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Item extends Char {

    getTargetInterval: number = 0.1
    moveCallFunc: () => void;
    targetPos: cc.Vec2;
    moveTween: cc.Tween<cc.Node>;
    needPick: boolean;


    onLoad() {
        super.onLoad()
        this.loadImage("Item/" + this.data.icon)

    }

    // 获取目标位置
    getTaget() {
        let hero = CharMgr.getInstance().getCharByName("Hero")
        let heroPos = hero.node.convertToWorldSpaceAR(cc.v2(0, 0))
        let myPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0))
        return heroPos.subtract(myPos)
    }

    start() {
        let boxCollider = this.addComponent(cc.BoxCollider)
        let char = CharMgr.getInstance().getCharByName('Hero')
        let size = cc.size(char.data.magnet, char.data.magnet)
        boxCollider.size = size
        this.node.group = 'Item'


        this.moveCallFunc = () => {
            if(this.isPause){
                return
            }
            let targetPos = this.getTaget()
            if (targetPos.len() < 50) {
                this.bePickUp()
                this.doRemove()
            }
            // 向量归一化*移动距离 = 本次移动的目标
            let nor = targetPos.normalizeSelf()
            let scale = 600 * this.getTargetInterval
            this.targetPos = nor.multiply(cc.v2(scale, scale))
            this.animateLayer.scaleX = this.targetPos.x < 0 ? -1 : 1
            this.moveTween = cc.tween(this.node)
                .by(this.getTargetInterval, { position: cc.v3(this.targetPos.x, this.targetPos.y) })
                .start()
        }
    }

    //碰撞
    onCollisionEnter(other, self) {
        if (other.node.group == "Hero") {
            this.needPick = true
            this.schedule(this.moveCallFunc, this.getTargetInterval, cc.macro.REPEAT_FOREVER)
        }
    }

    doRemove() {
        let isRelease = ItemMgr.getInstance().removeItem(this)
        if (!isRelease) {
            this.node.removeFromParent()
        }
    }

    abstract bePickUp() 

    pause(){
        this.isPause = true
        this.unschedule(this.moveCallFunc)
        if(this.moveTween){
            this.moveTween.stop()
        }
    }

    resume(){
        this.isPause = false
        if(this.needPick){
            this.schedule(this.moveCallFunc, this.getTargetInterval, cc.macro.REPEAT_FOREVER)        
        }
    }
}
