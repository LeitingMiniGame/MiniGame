
import Item from "../Char/Item/Item";
import NumImage from "../Control/NumImage";
import CharMgr from "../Mgr/CharMgr";
import DataMgr from "../Mgr/DataMgr";
import ItemMgr from "../Mgr/ItemMgr";
import MapMgr from "../Mgr/MapMgr";
import MonsterMgr from "../Mgr/MonsterMgr";
import WeaponMgr from "../Mgr/WeaponMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {
    isLoadFinish: number = 0
    allFinish: number = 0
    curTime: any;
    timeTween: cc.Tween<cc.Node>;

    onLoad() {
        this.addLayerRoot()


        // 开启碰撞检测
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;


        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        // physicsManager.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        cc.director.getPhysicsManager().gravity = cc.v2(0, -960);

        NumImage.getInstance()
        this.curTime = 0
    }

    start(){
        this.addHero()
        this.addMapLayer()
        this.addBulletLayer()
        this.addMonsterLayer()
        this.addItemLayer()

        // 开始计时
        this.startTimeCount()
    }

    // 添加角色
    addHero() {
        let hero = CharMgr.getInstance().createChar("HeroTest", "Hero")
        let layerRoot = MapMgr.getInstance().getLayerByName('LayerRoot')
        hero.node.parent = layerRoot
        hero.node.zIndex = 400
    }

    // 添加 layer 的根节点
    addLayerRoot() {
        let node = new cc.Node('LayerRoot')
        node.addComponent("LayerRoot")
        node.parent = this.node
        node.zIndex = 0
        MapMgr.getInstance().addLayerMap('LayerRoot', node)
    }

    // 添加地图层
    addMapLayer() {
        cc.resources.load("Prefab/MapPrefab/Grass", cc.Prefab, (error, assets) => {
            if (error) {
                return
            }
            let node = new cc.Node('MapLayer')
            let mapLayer = node.addComponent("MapLayer")
            mapLayer.mapBlock = assets
            let layerRoot = MapMgr.getInstance().getLayerByName('LayerRoot')
            node.parent = layerRoot
            node.zIndex = 100
            MapMgr.getInstance().addLayerMap('MapLayer', node)
        })
    }

    // 添加道具层
    addItemLayer(){
        let node = new cc.Node('ItemLayer')
        let layerRoot = MapMgr.getInstance().getLayerByName('LayerRoot')
        node.parent = layerRoot
        node.zIndex = 250
        MapMgr.getInstance().addLayerMap('ItemLayer', node)
    }

    // 添加子弹层
    addBulletLayer() {
        let node = new cc.Node('BulletLayer')
        let layerRoot = MapMgr.getInstance().getLayerByName('LayerRoot')
        node.parent = layerRoot
        node.zIndex = 900
        MapMgr.getInstance().addLayerMap('BulletLayer', node)
    }

    // 添加怪物层
    addMonsterLayer() {
        let node = new cc.Node('MonsterLayer')
        node.addComponent("MonsterLayer")
        let layerRoot = MapMgr.getInstance().getLayerByName('LayerRoot')
        node.parent = layerRoot
        node.zIndex = 300
        MapMgr.getInstance().addLayerMap('MonsterLayer', node)
    }

    // 开始计时
    startTimeCount(){
        this.timeTween = cc.tween(this.node)
        .repeatForever(
            cc.tween()
                .delay(1)
                .call(() => {
                    MonsterMgr.getInstance().beginCreateMonster(this.curTime)
                    DataMgr.getInstance().setTimeLabel(this.curTime)
                    ItemMgr.getInstance().updateItemPool(this.curTime)
                    this.curTime++
                })
        ).start()
    }

    // 暂停按钮
    onPauseButton(){
        cc.find('/UILayer/PauseButton').active = false
        cc.find('/UILayer/StartButton').active = true
        cc.find('/UILayer/PausePanel').active = true
        this.pauseAll()
    }

    onResumeButton(){
        cc.find('/UILayer/PauseButton').active = true
        cc.find('/UILayer/StartButton').active = false
        cc.find('/UILayer/PausePanel').active = false
        this.resumeAll()
    }

    // 暂停
    pauseAll(){
        // 暂停时间
        this.timeTween.stop()
        // 暂停角色
        CharMgr.getInstance().getCharByName('Hero').getComponent('Hero').pause()
        // 暂停地图移动
        MapMgr.getInstance().getLayerByName('LayerRoot').getComponent('LayerRoot').pause()
        // 暂停开火，暂停子弹移动
        WeaponMgr.getInstance().pause()
        // 暂停怪物移动，暂停生成怪物
        MonsterMgr.getInstance().pause()
        // 暂停道具移动
        ItemMgr.getInstance().pause()
    }

    // 恢复
    resumeAll(){
        // 恢复时间
        this.timeTween.start()
        // 恢复角色
        CharMgr.getInstance().getCharByName('Hero').getComponent('Hero').resume()
        // 恢复地图移动
        MapMgr.getInstance().getLayerByName('LayerRoot').getComponent('LayerRoot').resume()
        // 恢复开火，恢复子弹移动
        WeaponMgr.getInstance().resume()
        // 恢复怪物移动，恢复生成怪物
        MonsterMgr.getInstance().resume()
        // 恢复道具移动
        ItemMgr.getInstance().resume()
    }

    quitGame(){
        console.log('quit');
        
    }

    openSetting(){
        console.log('setting');

    }
}
