"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var XYJAPI_1;
const GameManager_1 = require("../managers/GameManager");
const md5_1 = require("../libs/md5");
const ShareTypes_1 = require("./ShareTypes");
const Utils_1 = require("../managers/Utils");
const XYJEventNames_1 = require("./XYJEventNames");
const WXShare_1 = require("../wechat/WXShare");
const WXUtils_1 = require("../wechat/WXUtils");
const { ccclass, property } = cc._decorator;
if (typeof wx != "undefined") {
    wx.onShow(function (res) {
        console.log("----  小幺鸡 API ----");
        console.log("-  wx.onShow  -");
        console.log(res);
        let query = res["query"];
        //分享者id
        XYJAPI.inviterOpenID = query.openID;
        //分享者id
        XYJAPI.inviterUserID = query.userID;
        //分享者昵称
        XYJAPI.inviterNickname = decodeURIComponent(query.nickname);
        //分享的时间戳（秒）
        XYJAPI.inviterTime = parseInt(query.time);
        if (isNaN(XYJAPI.inviterTime))
            XYJAPI.inviterTime = 0;
        XYJAPI.gameStartTime = Math.floor(new Date().getTime() / 1000);
        //分享做什么
        XYJAPI.inviterAction = query.action;
        XYJAPI.inviterChannel = query.channel;
        //分享来自哪一局游戏
        XYJAPI.inviterGameRecordID = query.recordID;
    });
}
/**
 * 小幺鸡api
 *
 * @see http://www.xiaoyaoji.cn/share/MsmrbiWWx/UNX8Vu1aN?password=wx
 */
