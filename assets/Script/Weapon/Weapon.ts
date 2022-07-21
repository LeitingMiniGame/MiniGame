const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Weapon extends cc.Component {

    hp: number
    damage: number
    speed: number
    size: cc.Size

    onLoad() {
        this.node.group = 'Weapon'
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

    injured(damage){
        this.hp -= damage
        if (this.hp <= 0) {
            this.node.removeFromParent()
        }
    }

    abstract getTarget(): any

    // 子弹的移动逻辑，子类需要实现
    abstract move(): any

}
