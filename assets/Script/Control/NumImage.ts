// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NumImage {
    // LIFE-CYCLE CALLBACKS:
    protected static _instance: NumImage = null;
    numMap: Map<string, cc.SpriteFrame[]>

    num: number
    numList: number[]
    type: string

    colorType = ['White', 'Red', 'Brown', 'Gold']

    public static getInstance() {
        if (!this._instance) {
            this._instance = new NumImage();
            this._instance._init();
        }
        return this._instance;
    }

    _init() {
        this.numMap = new Map
        for (let j = 0; j < 4; j++) {
            let typeName = this.colorType[j]
            for (let i = 0; i < 10; i++) {
                cc.resources.load('Image/NumImage/' + typeName + '/' + i, cc.SpriteFrame, (error, assets: cc.SpriteFrame) => {
                    if (error) {
                        return
                    }
                    assets.addRef()
                    let spriteList = this.numMap.get(typeName)
                    if (!spriteList) {
                        spriteList = []
                    }
                    spriteList[i] = assets
                    this.numMap.set(typeName, spriteList)
                })
            }
        }
    }

    getNumImage(num, callBack?) {
        let colorTypeName
        if (num >= 0 && num <= 29) {
            colorTypeName = this.colorType[0]
        } else if (num >= 30 && num <= 69) {
            colorTypeName = this.colorType[1]
        } else if (num >= 70 && num <= 99) {
            colorTypeName = this.colorType[2]
        } else if (num >= 100) {
            colorTypeName = this.colorType[3]
        }
        this.getNumList(num)
        let imageNode = new cc.Node()
        let numWidth = 50
        let startX = -numWidth / 2 * (this.numList.length - 1)
        for (let i = 0; i < this.numList.length; i++) {
            let spriteFrame: cc.SpriteFrame = this.numMap.get(colorTypeName)[this.numList[i]].clone()
            let oneNum = new cc.Node()
            let sprite = oneNum.addComponent(cc.Sprite)
            sprite.spriteFrame = spriteFrame
            oneNum.parent = imageNode
            oneNum.x = startX + i * numWidth
            oneNum.setContentSize(6, 6)
            cc.tween(oneNum)
                .by(0.08 * (i + 1), { position: cc.v3(0, 30, 0) })
                .by(0.08, { position: cc.v3(0, -30, 0) })
                .call(() => {
                    if (i == this.numList.length - 1) {
                        cc.tween(imageNode)
                            .delay(0.3)
                            .call(()=>{
                                if(callBack){
                                    callBack()
                                }
                            })
                            .removeSelf()
                            .start()
                    }
                })
                .start()
        }
        imageNode.scale = 0.3
        return imageNode
    }

    getNumList(num) {
        this.numList = []
        do {
            let oneNum = num % 10
            this.numList.push(oneNum)
            num = Math.floor(num / 10)
        } while (num > 0)
        this.numList.reverse()
    }

    // update (dt) {}
}
