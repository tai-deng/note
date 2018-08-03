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
const WXCore_1 = require("../wechat/WXCore");
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
 * 广告按钮
 */
let AdButton = class AdButton extends cc.Component {
    /**
     * 广告按钮
     */
    constructor() {
        super(...arguments);
        /**
         * 动画间隔
         */
        this.effectDelay = 3;
    }
    start() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.tapHandler, this);
        this.showEffect();
        this.schedule(this.getAdData, 2, 1);
        //默认不可见
        // this.node.active = false;
        this.node.opacity = 0;
    }
    getAdData() {
        cc.info("get ad data");
        if (this._adData)
            return;
        //请求数据
        let script = this;
        XYJAPI_1.default.getAdImageData(function (data) {
            if (data && data["imageurl"]) {
                script._adData = data;
                //script.node.active = true;
                script.node.opacity = 255;
            }
        });
        this.schedule(this.getAdData, 3, 1);
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
        //预览图片
        if (this._adData) {
            WXCore_1.default.previewImage([this._adData["imageurl"]]);
        }
    }
    /**
     * 播放效果
     */
    showEffect() {
        this.node.stopAllActions();
        if (this._adData) {
            if (Math.random() > 0.5) {
                this.effectZoom();
            }
            else {
                this.effectShake();
            }
        }
        this.schedule(this.showEffect, this.effectDelay + Math.random(), 1);
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
        let toS = 0.6 + Math.random() * 0.2;
        // let cc.sequence(cc.rotateTo(0.5, toR));
        let act = cc.sequence(cc.scaleTo(0.5, toS), cc.scaleTo(0.5, 1).easing(cc.easeBounceOut()));
        this.node.runAction(act);
    }
    onDestroy() {
        this.node.stopAllActions();
        this.unschedule(this.showEffect);
        this.unschedule(this.getAdData);
    }
};
AdButton = __decorate([
    ccclass
], AdButton);
exports.default = AdButton;
