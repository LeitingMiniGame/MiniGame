
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

        DataMgr.getInstance()
        NumImage.getInstance()
        CharMgr.getInstance()

        this.addLayerRoot()


        // 开启碰撞检测
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -640);
        this.curTime = 599


        this.addHero()
        this.addMapLayer()
        this.addBulletLayer()
        this.addMonsterLayer()
        this.addItemLayer()
        this.pauseAll()

    }

    start() {
        cc.tween(this.node)
            .delay(0.5)
            .call(()=>{
                this.pauseAll()
                cc.find('UILayer/LoadingPanel/BackGround').on('click', this.startGame, this);
                cc.find('UILayer/LoadingPanel/LoadingLabel').getComponent(cc.Label).string = "按 W/A/S/D 控制角色移动\n 点击任意位置继续"

            })
            .delay(2)
            .call(() => {
                this.startGame()
            }).start()
    }

    startGame(){
        cc.resources.load("Radio/Fight", cc.AudioClip, (error, assets:cc.AudioClip)=>{
            if(error){
                return
            }
            cc.audioEngine.playMusic(assets, true);
        })
        cc.find('UILayer/LoadingPanel').active = false
        // 开始计时
        this.resumeAll()
        this.startTimeCount.call(this)
    }

    // 添加角色
    addHero() {
        let roleName = CharMgr.getInstance().HeroData.name
        let hero = CharMgr.getInstance().createChar(roleName, "Hero")
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
    addItemLayer() {
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
    startTimeCount() {
        let self = this
        if(this.timeTween){
            return
        }
        this.timeTween = cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .delay(1)
                    .call(() => {
                        MonsterMgr.getInstance().beginCreateMonster(self.curTime)
                        DataMgr.getInstance().setTimeLabel(self.curTime)
                        ItemMgr.getInstance().updateItemPool(self.curTime)
                        self.curTime++
                        if (self.curTime == 1500) {
                            self.gameOver(true)
                        }
                    })
            ).start()
    }

    // 暂停按钮
    onPauseButton() {
        cc.find('/UILayer/PauseButton').active = false
        cc.find('/UILayer/StartButton').active = true
        cc.find('/UILayer/PausePanel').active = true
        this.pauseAll()
    }

    onResumeButton() {
        cc.find('/UILayer/PauseButton').active = true
        cc.find('/UILayer/StartButton').active = false
        cc.find('/UILayer/PausePanel').active = false
        this.resumeAll()
    }

    // 暂停
    pauseAll() {
        // 暂停时间
        if (this.timeTween) {
            this.timeTween.stop()
        }
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
    resumeAll() {
        // 恢复时间
        if (this.timeTween) {
            this.timeTween.start()
        }
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

    quitGame() {
        //console.log('quit');
        // OpenPopups(1, "是否退出游戏", () => {
        // })
        this.pauseAll()
        cc.director.loadScene("HomePage");

        CharMgr.releaseInstance()
        DataMgr.releaseInstance()
        ItemMgr.releaseInstance()
        MapMgr.releaseInstance()
        MonsterMgr.releaseInstance()
        WeaponMgr.releaseInstance()

        cc.resources.load("Radio/Home", cc.AudioClip, (error, assets:cc.AudioClip)=>{
            if(error){
                return
            }
            cc.audioEngine.playMusic(assets, true);
        })

    }

    openSetting() {
        //console.log('setting');
    }

    gameOver(isWin) {
        this.pauseAll()
        let gameOverPanel = cc.find('/UILayer/GameOver')
        gameOverPanel.active = true
        if (isWin) {
            cc.find('GoodGameImage', gameOverPanel).active = true
            cc.find('GameOverImage', gameOverPanel).active = false
        } else {
            cc.find('GoodGameImage', gameOverPanel).active = false
            cc.find('GameOverImage', gameOverPanel).active = true
        }
    }
}
