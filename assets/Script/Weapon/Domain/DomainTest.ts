import Domain from "./Domain";
const {ccclass, property} = cc._decorator;

@ccclass
export default class DomainTest extends Domain {
    speed: number = 600
    size: cc.Size = cc.size(20, 20)
    hp: number = 1000000000
    damage: number = 20

    start () {
        super.start()
        this.loadImage('Image/Hero')
    }

}
