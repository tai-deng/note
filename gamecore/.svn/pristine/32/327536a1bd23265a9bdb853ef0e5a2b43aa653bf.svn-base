"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WXRewardVideoAd_1;
const GameManager_1 = require("../managers/GameManager");
const WXEventType_1 = require("./WXEventType");
const WXUtils_1 = require("./WXUtils");
const { ccclass, property } = cc._decorator;
/**
 * 微信激励视频广告
 *
 */
let WXRewardVideoAd = WXRewardVideoAd_1 = class WXRewardVideoAd {
    /**
     * 设置广告id
     */
    static set adID(value) {
        console.log("----  微信视频广告 ----");
        console.log("-  set ad id  -");
        console.log(value);
        if (WXRewardVideoAd_1._adID != value) {
            WXRewardVideoAd_1._adID = value;
            WXRewardVideoAd_1.reset();
        }
    }
    /**
     * 获取视频广告id
     */
    static get adID() {
        return WXRewardVideoAd_1._adID;
    }
    /**
     * 广告是否已准备好
     */
    static get isReady() {
        return WXRewardVideoAd_1._isReady;
    }
    //获取上一次视频广告完成播放时间（毫秒、本地时间）
    static get lastVideoAdTime() {
        return WXRewardVideoAd_1._lastVideoAdTime;
    }
    /**
     * 是否正在播放视频广告
     */
    static get isPlaying() {
        return WXRewardVideoAd_1._isPlaying;
    }
    /**
     * 显示广告
     */
    static show() {
        console.log("----  微信视频广告 ----");
        console.log("-  show  -");
        console.log("WXRewardVideoAd._isReady", WXRewardVideoAd_1._isReady);
        console.log("WXRewardVideoAd._isPlaying", WXRewardVideoAd_1._isPlaying);
        if (!WXRewardVideoAd_1._isReady)
            return false;
        if (WXRewardVideoAd_1._isPlaying)
            return false;
        //记录当前背景音乐是否已静音
        WXRewardVideoAd_1._originalBGMMuted = GameManager_1.default.soundsManager.musicMuted;
        //静音背景音乐
        GameManager_1.default.soundsManager.muteMusic();
        WXRewardVideoAd_1._ad.show();
        WXRewardVideoAd_1._isPlaying = true;
        return true;
    }
    /**
     * 重置
     */
    static reset() {
        console.log("----  微信视频广告 ----");
        console.log("-  reset  -");
        if (WXRewardVideoAd_1._ad) {
            WXRewardVideoAd_1._ad.offLoad(WXRewardVideoAd_1.adLoadCallback);
            WXRewardVideoAd_1._ad.offClose(WXRewardVideoAd_1.adCloseCallback);
            WXRewardVideoAd_1._ad.offError(WXRewardVideoAd_1.adErrorCallback);
            WXRewardVideoAd_1._ad = null;
        }
        //重置参数
        WXRewardVideoAd_1._isReady = false;
        WXRewardVideoAd_1._isPlaying = false;
        if (!WXRewardVideoAd_1._adID)
            return;
        if (typeof wx == "undefined")
            return;
        WXRewardVideoAd_1._ad = wx.createRewardedVideoAd({
            adUnitId: WXRewardVideoAd_1._adID
        });
        //监听事件
        WXRewardVideoAd_1._ad.onLoad(WXRewardVideoAd_1.adLoadCallback);
        WXRewardVideoAd_1._ad.onClose(WXRewardVideoAd_1.adCloseCallback);
        WXRewardVideoAd_1._ad.onError(WXRewardVideoAd_1.adErrorCallback);
        WXRewardVideoAd_1._ad.load();
    }
    /**
     * 广告加载完成回调
     */
    static adLoadCallback() {
        console.log("----  微信视频广告 ----");
        console.log("-  adLoadCallback  -");
        WXRewardVideoAd_1._isReady = true;
        GameManager_1.default.eventManager.dispatchEventWith(WXEventType_1.default.REWARD_VIDEO_AD_READY);
    }
    /**
     * 广告关闭回调
     */
    static adCloseCallback(res = null) {
        console.log("----  微信视频广告 ----");
        console.log("-  adCloseCallback  -");
        console.log(res);
        //恢复背景音乐
        if (!WXRewardVideoAd_1._originalBGMMuted) {
            GameManager_1.default.soundsManager.unmuteMusic();
            WXRewardVideoAd_1._originalBGMMuted = false;
        }
        WXRewardVideoAd_1._isPlaying = false;
        // if (res) {
        if (res && res["isEnded"] == true) {
            //记录播放时间
            WXRewardVideoAd_1._lastVideoAdTime = new Date().getTime();
            GameManager_1.default.eventManager.dispatchEventWith(WXEventType_1.default.REWARD_VIDEO_AD_COMPLETE);
        }
        else {
            //显示信息提示
            WXUtils_1.default.showToast("请看完整段视频");
            GameManager_1.default.eventManager.dispatchEventWith(WXEventType_1.default.REWARD_VIDEO_AD_CLOSE);
        }
        // } else {
        //     //兼容处理
        //     GameManager.eventManager.dispatchEventWith(WXEventType.REWARD_VIDEO_AD_COMPLETE);
        // }
    }
    /**
     * 广告错误回调
     */
    static adErrorCallback(res) {
        console.log("----  微信视频广告 ----");
        console.log("-  adErrorCallback  -");
        console.log(res);
        //恢复背景音乐
        if (!WXRewardVideoAd_1._originalBGMMuted) {
            GameManager_1.default.soundsManager.unmuteMusic();
            WXRewardVideoAd_1._originalBGMMuted = false;
        }
        WXRewardVideoAd_1._isPlaying = false;
        GameManager_1.default.eventManager.dispatchEventWith(WXEventType_1.default.REWARD_VIDEO_AD_ERROR);
    }
};
//广告是否已准备好
WXRewardVideoAd._isReady = false;
//上一次视频广告完成播放时间（毫秒、本地时间）
WXRewardVideoAd._lastVideoAdTime = 0;
WXRewardVideoAd = WXRewardVideoAd_1 = __decorate([
    ccclass
], WXRewardVideoAd);
exports.default = WXRewardVideoAd;
