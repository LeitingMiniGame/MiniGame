const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    Data: Object = null;

    onLoad () {
        //添加DataNode为常驻节点
        this.Data = new Object();
        cc.game.addPersistRootNode(this.node);
    }

    start () {

    }

    // update (dt) {}
}
