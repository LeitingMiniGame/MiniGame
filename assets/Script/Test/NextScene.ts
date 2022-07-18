import UIManager from "../framework/UIManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NextScene extends cc.Component {



    start() {
        UIManager.getInstance().openUI('LevelSelect');
    }

    // update (dt) {}
}
