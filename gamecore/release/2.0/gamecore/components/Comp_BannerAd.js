"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameManager_1 = require("../managers/GameManager");
const WXUtils_1 = require("../wechat/WXUtils");
const WXImage_1 = require("../wechat/WXImage");
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
 * 条形广告
 */
let Comp_BannerAd = class Comp_BannerAd extends cc.Component {
    /**
     * 条形广告
     */
    constructor() {
        super(...arguments);
        this.previewImageURL = "";
        this.miniAppID = "";
        this.miniAppURL = "";
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    start() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.tapHandler, this);
    }
    // update (dt) {}
    /**
     * 点击回调
     * @param e
     */
    tapHandler(e) {
        GameManager_1.default.soundsManager.playTapSound();
        if (this.miniAppID != "") {
            WXUtils_1.default.navigateToMiniProgram(this.miniAppID, this.miniAppURL);
        }
        else if (this.previewImageURL != "") {
            WXImage_1.default.previewImage([this.previewImageURL]);
        }
    }
};
__decorate([
    property({
        displayName: "预览图url"
    })
], Comp_BannerAd.prototype, "previewImageURL", void 0);
__decorate([
    property({
        displayName: "小程序ID",
        tooltip: "优先跳转小程序"
    })
], Comp_BannerAd.prototype, "miniAppID", void 0);
__decorate([
    property({
        displayName: "跳转页面",
        tooltip: "设置了miniAppID参数时，该参数才会生效"
    })
], Comp_BannerAd.prototype, "miniAppURL", void 0);
Comp_BannerAd = __decorate([
    ccclass
], Comp_BannerAd);
exports.default = Comp_BannerAd;
