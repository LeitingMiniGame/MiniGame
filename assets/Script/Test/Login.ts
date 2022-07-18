import UIBase from "../framework/UIBase";
import { UIUtils } from "../framework/UIUitls";
import { UserData } from "../../cfg/UIDefineCfg";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Login extends UIBase {

    start() {

        //这里要获取testNode下面的标签，修改信息
        //this.getComp('testNode_LbName','Label').string = '我是你大哥';

        //获取按钮节点，处理一个简单移动操作
        // cc.tween(this.getNode('Login_BtnLogin'))
        // .by(1.0,{position:cc.v3(100,100)})
        // .start();

        this.addClickEvent('_BtnLogin', () => {
            this.openUI('UserInfo', true);
            //this.loadScene('Next');
            //this.openUI('PopupWindow');
        })

        this.addEvent('scrolling', 'Login_myPageview', () => {
            console.log('滚动');
        })

        this.bindDataChangeCb(UserData, 'coin', (oldValue: any, newValue: any) => {
            //刷新标签。
            this.getComp('_LbCoin', 'cc.Label').string = '金币:' + newValue;
        })
        //this.bindComp(UserData,'coin',this.getComp('Login_LbCoin','Label'),"");

    }
    onEnter() {
        // let uerInfo:any={
        //     name:'张三',
        //     level:'1'
        // }
        // this.sendMsg('UserInfo','func',uerInfo);
    }

    // update (dt) {}
}
