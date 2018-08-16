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
const { ccclass, property } = cc._decorator;
let DataManager = DataManager_1 = class DataManager {
    constructor() {
        this._data = {};
        this._localData = {};
        this._hasChanged = false;
        this._changedKeys = [];
        this.unserialize();
        setInterval(function () {
            GameManager_1.default.dataManager.doSerialize();
        }, 5000);
        if (typeof wx != "undefined") {
            wx.onHide(function () {
                console.log("【DataManager】onHide");
                GameManager_1.default.dataManager.doSerialize();
            });
        }
    }
    get lastChangedKey() {
        return this._lastChangedKey;
    }
    setData(key, value, saveToLocal = false, justToday = false) {
        if (this._data[key] !== value) {
            this._data[key] = value;
            if (saveToLocal === true) {
                let data = { "v": value };
                if (justToday === true)
                    data["today"] = GameManager_1.default.todayValue;
                this._localData[key] = data;
                if (this._changedKeys.indexOf(key) == -1) {
                    this._hasChanged = true;
                    this._changedKeys.push(key);
                }
            }
            this._lastChangedKey = key;
            GameManager_1.default.eventManager.dispatchEventWith(GameCoreEvent_1.default.DATA_CHANGE, key);
        }
    }
    getData(key) {
        return this._data[key];
    }
    remoteData(key) {
        delete this._data[key];
        delete this._localData[key];
        let index = this._changedKeys.indexOf(key);
        if (index >= 0)
            this._changedKeys.splice(index, 1);
        this._hasChanged = true;
    }
    resetData() {
        this._data = {};
        this._localData = {};
        this._lastChangedKey = null;
        this._changedKeys = [];
        this._hasChanged = true;
    }
    doSerialize() {
        if (this._hasChanged === false)
            return;
        this._hasChanged = false;
        console.log("【DataManager】doSerialize", this._hasChanged, this._changedKeys);
        let keys = [];
        for (let theKey in this._localData) {
            keys.push("" + theKey);
        }
        cc.sys.localStorage.setItem("__" + DataManager_1.L_KEY + "__keys", JSON.stringify(keys));
        while (this._changedKeys.length > 0) {
            let theKey = this._changedKeys.pop();
            cc.sys.localStorage.setItem(DataManager_1.L_KEY + "__" + theKey, JSON.stringify(this._localData[theKey]));
        }
    }
    unserialize() {
        try {
            let v = cc.sys.localStorage.getItem("__" + DataManager_1.L_KEY + "__keys");
            let keys = JSON.parse(v);
            for (let i = 0; i < keys.length; i++) {
                let key = "" + keys[i];
                let v = cc.sys.localStorage.getItem(DataManager_1.L_KEY + "__" + key);
                this._localData[key] = JSON.parse(v);
            }
            for (let key in this._localData) {
                let data = this._localData[key];
                let v = data["v"];
                let today = data["today"];
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
DataManager.L_KEY = "$__dml";
DataManager = DataManager_1 = __decorate([
    ccclass
], DataManager);
exports.default = DataManager;
