"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WXBannerAd_1;
const WXEventType_1 = require("./WXEventType");
const GameCoreLocation_1 = require("../GameCoreLocation");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const { ccclass, property } = cc._decorator;
/**
 * 微信条形广告
 *
 */
let WXBannerAd = WXBannerAd_1 = class WXBannerAd extends cc.Node {
    /**
     *
     * @param adID                  广告ID
     * @param location              广告位置
     * @param maxWidth              广告最大宽
     * @param verticalIndent        广告垂直方向上偏移像素
     * @param horizontalIndent      广告水平方向上偏移像素
     */
    constructor(adID, location = GameCoreLocation_1.GameCoreLocation.BOTTOM_CENTER, maxWidth = NaN, verticalIndent = 0, horizontalIndent = 0) {
        super();
        //最大高度
        //如果设置了最大高度，再广告resize时，超出该高度时，会自动调节_verticalIndent属性。
        //此时，会忽略_verticalIndent的设置
        this.maxHeight = 0;
        //广告边框宽
        this.borderWeight = 2;
        //垂直方向上偏移像素
        this._vertialIndent = 0;
        //水平方向上偏移像素
        this._horizontalIndent = 0;
        this._isShowing = false;
        //记录当前banner ad
        WXBannerAd_1._currentAd = this;
        this._adID = adID;
        this._location = location;
        this._maxWidth = maxWidth;
        this._vertialIndent = verticalIndent;
        this._horizontalIndent = horizontalIndent;
        this.createAd();
    }
    static get currentAd() {
        return WXBannerAd_1._currentAd;
    }
    /**
     *
     *
     */
    createAd() {
        if (typeof wx == "undefined")
            return;
        this._isNewAd = (WXBannerAd_1._theAd == null);
        if (this._isNewAd) {
            let screenSize = cc.view.getFrameSize();
            let minW = 300;
            let maxW = minW * 1.5;
            if (!isNaN(this._maxWidth) && this._maxWidth > minW) {
                maxW = this._maxWidth;
            }
            let adW = Math.max(minW, Math.min(screenSize.width, maxW));
            let adX = 0;
            let adY = 0;
            switch (this._location) {
                //TODO:NEXT 后期需补齐算法
                case GameCoreLocation_1.GameCoreLocation.BOTTOM_CENTER:
                    adX = (screenSize.width - adW) / 2;
                    adY = screenSize.height;
                    break;
                case GameCoreLocation_1.GameCoreLocation.TOP_CENTER:
                    adX = (screenSize.width - adW) / 2;
                    adY = 0;
                    break;
            }
            //计算边框
            adX += this.borderWeight;
            adY += this.borderWeight;
            adW -= this.borderWeight * 2;
            console.log("----  微信banner广告 ----");
            console.log("-  init  -");
            console.log(adX, adY, adW);
            console.log("-  done  -");
            WXBannerAd_1._theAd = wx.createBannerAd({
                adUnitId: this._adID,
                style: {
                    left: adX,
                    top: adY,
                    width: adW
                }
            });
        }
        let wxBannerAd = this;
        //监听事件
        WXBannerAd_1._theAd.onLoad(function () {
            if (!wxBannerAd._disposed) {
                wxBannerAd._isShowing = true;
                wxBannerAd.adLoadCallback();
            }
        });
        WXBannerAd_1._theAd.onResize(function (res) {
            if (!wxBannerAd._disposed) {
                wxBannerAd.adResizeCallback(res);
            }
        });
        WXBannerAd_1._theAd.onError(function (res) {
            if (!wxBannerAd._disposed) {
                wxBannerAd.adErrorCallback(res);
            }
        });
        this._bannerAd = WXBannerAd_1._theAd;
    }
    /**
     * 获取广告在屏幕上的矩形区域
     */
    get adRect() {
        return this._adRect;
    }
    /**
     * 重新布局
     */
    relayout() {
        console.log("----  微信banner广告 ----");
        console.log("-  relayout  -");
        console.log(this._bannerAd);
        if (!this._bannerAd)
            return;
        if (!this._bannerAd.style)
            return;
        let rw = this._bannerAd.style.realWidth;
        let rh = this._bannerAd.style.realHeight;
        let adW = this._bannerAd.style.width;
        if (isNaN(rw) || isNaN(rh))
            return;
        console.log("【WXBannerAd】rw, rh, maxHeight", rw, rh, this.maxHeight);
        let screenSize = cc.view.getFrameSize();
        let scaleFactor = screenSize.width / cc.winSize.width;
        console.log("frame size", screenSize);
        console.log("window size", cc.winSize);
        console.log("scaleFactor is ", scaleFactor);
        let adX = 0;
        let adY = 0;
        switch (this._location) {
            //TODO:NEXT 后期需补齐算法
            case GameCoreLocation_1.GameCoreLocation.BOTTOM_CENTER:
                adX = (screenSize.width - adW) / 2;
                adY = screenSize.height - rh - this.borderWeight;
                if (this.maxHeight > 0 && rh > this.maxHeight * scaleFactor) {
                    this._vertialIndent = rh - this.maxHeight * scaleFactor;
                }
                break;
            case GameCoreLocation_1.GameCoreLocation.TOP_CENTER:
                adX = (screenSize.width - adW) / 2;
                adY = this.borderWeight;
                if (this.maxHeight > 0 && rh > this.maxHeight * scaleFactor) {
                    this._vertialIndent = -(rh - this.maxHeight * scaleFactor);
                }
                break;
        }
        //偏移
        adX += this._horizontalIndent;
        adY += this._vertialIndent;
        //如果是iphoneX，再往下编译
        // if (Utils.isIphoneX) adY += Utils.iphoneXBottomBarHeight;
        this._bannerAd.style.left = adX;
        this._bannerAd.style.top = adY;
        this._adRect = new cc.Rect(adX - this.borderWeight, adY - this.borderWeight, rw + this.borderWeight * 2, rh + this.borderWeight * 2);
        this.dispatchEvent(new cc.Event(WXEventType_1.default.BANNER_AD_RESIZE, false));
    }
    /**
     * 广告是否正在显示
     *
     */
    get isShowing() {
        return this._isShowing;
    }
    /**
     * 显示广告
     */
    show() {
        console.log("----  微信banner广告 ----");
        console.log("-  show  -");
        if (this._bannerAd) {
            this._isShowing = true;
            this._bannerAd.show();
            this.dispatchEvent(new cc.Event(WXEventType_1.default.BANNER_AD_SHOW, false));
            if (!this._isNewAd) {
                this.relayout();
            }
        }
    }
    /**
     * 隐藏广告
     */
    hide() {
        console.log("----  微信banner广告 ----");
        console.log("-  hide  -");
        if (this._bannerAd) {
            this._isShowing = false;
            this._bannerAd.hide();
            this.dispatchEvent(new cc.Event(WXEventType_1.default.BANNER_AD_HIDE, false));
        }
    }
    /**
     * 销毁广告
     *
     *
     * @param   doReal 是否真的释放。如果是，则销毁广告，否则只是隐藏。
     *
     */
    dispose(doReal = false) {
        if (this._disposed)
            return;
        this._disposed = true;
        //重置当前广告索引
        if (WXBannerAd_1._currentAd == this) {
            WXBannerAd_1._currentAd = null;
        }
        console.log("----  微信banner广告 ----");
        console.log("-  destroy  -");
        if (this._bannerAd) {
            if (doReal) {
                WXBannerAd_1._theAd.destroy();
            }
            else {
                this._bannerAd.hide();
            }
            this._bannerAd = null;
        }
    }
    /**
     * 广告加载完成回调
     */
    adLoadCallback() {
        console.log("----  微信banner广告 ----");
        console.log("-  adLoadCallback  -");
    }
    /**
     * 广告resize回调
     */
    adResizeCallback(res) {
        console.log("----  微信banner广告 ----");
        console.log("-  adResizeCallback  -");
        console.log(res);
        console.log(this, this.relayout);
        // this.relayout();
        setTimeout(this.relayout.bind(this), 1000);
    }
    /**
     * 广告错误回调
     */
    adErrorCallback(res) {
        console.log("----  微信banner广告 ----");
        console.log("-  adErrorCallback  -");
        console.log(res);
    }
};
WXBannerAd = WXBannerAd_1 = __decorate([
    ccclass
], WXBannerAd);
exports.default = WXBannerAd;
