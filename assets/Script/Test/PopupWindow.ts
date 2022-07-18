import UIWindow from "../framework/UIWindow";
const { ccclass, property } = cc._decorator;

@ccclass
export default class PopupWindow extends UIWindow {

    onInit() {
        this.addEvent('click', 'PopupWindow_BtnBack', () => {
            this.closeSelf();
        });
    }
}
