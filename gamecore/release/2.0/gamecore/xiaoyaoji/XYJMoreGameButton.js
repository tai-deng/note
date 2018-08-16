"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameManager_1 = require("../managers/GameManager");
const XYJAPI_1 = require("./XYJAPI");
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
 * 小幺鸡更多游戏按钮
 */
let XYJMoreGameButton = class XYJMoreGameButton extends cc.Component {
    /**
     * 小幺鸡更多游戏按钮
     */
    constructor() {
        super(...arguments);
        this.wxAppID = "wx655c04bb45e867d7";
        this.wxAppPath = "";
        /**
         * 动画间隔
         */
        this.effectDelay = 3;
    }
    start() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.tapHandler, this);
        this.showEffect();
        //如果有wxAppID，直接跳转
        if (!this.wxAppID) {
            this.node.opacity = 0;
            this.getAdData();
        }
    }
    getAdData() {
        console.log("get ad data");
        if (this._adData)
            return;
        //请求数据
        XYJAPI_1.default.getAdImageData((data) => {
            if (data && data["imageurl"]) {
                this._adData = data;
                this.node.opacity = 255;
            }
            else {
                this.scheduleOnce(this.getAdData, 3);
            }
        });
    }
    // update (dt) {}
    /**
     * 广告按钮点击
     * @param e
     */
    tapHandler(e) {
        if (this.node.opacity < 10)
            return;
        GameManager_1.default.soundsManager.playTapSound();
        if (this.wxAppID) {
            WXUtils_1.default.navigateToMiniProgram(this.wxAppID, this.wxAppPath);
        }
        else if (this._adData) {
            //预览图片
            WXImage_1.default.previewImage([this._adData["imageurl"]]);
        }
    }
    /**
     * 播放效果
     */
    showEffect() {
        this.node.stopAllActions();
        // if (this._adData) {
        if (Math.random() > 0.5) {
            this.effectZoom();
        }
        else {
            this.effectShake();
        }
        // }
        this.unschedule(this.showEffect);
        let delay = this.effectDelay + Math.random();
        this.schedule(this.showEffect, delay, 1);
    }
    /**
     * 晃动
     */
    effectShake() {
        let toR = (40 + Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1);
        // let cc.sequence(cc.rotateTo(0.5, toR));
        let act = cc.sequence(cc.rotateTo(0.5, toR), cc.rotateTo(0.5, 0).easing(cc.easeBounceOut()));
        this.node.runAction(act);
    }
    /**
     * 缩放
     */
    effectZoom() {
        let toS = 0.7 + Math.random() * 0.2;
        // let cc.sequence(cc.rotateTo(0.5, toR));
        let act = cc.sequence(cc.scaleTo(0.5, toS), cc.scaleTo(0.5, 1).easing(cc.easeBounceOut()));
        this.node.runAction(act);
    }
    onDestroy() {
        console.log("destroy");
        this.node.stopAllActions();
        this.unschedule(this.showEffect);
        this.unschedule(this.getAdData);
    }
};
__decorate([
    property({
        displayName: "微信AppID"
    })
], XYJMoreGameButton.prototype, "wxAppID", void 0);
__decorate([
    property({
        displayName: "跳转页面"
    })
], XYJMoreGameButton.prototype, "wxAppPath", void 0);
XYJMoreGameButton = __decorate([
    ccclass
], XYJMoreGameButton);
exports.default = XYJMoreGameButton;
