import Hero from "./Hero";
const { ccclass, property } = cc._decorator;

@ccclass
export default class HeroTest extends Hero {
    start() {
        super.start()
    }
}
