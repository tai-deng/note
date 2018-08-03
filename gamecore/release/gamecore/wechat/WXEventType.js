"use strict";
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
/**
 * wx的事件定义
 */
let WXEventType = class WXEventType {
};
//条形广告resize
WXEventType.BANNER_AD_RESIZE = "bannerAdResize";
//条形广告显示
WXEventType.BANNER_AD_SHOW = "bannerAdShow";
//条形广告影藏
WXEventType.BANNER_AD_HIDE = "bannerAdHide";
//激励视频广告关闭，未播放完成
WXEventType.REWARD_VIDEO_AD_CLOSE = "rewardVideoAdClose";
//激励视频广告播放完成
WXEventType.REWARD_VIDEO_AD_COMPLETE = "rewardVideoAdComplete";
//激励视频广告准备好
WXEventType.REWARD_VIDEO_AD_READY = "rewardVideoAdReady";
//激励视频广告显示错误
WXEventType.REWARD_VIDEO_AD_ERROR = "rewardVideoAdError";
WXEventType = __decorate([
    ccclass
], WXEventType);
exports.default = WXEventType;
