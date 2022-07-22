import PopupBase from "../Commons/PopupBase";

const { ccclass, property } = cc._decorator;

/**
 * 确认弹窗（PopupBase 使用示例）
 */
@ccclass
export default class ConfirmPopup extends PopupBase<ConfirmPopupOptions> {

    @property(cc.Node)
    private PopupMain: cc.Node = null;

    @property(cc.Label)
    private titleLabel: cc.Label = null;

    @property(cc.Label)
    private contentLabel: cc.Label = null;

    @property(cc.Node)
    private confirmBtn: cc.Node = null;

    @property(cc.Node)
    private cancelBtn: cc.Node = null;

    @property(cc.Node)
    private closeBtn: cc.Node = null;

    /** 弹窗路径 */
    public static get path() {
        return 'Prefab/Popup';
    }

    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    private registerEvent() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);

        this.cancelBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);

        this.confirmBtn.on(cc.Node.EventType.TOUCH_END, this.onConfirmBtnClick, this);
    }

    private unregisterEvent() {
        this.confirmBtn.targetOff(this);
        this.closeBtn.targetOff(this);
        this.cancelBtn.targetOff(this);
    }

    protected init() {
        this.PopupMain.setPosition(cc.v2(0,0))
    }

    protected onCloseBtnClick() {
        this.options.cancelCallback && this.options.cancelCallback();
        this.hide();
    }

    protected updateDisplay(options: ConfirmPopupOptions): void {
        this.titleLabel.string = options.title;
        this.contentLabel.string = options.content;
    }

    protected onConfirmBtnClick() {
        this.options.confirmCallback && this.options.confirmCallback();
        this.hide();
    }

}

/** 确认弹窗选项 */
export interface ConfirmPopupOptions {
    title: string;
    content: string;
    confirmCallback: Function;
    cancelCallback: Function;
}
