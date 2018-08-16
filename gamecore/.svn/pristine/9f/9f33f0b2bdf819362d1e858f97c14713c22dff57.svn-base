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
let Command = Command_1 = class Command {
    constructor() {
        this._prefabURL = null;
    }
    get prefabURL() {
        return this._prefabURL;
    }
    get prefab() {
        if (!this._prefabURL)
            return null;
        return Command_1.prefabMap[this._prefabURL];
    }
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
        let thePrefabURL = this._prefabURL;
        thePrefabURL = thePrefabURL.replace(/^\/?resources\//, "");
        console.log("[Command] load prefab " + thePrefabURL);
        cc.loader.loadRes(thePrefabURL, function (err, prefab) {
            console.log("[Command] prefab loaded", err, prefab);
            if (prefab) {
                Command_1.prefabMap[command._prefabURL] = prefab;
            }
            else {
                console.log("[Command] prefab load fail:" + command._prefabURL);
            }
            if (callback != null)
                callback.call(null);
        });
    }
    execute() {
    }
    destoryPrefab() {
        if (this._prefabURL) {
            cc.loader.releaseRes(this._prefabURL);
            delete Command_1.prefabMap[this._prefabURL];
            this._prefabURL = null;
        }
    }
    dispacheEvent(event) {
        GameManager_1.default.eventManager.dispatchEvent(event);
    }
    dispacheEventWith(eventName, data = null) {
        GameManager_1.default.eventManager.dispatchEventWith(eventName, data);
    }
};
Command.prefabMap = {};
Command = Command_1 = __decorate([
    ccclass
], Command);
exports.default = Command;
