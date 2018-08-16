"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let WXUtils = class WXUtils {
    static showToast(info, duration = 1500) {
        console.log("----  WX Utils ----");
        console.log("-  showToast  -");
        console.log(info);
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
    static navigateToMiniProgram(appID, path = null, extraData = null) {
        console.log("----  WX Utils ----");
        console.log("-  navigateToMiniProgram  -");
        console.log(appID, path);
        if (typeof wx == "undefined")
            return;
        try {
            wx.navigateToMiniProgram({
                "appId": appID,
                "path": path,
                "extraData": extraData
            });
        }
        catch (error) {
        }
    }
};
WXUtils = __decorate([
    ccclass
], WXUtils);
exports.default = WXUtils;
