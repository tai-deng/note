"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var DataManager_1;
const GameCoreEvent_1 = require("../GameCoreEvent");
const GameManager_1 = require("./GameManager");
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
 * 数据管理器。可以通过该管理器管理全局数据。
 */
let DataManager = DataManager_1 = class DataManager {
    constructor() {
        /**
         * 数据
         */
        this._data = {};
        //保存到本地的数据
        this._localData = {};
        //是否有改变
        this._hasChanged = false;
        //改变的字段
        this._changedKeys = [];
        this.unserialize();
        //每隔10秒保存一次数据
        setInterval(function () {
            GameManager_1.default.dataManager.doSerialize();
        }, 5000);
        if (typeof wx != "undefined") {
            wx.onHide(function () {
                cc.info("【DataManager】onHide");
                GameManager_1.default.dataManager.doSerialize();
            });
        }
    }
    /**
     * 获取上次变化值的key值
     */
    get lastChangedKey() {
        return this._lastChangedKey;
    }
    /**
     * 设置全局数据。
     *
     *
     *
     * @param key               字段名
     * @param value             字段值
     * @param saveToLocal       是否保存到本地。如果保存到本地，字段值类型必须是简单类型，比如number、boolean、array
     * @param justToday         日期变化后是否删除。该参数只有在saveToLocal参数为true的时候生效。
     *
     */
    setData(key, value, saveToLocal = false, justToday = false) {
        if (this._data[key] !== value) {
            this._data[key] = value;
            //保存到本地
            if (saveToLocal === true) {
                let data = { "v": value };
                if (justToday === true)
                    data["today"] = GameManager_1.default.todayValue;
                this._localData[key] = data;
                //记录变更的key
                if (this._changedKeys.indexOf(key) == -1) {
                    this._hasChanged = true;
                    this._changedKeys.push(key);
                }
            }
            this._lastChangedKey = key;
            GameManager_1.default.eventManager.dispatchEventWith(GameCoreEvent_1.default.DATA_CHANGE, key);
        }
    }
    /**
     * 获取全局数据
     *
     * @param key
     */
    getData(key) {
        return this._data[key];
    }
    /**
     * 移除数据
     *
     * @param key
     */
    remoteData(key) {
        delete this._data[key];
        delete this._localData[key];
        let index = this._changedKeys.indexOf(key);
        if (index >= 0)
            this._changedKeys.splice(index, 1);
        this._hasChanged = true;
    }
    /**
     * 重置数据
     *
     */
    resetData() {
        this._data = {};
        this._localData = {};
        this._lastChangedKey = null;
        this._changedKeys = [];
        this._hasChanged = true;
    }
    /**
     * 序列化数据
     */
    doSerialize() {
        if (this._hasChanged === false)
            return;
        this._hasChanged = false;
        cc.info("【DataManager】doSerialize", this._hasChanged, this._changedKeys);
        //======================================================================
        //写入keys
        //======================================================================
        let keys = [];
        for (let theKey in this._localData) {
            keys.push("" + theKey);
        }
        cc.sys.localStorage.setItem("__" + DataManager_1.L_KEY + "__keys", JSON.stringify(keys));
        //======================================================================
        while (this._changedKeys.length > 0) {
            let theKey = this._changedKeys.pop();
            cc.sys.localStorage.setItem(DataManager_1.L_KEY + "__" + theKey, JSON.stringify(this._localData[theKey]));
        }
    }
    /**
     * 反序列化
     */
    unserialize() {
        try {
            //读取所有key
            let v = cc.sys.localStorage.getItem("__" + DataManager_1.L_KEY + "__keys");
            let keys = JSON.parse(v);
            for (let i = 0; i < keys.length; i++) {
                let key = "" + keys[i];
                let v = cc.sys.localStorage.getItem(DataManager_1.L_KEY + "__" + key);
                this._localData[key] = JSON.parse(v);
            }
            //复制数据
            for (let key in this._localData) {
                //{"v":数据值, "today":日期值}
                let data = this._localData[key];
                let v = data["v"];
                let today = data["today"];
                //如果有设置隔日删除，则需要检查日期值
                if (!today || GameManager_1.default.todayValue != today) {
                    this._data[key] = v;
                }
            }
        }
        catch (err) {
            this._localData = {};
        }
    }
};
//字段名
DataManager.L_KEY = "$__dml";
DataManager = DataManager_1 = __decorate([
    ccclass
], DataManager);
exports.default = DataManager;
