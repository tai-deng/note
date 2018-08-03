"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameManager_1 = require("../managers/GameManager");
const LoadingSceneMain_1 = require("../managers/scene/LoadingSceneMain");
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
 * 启动屏场景。该脚本请挂载在场景下
 */
let Comp_SplashScreen = class Comp_SplashScreen extends cc.Component {
    /**
     * 启动屏场景。该脚本请挂载在场景下
     */
    constructor() {
        super(...arguments);
        this.mainSceneName = "";
        this.showTime = 2;
        this._passedTime = 0;
    }
    start() {
        this.schedule(this.doShowMainScene, 0.1);
        //预加载场景
        if (this.mainSceneName) {
            let script = this;
            GameManager_1.default.sceneManager.preloadScene(this.mainSceneName, function () {
                script.mainSceneLoadedCallback();
            });
        }
    }
    mainSceneLoadedCallback() {
        cc.info("【mainSceneLoadedCallback】", this);
        this._mainSceneLoaded = true;
    }
    doShowMainScene() {
        this._passedTime += 0.1;
        if (this._passedTime > this.showTime && this._mainSceneLoaded) {
            this.unschedule(this.doShowMainScene);
            //====================================================================
            //尝试将加载场景通过动画方式移除
            //====================================================================
            //移除加载场景
            let loadingScript = this.node.getComponent(LoadingSceneMain_1.default);
            if (loadingScript) {
                cc.info("【sceneLoadedCallback】释放加载场景");
                loadingScript.doPreDestory(0.3);
                let script = this;
                setTimeout(function () {
                    GameManager_1.default.sceneManager.pushScene(script.mainSceneName);
                }, 400);
                return;
            }
            else {
                GameManager_1.default.sceneManager.pushScene(this.mainSceneName);
            }
            //====================================================================
        }
    }
    // update (dt) {}
    onDestroy() {
        this.unschedule(this.doShowMainScene);
    }
};
__decorate([
    property({
        tooltip: "该场景过后进入的场景名称",
        displayName: "主场景名"
    })
], Comp_SplashScreen.prototype, "mainSceneName", void 0);
__decorate([
    property({
        displayName: "停留时间(秒)"
    })
], Comp_SplashScreen.prototype, "showTime", void 0);
Comp_SplashScreen = __decorate([
    ccclass
], Comp_SplashScreen);
exports.default = Comp_SplashScreen;
