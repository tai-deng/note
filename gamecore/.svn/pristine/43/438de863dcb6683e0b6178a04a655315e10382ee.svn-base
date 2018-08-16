import GameManager from "../managers/GameManager";
import XYJAPI from "./XYJAPI";
import WXCore from "../wechat/WXCore";
import WXUtils from "../wechat/WXUtils";
import WXImage from "../wechat/WXImage";

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
 * 小幺鸡更多游戏按钮
 */

@ccclass
export default class XYJMoreGameButton extends cc.Component {

    @property({
        displayName:"微信AppID"
    })
    wxAppID:string = "wx655c04bb45e867d7";

    @property({
        displayName:"跳转页面"
    })
    wxAppPath:string = "";

    /**
     * 动画间隔
     */
    effectDelay:number = 3;

    start () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.tapHandler, this);

        this.showEffect();

        //如果有wxAppID，直接跳转
        if (!this.wxAppID) {
            this.node.opacity = 0;
            this.getAdData();
        }
        
    }

    /**
     * {
     *      imageurl: "https://ball.yz071.com/Upload/image/2018-06-06/P_15282657218141544.jpg ", 
     *      title: "篮球大作战", 
     *      bili: "4:3"
     * }
     */
    private _adData:object;

    private getAdData():void {
        cc.info("get ad data");
        if (this._adData) return;

        //请求数据
        XYJAPI.getAdImageData((data) =>  {
            if (data && data["imageurl"]) {
                this._adData = data;
                this.node.opacity = 255;
            } else {
                this.scheduleOnce(this.getAdData, 3);
            }
        });
    }


    // update (dt) {}

    /**
     * 广告按钮点击
     * @param e 
     */
    private tapHandler(e:cc.Event.EventTouch):void {
        if (this.node.opacity < 10) return;
        
        GameManager.soundsManager.playTapSound();

        if (this.wxAppID) {
            WXUtils.navigateToMiniProgram(this.wxAppID, this.wxAppPath);
        } else if (this._adData) {
            //预览图片
            WXImage.previewImage([this._adData["imageurl"]]);
        }
    }


    /**
     * 播放效果
     */
    private showEffect():void {
        this.node.stopAllActions();
        
        // if (this._adData) {
            if (Math.random() > 0.5) {
                this.effectZoom();
            } else {
                this.effectShake();
            }
        // }

        this.unschedule(this.showEffect);
        let delay:number = this.effectDelay + Math.random();
        this.schedule(this.showEffect, delay, 1);
    }


    /**
     * 晃动
     */
    private effectShake():void {
        let toR:number = (40 + Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1);
        
        // let cc.sequence(cc.rotateTo(0.5, toR));
        let act:cc.ActionInterval = cc.sequence(
            cc.rotateTo(0.5, toR),
            cc.rotateTo(0.5, 0).easing(cc.easeBounceOut())
        )

        this.node.runAction(act);
    }


    /**
     * 缩放
     */
    private effectZoom():void {
        let toS:number = 0.7 + Math.random() * 0.2;

        // let cc.sequence(cc.rotateTo(0.5, toR));
        let act:cc.ActionInterval = cc.sequence(
            cc.scaleTo(0.5, toS),
            cc.scaleTo(0.5, 1).easing(cc.easeBounceOut())
        )

        this.node.runAction(act);
    }


    onDestroy() {
        cc.info("destroy")
        this.node.stopAllActions();

        this.unschedule(this.showEffect);
        this.unschedule(this.getAdData);
    }
}
