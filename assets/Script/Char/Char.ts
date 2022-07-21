const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Char extends cc.Component {
    name: string
    id: number
    speed: number
    hp: number
    damage: number
    size:cc.Size = cc.size(68, 68)

    onLoad(){
        this.node.addComponent(cc.Sprite)
    }

    loadImage(path) {
        cc.resources.load(path, cc.SpriteFrame, (error, assets: cc.SpriteFrame) => {
            if (error) {
                return
            }
            var sprite = this.node.addComponent(cc.Sprite);
            sprite.spriteFrame = assets
            this.node.setContentSize(this.size)
            this.move()
        })
    }

    loadAnimate(path) {
        cc.resources.load(path, cc.AnimationClip, (error, clip: cc.AnimationClip) => {
            if (error) {
                return
            }
            var anim = this.node.addComponent(cc.Animation);
            anim.addClip(clip);
            anim.play('BeeMove');
            this.node.setContentSize(this.size)
            this.move()
        })
    }

    getWorldPos() {
        return this.node.convertToWorldSpaceAR(cc.v2(0, 0))
    }
    getPos() {
        return cc.v2(this.node.x, this.node.y)
    }

    // 子弹的移动逻辑，子类需要实现
    abstract move(): any
}
