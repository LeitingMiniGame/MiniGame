import Domain from "./Domain";
const {ccclass, property} = cc._decorator;

@ccclass
export default class DomainTest extends Domain {
    start () {
        super.start()
        this.loadImage('Image/Hero')
    }
}
