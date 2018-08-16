"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SceneManager_1;
const LoadingSceneMain_1 = require("./LoadingSceneMain");
const GameManager_1 = require("../GameManager");
const { ccclass, property } = cc._decorator;
let SceneManager = SceneManager_1 = class SceneManager {
    constructor() {
        this._sceneStack = [];
        this._startLoadingTime = 0;
    }
    get currentSceneName() {
        return this._currentSceneName;
    }
    pushScene(sceneName) {
        this._sceneStack.push(sceneName);
        this.loadScene(sceneName);
    }
    preloadScene(sceneName, success = null, fail = null) {
        cc.director.preloadScene(sceneName, null, (err) => {
            console.log("err", err);
            if (!err) {
                if (success != null)
                    success.call(null);
            }
            else {
                console.log("场景" + GameManager_1.default.sceneManager.currentSceneName + "加载失败");
                if (fail != null)
                    fail.call(null);
            }
        });
    }
    popScene() {
        if (this._sceneStack.length > 1) {
            let v = this._sceneStack.pop();
            let toScene = this._sceneStack[this._sceneStack.length - 1];
            this.loadScene(toScene);
            return v;
        }
        return null;
    }
    reset() {
        this._sceneStack = [];
        this._currentSceneName = null;
    }
    loadScene(sceneName) {
        if (this.loadingSceneName) {
            if (this._isLoading)
                return;
            this._currentSceneName = sceneName;
            this.showLoadingScene();
            cc.director.preloadScene(sceneName, null, (err) => {
                console.log("err", err);
                if (!err) {
                    GameManager_1.default.sceneManager.sceneLoadedCallback(sceneName);
                }
                else {
                    console.log("场景" + GameManager_1.default.sceneManager.currentSceneName + "加载失败");
                    GameManager_1.default.sceneManager._isLoading = false;
                    GameManager_1.default.sceneManager.popScene();
                }
            });
        }
        else {
            this._currentSceneName = sceneName;
            cc.director.loadScene(sceneName);
        }
    }
    sceneLoadedCallback(sceneName) {
        if (this._currentSceneName != sceneName)
            return;
        let now = new Date().getTime();
        console.log("【SceneManager】sceneLoadedCallback", now - this._startLoadingTime);
        if (this.loadingSceneName && (now - this._startLoadingTime < SceneManager_1.MIN_LOADING_TIME)) {
            setTimeout(function () {
                GameManager_1.default.sceneManager.sceneLoadedCallback(sceneName);
            }, 1000);
            return;
        }
        let canvas = cc.find("Canvas");
        if (canvas) {
            let loadingScript = canvas.getComponent(LoadingSceneMain_1.default);
            if (loadingScript) {
                console.log("【sceneLoadedCallback】释放加载场景");
                loadingScript.doPreDestory(0.3);
                setTimeout(function () {
                    GameManager_1.default.sceneManager.showCurrentScene();
                }, 400);
                return;
            }
        }
        this.showCurrentScene();
    }
    showCurrentScene() {
        this._isLoading = false;
        cc.director.loadScene(this._currentSceneName);
    }
    get isLoading() {
        return this._isLoading;
    }
    showLoadingScene() {
        this._startLoadingTime = new Date().getTime();
        if (this._isLoading)
            return;
        this._isLoading = true;
        cc.director.loadScene(this.loadingSceneName);
    }
    lockSence() {
    }
    unlockSence(unlockAll) {
    }
};
SceneManager.MIN_LOADING_TIME = 2000;
SceneManager = SceneManager_1 = __decorate([
    ccclass
], SceneManager);
exports.default = SceneManager;
