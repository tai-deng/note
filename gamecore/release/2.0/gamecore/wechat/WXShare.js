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
 * 微信分享相关接口
 *
 */
let WXShare = class WXShare {
    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     *
     * @param title             分享title
     * @param imageURL          分享的图片加载地址
     * @param queryObj          分享携带参数
     *
     * @see https://developers.weixin.qq.com/minigame/dev/document/share/wx.onShareAppMessage.html
     */
    static setOnShareAppMessage(title, imageURL, queryObj = null) {
        console.log("----  WXShare ----");
        console.log("-  setOnShareAppMessage  -");
        if (typeof wx == "undefined")
            return;
        console.log(title, imageURL, queryObj);
        let obj = {
            title: title,
            imageUrl: imageURL
        };
        if (queryObj) {
            let queryStr = "";
            for (let key in queryObj) {
                if (queryStr != "")
                    queryStr += "&";
                queryStr += encodeURIComponent(key) + "=" + encodeURIComponent(queryObj[key]);
            }
            obj["query"] = queryStr;
        }
        wx.onShareAppMessage(function () {
            return obj;
        });
        wx.showShareMenu({
            "withShareTicket": true
        });
    }
    /**
     * 分享app
     *
     * @param   title       分享的title
     * @param   imageURL    分享的图片url
     * @param   queryObj    分享携带数据
     */
    static shareApp(title, imageURL, queryObj = null) {
        console.log("----  WX Core ----");
        console.log("-  shareApp  -");
        if (typeof wx == "undefined")
            return;
        try {
            let obj = {
                title: title,
                imageUrl: imageURL
            };
            if (queryObj) {
                let queryStr = "";
                for (let key in queryObj) {
                    if (queryStr != "")
                        queryStr += "&";
                    queryStr += encodeURIComponent(key) + "=" + encodeURIComponent(queryObj[key]);
                }
                obj["query"] = queryStr;
            }
            wx.shareAppMessage(obj);
        }
        catch (error) {
        }
    }
    /**
     * 分享到群
     *
     * @param   title       分享的title
     * @param   imageURL    分享的图片url
     * @param   queryObj    分享携带数据
     * @param   callback    返回回调。接受一个string类型参数，为shareTicket
     */
    static shareAppToGroup(title, imageURL, queryObj = null, callback = null) {
        console.log("----  WXShare ----");
        console.log("-  shareAppToGroup  -");
        if (typeof wx == "undefined")
            return;
        try {
            let obj = {
                title: title,
                imageUrl: imageURL,
            };
            if (callback != null) {
                obj["success"] = function (res) {
                    let shareTicket = null;
                    if (res && res["shareTickets"]) {
                        shareTicket = res["shareTickets"][0];
                    }
                    callback.call(null, shareTicket);
                };
            }
            if (queryObj) {
                let queryStr = "";
                for (let key in queryObj) {
                    if (queryStr != "")
                        queryStr += "&";
                    queryStr += encodeURIComponent(key) + "=" + encodeURIComponent(queryObj[key]);
                }
                obj["query"] = queryStr;
            }
            wx.shareAppMessage(obj);
        }
        catch (error) {
        }
    }
};
WXShare = __decorate([
    ccclass
], WXShare);
exports.default = WXShare;
