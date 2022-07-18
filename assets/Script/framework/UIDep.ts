// ，绑定多个回调或者组件
export default class UIWatcher {
    private _data: Object = null;
    private _key: string = '';
    private _cb: Function = null;
    private _target: any = null;
    private _comp: cc.Component = null;
    private _typeName: string = '';
    constructor(data: Object, key: string, cb: Function, target?: any) {
        this._data = data;
        this._key = key;
        this._cb = cb;
        this._target = target;
        // 创建出来的时候直接到订阅器池里面获取对应的订阅器，把监视器添加进去。
        let dep = UIDepPool.getInstance().getDep(this._data, this._key);
        dep.addWatcher(this);
    }

    // 比较两个watcher是否重复，必须满足对象一样，key也一样，回调一样，对象也一样。
    isEquals(watcher: UIWatcher) {
        return this._data === watcher._data
            && this._key === watcher._key
            && this._cb === watcher._cb
            && this._comp === watcher._comp
            && this._target === watcher._target;
    }

    removeSelf() {
        let dep = UIDepPool.getInstance().getDep(this._data, this._key);
        dep.removeWatcher(this);
    }

    notify(oldValue: any, newValue: any) {
        // 调用回调函数。
        this._cb.call(this._target, oldValue, newValue, this._key);
    }
}

// 用于管理一个data对应的key。会有多个监视器
export class UIDep {
    private _data: Object = null;
    private _key: string = '';

    // 多个监视器
    private _arrWatcher: UIWatcher[] = [];
    constructor(data: Object, key: string) {
        this._data = data;
        this._key = key;
        // 开始监视对象this._data里面的this._key的值。
        this._defineProperty();
    }

    // 监听数据是否修改
    private _defineProperty() {
        // 用一个self接收this
        let self = this;
        let temp = this._data[this._key];
        Object.defineProperty(this._data, this._key, {
            set(value) {
                // 旧的值：赋值前拿到temp就是
                let oldValue = temp;
                temp = value;
                // temp:新的值
                self._notify(oldValue, temp);
            },

            get() {
                return temp;
            }
        })
    }

    // 某个订阅器是否存在某个data和key
    isContain(data: Object, key: string) {
        return data === this._data && key === this._key;
    }

    // 添加监视器接口
    addWatcher(watcherIn: UIWatcher) {
        // 查重。
        //  for(let watcher of this._arrWatcher){
        //      if(watcher.isEquals(watcherIn)){
        //          return;
        //      }
        //  }
        if (!watcherIn) {
            return;
        }
        let index = this._arrWatcher.indexOf(watcherIn);
        if (index >= 0) {
            return;
        }
        this._arrWatcher.push(watcherIn);
    }

    removeWatcher(watcher: UIWatcher) {
        if (!watcher) {
            return;
        }
        let index = this._arrWatcher.indexOf(watcher);
        this._arrWatcher.splice(index, 1);
    }

    // 通知接口，用于让所有的watcher去通知他们绑定回调或者组件处理更新操作。
    _notify(oldValue: any, newValue: any) {
        // 遍历所有的watcher，去通知。。。。
        for (let watcher of this._arrWatcher) {
            watcher.notify(oldValue, newValue);
        }
    }
}

// 用于管理多个订阅器。
export class UIDepPool {
    private _arrDep: UIDep[] = [];
    private static _instance: UIDepPool = null;
    static getInstance() {
        if (!this._instance) {
            this._instance = new UIDepPool();
        }

        return this._instance;
    }

    // 到订阅池去查找是否存在这个key，data对应的订阅器，如果存在，那么返回这个订阅器
    // 如果不存在，那么创建一个出来，并且存储到池里面，同时返回出去。
    getDep(data: object, key: string) {
        for (let dep of this._arrDep) {
            if (dep.isContain(data, key)) {
                return dep;
            }
        }

        let dep = new UIDep(data, key);
        this._arrDep.push(dep);
        return dep;
    }

    removeDep(dep: UIDep) {
        if (!dep) {
            return;
        }
        let index = this._arrDep.indexOf(dep);
        // splice:索引，移除几个。
        this._arrDep.splice(index, 1);
    }
}