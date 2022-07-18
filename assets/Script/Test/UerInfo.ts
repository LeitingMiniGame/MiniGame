import UIBase from "../framework/UIBase";
import { UserData } from "../../cfg/UIDefineCfg";
const { ccclass, property } = cc._decorator;

@ccclass
export default class UserInfo extends UIBase {

    onInit(params?: any) {
        //this.getComp('UserInfo_LbUserName','Label').string = '大哥';

        this.addClickEvent('_BtnBack', () => {
            this.openUI('Login', true);
        })

        this.addClickEvent('_BtnAdd', () => {
            UserData.coin++;
        })

        this.addClickEvent('_BtnReduce', () => {
            UserData.coin--;
        })

        this.bindDataChangeCb(UserData, 'coin', (oldValue: any, newValue: any) => {
            //刷新标签。
            this.getComp('_LbCoin', 'cc.Label').string = newValue;
        })
    }

    handleMsg(params: any) {
        // this.getComp('UserInfo_LbUserName','Label').string = params.name;
        // this.getComp('UserInfo_LbLevel','Label').string = params.level;
    }
    // func(params:any){
    //     this.getComp('UserInfo_LbUserName','Label').string = params.name;
    //     this.getComp('UserInfo_LbLevel','Label').string = params.level;
    // }
}
