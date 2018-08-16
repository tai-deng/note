import WXBannerAd from "../gamecore/wechat/WXBannerAd";
import GameManager from "../gamecore/managers/GameManager";
import WXRewardVideoAd from "../gamecore/wechat/WXRewardVideoAd";
import WXEventType from "../gamecore/wechat/WXEventType";
import WXUtils from "../gamecore/wechat/WXUtils";

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

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    backBtn: cc.Node = null;

    //显示、隐藏banner广告
    @property(cc.Node)
    bannerAdBtn: cc.Node = null;
    
    
    //初始化视频广告
    @property(cc.Node)
    initVideoAdBtn:cc.Node = null;

    //显示视频广告
    @property(cc.Node)
    showVideoAdBtn:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.refreshUI();

        this.backBtn.on(cc.Node.EventType.TOUCH_END, this.backBtnTapHandler, this);
        this.bannerAdBtn.on(cc.Node.EventType.TOUCH_END, this.bannerAdBtnTapHandler, this);
        this.initVideoAdBtn.on(cc.Node.EventType.TOUCH_END, this.initVideoAdBtnTapHandler, this);
        this.showVideoAdBtn.on(cc.Node.EventType.TOUCH_END, this.showVideoAdBtnTapHandler, this);

        //监听激励视频初始化完成事件
        GameManager.eventManager.on(WXEventType.REWARD_VIDEO_AD_READY, this.rewardVideoAdReadyHandler, this);
    }

    private refreshUI():void {
        if (WXBannerAd.currentAd) {
            if (WXBannerAd.currentAd.isShowing) {
                this.bannerAdBtn.getChildByName("btnLabel").getComponent(cc.Label).string = "隐藏广告";
            } else {
                this.bannerAdBtn.getChildByName("btnLabel").getComponent(cc.Label).string = "显示广告";
            }
        }


        if (WXRewardVideoAd.isReady) {
            //如果视频广告已准备好
            this.showVideoAdBtn.getChildByName("btnLabel").getComponent(cc.Label).string = "播放视频广告";
        } else {
            this.showVideoAdBtn.getChildByName("btnLabel").getComponent(cc.Label).string = "视频广告未准备好";
        }
    }



    /**
     * 返回上一个场景
     * 
     * @param e 
     */
    private backBtnTapHandler(e:cc.Event):void {
        GameManager.soundsManager.playTapSound();

        GameManager.sceneManager.popScene();
    }


    private bannerAdBtnTapHandler(e:cc.Event):void {
        if (WXBannerAd.currentAd) {
            if (WXBannerAd.currentAd.isShowing) {
                WXBannerAd.currentAd.hide();
            } else {
                WXBannerAd.currentAd.show();
            }

            this.refreshUI();
        }
    }

    /**
     * 视频广告已准备好
     * 
     * @param e 
     */
    private rewardVideoAdReadyHandler(e:cc.Event):void {
        this.refreshUI();
    }


    /**
     * 初始化视频广告
     * @param e 
     */
    private initVideoAdBtnTapHandler(e:cc.Event):void {
        //初始化一般在GameSystem的init方法中进行
        WXRewardVideoAd.adID = "adunit-4b0b7047038ae598";
    }

    /**
     * 显示视频广告
     * @param e 
     */
    private showVideoAdBtnTapHandler(e:cc.Event):void {
        //检查视频广告是否已准备好
        if (WXRewardVideoAd.isReady) {
            //广告中途关闭事件
            GameManager.eventManager.on(WXEventType.REWARD_VIDEO_AD_CLOSE, this.rewardVideoAdHandler, this);
            //广告展现错误事件
            GameManager.eventManager.on(WXEventType.REWARD_VIDEO_AD_ERROR, this.rewardVideoAdHandler, this);
            //广告播放完毕事件
            GameManager.eventManager.on(WXEventType.REWARD_VIDEO_AD_COMPLETE, this.rewardVideoAdHandler, this);


            WXRewardVideoAd.show();
        } else {
            WXUtils.showToast("视频暂时无法播放");
        }
    }


    private rewardVideoAdHandler(e:cc.Event):void {
        GameManager.eventManager.off(WXEventType.REWARD_VIDEO_AD_CLOSE, this.rewardVideoAdHandler, this);
        GameManager.eventManager.off(WXEventType.REWARD_VIDEO_AD_ERROR, this.rewardVideoAdHandler, this);
        GameManager.eventManager.off(WXEventType.REWARD_VIDEO_AD_COMPLETE, this.rewardVideoAdHandler, this);

        if (e.type == WXEventType.REWARD_VIDEO_AD_COMPLETE) {
            //如果播放完成
            //进行奖励....
        }
    }
    // update (dt) {}


    onDestroy() {

        //一定要移除事件
        GameManager.eventManager.off(WXEventType.REWARD_VIDEO_AD_READY, this.rewardVideoAdReadyHandler, this);
    }

}
