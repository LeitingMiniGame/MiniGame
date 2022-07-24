
import JsonManager from "../../Mgr/JsonManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MyScrollBar extends cc.Component {
    @property
    key: string = "";

    my_slider: cc.Slider = null;
    my_label : cc.Label = null;
    DB:JsonManager = null;

    onLoad () {
        if(this.key == ""){
            console.warn(this.node.name,"中存在组件MyScrollBar发生异常: 未设置key");
            return false;
        }

        this.DB = JsonManager.getInstance();
        if(!this.DB.has("SetUp")){
            // 若没有相关设置则初始化
            this.DB.set("SetUp", new Object())
        }

        let SetUp = this.DB.query("SetUp");
        if(!SetUp.hasOwnProperty(this.key) || SetUp[this.key] == undefined){
            // 若没有相关设置则初始化
            SetUp[this.key] = 0.5;
        }

        this.my_slider = this.node.getComponent(cc.Slider);
        this.my_slider.progress = SetUp[this.key]==null?0.5:SetUp[this.key];
        let child_label = this.node.getChildByName("Label");

        //console.log("子节点Label:",child_label);
        this.my_label = child_label.getComponent(cc.Label);
        //console.log("子节点Label组件Label:",self.my_label);
        this.SetNum(this.my_slider.progress * 100);
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
        //this.music.volume = this.my_slider.progress;
        //console.log(this.node.name,"滑动条被改变了:",this.my_slider.progress);
        this.SetNum(this.my_slider.progress * 100);

        let SetUp = this.DB.query("SetUp");
        SetUp[this.key] = this.my_slider.progress.toFixed(2);

        //console.log("SetUp[",this.key,"]:",SetUp[this.key]);

        //console.log("Data.SetUp[",this.key,"]",cc.director.getScene().getChildByName("GlobalData").getComponent("GlobalData").Data.SetUp[this.key])


    }

    update (dt) {
    }
}
