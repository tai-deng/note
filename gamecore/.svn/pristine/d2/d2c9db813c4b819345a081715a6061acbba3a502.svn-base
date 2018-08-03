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
var WXOpenData_1;
const { ccclass, property } = cc._decorator;
/**
 * 微信开放数据域接口
 */
let WXOpenData = WXOpenData_1 = class WXOpenData {
    /**
     * 像子域发送消息
     *
     * @param msg
     */
    static postMessage(msg) {
        cc.info("----  WXOpenData ----");
        cc.info("-  postMessage  -");
        cc.info(msg);
        if (typeof wx == "undefined")
            return null;
        let openData = wx.getOpenDataContext();
        openData.postMessage(msg);
    }
    /**
     * 上报用户分数
     */
    static saveUserScoreToCloud(score) {
        cc.info("----  WXOpenData ----");
        cc.info("-  saveScoreToCloud  -");
        if (typeof wx == "undefined")
            return;
        //发送消息
        WXOpenData_1.postMessage({ "action": "__rdm__myScore", "value": score });
        let timestamp = (new Date()).valueOf();
        // cc.info("setUserBestScore", score, timestamp, typeof timestamp);
        try {
            wx.setUserCloudStorage({
                "KVDataList": [
                    {
                        "key": "score",
                        "value": '{"wxgame":{"score":' + score + ', "update_time":' + timestamp + '}}',
                    }
                ]
            });
        }
        catch (error) {
        }
    }
};
WXOpenData = WXOpenData_1 = __decorate([
    ccclass
], WXOpenData);
exports.default = WXOpenData;
