const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class Char extends cc.Component {
    name:string
    id:number
    speed:number
    hp:number
    damage:number

    loadImage(path){        
        cc.resources.load(path, cc.SpriteFrame, (error, assets:cc.SpriteFrame) =>{
            if(error){
                return
            }
            var sprite = this.node.addComponent(cc.Sprite);
            sprite.spriteFrame = assets
            this.node.setContentSize(68, 68)
            this.move()
        })
    }

    loadAnimate(path){
        cc.resources.load(path, cc.AnimationClip, (error, clip:cc.AnimationClip) =>{
            if(error){
                return
            }
            var anim = this.node.addComponent(cc.Animation);
            clip.wrapMode = cc.WrapMode.Loop
            anim.addClip(clip);
            anim.play('BeeMove');
            this.node.setContentSize(68, 68)
            this.move()
        })
    }

    getPos(){
        return cc.v2(this.node.x ,this.node.y)
    }

    // 子弹的移动逻辑，子类需要实现
    abstract move():any
}
