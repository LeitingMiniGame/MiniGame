const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    MapName: cc.Label = null;
    @property(cc.Label)
    LiveTime: cc.Label = null;
    @property(cc.Label)
    GoldCoins: cc.Label = null;
    @property(cc.Label)
    LevelAchieved: cc.Label = null;
    @property(cc.Label)
    EnemyDefeated: cc.Label = null;



    @property(cc.Layout)
    WeaponList: cc.Layout = null;
    @property(cc.Prefab)
    WeaponRow: cc.Prefab = null;


    @property(cc.Sprite)
    UserIcon: cc.Sprite = null;
    @property(cc.Label)
    UserName: cc.Label = null;
    @property(cc.Layout)
    WeaponLayout: cc.Layout = null;
    @property(cc.Layout)
    ProductLayout: cc.Layout = null;
    @property(cc.Layout)
    BufferLayout: cc.Layout = null;
    @property(cc.Prefab)
    IconLayout: cc.Prefab = null;


    @property(cc.Layout)
    AchieveLayout: cc.Layout = null;
    @property(cc.Sprite)
    AchieveIcon: cc.Sprite = null;
    @property(cc.Label)
    AchieveName: cc.Label = null;
    @property(cc.Label)
    AchieveCondition: cc.Label = null;
    @property(cc.Label)
    AchieveContent: cc.Label = null;

    start () {

    }

    // update (dt) {}
}
