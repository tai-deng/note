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
/**
 * 微信核心接口库
 */
let WXCore = WXCore_1 = class WXCore {
    /**
     * 系统信息
     *
     * brand	    string	    手机品牌	1.5.0
     * model	    string	    手机型号
     * pixelRatio	number	    设备像素比
     * screenWidth	number	    屏幕宽度	1.1.0
     * screenHeight	number	    屏幕高度	1.1.0
     * windowWidth	number	    可使用窗口宽度
     * windowHeight	number	    可使用窗口高度
     * language	    string	    微信设置的语言
     * version	    string	    微信版本号
     * system	    string	    操作系统版本
     * platform	    string	    客户端平台
     * fontSizeSetting	number	用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位 px。	1.5.0
     * SDKVersion	    string	客户端基础库版本	1.1.0
     * benchmarkLevel	number	性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>=1 设备性能值，该值越高，设备性能越好(目前设备最高不到50)	1.8.0
     * battery	        number	电量，范围 1 - 100	1.9.0
     * wifiSignal	    number	wifi 信号强度，范围 0 - 4
     */
    static get systemInfo() {
        if (!WXCore_1._systemInfo) {
            WXCore_1.getSystemInfo();
        }
        return WXCore_1._systemInfo;
    }
    /**
     * 获取wx SDK版本号
     */
    static get SDKVersion() {
        if (!WXCore_1._systemInfo) {
            WXCore_1.getSystemInfo();
        }
        if (WXCore_1._systemInfo) {
            return WXCore_1._systemInfo["SDKVersion"];
        }
        return null;
    }
    /**
     * 获取性能得分
     *
     * 性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>=1 设备性能值，该值越高，设备性能越好(目前设备最高不到50)	1.8.0
     */
    static get benchmarkLevel() {
        return WXCore_1._benchmarkLevel;
    }
    /**
     * 获取请求携带参数
     */
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
    /**
     * 获取系统信息
     *
     * @see https://developers.weixin.qq.com/minigame/dev/document/system/system-info/wx.getSystemInfoSync.html
     */
    static getSystemInfo() {
        cc.info("----  WX Core ----");
        cc.info("-  getSystemInfo  -");
        if (typeof wx == "undefined")
            return;
        let info = wx.getSystemInfoSync();
        //设备参数
        if (info && info["benchmarkLevel"] != undefined) {
            let v = parseInt("" + info["benchmarkLevel"]);
            if (!isNaN(v) && v > 0) {
                WXCore_1._benchmarkLevel = v;
            }
        }
        WXCore_1._systemInfo = info;
    }
    /**
     * 显示信息提示
     *
     * @param info 信息内容
     * @param duration 显示时间（毫秒）
     */
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
    //震动反馈
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
    /**
     * 上报用户分数
     */
    static saveUserScore(score) {
        cc.info("----  WX Core ----");
        cc.info("-  saveUserScore  -");
        if (typeof wx == "undefined")
            return;
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
    /**
     * 获取我的数据
     *
     * @see https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getUserCloudStorage.html
     */
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
    /**
     * 获取我的好友数据
     */
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
    /**
     * 预览图片
     *
     * @param images 图片的url列表
     */
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
    /**
     * 保存图片到相册
     *
     * @param imagePath
     * @param success               保存成功回调
     * @param fail                  保存失败回调
     * @param complete              完成回调
     */
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
    /**
     * 分享app
     *
     * @param   title       分享的title
     * @param   imageURL    分享的图片url
     * @param   queryObj    分享携带数据
     * @param   callback    成功回调
     */
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
    /**
     * 设置关闭小游戏时，是否退出游戏
     *
     * @param v
     */
    // static setExitGameWhenHide(v:boolean):void {
    //     cc.info("----  WX Core ----");
    //     cc.info("-  setExitGameWhenHide  -");
    //     cc.info(v);
    //     if(typeof wx == "undefined") return;
    //     if (v) {
    //         wx.onHide(WXCore.hideForExitGameCallback);
    //     } else {
    //         wx.offHide(WXCore.hideForExitGameCallback);
    //     }
    // }
    // private static hideForExitGameCallback():void {
    //     wx.exitMiniProgram();//退出游戏
    // }
    /**
     * 创建图片
     *
     */
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
    //上报数据
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
    //获取我的数据
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
