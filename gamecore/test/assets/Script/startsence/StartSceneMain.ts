import GameManager from "../gamecore/managers/GameManager";
import CommandEventType from "../commands/CommandEventType";
import AlertCommand from "../commands/AlertCommand";
import ShareGameCommand from "../commands/ShareGameCommand";
import GameSystem from "../GameSystem";

const {ccclass, property} = cc._decorator;


/**
 * 启动场景
 */
@ccclass
export default class StartSceneMain extends cc.Component {


    //进入游戏场景按钮
    @property(cc.Node)
    toGameSenceBtn:cc.Node = null;

    //进入广告测试场景按钮
    @property(cc.Node)
    toAdSenceBtn:cc.Node = null;


    onLoad () {
        //初始化整个游戏系统
        GameSystem.init();

        //设置主场景背景音乐
        GameManager.soundsManager.pushSceneBgMusic("/resources/sound/startsence.mp3");
    }


    start () {
        this.toGameSenceBtn.on(cc.Node.EventType.TOUCH_END, this.toGameSenceBtnTapHandler, this);
        this.toAdSenceBtn.on(cc.Node.EventType.TOUCH_END, this.toAdSenceBtnTapHandler, this);
    }


    /**
     * 场景控制按钮点击
     * 
     * @param e 
     */
    private toGameSenceBtnTapHandler(e:cc.Event):void {
        //播放点击音效
        GameManager.soundsManager.playTapSound();

        //进入游戏场景
        GameManager.sceneManager.pushScene("gameScene");
    }

    /**
     * 
     * 
     * @param e 
     */
    private toAdSenceBtnTapHandler(e:cc.Event):void {
        //播放点击音效
        GameManager.soundsManager.playTapSound();

        //进入游戏场景
        GameManager.sceneManager.pushScene("adScene");
    }

}
