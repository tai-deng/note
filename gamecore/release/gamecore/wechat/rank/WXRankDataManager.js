"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WXRankDataManager_1;
const WXRankVO_1 = require("./WXRankVO");
const WXRankEventNames_1 = require("./WXRankEventNames");
const { ccclass, property } = cc._decorator;
/**
 * 微信排行榜数据管理器
 *
 */
let WXRankDataManager = WXRankDataManager_1 = class WXRankDataManager extends cc.Node {
    constructor() {
        super();
        //好友排行榜数据
        this._friendRankData = [];
        this._myScore = 0;
        cc.info("【WXRankDataManager】初始化");
        if (WXRankDataManager_1._instance) {
            throw new Error("Please use WXRankDataManager.instance");
        }
        WXRankDataManager_1._instance = this;
        //刷新排行榜数据
        this.refreshRankingData();
        try {
            wx.onMessage(function (data) {
                cc.info("【WXRankDataManager】constructor, wx.onMessage");
                cc.info(data);
                if (!data)
                    return;
                let action = data["action"];
                switch (action) {
                    case "__rdm__myScore":
                        //设置我的分数
                        WXRankDataManager_1._instance.myScore = data["value"];
                        break;
                }
            });
        }
        catch (error) {
        }
    }
    /**
     * 获取管理器单例
     */
    static get instance() {
        if (!WXRankDataManager_1._instance)
            new WXRankDataManager_1();
        return WXRankDataManager_1._instance;
    }
    /**
     * 获取排行榜数据
     */
    get friendRankData() {
        return this._friendRankData.concat();
    }
    /**
     * 获取我的下一个超越的目标
     */
    get friendRankNext() {
        return this._friendRankNext;
    }
    /**
     * 获取我的上一个超越的目标
     */
    get friendRankPrevious() {
        return this._friendRankPrevious;
    }
    /**
     * 获取我排行榜数据
     */
    get friendRankMine() {
        return this._friendRankMine;
    }
    /**
     * 设置我的分数
     */
    set myScore(v) {
        if (this._myScore == v)
            return;
        this._myScore = v;
        //抛出事件
        WXRankDataManager_1._instance.dispatchEvent(new cc.Event(WXRankEventNames_1.default.MY_SCORE_CHANGE, false));
        //刷新所有数据
        this.refreshAllData();
    }
    get myScore() {
        return this._myScore;
    }
    /**
     * 获取个人信息
     */
    getUserInfo() {
        try {
            wx.getUserInfo({
                "openIdList": ['selfOpenId'],
                "success": function (res) {
                    cc.info("user info");
                    cc.info(res);
                    let data = res["data"];
                    WXRankDataManager_1._instance._userInfo = data[0];
                    //刷新小排行榜
                    WXRankDataManager_1._instance.refreshAllData();
                },
                "fail": null
            });
        }
        catch (error) {
        }
    }
    /**
     * 重新计算所有数据
     */
    refreshAllData() {
        if (!this._userInfo) {
            this.getUserInfo();
            return;
        }
        let openID = this._userInfo["openId"];
        let avatarURL = this._userInfo["avatarUrl"];
        avatarURL = avatarURL.replace(/\/\d+$/, "");
        cc.info("my avatar url", avatarURL);
        let theLen = this._friendRankData.length;
        for (let i = 0; i < theLen; i++) {
            let vo = this._friendRankData[i];
            cc.info(vo["avatar"]);
            let currentAvatarURL = vo["avatar"];
            currentAvatarURL = currentAvatarURL.replace(/\/\d+$/, "");
            if (vo.openID == openID || currentAvatarURL == avatarURL) {
                this._friendRankMine = vo;
                if (this._myScore > vo.score) {
                    vo.score = this._myScore;
                    this.sortFriendRankData();
                }
            }
        }
        if (!this._friendRankData)
            return;
        let index = this._friendRankData.indexOf(this._friendRankMine);
        cc.info("my rank is " + index, ", total is " + theLen);
        if (index >= 1) {
            this._friendRankNext = this._friendRankData[index - 1];
        }
        else {
            this._friendRankNext = null;
        }
        if (index < theLen - 1) {
            this._friendRankPrevious = this._friendRankData[index + 1];
        }
        else {
            this._friendRankPrevious = null;
        }
        WXRankDataManager_1._instance.dispatchEvent(new cc.Event(WXRankEventNames_1.default.FRIEND_RANK_CHANGE, false));
    }
    /**
     * 排序数据
     */
    sortFriendRankData() {
        //排序
        this._friendRankData.sort(function (a, b) {
            return b.score - a.score;
        });
        let len = this._friendRankData.length;
        for (let i = 0; i < len; i++) {
            this._friendRankData[i].rank = i + 1;
        }
    }
    /**
     * 刷新排行榜数据
     *
     */
    refreshRankingData() {
        cc.info("获取排行榜数据。。。。。");
        // try {
        wx.getFriendCloudStorage({
            "keyList": ["score"],
            "success": function (res) {
                cc.info(res);
                let ranks = [];
                let data = res.data;
                for (let i = 0; i < data.length; i++) {
                    let obj = data[i];
                    let vo = new WXRankVO_1.default();
                    vo.nickname = obj["nickname"];
                    vo.avatar = obj["avatarUrl"];
                    vo.openID = obj["openId"];
                    // try {
                    let kvData = obj["KVDataList"][0];
                    cc.info(kvData);
                    cc.info(kvData["value"]);
                    //"{"wxgame": {"score":100, "update_time": 1527429380432}}"
                    let valueObj = JSON.parse(kvData["value"]);
                    cc.info(valueObj);
                    vo.score = parseInt(valueObj["wxgame"]["score"]);
                    // } catch (error) {
                    // }
                    ranks.push(vo);
                    // cc.info(rankData);
                }
                WXRankDataManager_1._instance._friendRankData = ranks;
                //排序
                WXRankDataManager_1._instance.sortFriendRankData();
                //刷新数据
                WXRankDataManager_1._instance.refreshAllData();
            }
        });
        // } catch (error) {
        //     cc.info("error for wechat api")
        //     cc.info(error);
        // }
    }
};
WXRankDataManager = WXRankDataManager_1 = __decorate([
    ccclass
], WXRankDataManager);
exports.default = WXRankDataManager;
