import MonsterMgr from "../Mgr/MonsterMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Weapon extends cc.Component {
    moveTween: cc.Tween<cc.Node>;
    data: any

    onLoad() {
        this.data.size = cc.size(this.data.width, this.data.height)
        this.node.group = 'Weapon'
        this.loadImage('Image/Bullet/' + this.data.bulletIcon)
    }

    loadImage(path) {
        cc.resources.load(path, cc.SpriteFrame, (error, assets: cc.SpriteFrame) => {
            if (error) {
                return
            }
            var sprite = this.node.addComponent(cc.Sprite);
            sprite.spriteFrame = assets
            this.node.setContentSize(this.data.size)
            this.move()
        })
    }

    injured() {
        this.data.hp -= this.data.minDamage
        if (this.data.hp <= 0) {
            this.node.removeFromParent()
        }
    }

    // 获取子弹的目标，默认获取最近的敌人
    getTarget(): any {
        let worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0))
        let targetPos = MonsterMgr.getInstance().getNearestMonsterPos(worldPos)
        if (!targetPos) {
            return cc.v2(Math.random(), Math.random())
        }
        return targetPos.sub(worldPos).normalizeSelf()
    }

    getWorldPos() {
        return this.node.convertToWorldSpaceAR(cc.v2(0, 0))
    }

    // 子弹的移动逻辑，子类需要实现
    abstract move(): any

    pause() {
        if (this.moveTween) {
            this.moveTween.stop()
        }
    }

    resume() {
        if (this.moveTween) {
            this.moveTween.start()
        }
    }
}
