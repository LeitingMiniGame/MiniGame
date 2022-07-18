
import UIBase from "../framework/UIBase";
const { ccclass, property } = cc._decorator;


interface UserData{
    [key: string]: any
}

@ccclass
export default class Obj extends UIBase {
    private _userData:UserData = {
    }

    // 初始化
    init(params?: any) {
        super.init(params)
    }

    // 吸收多个字段
    absorbField(newUserData: UserData) {
        let arrKeys:Array<string> = Object.keys(newUserData);
        for(let key of arrKeys){
            if(!(key in this._userData)){
                // 如果新的属性没有被监听，则添加监听
                this.bindDataChangeCb(this._userData, key, this.updateOneState)
            }
            this._userData[key] = newUserData[key]
        }
    }

    // 查询字段
    queryField(name: string){
        return this._userData[name]
    }

    // 更新一个状态
    updateOneState(oldValue?: string, newValue?:string, key?:string){
    }
}
