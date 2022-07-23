const {ccclass, property} = cc._decorator;

/**
 * 1.在自定义数据类型时要注册此类型到JsonManager

 * 2.游戏开始时将数据从本地硬盘中read到JsonManager中

 * 3-1.游戏运行时将使用后的数据update到JsonManager中

 * 3-2.游戏运行时使用query从JsonManager中读取数据

 * 4.游戏结束时将数据save到本地硬盘中
*/
@ccclass
export default class JsonManager{

    private static _instance: JsonManager = null;

    // 存储对象数据
    private _mapDBase: Map<string, Object> = new Map<string, Object>();
    // 存储临时对象数据
    private _mapTempDBase: Map<string, Object> = new Map<string, Object>();

    /** 单例模式，获取管理对象 */
    public static getInstance() {
        if (!this._instance) {
            this._instance = new JsonManager();
            // 初次加载则读取本地数据
            this._instance.LoadDB();
        }
        return this._instance;
    }


    /** 将所有数据保存到本地 */
    public SaveDB(){
        // 保存前将之前的存档删除
        cc.sys.localStorage.clear();////----需要讨论是否删除

        console.log("save start");
        let ObjNameArray : Array<string> = [];
        // 循环遍历所有此刻存储在JsonManager中的数据并保存
        this._mapDBase.forEach((value , key) =>{
            console.log("save :",key);
            cc.sys.localStorage.setItem(key, JSON.stringify(value));
            console.log("save :",key,"成功");
            // 记录保存了多少变量
            ObjNameArray.push(key);
            // console.log("save key 成功");
        });
        console.log("map循环结束");
        // 最后将数据类型映射关系、变量信息保存
        cc.sys.localStorage.setItem("ObjNameArray", JSON.stringify(ObjNameArray));
        console.log("save over");
    }

    /** 将所有本地数据恢复到内存 */
    public LoadDB(){
        // 先将数据类型映射关系、变量信息读取出来
        let ObjNameArray:Array<string> = JSON.parse(cc.sys.localStorage.getItem("ObjNameArray"));
        console.log("ObjNameArray:", ObjNameArray);
        let JsonStr:string = "";
        let json:Object;
        for(let index = 0 ;index < ObjNameArray.length ; index++)
        {
            let key = ObjNameArray[index];
            console.log("key:", key);
            //console.log("key type:",typeof key);
            JsonStr = cc.sys.localStorage.getItem(key);
            //console.log("JsonStr:", JsonStr);
            json = JSON.parse(JsonStr);
            console.log("json:", json);
            this._mapDBase.set(key,json);
            //console.log("_mapDB:", this._mapDBase);
        }
        console.log("load over");
    }



    /** 查询指定数据是否存在 */
    public has(Key : string){
        return this._mapDBase.has(Key);
    }

    /** 查询指定内存数据

     * 引用类型，在其返回的Object上修改即直接修改内存中的数据，无需重新set保存
    */
    public query(Key : string){
        return this._mapDBase.get(Key);
    }

    /** 查询所有内存数据 */
    public queryAll(){
        return this._mapDBase;
    }

    /** 添加内存数据 */
    public set(Key : string, ClassObj:any){
        this._mapDBase.set(Key, ClassObj);
    }

    /** 清除所有内存数据 */
    public clear(){
        this._mapDBase.clear();
        this._mapDBase = new Map<string, Object>();
    }

    /** 删除指定内存数据 */
    public delete(Key : string){
        this._mapDBase.delete(Key);
    }




    /** 查询指定临时数据是否存在 */
    public hasTemp(Key : string){
        return this._mapTempDBase.has(Key);
    }

    /** 查询指定临时内存数据

     * 引用类型，在其返回的Object上修改即直接修改内存中的数据，无需重新set保存
    */
    public queryTemp(Key : string){
        return this._mapTempDBase.get(Key);
    }

    /** 查询所有临时内存数据 */
    public queryAllTemp(){
        return this._mapTempDBase;
    }

    /** 添加临时内存数据 */
    public setTemp(Key : string, ClassObj:any){
        this._mapTempDBase.set(Key, ClassObj);
    }

    /** 清除所有临时内存数据 */
    public clearTemp(){
        this._mapTempDBase.clear();
        this._mapTempDBase = new Map<string, Object>();
    }

    /** 删除指定临时内存数据 */
    public deleteTemp(Key : string){
        this._mapTempDBase.delete(Key);
    }

    /** URL 是 resources/*.json */
    public LoadJson(URL:string, CallBack?:Function,Para?:any[]){
        console.log("URL:",URL);
        //URL 直接输入resources文件夹下的即可------出了点问题，无法使用了
        cc.loader.loadRes(URL, function(err, object) {
            if(err) {
                console.log("err:",err);
                return ;
            }
            CallBack&&CallBack([object.json,Para])
            return ;
        })

        // URL需要指定resources目录 例如resources/demo.json
        // cc.loader.load(cc.url.raw(URL), function(err,res){
        //     if(err) {
        //         console.log("err:",err);
        //         return;
        //     }
        //     console.log("res:",res.json);

        // })
    }

}
