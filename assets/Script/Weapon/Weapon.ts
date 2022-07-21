// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class weapon extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    @property(cc.Node)
    char:cc.Node = null;


    onLoad () {

    }

    loadImage(path){
        cc.resources.load(path, cc.SpriteFrame, (error, assets) =>{
            if(error){
                return
            }
            var sprite = this.node.addComponent(cc.Sprite);
            sprite.spriteFrame = assets
            this.node.setContentSize(20, 20)
            this.move()
        })
    }

    abstract getTarget():any
    
    // 子弹的移动逻辑，子类需要实现
    abstract move():any

    // update (dt) {}
}
