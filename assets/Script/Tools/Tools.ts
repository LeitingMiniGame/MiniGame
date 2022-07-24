import JsonManager from "../Mgr/JsonManager";

// describe: 在范围内获取随机整数值 [min, max]
export function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// 根据权重随机
export function randByWeight(arr): number {
    let totalWeight: number = 0;
    let randIndex: number;
    for (let itemWeightMsg of arr) {
        totalWeight += itemWeightMsg.weight;
    }

    if (totalWeight <= 0) {
        return randIndex
    } else {
        let randVal: number = getRandomIntInclusive(1, totalWeight);
        for (let index = 0; index < arr.length; index++) {
            if (randVal <= arr[index].weight) {
                randIndex = index;
                break;
            } else {
                randVal -= arr[index].weight;
            }
        }
    }
    return randIndex;
}

/**
 * 打开一个新的弹窗
 * Mode    : 1.有确认取消两个按钮  2.只有确认按钮
 * Message : 弹窗内容
 * Confirm : 确认按钮的回调函数
 * Cancel  : 取消按钮的回调函数
*/
export function OpenPopups(Mode:number = 1, Message:string, Confirm:Function, Cancel:Function = null){

    let GlobalDataNote = cc.director.getScene().getChildByName("GlobalData");
    let PopTemplate = GlobalDataNote.getComponent("GlobalData").CommonPop;
    // 生成一个弹窗
    let Pop = cc.instantiate(PopTemplate);
    let Root = cc.find("Canvas");
    let Script = cc.find("Data", Pop).getComponent("Popups");
    console.log("准备开始初始化弹窗")
    Script.Init(Mode, Message, Confirm, Cancel);
    Pop.parent = Root;
}

export namespace Data{

/**
 * 获取关于设置的接口
 */
export class SetUp{
    // 存储临时对象数据
    private SetUpObj: Object = null;
    private static _instance : SetUp = null

    /** 单例模式，获取管理对象 */
    private static getInstance() {
        if (!this._instance) {
            this._instance = new SetUp();
            // 初次加载则读取本地数据
            this._instance.SetUpObj = JsonManager.getInstance().query("SetUp")
        }
        return this._instance;
    }

    /** 返回是否全屏 */
    static IsFullScreen():boolean{
        return Object.assign(this.getInstance().SetUpObj["IsFullScreen"])
    }

    /** 返回是否显示伤害 */
    static IsShowDamage():boolean{
        return Object.assign(this.getInstance().SetUpObj["IsShowDamage"])
    }

    /** 返回是否显示摇杆 */
    static IsShowJoystick():boolean{
        return Object.assign(this.getInstance().SetUpObj["IsShowJoystick"])
    }

    /** 返回声音大小 */
    static GetMusicNum():number{
        return Object.assign(this.getInstance().SetUpObj["Music"])
    }

    /** 返回音乐大小 */
    static GetSoundNum():boolean{
        return Object.assign(this.getInstance().SetUpObj["Sound"])
    }
}


}