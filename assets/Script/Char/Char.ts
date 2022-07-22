const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Char extends cc.Component {
    name: string
    id: number
    speed: number
    hp: number
    damage: number
    size:cc.Size = cc.size(68, 68)

    animateLayer:cc.Node

    onLoad(){
        this.animateLayer = new cc.Node()
        this.animateLayer.addComponent(cc.Sprite)
        this.animateLayer.parent = this.node
    }

    loadImage(path) {
        cc.resources.load(path, cc.SpriteFrame, (error, assets: cc.SpriteFrame) => {
            if (error) {
                return
            }
            let sprite = this.animateLayer.getComponent(cc.Sprite);
            if(!sprite){
                sprite = this.animateLayer.addComponent(cc.Sprite);
            }
            sprite.spriteFrame = assets
            this.animateLayer.setContentSize(this.size)
            this.move()
        })
    }

    loadAnimate(path, animateName, notNeedPlay?) {
        cc.resources.load(path, cc.AnimationClip, (error, clip: cc.AnimationClip) => {
            if (error) {
                return
            }

            let anim = this.animateLayer.getComponent(cc.Animation);
            if(!anim){
                anim = this.animateLayer.addComponent(cc.Animation);
            }
            anim.addClip(clip);
            if(!notNeedPlay){
                anim.play(animateName);
            }
            this.move()
            if(notNeedPlay){
                anim.pause(animateName);
            }
            this.node.setContentSize(this.size)
        })
    }

    getWorldPos() {
        return this.node.convertToWorldSpaceAR(cc.v2(0, 0))
    }

    getPos() {
        return cc.v2(this.node.x, this.node.y)
    }

}
