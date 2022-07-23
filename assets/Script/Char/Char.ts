const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Char extends cc.Component {
    data:any
    state: string;
    animateLayer:cc.Node
    onLoad(){
        this.animateLayer = new cc.Node()
        this.animateLayer.addComponent(cc.Sprite)
        this.animateLayer.parent = this.node
        if(this.data.image){
            this.loadImage(this.data.image)
        }
        if(this.data.maxHp){
            this.data.hp = this.data.maxHp
        }
    }

    loadImage(imagePath) {
        let path = 'Image/' + imagePath
        cc.resources.load(path, cc.SpriteFrame, (error, assets: cc.SpriteFrame) => {
            if (error) {
                return
            }

            let sprite = this.animateLayer.getComponent(cc.Sprite);
            if(!sprite){
                sprite = this.animateLayer.addComponent(cc.Sprite);
            }
            sprite.spriteFrame = assets
            this.animateLayer.setContentSize(this.data.size)
            this.move()
        })
    }

    loadAnimate(animateName, notNeedPlayOnLoad?) {
        let path = "Animate/" + animateName
        cc.resources.load(path, cc.AnimationClip, (error, clip: cc.AnimationClip) => {
            if (error) {
                return
            }

            let anim = this.animateLayer.getComponent(cc.Animation);
            if(!anim){
                anim = this.animateLayer.addComponent(cc.Animation);
            }
            anim.addClip(clip);
            if(!notNeedPlayOnLoad){
                anim.play(animateName);            
            }
            this.move()
        })
    }

    move() {}

    getWorldPos() {
        return this.node.convertToWorldSpaceAR(cc.v2(0, 0))
    }

    getPos() {
        return cc.v2(this.node.x, this.node.y)
    }

}
