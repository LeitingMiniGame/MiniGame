// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // 检测是否回收地图块
    checkOverBorder(){
        let pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        let map = this.node.parent.getComponent('Map')
        if (pos.x < - cc.winSize.width / 2 ||
            pos.x > cc.winSize.width * 1.5 ||
            pos.y < - cc.winSize.height / 2 ||
            pos.y > cc.winSize.height * 1.5) {
            map.addNewMapBlock(this.node.x, this.node.y, pos)
            map.recycleMapBlock(this.node)
        }
    }

    update(dt) {
        this.checkOverBorder()
    }
}
