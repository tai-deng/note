"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WXABannerAd_1;
const WXBannerAd_1 = require("./WXBannerAd");
const WXEventType_1 = require("./WXEventType");
const LocationValues_1 = require("../LocationValues");
const Utils_1 = require("../managers/Utils");
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
 * 一个banner广告
 */
let WXABannerAd = WXABannerAd_1 = class WXABannerAd extends cc.Component {
    /**
     * 一个banner广告
     */
    constructor() {
        super(...arguments);
        this.adID = "";
        this.adLocation = "BC";
        //广告最大宽度
        this.maxWidth = 0;
        //广告垂直方向的便宜
        this.verticalIndent = 0;
        //广告水平方向的便宜
        this.horizontalIndent = 0;
    }
    start() {
        this.node.scale = 0;
        //改变锚点
        this.node.anchorX = 0;
        this.node.anchorY = 0;
        if (!this.adLocation)
            this.adLocation = LocationValues_1.default.BOTTOM_CENTER;
        if (this.maxWidth <= 0)
            this.maxWidth = NaN;
        this._wxBannerAd = new WXBannerAd_1.default(this.adID, this.adLocation, this.maxWidth, this.verticalIndent, this.horizontalIndent);
        this._wxBannerAd.on(WXEventType_1.default.BANNER_AD_HIDE, this.adHideHandler, this);
        this._wxBannerAd.on(WXEventType_1.default.BANNER_AD_SHOW, this.adShowHandler, this);
        this._wxBannerAd.on(WXEventType_1.default.BANNER_AD_RESIZE, this.adResizeHandler, this);
        this._wxBannerAd.show();
    }
    /**
     * banner显示
     *
     * @param e
     */
    adShowHandler(e) {
        this.node.active = true;
    }
    /**
     * banner隐藏
     *
     * @param e
     */
    adHideHandler(e) {
        this.node.active = false;
    }
    adResizeHandler(e) {
        let rect = this._wxBannerAd.adRect;
        rect = Utils_1.default.fromScreenRect(rect);
        // cc.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@1");
        // cc.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
        // cc.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@3");
        // cc.info(rect.x, rect.y, rect.width, rect.height);
        this.node.x = rect.x;
        this.node.y = rect.y;
        this.node.scaleX = rect.width / this.node.width;
        this.node.scaleY = rect.height / this.node.height;
        this.node.dispatchEvent(new cc.Event(WXEventType_1.default.BANNER_AD_RESIZE, false));
        //尝试再次显示，以便兼容iphoneX
        if (Utils_1.default.isIphoneX)
            this.fixIphoneXBug();
    }
    fixIphoneXBug() {
        if (!WXABannerAd_1._isDoneFixed) {
            WXABannerAd_1._isDoneFixed = true;
            // this.schedule(function():void {
            //     this._wxBannerAd.hide();
            // }, 0.5, 1);
            this.schedule(function () {
                this._wxBannerAd.show();
            }, 1.5, 1);
        }
    }
    // update (dt) {}
    onDestroy() {
        if (this._wxBannerAd) {
            this._wxBannerAd.off(WXEventType_1.default.BANNER_AD_HIDE, this.adHideHandler, this);
            this._wxBannerAd.off(WXEventType_1.default.BANNER_AD_SHOW, this.adShowHandler, this);
            this._wxBannerAd.off(WXEventType_1.default.BANNER_AD_RESIZE, this.adResizeHandler, this);
            // this._wxBannerAd.hide();
            this._wxBannerAd.dispose();
            this._wxBannerAd = null;
        }
    }
};
__decorate([
    property({
        displayName: "广告ID"
    })
], WXABannerAd.prototype, "adID", void 0);
__decorate([
    property({
        displayName: "位置",
        tooltip: "BC:底部居中\rTC:顶部居中"
    })
], WXABannerAd.prototype, "adLocation", void 0);
__decorate([
    property({
        displayName: "最大宽度"
    })
], WXABannerAd.prototype, "maxWidth", void 0);
__decorate([
    property({
        displayName: "Y轴偏移"
    })
], WXABannerAd.prototype, "verticalIndent", void 0);
__decorate([
    property({
        displayName: "X轴偏移"
    })
], WXABannerAd.prototype, "horizontalIndent", void 0);
WXABannerAd = WXABannerAd_1 = __decorate([
    ccclass
], WXABannerAd);
exports.default = WXABannerAd;
