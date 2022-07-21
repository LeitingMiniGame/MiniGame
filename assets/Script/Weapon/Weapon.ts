const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Weapon extends cc.Component {

    onLoad() {

    }

    loadImage(path) {
        cc.resources.load(path, cc.SpriteFrame, (error, assets: cc.SpriteFrame) => {
            if (error) {
                return
            }
            var sprite = this.node.addComponent(cc.Sprite);
            sprite.spriteFrame = assets
            this.node.setContentSize(20, 20)
            this.move()
        })
    }

    abstract getTarget(): any

    // 子弹的移动逻辑，子类需要实现
    abstract move(): any

}
