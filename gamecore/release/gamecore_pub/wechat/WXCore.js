"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WXCore_1;
const { ccclass, property } = cc._decorator;
if (typeof wx != "undefined") {
    wx.onShow(function (res) {
        cc.info("----  WX Core ----");
        cc.info("-  onShow  -");
        cc.info(res);
        WXCore.query = res["query"];
    });
}
let WXCore = WXCore_1 = class WXCore {
    static get systemInfo() {
        if (!WXCore_1._systemInfo) {
            WXCore_1.getSystemInfo();
        }
        return WXCore_1._systemInfo;
    }
    static get SDKVersion() {
        if (!WXCore_1._systemInfo) {
            WXCore_1.getSystemInfo();
        }
        if (WXCore_1._systemInfo) {
            return WXCore_1._systemInfo["SDKVersion"];
        }
        return null;
    }
    static get benchmarkLevel() {
        return WXCore_1._benchmarkLevel;
    }
    static get queryData() {
        cc.info("----  WX Core ----");
        cc.info("-  queryData  -");
        if (typeof wx == "undefined")
            return null;
        let options = wx.getLaunchOptionsSync();
        cc.info("----  小幺鸡 API ----");
        cc.info("-  wx.getLaunchOptionsSync  -");
        cc.info(options);
        if (options)
            return options["query"];
        return null;
    }
    static getSystemInfo() {
        cc.info("----  WX Core ----");
        cc.info("-  getSystemInfo  -");
        if (typeof wx == "undefined")
            return;
        let info = wx.getSystemInfoSync();
        if (info && info["benchmarkLevel"] != undefined) {
            let v = parseInt("" + info["benchmarkLevel"]);
            if (!isNaN(v) && v > 0) {
                WXCore_1._benchmarkLevel = v;
            }
        }
        WXCore_1._systemInfo = info;
    }
    static showToast(info, duration = 1500) {
        cc.info("----  WX Core ----");
        cc.info("-  showToast  -");
        cc.info(info);
        if (typeof wx == "undefined")
            return;
        try {
            wx.showToast({
                "title": info,
                "icon": "none",
                "duration": duration,
                "mask": false,
            });
        }
        catch (error) {
        }
    }
    static vibrateShort() {
        cc.info("----  WX Core ----");
        cc.info("-  vibrateShort  -");
        if (typeof wx == "undefined")
            return;
        try {
            wx.vibrateShort({});
        }
        catch (error) {
            cc.info("catch a error from wx:");
            cc.info(error);
        }
    }
    static saveUserScore(score) {
        cc.info("----  WX Core ----");
        cc.info("-  saveUserScore  -");
        if (typeof wx == "undefined")
            return;
        let timestamp = (new Date()).valueOf();
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
    static getUserScore(successCallback, failCallback = null) {
        cc.info("----  WX Core ----");
        cc.info("-  getUserScore  -");
        if (typeof wx == "undefined")
            return;
        try {
            wx.getUserCloudStorage({
                "keyList": ["score"],
                "success": successCallback,
                "fail": failCallback
            });
        }
        catch (error) {
            cc.info(error);
        }
    }
    static getFriendData(successCallback, failCallback = null) {
        cc.info("----  WX Core ----");
        cc.info("-  getFriendData  -");
        if (typeof wx == "undefined")
            return;
        wx.getFriendCloudStorage({
            "keyList": ["score"],
            "success": successCallback,
            "fail": failCallback
        });
    }
    static previewImage(images) {
        cc.info("----  WX Core ----");
        cc.info("-  vibrateShort  -");
        if (typeof wx == "undefined")
            return;
        try {
            wx.previewImage({
                "urls": images
            });
        }
        catch (error) {
        }
    }
    static saveImageToPhotosAlbum(imagePath, success = null, fail = null, complete = null) {
        cc.info("----  WX Core ----");
        cc.info("-  saveImageToPhotosAlbum  -");
        cc.info(imagePath);
        if (typeof wx == "undefined")
            return;
        try {
            wx.saveImageToPhotosAlbum({
                "filePath": imagePath,
                "success": success,
                "fail": fail,
                "complete": complete,
            });
        }
        catch (error) {
        }
    }
    static shareApp(title, imageURL, queryObj = null, callback = null) {
        cc.info("----  WX Core ----");
        cc.info("-  shareApp  -");
        if (typeof wx == "undefined")
            return;
        try {
            let obj = {
                title: title,
                imageUrl: imageURL,
                success: callback
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
    static createImage(imageURL) {
        cc.info("----  WX Core ----");
        cc.info("-  createImage  -");
        cc.info(imageURL);
        if (typeof wx == "undefined")
            return null;
        let tex = new cc.Texture2D();
        let icon = wx.createImage();
        icon.src = imageURL;
        icon.onload = function () {
            tex.initWithElement(icon);
            tex.handleLoadedTexture();
        };
        return new cc.SpriteFrame(tex);
    }
    static getUserInfo(successCallback, failCallback) {
        try {
            wx.getUserInfo({
                openIdList: ['selfOpenId'],
                lang: 'zh_CN',
                success: successCallback,
                fail: failCallback
            });
        }
        catch (error) {
        }
    }
    static setUserBestScore(score) {
        let timestamp = (new Date()).valueOf();
        cc.info("setUserBestScore", score, timestamp, typeof timestamp);
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
    static getUserBestScore(successCallback, failCallback) {
        try {
            wx.getUserCloudStorage({
                "keyList": ["score"],
                "success": successCallback,
                "fail": failCallback
            });
        }
        catch (error) {
            cc.info(error);
        }
    }
};
WXCore._benchmarkLevel = -1;
WXCore = WXCore_1 = __decorate([
    ccclass
], WXCore);
exports.default = WXCore;
