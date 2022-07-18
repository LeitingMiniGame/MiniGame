interface PathType {
    Login: string,
    UserInfo: string,
    LevelSelect: string,
    UIRoot: string,
    PopupWindow: string
}

interface UILayerType {
    Page: string,
    Widget: string,
    Window: string
}

export let UIPath = {
    Login: 'prefab/ui/Login',
    UserInfo: 'prefab/ui/UserInfo',
    LevelSelect: 'prefab/ui/LevelSelect',
    UIRoot: 'prefab/ui/UIRoot',
    PopupWindow: 'prefab/ui/PopupWindow',
    Char: 'prefab/ui/Char'
}


export let UILayer = {
    Page: 'UIPage',
    Widget: 'UIWidget',
    Window: 'UIWindow'
}

export let UserData = {
    coin: 0,
    userName: '王老五'
}

export let CompType: any = {
    Label: cc.Label,
    Button: cc.Button,
    EditBox: cc.EditBox,
    Progress: cc.ProgressBar,
    Pageview: cc.PageView
}


