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
 * 场景管理器
 */
let SceneManager = SceneManager_1 = class SceneManager {
    constructor() {
        //场景队列
        this._sceneStack = [];
        //开始加载的时间（毫秒）
        this._startLoadingTime = 0;
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // console.log("GameManager.sceneManager", GameManager.sceneManager);
        // if (GameManager.sceneManager) {
        //     throw new Error("Please use GameManager.sceneManager");
        // }
    }
    /**
     * 获取当前场景名称
     */
    get currentSceneName() {
        return this._currentSceneName;
    }
    /**
     * 推入场景
     *
     * @param sceneName 场景名称
     */
    pushScene(sceneName) {
        this._sceneStack.push(sceneName);
        this.loadScene(sceneName);
    }
    /**
     * 预加载场景
     *
     * @param sceneName 场景名称
     */
    preloadScene(sceneName, success = null, fail = null) {
        //预加载场景
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
    /**
     * 推出场景，回到上一个场景
     */
    popScene() {
        if (this._sceneStack.length > 1) {
            let v = this._sceneStack.pop();
            let toScene = this._sceneStack[this._sceneStack.length - 1];
            this.loadScene(toScene);
            return v;
        }
        return null;
    }
    /**
     * 重置
     *
     */
    reset() {
        this._sceneStack = [];
        this._currentSceneName = null;
    }
    /**
     * 加载场景
     *
     * @param sceneName
     */
    loadScene(sceneName) {
        // if (this._currentSceneName == sceneName) return;
        //如果有设置加载场景
        if (this.loadingSceneName) {
            //不能同时加载多个场景
            if (this._isLoading)
                return;
            this._currentSceneName = sceneName;
            this.showLoadingScene();
            //预加载场景
            cc.director.preloadScene(sceneName, null, (err) => {
                console.log("err", err);
                if (!err) {
                    GameManager_1.default.sceneManager.sceneLoadedCallback(sceneName);
                }
                else {
                    console.log("场景" + GameManager_1.default.sceneManager.currentSceneName + "加载失败");
                    //返回到上一个场景
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
    /**
     * 场景加载完毕回调
     *
     * @param sceneName 加载的场景名
     */
    sceneLoadedCallback(sceneName) {
        if (this._currentSceneName != sceneName)
            return;
        //检查最小时间
        let now = new Date().getTime();
        console.log("【SceneManager】sceneLoadedCallback", now - this._startLoadingTime);
        if (this.loadingSceneName && (now - this._startLoadingTime < SceneManager_1.MIN_LOADING_TIME)) {
            setTimeout(function () {
                GameManager_1.default.sceneManager.sceneLoadedCallback(sceneName);
            }, 1000);
            return;
        }
        //====================================================================
        //尝试将加载场景通过动画方式移除
        //====================================================================
        //移除加载场景
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
        //====================================================================
        this.showCurrentScene();
    }
    /**
     * 显示当前场景
     */
    showCurrentScene() {
        this._isLoading = false;
        cc.director.loadScene(this._currentSceneName);
    }
    /**
     * 是否正在加载场景
     */
    get isLoading() {
        return this._isLoading;
    }
    /**
     * 显示加载场景
     */
    showLoadingScene() {
        //记录开始显示加载场景的时间
        this._startLoadingTime = new Date().getTime();
        if (this._isLoading)
            return;
        this._isLoading = true;
        cc.director.loadScene(this.loadingSceneName);
    }
    /**
     * 锁定场景不接受任何输入
     */
    lockSence() {
    }
    /**
     * 是否解除所有锁定
     *
     * @param unlockAll
     */
    unlockSence(unlockAll) {
    }
};
//加载场景最小显示时间(毫秒)
SceneManager.MIN_LOADING_TIME = 2000;
SceneManager = SceneManager_1 = __decorate([
    ccclass
], SceneManager);
exports.default = SceneManager;
