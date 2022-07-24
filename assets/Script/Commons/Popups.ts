// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    RootNode: cc.Node = null;

    @property(cc.Label)
    Message: cc.Label = null;

    PopMode:number = -1;

    ConfirmCallBack:Function = null;
    CancelCallBack:Function = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // 在这里检测Data数据是否初始化，若没有初始化，则说明是无效的弹窗，需要关闭
        //console.log("弹窗有效性检测");
        if(this.PopMode < 0 || (this.PopMode == 1 && !this.ConfirmCallBack)){
            //console.log("弹窗未初始化,准备关闭弹窗");
            this.RootNode.destroy();
        }

        let Btn_Yes = cc.find("Main Layout/ConfirmBtn",this.RootNode)
        let Btn_No = cc.find("Main Layout/CancelBtn",this.RootNode)
        Btn_Yes.on(cc.Node.EventType.MOUSE_DOWN, this.CallConfirm, this);
        if(this.PopMode > 1){
            Btn_Yes.setPosition(cc.v2(0,-60))
            Btn_No.active = false;
        }else{
            Btn_No.on(cc.Node.EventType.MOUSE_DOWN, this.CallCancel, this);
        }

    }

    /**
     * Mode    : 1.有确认取消两个按钮  2.只有确认按钮
     * Message : 弹窗内容
     * Confirm : 确认按钮的回调函数
     * Cancel  : 取消按钮的回调函数
    */
    Init(Mode:number = 1, Message:string, Confirm:Function, Cancel?:Function){
        //console.log("进入弹窗初始化")
        this.Message.string = Message
        this.ConfirmCallBack = Confirm
        this.CancelCallBack = Cancel
        this.PopMode = Mode
    }

    CallConfirm(){
        //console.log("弹窗确认按钮被按下，准备开始执行");
        this.ConfirmCallBack&&this.ConfirmCallBack()
        // 执行完毕后关闭弹窗
        this.RootNode.destroy();
    }

    CallCancel(){
        //console.log("弹窗取消按钮被按下，准备开始执行");
        this.CancelCallBack&&this.CancelCallBack()
        // 执行完毕后关闭弹窗
        this.RootNode.destroy();
    }

    // update (dt) {}
}