let XYJAPI = XYJAPI_1 = class XYJAPI {
    /**
     * 获取渠道ID
     */
    static get channelID() {
        return XYJAPI_1._channelID;
    }
    static get userInfo() { return XYJAPI_1._userInfo; }
    /**
     * 初始化
     *
     * @param channelID         渠道ID
     */
    static init(channelID) {
        if (XYJAPI_1._initialized)
            return;
        XYJAPI_1._initialized = true;
        //渠道id
        XYJAPI_1._channelID = channelID;
        //检查是否是调试模式
        if (GameManager_1.default.isDebug) {
            XYJAPI_1._baseURL = "https://tball.yz071.com/";
        }
        else {
            XYJAPI_1._baseURL = "https://ball.yz071.com/";
        }
        console.log("----  小幺鸡 API ----");
        console.log("-  init   -");
        console.log(XYJAPI_1._baseURL);
        if (typeof wx == "undefined")
            return;
        wx.login({
            "success": XYJAPI_1.loginCallback,
        });
    }
    /**
     * 获取需要携带的数据
     *
     * @param shareType         分享类型。
     *
     * @see ShareTypes
     */
    static getShareQueryData(shareType = ShareTypes_1.default.NORMAL) {
        let queryObj = {
            "openID": XYJAPI_1.userOpenID,
            "userID": XYJAPI_1.userID,
            "channel": XYJAPI_1.inviterChannel,
            "action": shareType,
            "time": Math.floor(new Date().getTime() / 1000)
        };
        if (XYJAPI_1.userInfo) {
            queryObj["nickname"] = XYJAPI_1.userInfo["nickName"];
            queryObj["avatar"] = XYJAPI_1.userInfo["avatarUrl"];
        }
        return queryObj;
    }
    /**
     * 检查是否是接力
     *
     * @param inTime        在游戏开始多少秒后可以接力
     */
    static checkCanRelay(inTime = 60) {
        if (!XYJAPI_1.userOpenID) {
            console.log("[接力]尚未登录");
            return false;
        }
        let query = XYJAPI_1.getShareQueryData();
        if (!query)
            return false;
        if (!GameManager_1.default.isDebug) {
            if (XYJAPI_1.userOpenID == XYJAPI_1.inviterOpenID) {
                console.log("[接力]不能给自己接力");
                return false;
            }
        }
        else {
            console.log("[接力]调试模式下可以给自己接力");
        }
        let nowS = Math.round(new Date().getTime() / 1000);
        if ((nowS - XYJAPI_1.gameStartTime) > inTime) {
            console.log("[接力]游戏已开始" + (nowS - XYJAPI_1.gameStartTime));
            return false;
        }
        if (XYJAPI_1.inviterAction != ShareTypes_1.default.RELAY)
            return false;
        return true;
    }
    /**
     * 用户的登陆回调
     *
     *
     * @see http://www.xiaoyaoji.cn/share/MsmrbiWWx/MsJg6RxLg
     *
     * @param res
     */
    static loginCallback(res) {
        console.log("----  小幺鸡 API ----");
        console.log("-  loginCallback   -");
        console.log(res);
        if (res) {
            XYJAPI_1._code = res["code"];
            XYJAPI_1.login();
        }
    }
    /**
     * 登陆平台
     */
    static login() {
        console.log("----  小幺鸡 API ----");
        console.log("-  login   -");
        if (typeof wx == "undefined")
            return;
        let theData = {
            code: "" + XYJAPI_1._code,
            opId: "" + XYJAPI_1.inviterOpenID,
            channel: "" + XYJAPI_1.inviterChannel,
        };
        // 1	开局增加分数分享
        // 3	赠送好友道具分享
        // 4	邀请好友帮忙拆红包分享
        //如果是来自增加基础分的分享
        if (XYJAPI_1.inviterAction == ShareTypes_1.default.ADD_BASE_SCORE) {
            theData["shareStatus"] = "1";
        }
        else if (XYJAPI_1.inviterAction == ShareTypes_1.default.HONG_BAO) {
            theData["shareStatus"] = "4";
        }
        else if (XYJAPI_1.inviterAction == ShareTypes_1.default.SEND_ITEM) {
            theData["shareStatus"] = "3";
        }
        else if (XYJAPI_1.inviterAction == ShareTypes_1.default.ADD_SCORE) {
            theData["record_id"] = XYJAPI_1.inviterGameRecordID;
        }
        console.log("the data is", theData);
        console.log("request Ball.Api.Auth.WechatLogin");
        console.log("url is " + XYJAPI_1._baseURL + "api/?do=Ball.Api.Auth.WechatLogin");
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Auth.WechatLogin",
            data: theData,
            header: {
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            method: "POST",
            success: XYJAPI_1.loginFeedbackCallback,
            fail: function (res) {
                console.log("failed to call Ball.Api.Auth.WechatLogin");
                console.log(res);
                //抛出事件
                GameManager_1.default.eventManager.dispatchEventWith(XYJEventNames_1.default.EVENT_INIT_FAILED);
            }
        });
    }
    /**
     * 向小幺鸡平台发送登陆反馈后回调
     */
    static loginFeedbackCallback(res) {
        console.log("----  小幺鸡 API ----");
        console.log("-  loginFeedbackCallback   -");
        console.log(res);
        if (!res["data"]) {
            console.log("loginFeedbackCallback 数据错误");
            return;
        }
        try {
            XYJAPI_1.userOpenID = res["data"].data.openid;
            XYJAPI_1.userID = res["data"].data.userid;
            XYJAPI_1.userToken = res["data"].data.token;
            console.log("userOpenID=" + XYJAPI_1.userOpenID);
            console.log("userToken=" + XYJAPI_1.userToken);
            console.log("userID=" + XYJAPI_1.userID);
            XYJAPI_1.getUserInfo();
        }
        catch (err) {
            console.log("【ERROR】", err);
            //抛出事件
            GameManager_1.default.eventManager.dispatchEventWith(XYJEventNames_1.default.EVENT_INIT_FAILED);
        }
    }
    /**
     * 获取用户信息
     */
    static getUserInfo() {
        console.log("----  小幺鸡 API ----");
        console.log("-  getUserInfo   -");
        //检查是否存在该数据
        if (XYJAPI_1._userInfo)
            return;
        if (typeof wx == "undefined")
            return;
        wx.getUserInfo({
            "success": XYJAPI_1.getUserInfoCallback
        });
    }
    /**
     * 获取用户信息回调
     * @param res
     */
    static getUserInfoCallback(res) {
        console.log("----  小幺鸡 API ----");
        console.log("-  getUserInfoCallback   -");
        console.log(res);
        XYJAPI_1.encryptedData = res["encryptedData"];
        XYJAPI_1.iv = res["iv"];
        XYJAPI_1._userInfo = res["userInfo"];
        console.log("encryptedData=" + XYJAPI_1.encryptedData);
        console.log("iv=" + XYJAPI_1.iv);
        console.log("userInfo=", XYJAPI_1._userInfo);
        //登录绑定unionid
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Auth.Binding",
            data: {
                encryptedData: XYJAPI_1.encryptedData,
                iv: XYJAPI_1.iv,
            },
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            method: "POST",
            success: XYJAPI_1.loginBindingCallback,
            fail: function (res) {
                console.log("failed to call Ball.Api.Auth.Binding");
                console.log(res);
                //抛出事件
                GameManager_1.default.eventManager.dispatchEventWith(XYJEventNames_1.default.EVENT_INIT_FAILED);
            }
        });
    }
    /**
     * 登陆绑定
     *
     * @param res
     */
    static loginBindingCallback(res) {
        console.log("----  小幺鸡 API ----");
        console.log("-  loginBindingCallback   -");
        console.log(res);
        XYJAPI_1.userUnionID = res["data"].data.unionId;
        console.log("userUnionID=" + XYJAPI_1.userUnionID);
        //抛出事件
        GameManager_1.default.eventManager.dispatchEventWith(XYJEventNames_1.default.EVENT_READY);
        //绑定成功后，获取复活卡数目
        XYJAPI_1.getRevive();
        //获取是否可分享并获得复活卡
        XYJAPI_1.getRemoteCanShare();
        //获取公众号二维码图片信息
        // XYJAPI.getWXMiniAppData();
        //获取分享的数据
        XYJAPI_1.getShareData();
    }
    /**
     * 是否可以分享。
     */
    static get canShare() {
        return XYJAPI_1._r_canShare;
    }
    /**
     * 获取远程设置的是否可分享的值
     */
    static getRemoteCanShare() {
        console.log("----  小幺鸡 API ----");
        console.log("-  getRemoteCanShare  -");
        if (typeof wx == "undefined")
            return;
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Share.AppSet",
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            method: "GET",
            success: (res) => {
                console.log("---- Ball.Api.Share.AppSet ----");
                console.log(res);
                if (res["data"] && res["data"].data) {
                    XYJAPI_1._r_canShare = (res["data"].data.status == 1);
                    console.log("分享是否已开启" + XYJAPI_1._r_canShare);
                }
            },
        });
    }
    /**
     * 获取复活卡数量
     */
    static get reviveCount() {
        return this._reviveCount;
    }
    /**
     * 获取复活卡数量。回调方法接收一个number类型的参数。
     */
    static getRevive(callback = null) {
        console.log("----  小幺鸡 API ----");
        console.log("-  getRevive  -");
        if (typeof wx == "undefined")
            return;
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Share.GetRevive",
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            method: "GET",
            success: function (res) {
                console.log("---- Ball.Api.Share.GetRevive ----");
                console.log(res);
                XYJAPI_1._reviveCount = Utils_1.default.toInt(res.data.data.revive);
                console.log("用户剩余的复活卡" + XYJAPI_1._reviveCount);
                if (callback != null) {
                    callback.call(null, XYJAPI_1._reviveCount);
                }
            },
        });
    }
    /**
     * 使用复活卡
     *
     * @param callback
     */
    static useRevive(callback = null) {
        console.log("----  小幺鸡 API ----");
        console.log("-  userRevive  -");
        if (XYJAPI_1._reviveCount <= 0) {
            console.log("复活卡数量不足");
            return;
        }
        //减少一个复活卡
        XYJAPI_1._reviveCount--;
        if (typeof wx == "undefined")
            return;
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Share.SetRevive",
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            method: "GET",
            success: function (res) {
                console.log("---- Ball.Api.Share.SetRevive ----");
                console.log(res);
                let suc = (res && res["data"] && res["data"].code == 200);
                if (callback != null) {
                    callback.call(null, suc);
                }
            },
            fail: function (res) {
                console.log("---- Ball.Api.Share.SetRevive ----");
                console.log(res);
                if (callback != null) {
                    callback.call(null, false);
                }
            }
        });
    }
    /**
     * 保存分数
     *
     * @param score
     */
    static saveScore(score) {
        console.log("----  小幺鸡 API ----");
        console.log("-  saveScore  -");
        console.log(score);
        if (!XYJAPI_1._userInfo) {
            console.log("需要先登录才能调用该接口");
            return;
        }
        if (typeof wx == "undefined")
            return;
        console.log("-  data  -");
        console.log({ score: "" + score, headimg: XYJAPI_1._userInfo["avatarUrl"], nickname: XYJAPI_1._userInfo["nickName"], });
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Share.SaveScore",
            data: {
                score: "" + score,
                headimg: XYJAPI_1._userInfo["avatarUrl"],
                nickname: XYJAPI_1._userInfo["nickName"],
            },
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            method: "POST",
            success: function (res) {
                console.log("---- Ball.Api.Share.SaveScore ----");
                console.log(res);
            },
        });
    }
    //{"imageurl":string, "title":string}
    // private static _shareData:object;
    /**
     * 获取分享数据
     *
     * @param callback      接受一个object对象:
     *
     * {"imageurl":string, "title":string}
     *
     */
    static getShareData(callback = null, status = 0) {
        console.log("----  小幺鸡 API ----");
        console.log("-  getShareData  -");
        console.log("status=" + status);
        if (XYJAPI_1._shareDataMap[status]) {
            if (callback != null) {
                callback.call(null, XYJAPI_1._shareDataMap[status]);
            }
            return;
        }
        if (typeof wx == "undefined")
            return;
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Share.Get",
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            data: {
                "status": status
            },
            method: "GET",
            success: function (res) {
                console.log("---- Ball.Api.Share.Get ----");
                console.log(res);
                let data = res["data"]["data"];
                XYJAPI_1._shareDataMap[status] = data;
                if (data) {
                    if (callback != null) {
                        callback.call(null, data);
                    }
                    if (status == 0) {
                        WXShare_1.default.setOnShareAppMessage(data["title"], data["imageurl"], XYJAPI_1.getShareQueryData(ShareTypes_1.default.SHARE_APP));
                    }
                }
            },
            fail: function (res) {
                console.log("---- Ball.Api.Share.Get FAIL ----");
                console.log(res);
            }
        });
    }
    /**
     * 获取成功分享次数冬季
     *
     * @param callback      接受一个number对象:
     *
     *
     */
    static getSharedSuccess(callback = null) {
        console.log("----  小幺鸡 API ----");
        console.log("-  getSharedSuccess  -");
        if (XYJAPI_1._sharedSuccess >= 0) {
            if (callback != null) {
                callback.call(null, XYJAPI_1._sharedSuccess);
            }
            return;
        }
        if (typeof wx == "undefined")
            return;
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Share.SuccShare",
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            // data: {
            //     "status":status
            // },
            method: "GET",
            success: function (res) {
                console.log("---- Ball.Api.Share.SuccShare ----");
                console.log(res);
            },
            fail: function (res) {
                console.log("---- Ball.Api.Share.SuccShare ----");
                console.log(res);
            }
        });
    }
    /**
     * 获取交叉推广图。接收一个obj参数。
     *
     * {
     *      imageurl: XYJAPI._baseURL + "Upload/image/2018-06-06/P_15282657218141544.jpg ",
     *      title: "篮球大作战",
     *      bili: "4:3"
     * }
     *
     * @see http://www.xiaoyaoji.cn/share/MsmrbiWWx/Rif1Qd3cp
     */
    static getAdImageData(callback, refreshAgain = false) {
        console.log("----  小幺鸡 API ----");
        console.log("-  getAdImage   -");
        //如果不是强制刷新数据，使用老数据
        if (!refreshAgain && XYJAPI_1._adImageData) {
            if (callback != null) {
                callback.call(null, XYJAPI_1._adImageData);
            }
            return;
        }
        if (typeof wx == "undefined")
            return;
        wx.request({
            "url": XYJAPI_1._baseURL + "api/?do=Ball.Api.Share.Shunt",
            "data": {},
            "header": {
                "X-Source": XYJAPI_1.channelID,
            },
            "method": "GET",
            "success": function (res) {
                console.log("---- Ball.Api.Share.Shunt ----");
                console.log(res);
                if (res && res["data"]) {
                    //这里返回了很多图片，需要去一个比例最接近的尺寸
                    let images = res["data"].data;
                    if (!images || images.length == 0)
                        return;
                    let currentHWV = cc.winSize.height / cc.winSize.width;
                    let minHWV = 100;
                    let minHWVObj;
                    for (let i = 0; i < images.length; i++) {
                        //{imageurl: XYJAPI._baseURL + "Upload/image/2018-06-06/P_15282657218141544.jpg ", title: "篮球大作战", bili: "4:3"}
                        let imgObj = images[i];
                        let hwv = String(imgObj["bili"]).split(":");
                        let v = Math.abs(Number(hwv[0]) / Number(hwv[1]) - currentHWV);
                        console.log("current hwv is " + v);
                        if (v < minHWV) {
                            minHWV = v;
                            minHWVObj = imgObj;
                        }
                    }
                    if (minHWVObj) {
                        XYJAPI_1._adImageData = minHWVObj;
                        callback.call(null, XYJAPI_1._adImageData);
                    }
                }
            }
        });
    }
    /**
     * 微信小程序数据
     *
     * {"imageurl":string}
     */
    static get wxMiniAppData() {
        if (XYJAPI_1._wxMiniAppData) {
            return XYJAPI_1._wxMiniAppData;
        }
        XYJAPI_1.getWXMiniAppData();
        return null;
    }
    /**
     * 获取微信小程序数据
     *
     *
     * @see http://www.xiaoyaoji.cn/share/MsmrbiWWx/VBHsTd2nE
     *
     *
     *
     */
    static getWXMiniAppData() {
        console.log("----  小幺鸡 API ----");
        console.log("-  getWXMiniAppData  -");
        console.log("is requesting is" + XYJAPI_1._isGettingWXMiniAppData);
        if (XYJAPI_1._isGettingWXMiniAppData)
            return;
        if (typeof wx == "undefined")
            return;
        //标记正在请求数据
        XYJAPI_1._isGettingWXMiniAppData = true;
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Erweima.GetMoney",
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            method: "GET",
            success: function (res) {
                console.log("---- Ball.Api.Erweima.GetMoney SUCCESS ----");
                console.log(res);
                XYJAPI_1._wxMiniAppData = res["data"]["data"];
            },
            fail: function (res) {
                console.log("---- Ball.Api.Erweima.GetMoney FAIL ----");
                console.log(res);
            },
            complete: function () {
                XYJAPI_1._isGettingWXMiniAppData = false;
            }
        });
    }
    //================================================================================================
    //接力逻辑
    //================================================================================================
    /**
     * 上报接力分数
     *
     *
     * @param score             接力分数
     * @param startTime         接力开始时间（玩家开始玩游戏时间），秒
     *
     *
     * @see http://www.xiaoyaoji.cn/share/MsmrbiWWx/5DA71JiTP
     */
    static saveRelayScore(score, startTime) {
        console.log("----  小幺鸡 API ----");
        console.log("-  saveRelayScore  -");
        console.log(score, startTime);
        if (!XYJAPI_1._userInfo) {
            console.log("需要先登录才能调用该接口");
            return;
        }
        let theData = {};
        //分数
        theData["score"] = "" + score;
        theData["headimg"] = XYJAPI_1._userInfo["avatarUrl"],
            theData["nickname"] = XYJAPI_1._userInfo["nickName"],
            // theData["hid"] = XYJAPI.inviterOpenID;
            theData["hid"] = XYJAPI_1.inviterUserID;
        theData["stamp"] = XYJAPI_1.inviterTime;
        theData["startTime"] = "" + Math.floor(startTime.getTime() / 1000);
        theData["endTime"] = "" + Math.round(new Date().getTime() / 1000);
        //输出信息
        console.log("the data is:", theData);
        let signValue = XYJAPI_1.createSign(theData);
        console.log("sign is:" + signValue);
        console.log("url is:" + XYJAPI_1._baseURL + "api/?do=Ball.Api.Share.saveHelpScore" + "&sign=" + signValue);
        if (typeof wx == "undefined")
            return;
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Share.saveHelpScore" + "&sign=" + signValue,
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            data: theData,
            method: "POST",
            success: function (res) {
                console.log("---- Ball.Api.Share.saveHelpScore ----");
                console.log(res);
                //提示用户
                WXUtils_1.default.showToast("成功给" + XYJAPI_1.inviterNickname + "助力");
            },
            complete: function () {
            }
        });
    }
    //本次接力结束时间
    // private static _relayEndDate:Date;
    /**
     * 接力数据
     *
     *
     * @see Ball.Api.Room.Activity
     */
    static getRelayData(callback = null) {
        console.log("----  小幺鸡 API ----");
        console.log("-  getRelayData  -");
        if (!XYJAPI_1._userInfo) {
            console.log("需要先登录才能调用该接口");
            return;
        }
        //使用老数据
        // if (XYJAPI._relayData && XYJAPI._relayEndDate) {
        //     let now:Date = new Date();
        //     if (XYJAPI._relayData > now) {
        //         if (callback != null) callback.call(null, XYJAPI._relayData);
        //     }
        // }
        let theData = {};
        //输出信息
        console.log("the data is:", theData);
        if (typeof wx == "undefined")
            return;
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Room.Activity",
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            data: theData,
            method: "POST",
            success: function (res) {
                console.log("---- Ball.Api.Room.Activity ----");
                console.log(res);
                let data = res["data"]["data"];
                XYJAPI_1._relayData = data;
                //结束时间
                // if (data) {
                //     let remaining:object = data["remaining"];
                //     if (remaining && remaining["end_time"]) {
                //         XYJAPI._relayEndDate = new Date(remaining["end_time"] * 1000);
                //     }
                // }
                if (callback != null)
                    callback.call(null, data);
            },
            fail: function (res) {
                WXUtils_1.default.showToast("数据请求失败");
            },
            complete: function () {
            }
        });
    }
    /**
     * 获取分享邀请的好友个数（分渠道）
     *
     * @param 分享类型          1:增加基础分分享
     *
     * @see Ball.Api.Room.Activity
     */
    static getNewUserCountFromShare(shareStatus, callback = null) {
        console.log("----  小幺鸡 API ----");
        console.log("-  getNewUserCountFromShare  -");
        if (!XYJAPI_1._userInfo) {
            console.log("需要先登录才能调用该接口");
            return;
        }
        // if (XYJAPI._relayData && XYJAPI._relayEndDate) {
        //     let now:Date = new Date();
        //     if (XYJAPI._relayData > now) {
        //         if (callback != null) callback.call(null, XYJAPI._relayData);
        //     }
        // }
        let theData = { "code": shareStatus };
        //输出信息
        console.log("the data is:", theData);
        if (typeof wx == "undefined")
            return;
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Share.GetShareStatus",
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            data: theData,
            method: "POST",
            success: function (res) {
                console.log("---- Ball.Api.Share.GetShareStatus ----");
                console.log(res);
                let data = res["data"]["data"];
                let count = data["count"];
                if (!isNaN(count) && count > 0) {
                    if (callback)
                        callback.call(null, count);
                }
            },
            fail: function (res) {
                WXUtils_1.default.showToast("数据请求失败");
            },
            complete: function () {
            }
        });
    }
    /**
     * 获取红包数据
     *
     * {
     *      "money":红包金额,
     *      "state":    1:可领取，2:已领取, 0:其他
     *      "message":
     * }
     *
     *
     * @see Ball.Api.Forward.Envelopes
     */
    static getHongBaoData(callback = null, useHongBao = false) {
        console.log("----  小幺鸡 API ----");
        console.log("-  getHongBaoData  -");
        if (!XYJAPI_1._userInfo) {
            console.log("需要先登录才能调用该接口");
            return;
        }
        let theData = { "type": "1" };
        //如果使用红包
        if (useHongBao)
            theData["type"] = "2";
        //输出信息
        console.log("the data is:", theData);
        if (typeof wx == "undefined")
            return;
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Forward.Envelopes",
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            data: theData,
            method: "POST",
            success: function (res) {
                console.log("---- Ball.Api.Forward.Envelopes ----");
                console.log(res);
                let result = {};
                let code = "" + res["data"]["code"];
                if (code == "200") {
                    //可领取
                    result["state"] = 1;
                }
                else if (code == "405") {
                    //已领取
                    result["state"] = 2;
                }
                else {
                    result["state"] = 0;
                    result["message"] = res["data"]["message"];
                }
                let data = res["data"]["data"];
                if (data && data["money"])
                    result["money"] = data["money"];
                console.log(result);
                if (callback != null)
                    callback.call(null, result);
            },
            fail: function (res) {
                console.log("---- Ball.Api.Forward.Envelopes ----");
                console.log(res);
                WXUtils_1.default.showToast("数据请求失败");
            },
            complete: function () {
            }
        });
    }
    /**
     * 获取本局游戏成功邀请的好
     *
     *
     * @see http://www.xiaoyaoji.cn/share/MsmrbiWWx/D7MB1O0q4
     */
    static getNewsInCurrentGameRecord(recordID, callback = null) {
        console.log("----  小幺鸡 API ----");
        console.log("-  getNewsInCurrentGameRecord  -");
        if (!XYJAPI_1._userInfo) {
            console.log("需要先登录才能调用该接口");
            return;
        }
        let theData = { "record_id": recordID };
        //输出信息
        console.log("the data is:", theData);
        if (typeof wx == "undefined")
            return;
        wx.request({
            url: XYJAPI_1._baseURL + "api/?do=Ball.Api.Share.GetGameRecord",
            header: {
                "X-Token": XYJAPI_1.userToken,
                "X-Version": XYJAPI_1.gameVersion,
                "X-Source": XYJAPI_1.channelID,
            },
            data: theData,
            method: "POST",
            success: function (res) {
                console.log("---- Ball.Api.Share.GetGameRecord ----");
                console.log(res);
                let result = {};
                let users = parseInt(res["data"]["data"]);
                if (!isNaN(users) && users > 0) {
                    if (callback != null) {
                        callback.call(null, users);
                    }
                }
            },
            fail: function (res) {
                console.log("---- Ball.Api.Share.GetGameRecord ----");
                console.log(res);
            },
            complete: function () {
            }
        });
    }
    //================================================================================================
    //通用方法
    //================================================================================================
    /**
     * 创建签名
     */
    static createSign(data) {
        let keys = [];
        for (let key in data) {
            let v = data[key];
            if (v == undefined || v == "")
                continue;
            keys.push("" + key);
        }
        keys.sort();
        let sign = "";
        for (let i = 0; i < keys.length; i++) {
            let theKey = keys[i];
            if (i > 0)
                sign += "&";
            sign += "" + theKey + "=" + data[theKey];
        }
        //加上key（即渠道号）
        sign += "&key=" + XYJAPI_1.channelID;
        //计算md5
        sign = md5_1.md5(sign);
        //大写
        sign = sign.toUpperCase();
        return sign;
    }
};
//渠道id
XYJAPI._channelID = null;
//版本号
XYJAPI.gameVersion = null;
//==============================================================
//邀请者相关
//==============================================================
//邀请者open id
XYJAPI.inviterOpenID = null;
//邀请者id
XYJAPI.inviterUserID = null;
//邀请者昵称
XYJAPI.inviterNickname = null;
//分享时间戳(秒)
XYJAPI.inviterTime = 0;
//游戏开始时间
XYJAPI.gameStartTime = 0;
//分享目标
XYJAPI.inviterAction = null;
//邀请者游戏局id
XYJAPI.inviterGameRecordID = null;
//推广来源
XYJAPI.inviterChannel = null;
//==============================================================
//接力限制时间（秒）。默认30秒，即用户分享30秒内可以被接力。
XYJAPI.relayLimitedTime = 30;
//用户open id
XYJAPI.userOpenID = null;
//用户id
XYJAPI.userID = null;
XYJAPI.userUnionID = null;
//用户昵称
XYJAPI.userNickname = null;
XYJAPI.userToken = null;
XYJAPI.encryptedData = null;
XYJAPI.iv = null;
/**
 * avatarUrl	string	用户头像图片 url
 * city	        string	用户所在城市
 * country	    string	用户所在国家
 * gender	    number	用户性别
 * language	    string	显示 country province city 所用的语言
 * nickName	    string	用户昵称
 * openId	    string	用户 openId
 * province	    string	用户所在省份
 */
XYJAPI._userInfo = null;
XYJAPI._reviveCount = 0;
//从服务器获取的分享数据
XYJAPI._shareDataMap = {};
//成功分享次数
XYJAPI._sharedSuccess = -1;
XYJAPI = XYJAPI_1 = __decorate([
    ccclass
], XYJAPI);
exports.default = XYJAPI;
