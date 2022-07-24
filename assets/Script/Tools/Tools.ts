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
     * 获取关于设置相关数据的接口, 实时获取最新内容
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


    /**
     * 获取关于Config目录下的静态配置相关数据的接口
     * 使用Config.GetConfig(JsonName) 即可
     */
    export class Config{

        // 存储临时对象数据
        private static ConfigMap: Map<string, Object> = null;
        private static IsInit : boolean = false

        /** 初始化获取静态资源 */
        public static Init(){
            if (!this.IsInit) {
                console.log("准备开始初始化Config")
                this.IsInit = true;
                // 初次加载则读取本地数据
                this.ConfigMap = new Map<string, Object>();
                // 开始加载数据
                // 这里的数据是静态的, 不需要改变
                this.LoadJson("SetUp");
                this.LoadJson("AchieveList");
                this.LoadJson("RoleList");
                this.LoadJson("LevelList");
                this.LoadJson("ProductList");
                this.LoadJson("lineweapon");
                this.LoadJson("weapon");
            }
        }

        private static LoadJson(para:string){
            JsonManager.getInstance().LoadJson("Config/"+para, this.AddJson, [para])
        }

        /** 将Json保存到Map中 */
        private static AddJson(Paras:any[]){
            let JsonName:string = Paras[1][0]
            let JsonObj:Object = Paras[0]
            // console.log("JsonName:",JsonName)
            // console.log("JsonObj:",JsonObj)
            // GlobalDataObject[JsonName] = JsonObj
            Config.ConfigMap.set(JsonName, JsonObj);
            // console.log("ConfigMap : ",Config.ConfigMap)
        }

        /** 根据输入的配置文件名称返回对应的静态资源 */
        public static GetConfig(JsonName:string){
            Config.Init();
            // console.log("ConfigMap : ",Config.ConfigMap)
            // console.log("准备开始获取[",JsonName,"]")
            // if(!Config.ConfigMap.has(JsonName))
            //     console.log("ConfigMap[",JsonName,"]:",Object.assign(Config.ConfigMap.get(JsonName)))

            if(!Config.ConfigMap.has(JsonName))
                return null;
            return Object.assign(Config.ConfigMap.get(JsonName))

        }
    }

    /**
     * 使用此接口来记录或者读取临时数据/永久数据
     */
    export class Hero{

    }
}
