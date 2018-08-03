"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Command_1;
const GameManager_1 = require("../GameManager");
const { ccclass, property } = cc._decorator;
/**
 * command
 */
let Command = Command_1 = class Command {
    /**
     * command
     */
    constructor() {
        //prefab资源加载路径
        this._prefabURL = null;
    }
    /**
     * 获取资源加载路径
     */
    get prefabURL() {
        return this._prefabURL;
    }
    /**
     * 获取资源是否已加载完成
     */
    get prefab() {
        if (!this._prefabURL)
            return null;
        return Command_1.prefabMap[this._prefabURL];
    }
    /**
     * 加载素材
     *
     * @param callback  回调方法
     *
     */
    loadPrefab(callback = null) {
        if (!this._prefabURL) {
            if (callback != null)
                callback.call(null);
            return;
        }
        if (Command_1.prefabMap[this._prefabURL]) {
            if (callback != null)
                callback.call(null);
            return;
        }
        let command = this;
        //容错处理
        let thePrefabURL = this._prefabURL;
        thePrefabURL = thePrefabURL.replace(/^\/?resources\//, "");
        cc.info("[Command] load prefab " + thePrefabURL);
        // 加载 Prefab
        cc.loader.loadRes(thePrefabURL, function (err, prefab) {
            cc.info("[Command] prefab loaded", err, prefab);
            if (prefab) {
                Command_1.prefabMap[command._prefabURL] = prefab;
            }
            else {
                cc.info("[Command] prefab load fail:" + command._prefabURL);
            }
            if (callback != null)
                callback.call(null);
        });
    }
    /**
     * 执行命令
     */
    execute() {
    }
    /**
     * 释放prefab
     *
     */
    destoryPrefab() {
        if (this._prefabURL) {
            cc.loader.releaseRes(this._prefabURL);
            delete Command_1.prefabMap[this._prefabURL];
            this._prefabURL = null;
        }
    }
    /**
     * 派发事件
     *
     * @param event
     */
    dispacheEvent(event) {
        GameManager_1.default.eventManager.dispatchEvent(event);
    }
    /**
     * 携带数据，派发事件
     *
     * @param eventName
     * @param data
     */
    dispacheEventWith(eventName, data = null) {
        GameManager_1.default.eventManager.dispatchEventWith(eventName, data);
    }
};
/**
 * prefab url to cc.Prefab
 */
Command.prefabMap = {};
Command = Command_1 = __decorate([
    ccclass
], Command);
exports.default = Command;
