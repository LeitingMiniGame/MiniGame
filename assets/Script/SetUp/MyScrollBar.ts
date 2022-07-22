const {ccclass, property} = cc._decorator;

@ccclass
export default class MyScrollBar extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    my_slider: cc.Slider = null;
    my_label : cc.Label = null;

    onLoad () {
        let self = this;
        this.my_slider = this.node.getComponent(cc.Slider);
        let child_label = this.node.getChildByName("Label");
        //console.log("子节点Label:",child_label);
        this.my_label = child_label.getComponent(cc.Label);
        //console.log("子节点Label组件Label:",self.my_label);
        self.my_slider.progress = 0.5;
        this.SetNum(self.my_slider.progress * 100);
    }

    start () {

    }

    SetNum(Num:number){
        let strToDo = Num.toFixed(2) + "%"

        this.my_label.string = strToDo
    }

    UpdateProgress(){
        //console.log("被滑动了:",this.my_slider.progress);
        //console.log("Label:",this.my_label);
        this.SetNum(this.my_slider.progress * 100);
        //this.music.volume = this.my_slider.progress;
    }

    update (dt) {
    }
}
