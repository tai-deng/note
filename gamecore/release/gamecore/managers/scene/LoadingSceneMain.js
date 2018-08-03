"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
 * 加载场景脚本
 */
let LoadingSceneMain = class LoadingSceneMain extends cc.Component {
    /**
     * 加载场景脚本
     */
    constructor() {
        super(...arguments);
        //title节点
        this.titleNode = null;
        //icon节点
        this.iconNode = null;
        //logo节点
        this.logoNode = null;
    }
    // onLoad () {}
    start() {
        //如果有设置icon节点，显示时，让icon缓慢显示
        if (this.iconNode) {
            this.iconNode.opacity = 0;
            this.iconNode.runAction(cc.sequence(cc.delayTime(0.1), cc.fadeTo(0.5, 255)));
        }
        if (this.logoNode) {
            this.logoNode.opacity = 0;
            this.logoNode.runAction(cc.fadeTo(0.3, 255));
        }
    }
    /**
     * 销毁前操作。这里会做一些动画
     */
    doPreDestory(duration = 0) {
        if (duration <= 0)
            return;
        if (this.titleNode) {
            this.titleNode.stopAllActions();
            this.titleNode.runAction(cc.fadeTo(duration, 0));
        }
        if (this.iconNode) {
            this.iconNode.stopAllActions();
            this.iconNode.runAction(cc.fadeTo(duration, 0));
        }
        if (this.logoNode) {
            this.logoNode.stopAllActions();
            let winSize = cc.director.getWinSize();
            this.logoNode.runAction(cc.moveTo(duration, this.logoNode.x, -winSize.height / 2 - this.logoNode.height));
        }
        // this.node.stopAllActions();
        // this.node.runAction(cc.fadeTo(0.3, 0));
    }
    // update (dt) {}
    onDestroy() {
        this.node.stopAllActions();
        if (this.titleNode) {
            this.titleNode.stopAllActions();
        }
        if (this.iconNode) {
            this.iconNode.stopAllActions();
        }
        if (this.logoNode) {
            this.logoNode.stopAllActions();
        }
    }
};
__decorate([
    property({
        type: cc.Node,
        displayName: "title节点"
    })
], LoadingSceneMain.prototype, "titleNode", void 0);
__decorate([
    property({
        type: cc.Node,
        displayName: "icon节点"
    })
], LoadingSceneMain.prototype, "iconNode", void 0);
__decorate([
    property({
        type: cc.Node,
        displayName: "logo节点"
    })
], LoadingSceneMain.prototype, "logoNode", void 0);
LoadingSceneMain = __decorate([
    ccclass
], LoadingSceneMain);
exports.default = LoadingSceneMain;
