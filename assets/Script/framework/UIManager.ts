// UIManager.ts
// create by liwl 2022/7/15
// ui 的管理者，单例

import UIBase from "./UIBase";
import { UIPath, UILayer } from '../../cfg/UIDefineCfg'
const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager {
    private _mapLayerN: Map<string, cc.Node> = new Map();
    // 存储ui的map
    private _mapUI: Map<string, UIBase> = new Map();
    private static _instance: UIManager = null;

    private _init() {
        let findLayers = (node: cc.Node) => {
            let children: Array<cc.Node> = node.children;
            for (let child of children) {
                let name = child.name;
                this._mapLayerN.set(name, child);
            }
        }
        // 找到ui节点几个对应层级节点。
        // ui根节点
        let uiRootN: any = cc.find('Canvas/UIRoot');
        if (!uiRootN) {
            cc.resources.load(UIPath.UIRoot, cc.Prefab, (err, prefab) => {
                uiRootN = cc.instantiate(prefab);
                uiRootN.parent = cc.find('Canvas');
                findLayers(uiRootN);
            });
            return;
        }
        findLayers(uiRootN);
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new UIManager();
            this._instance._init();
        }
        return this._instance;
    }

    // 打开ui，如果ui没有，根据预制体加载出ui，存储。
    openUI(uiName: string, layerName?: string, params?: any) {
        // 通过ui名字从ui容器。
        let ui = this._mapUI.get(uiName);
        if (!ui) {
            let path = UIPath[uiName];
            // 加载对应ui
            // 参数1，路径，参数：类型，（err,res）  res
            cc.resources.load(path, cc.Prefab, (err, prefab) => {
                if (err) {
                    return;
                }
                // 创建出ui页面
                let uiN: any = cc.instantiate(prefab);
                // 挂载。挂到哪里？  
                // 如果传递层名字进来，那么使用，如果没有，那么默认页面。
                layerName = layerName || UILayer.Page;
                // 设置ui节点的父亲
                uiN.parent = this._mapLayerN.get(layerName);

                // 获取ui
                ui = uiN.getComponent(UIBase);
                // 存储起来
                this._mapUI.set(uiName, ui);
                // 初始化ui
                ui.init(params);
                ui.open(params);
                // ui.uiName uibase定义的存取器，最终操作它私有的_name属性。
                ui.uiName = uiName;
            })

            return;
        }

        // 打开这个ui
        ui.open();
        return;
    }

    // 判断某个ui是否显示
    isOpen(uiName: string, params?: any) {
        let ui = this._mapUI.get(uiName);
        if (!ui) {
            return false;
        }
        return ui.node.active;
    }

    // 关闭某个ui
    closeUI(uiName: string, params?: any) {
        let ui = this._mapUI.get(uiName);
        if (!ui) {
            return;
        }
        ui.close(params);
    }

    // 页面信息传递。
    sendMsg(uiName: string, msgName: string, ...rest) {
        let ui = this._mapUI.get(uiName);
        if (!ui) {
            console.log(uiName + '还不存在');
            return;
        }
        // 获取要接收这个消息的ui的对应函数。
        let cb: Function = ui[msgName];
        // 获取参数。
        let args = [].slice.call(arguments, 2);
        if (cb) {
            cb.apply(ui, args);
            return;
        }

        ui.handleMsg.apply(ui, args);
    }

    // 加载场景
    loadScene(sceneName: string) {
        for (let ui of Object.values(this._mapUI)) {
            ui.close();
            ui.node.destroy();
        }
        this._mapUI.clear();
        this._mapLayerN.clear();
        UIManager._instance = null;
        cc.director.loadScene(sceneName);
    }
}
