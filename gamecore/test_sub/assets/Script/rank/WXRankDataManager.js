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
let WXRankDataManager = WXRankDataManager_1 = class WXRankDataManager extends cc.Node {
    constructor() {
        super();
        this._friendRankData = [];
        this._myScore = 0;
        cc.info("【WXRankDataManager】初始化");
        if (WXRankDataManager_1._instance) {
            throw new Error("Please use WXRankDataManager.instance");
        }
        WXRankDataManager_1._instance = this;
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
                        WXRankDataManager_1._instance.myScore = data["value"];
                        break;
                }
            });
        }
        catch (error) {
        }
    }
    static get instance() {
        if (!WXRankDataManager_1._instance)
            new WXRankDataManager_1();
        return WXRankDataManager_1._instance;
    }
    get friendRankData() {
        return this._friendRankData.concat();
    }
    get friendRankNext() {
        return this._friendRankNext;
    }
    get friendRankPrevious() {
        return this._friendRankPrevious;
    }
    get friendRankMine() {
        return this._friendRankMine;
    }
    set myScore(v) {
        if (this._myScore == v)
            return;
        this._myScore = v;
        WXRankDataManager_1._instance.dispatchEvent(new cc.Event(WXRankEventNames_1.default.MY_SCORE_CHANGE, false));
        this.refreshAllData();
    }
    get myScore() {
        return this._myScore;
    }
    getUserInfo() {
        try {
            wx.getUserInfo({
                "openIdList": ['selfOpenId'],
                "success": function (res) {
                    cc.info("user info");
                    cc.info(res);
                    let data = res["data"];
                    WXRankDataManager_1._instance._userInfo = data[0];
                    WXRankDataManager_1._instance.refreshAllData();
                },
                "fail": null
            });
        }
        catch (error) {
        }
    }
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
    sortFriendRankData() {
        this._friendRankData.sort(function (a, b) {
            return b.score - a.score;
        });
        let len = this._friendRankData.length;
        for (let i = 0; i < len; i++) {
            this._friendRankData[i].rank = i + 1;
        }
    }
    refreshRankingData() {
        cc.info("获取排行榜数据。。。。。");
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
                    let kvData = obj["KVDataList"][0];
                    cc.info(kvData);
                    cc.info(kvData["value"]);
                    let valueObj = JSON.parse(kvData["value"]);
                    cc.info(valueObj);
                    vo.score = parseInt(valueObj["wxgame"]["score"]);
                    ranks.push(vo);
                }
                WXRankDataManager_1._instance._friendRankData = ranks;
                WXRankDataManager_1._instance.sortFriendRankData();
                WXRankDataManager_1._instance.refreshAllData();
            }
        });
    }
};
WXRankDataManager = WXRankDataManager_1 = __decorate([
    ccclass
], WXRankDataManager);
exports.default = WXRankDataManager;
