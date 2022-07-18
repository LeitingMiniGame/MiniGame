import Obj from "./Obj";

const { ccclass, property } = cc._decorator;
const BOTTOM_LAYER_ZORDER = 100;
const MIDDLE_LAYER_ZORDER = 200;
const TOP_LAYER_ZORDER = 300;

@ccclass
export default class NewClass extends Obj {

    private _bottomLayer: cc.Node
    private _middleLayer: cc.Node
    private _topLayer: cc.Node

    get BottomLayer() {
        return this._bottomLayer
    }
    get MiddleLayer() {
        return this._middleLayer
    }
    get TopLayer() {
        return this._topLayer
    }

    init(params?: any) {
        this._bottomLayer = new cc.Node()
        this._middleLayer = new cc.Node()
        this._topLayer = new cc.Node()
        this.node.addChild(this._bottomLayer, BOTTOM_LAYER_ZORDER, "bottomLayer")
        this.node.addChild(this._middleLayer, MIDDLE_LAYER_ZORDER, "middleLayer")
        this.node.addChild(this._topLayer, TOP_LAYER_ZORDER, "topLayer")


        cc.resources.load("char/head", cc.SpriteFrame, (error, spriteFrame) => {
            if (error) {
                console.log("resources.load - " + error)
            }
            let node = new cc.Node()
            let sprite = node.addComponent(cc.Sprite)
            sprite.spriteFrame = spriteFrame
            node.setContentSize(60, 60)
            node.parent = this._middleLayer

        });

        super.init(params)
        this.absorbField({ name: "sssss", icon: "22", test: 33 })
    }

    // 更新一个状态
    updateOneState(oldValue?: any, newValue?: any, key?: string) {
        if (key && key.length) {
            console.log(key + ':' + newValue);
            return null;
        }
    }

}

