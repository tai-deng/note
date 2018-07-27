import GameCoreEvent from "../gamecore/GameCoreEvent";
import GameManager from "../gamecore/managers/GameManager";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * alert面板脚本组件
 */

@ccclass
export default class MyAlert extends cc.Component {

    @property(cc.Label)
    alertContent: cc.Label = null;

    @property(cc.Node)
    closeBtn:cc.Node = null;

    @property(cc.Node)
    okBtn:cc.Node = null;

    // onLoad () {}

    //携带数据
    data:any;

    start () {

        //设置内容
        if (this.data && this.data["content"]) {
            this.alertContent.string = this.data["content"];
        }

        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.closeBtnTapHandler, this);
        this.okBtn.on(cc.Node.EventType.TOUCH_END, this.okBtnTapHandler, this);
    }

    // update (dt) {}


    /**
     * 点击关闭按钮回调
     * 
     * @param e 
     */
    private closeBtnTapHandler(e:cc.Event):void {
        //播放音效
        GameManager.soundsManager.playTapSound();

        //抛出关闭时间，让面板关闭
        this.node.dispatchEvent(new cc.Event(GameCoreEvent.COMMON_CLOSE, false));
    } 

    /**
     * 点击OK按钮回调
     * 
     * @param e 
     */
    private okBtnTapHandler(e:cc.Event):void {
        //播放音效
        GameManager.soundsManager.playTapSound();
        
        //让popupManager来关闭面板
        GameManager.popUpManager.removePopUp(this.node);
    }


}
