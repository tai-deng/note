"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameManager_1;
const { ccclass, property } = cc._decorator;
const SoundsManager_1 = require("./SoundsManager");
const PopUpManager_1 = require("./PopUpManager");
const EventManager_1 = require("./EventManager");
const DataManager_1 = require("./DataManager");
const ItemManager_1 = require("./item/ItemManager");
const Utils_1 = require("./Utils");
const Context_1 = require("./legs/Context");
const SceneManager_1 = require("./scene/SceneManager");
let GameManager = GameManager_1 = class GameManager {
    static get eventManager() { return GameManager_1._eventManager; }
    ;
    static get sceneManager() { return GameManager_1._sceneManager; }
    ;
    static get dataManager() { return GameManager_1._dataManager; }
    ;
    static get soundsManager() { return GameManager_1._soundsManager; }
    ;
    static get popUpManager() { return GameManager_1._popUpManager; }
    ;
    static get itemManager() { return GameManager_1._itemManager; }
    ;
    static get context() { return GameManager_1._context; }
    ;
    static get canVibrate() {
        return GameManager_1._canVibrate;
    }
    static vibrateOff() {
        if (!GameManager_1._canVibrate)
            return;
        GameManager_1._canVibrate = false;
        cc.sys.localStorage.setItem("__l__gameManager_vibrateoff", true);
    }
    static vibrateOn() {
        if (GameManager_1._canVibrate)
            return;
        GameManager_1._canVibrate = true;
        cc.sys.localStorage.removeItem("__l__gameManager_vibrateoff");
    }
    static get isOnWX() {
        return GameManager_1._isOnWX;
    }
    static get isAndroid() {
        return GameManager_1._isAndroid;
    }
    static get todayValue() {
        if (!GameManager_1._todayValue) {
            let date = new Date();
            GameManager_1._todayValue = "" + date.getFullYear();
            GameManager_1._todayValue += "-";
            let v = date.getMonth() + 1;
            GameManager_1._todayValue += (v < 10) ? ("0" + v) : v;
            GameManager_1._todayValue += "-";
            v = date.getDate();
            GameManager_1._todayValue += (v < 10) ? ("0" + v) : v;
        }
        return GameManager_1._todayValue;
    }
    static addVersionInfo() {
        console.log("----  gamecore ----");
        console.log("-  addVersionInfo   -");
        let n = new cc.Node();
        let label = n.addComponent(cc.Label);
        label.fontSize = 20;
        label.lineHeight = label.fontSize * 1.1;
        if (GameManager_1.isDebug)
            n.color = new cc.Color().fromHEX("#ff0000");
        let vStr = GameManager_1.gameVersion;
        if (GameManager_1.gameInternalVersionCode) {
            vStr += "." + GameManager_1.gameInternalVersionCode;
        }
        if (GameManager_1.isDebug)
            vStr += "【测试】";
        label.string = vStr;
        n.anchorX = 0;
        if (Utils_1.default.isIphoneX) {
            n.x = 20;
            n.y = cc.winSize.height - label.lineHeight / 2;
        }
        else {
            n.x = 0;
            n.y = cc.winSize.height - label.lineHeight / 2;
        }
        cc.director.getScene().addChild(n);
    }
    static init() {
        if (GameManager_1._initialized)
            return;
        GameManager_1._initialized = true;
        GameManager_1._canVibrate = true;
        let v = cc.sys.localStorage.getItem("__l__gameManager_vibrateoff");
        if (v == "true") {
            GameManager_1.vibrateOff();
        }
        if (typeof wx == "undefined")
            GameManager_1._isOnWX = false;
        else
            GameManager_1._isOnWX = true;
        try {
            let ua = navigator.userAgent.toLowerCase();
            GameManager_1._isAndroid = ua.indexOf("android") >= 0;
        }
        catch (error) {
        }
    }
};
GameManager.gameVersion = "1.0";
GameManager.isDebug = false;
GameManager._eventManager = new EventManager_1.default();
GameManager._sceneManager = new SceneManager_1.default();
GameManager._dataManager = new DataManager_1.default();
GameManager._soundsManager = new SoundsManager_1.default();
GameManager._popUpManager = new PopUpManager_1.default();
GameManager._itemManager = new ItemManager_1.default();
GameManager._context = new Context_1.default();
GameManager._canVibrate = true;
GameManager._isOnWX = false;
GameManager._isAndroid = false;
GameManager._temp = GameManager_1.init();
GameManager = GameManager_1 = __decorate([
    ccclass
], GameManager);
exports.default = GameManager;
