"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WXDevice_1;
const GameManager_1 = require("../managers/GameManager");
const { ccclass, property } = cc._decorator;
let WXDevice = WXDevice_1 = class WXDevice {
    static getSystemInfo() {
        console.log("----  WXDevice ----");
        console.log("-  getSystemInfo  -");
        if (typeof wx == "undefined")
            return;
        let info = wx.getSystemInfoSync();
        if (info && info["benchmarkLevel"] != undefined) {
            let v = parseInt("" + info["benchmarkLevel"]);
            if (!isNaN(v) && v > 0) {
                WXDevice_1._benchmarkLevel = v;
            }
        }
        WXDevice_1._systemInfo = info;
    }
    static get systemInfo() {
        if (!WXDevice_1._systemInfo) {
            WXDevice_1.getSystemInfo();
        }
        return WXDevice_1._systemInfo;
    }
    static get SDKVersion() {
        if (!WXDevice_1._systemInfo) {
            WXDevice_1.getSystemInfo();
        }
        if (WXDevice_1._systemInfo) {
            return WXDevice_1._systemInfo["SDKVersion"];
        }
        return null;
    }
    static get benchmarkLevel() {
        return WXDevice_1._benchmarkLevel;
    }
    static vibrateShort() {
        console.log("----  WXDevice  ----");
        console.log("-  vibrateShort  -");
        if (!GameManager_1.default.canVibrate) {
            console.log("已设置不可震动(GameManager.canVibrate");
            return;
        }
        if (typeof wx == "undefined")
            return;
        try {
            wx.vibrateShort({});
        }
        catch (error) {
            console.log("catch a error from wx:");
            console.log(error);
        }
    }
    static vibrateLong() {
        console.log("----  WXDevice  ----");
        console.log("-  vibrateLong  -");
        if (!GameManager_1.default.canVibrate) {
            console.log("已设置不可震动(GameManager.canVibrate");
            return;
        }
        if (typeof wx == "undefined")
            return;
        try {
            wx.vibrateLong({});
        }
        catch (error) {
            console.log("catch a error from wx:");
            console.log(error);
        }
    }
};
WXDevice._benchmarkLevel = -1;
WXDevice = WXDevice_1 = __decorate([
    ccclass
], WXDevice);
exports.default = WXDevice;
