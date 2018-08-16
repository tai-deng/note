"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let LoadingSceneMain = class LoadingSceneMain extends cc.Component {
    constructor() {
        super(...arguments);
        this.titleNode = null;
        this.iconNode = null;
        this.logoNode = null;
    }
    start() {
        if (this.iconNode) {
            this.iconNode.opacity = 0;
            this.iconNode.runAction(cc.sequence(cc.delayTime(0.1), cc.fadeTo(0.5, 255)));
        }
        if (this.logoNode) {
            this.logoNode.opacity = 0;
            this.logoNode.runAction(cc.fadeTo(0.3, 255));
        }
    }
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
            this.logoNode.runAction(cc.moveTo(duration, this.logoNode.x, -cc.winSize.height / 2 - this.logoNode.height));
        }
    }
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
