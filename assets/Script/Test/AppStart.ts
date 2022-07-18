import UIManager from "../framework/UIManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    start() {
        // UIManager.getInstance().openUI('Login');
        UIManager.getInstance().openUI('Char');
    }

    // update (dt) {}
}
