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
const LocationValues_1 = require("../LocationValues");
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
    constructor(adID, location = "BC", maxWidth = NaN, verticalIndent = 0, horizontalIndent = 0) {
        super();
        //垂直方向上偏移像素
        this._vertialIndent = 0;
        //水平方向上偏移像素
        this._horizontalIndent = 0;
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
                case LocationValues_1.default.BOTTOM_CENTER:
                    adX = (screenSize.width - adW) / 2;
                    adY = screenSize.height;
                    break;
                case LocationValues_1.default.TOP_CENTER:
                    adX = (screenSize.width - adW) / 2;
                    adY = 0;
                    break;
            }
            //计算边框
            adX += WXBannerAd_1.AD_BORDER_WEIGHT;
            adY += WXBannerAd_1.AD_BORDER_WEIGHT;
            adW -= WXBannerAd_1.AD_BORDER_WEIGHT * 2;
            cc.info("----  微信banner广告 ----");
            cc.info("-  init  -");
            cc.info(adX, adY, adW);
            cc.info("-  done  -");
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
        cc.info("----  微信banner广告 ----");
        cc.info("-  relayout  -");
        cc.info(this._bannerAd);
        if (!this._bannerAd)
            return;
        if (!this._bannerAd.style)
            return;
        let rw = this._bannerAd.style.realWidth;
        let rh = this._bannerAd.style.realHeight;
        let adW = this._bannerAd.style.width;
        if (isNaN(rw) || isNaN(rh))
            return;
        let screenSize = cc.view.getFrameSize();
        let adX = 0;
        let adY = 0;
        switch (this._location) {
            //TODO:NEXT 后期需补齐算法
            case LocationValues_1.default.BOTTOM_CENTER:
                adX = (screenSize.width - adW) / 2;
                adY = screenSize.height - rh - WXBannerAd_1.AD_BORDER_WEIGHT;
                break;
            case LocationValues_1.default.TOP_CENTER:
                adX = (screenSize.width - adW) / 2;
                adY = WXBannerAd_1.AD_BORDER_WEIGHT;
                break;
        }
        //偏移
        adX += this._horizontalIndent;
        adY -= this._vertialIndent;
        this._bannerAd.style.left = adX;
        this._bannerAd.style.top = adY;
        this._adRect = new cc.Rect(adX - WXBannerAd_1.AD_BORDER_WEIGHT, adY - WXBannerAd_1.AD_BORDER_WEIGHT, rw + WXBannerAd_1.AD_BORDER_WEIGHT * 2, rh + WXBannerAd_1.AD_BORDER_WEIGHT * 2);
        this.dispatchEvent(new cc.Event(WXEventType_1.default.BANNER_AD_RESIZE, false));
    }
    /**
     * 显示广告
     */
    show() {
        cc.info("----  微信banner广告 ----");
        cc.info("-  show  -");
        if (this._bannerAd) {
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
        cc.info("----  微信banner广告 ----");
        cc.info("-  hide  -");
        if (this._bannerAd) {
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
        cc.info("----  微信banner广告 ----");
        cc.info("-  destroy  -");
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
        cc.info("----  微信banner广告 ----");
        cc.info("-  adLoadCallback  -");
    }
    /**
     * 广告resize回调
     */
    adResizeCallback(res) {
        cc.info("----  微信banner广告 ----");
        cc.info("-  adResizeCallback  -");
        cc.info(res);
        cc.info(this, this.relayout);
        this.relayout();
    }
    /**
     * 广告错误回调
     */
    adErrorCallback(res) {
        cc.info("----  微信banner广告 ----");
        cc.info("-  adErrorCallback  -");
        cc.info(res);
    }
};
//广告边框宽
WXBannerAd.AD_BORDER_WEIGHT = 2;
WXBannerAd = WXBannerAd_1 = __decorate([
    ccclass
], WXBannerAd);
exports.default = WXBannerAd;
