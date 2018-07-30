import GameManager from "../gamecore/managers/GameManager";
import CommandEventType from "../commands/CommandEventType";
import AlertCommand from "../commands/AlertCommand";
import ShareGameCommand from "../commands/ShareGameCommand";
import Utils from "../gamecore/managers/Utils";
import GameCoreEvent from "../gamecore/GameCoreEvent";

const {ccclass, property} = cc._decorator;


/**
 * 基础功能测试
 */
@ccclass
export default class CoreTest extends cc.Component {


    //声音控制按钮
    @property(cc.Node)
    musicBtn:cc.Node = null;

    //音效控制按钮
    @property(cc.Node)
    soundBtn:cc.Node = null;

    //播放音效
    @property(cc.Node)
    playSoundBtn:cc.Node = null;

    //显示alert面板
    @property(cc.Node)
    showAlertBtn:cc.Node = null;

    //保存数据
    @property(cc.Node)
    saveDataBtn:cc.Node = null;

    //删除数据
    @property(cc.Node)
    deleteDataBtn:cc.Node = null;

    onLoad () {
        
    }

    start () {
        //显示UI
        this.refreshUI();

        //事件监听
        this.musicBtn.on(cc.Node.EventType.TOUCH_END, this.musicBtnTapHandler, this);
        this.soundBtn.on(cc.Node.EventType.TOUCH_END, this.soundBtnTapHandler, this);
        this.playSoundBtn.on(cc.Node.EventType.TOUCH_END, this.playSoundBtnTapHandler, this);
        this.showAlertBtn.on(cc.Node.EventType.TOUCH_END, this.showAlertBtnTapHandler, this);
        this.saveDataBtn.on(cc.Node.EventType.TOUCH_END, this.saveDataBtnTapHandler, this);
        this.deleteDataBtn.on(cc.Node.EventType.TOUCH_END, this.deleteDataBtnTapHandler, this);

        //监听数据更改
        GameManager.eventManager.on(GameCoreEvent.DATA_CHANGE, this.dataChangeHandker, this);
    }


    /**
     * 音乐控制按钮点击
     * 
     * @param e 
     */
    private musicBtnTapHandler(e:cc.Event):void {
        //播放点击音效
        GameManager.soundsManager.playTapSound();

        if (GameManager.soundsManager.musicMuted) {
            GameManager.soundsManager.unmuteMusic();
        } else {
            GameManager.soundsManager.muteMusic();
        }

        this.refreshUI();
    }


    /**
     * 音效控制按钮点击
     * 
     * @param e 
     */
    private soundBtnTapHandler(e:cc.Event):void {
        //播放点击音效
        GameManager.soundsManager.playTapSound();

        if (GameManager.soundsManager.soundMuted) {
            GameManager.soundsManager.unmuteSound();
        } else {
            GameManager.soundsManager.muteSound();
        }

        this.refreshUI();
    }

    /**
     * 播放音效
     * 
     * @param e 
     */
    private playSoundBtnTapHandler(e:cc.Event):void {
        GameManager.soundsManager.playSound("resources/sounds/upgrade.mp3");
    }


    

    /**
     * 显示alert面板
     * 
     * @param e 
     */
    private showAlertBtnTapHandler(e:cc.Event):void {
        //播放点击音效
        GameManager.soundsManager.playTapSound();

        //抛出事件
        GameManager.eventManager.dispatchEventWith(CommandEventType.SHOW_ALERT, {"content":"这里是我要显示的内容"});
        //或者不携带参数
        // GameManager.eventManager.dispatchEventWith(CommandEventType.SHOW_ALERT);
    }



    /**
     * 点击保存数据按钮
     * @param e 
     */
    private saveDataBtnTapHandler(e:cc.Event):void {
        //播放点击音效
        GameManager.soundsManager.playTapSound();

        let v:number = GameManager.dataManager.getData("myValue");
        v = Utils.toInt(v);
        v++;
        //变更数据时，会抛出GameCoreEvent.DATA_CHANGE事件
        GameManager.dataManager.setData("myValue", v, true);
    }
    
    /**
     * 点击移除数据按钮
     * 
     * @param e 
     */
    private deleteDataBtnTapHandler(e:cc.Event):void {
        //播放点击音效
        GameManager.soundsManager.playTapSound();

        GameManager.dataManager.remoteData("myValue");
    }



    /**
     * 数据变更事件
     * 
     * @param e 
     */
    private dataChangeHandker(e:cc.Event):void {
        if (GameManager.dataManager.lastChangedKey == "myValue") {
            this.refreshUI();
        }
    }

    /**
     * 刷新按钮显示
     */
    private refreshUI():void {
        //检查是否已关闭背景音乐
        if (GameManager.soundsManager.musicMuted) {
            this.musicBtn.getChildByName("btnLabel").getComponent(cc.Label).string = "开启音乐";
        } else {
            this.musicBtn.getChildByName("btnLabel").getComponent(cc.Label).string = "关闭音乐";
        }
        
        //检查是否已关闭音效
        if (GameManager.soundsManager.soundMuted) {
            this.soundBtn.getChildByName("btnLabel").getComponent(cc.Label).string = "开启音效";
        } else {
            this.soundBtn.getChildByName("btnLabel").getComponent(cc.Label).string = "关闭音效";
        }

        //显示本地数据
        let v:number = GameManager.dataManager.getData("myValue");
        v = Utils.toInt(v);
        this.saveDataBtn.getChildByName("btnLabel").getComponent(cc.Label).string = "保存数据 " + v;
    }
}
