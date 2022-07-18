import UIBase from "./UIBase";
const { ccclass, property } = cc._decorator;

@ccclass
export default class UIWindow extends UIBase {
    init(params?: any) {
        super.init(params);
        let node = new cc.Node();
        node.zIndex = -1;
        node.parent = this.node;
        node.width = cc.winSize.width;
        node.height = cc.winSize.height;
        //node.addComponent(cc.Button);
        node.addComponent(cc.BlockInputEvents);
    }
}
