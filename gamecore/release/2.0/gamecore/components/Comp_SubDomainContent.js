"use strict";
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
/**
 * 显示子域内容组件。需要显示子域内容时，请挂载该组件到一个空节点
 *
 */
let Comp_SubDomainContent = class Comp_SubDomainContent extends cc.Component {
    /**
     * 显示子域内容组件。需要显示子域内容时，请挂载该组件到一个空节点
     *
     */
    constructor() {
        super(...arguments);
        this.delayTime = 0;
        /**
         *
         */
        this._sharedSprite = null;
        this._sharedTex = null;
        //记录上一次刷新子域内容时间点
        this._lastUpdateTime = 0;
    }
    // onLoad () {}
    start() {
        console.log("【Comp_SubDomainContent】 start");
        //设置节点尺寸
        this.node.width = cc.winSize.width;
        this.node.height = cc.winSize.height;
        //获取sprite组件
        this._sharedSprite = this.node.getComponent(cc.Sprite);
        if (!this._sharedSprite) {
            this._sharedSprite = this.node.addComponent(cc.Sprite);
        }
        this._sharedTex = new cc.Texture2D();
        this.updateSubDomainContent();
    }
    update(dt) {
        try {
            if (this.delayTime > 0) {
                let now = new Date().getTime();
                if (now - this._lastUpdateTime < this.delayTime * 1000) {
                    return;
                }
                this._lastUpdateTime = now;
            }
            this.updateSubDomainContent();
        }
        catch (err) {
        }
    }
    /**
     * 更新子域内容
     */
    updateSubDomainContent() {
        // console.log("刷新子域~~~");
        if (typeof wx == "undefined")
            return;
        console.log("【Comp_SubDomainContent】刷新子域内容");
        let openDataContext = wx.getOpenDataContext();
        let sharedCanvas = openDataContext.canvas;
        this._sharedTex.initWithElement(sharedCanvas);
        this._sharedTex.handleLoadedTexture();
        this._sharedSprite.spriteFrame = new cc.SpriteFrame(this._sharedTex);
        //缩放内容
        if (isNaN(this._contentScale)) {
            let w = sharedCanvas.width;
            let h = sharedCanvas.height;
            console.log("shared canvas width is", w);
            console.log("shared canvas height is", h);
            this._contentScale = cc.winSize.width / w;
            this.node.scale = this._contentScale;
        }
    }
};
__decorate([
    property({
        displayName: "刷新间隔(秒)",
        tooltip: "如果设置为0，则每帧刷新"
    })
], Comp_SubDomainContent.prototype, "delayTime", void 0);
Comp_SubDomainContent = __decorate([
    ccclass
], Comp_SubDomainContent);
exports.default = Comp_SubDomainContent;
