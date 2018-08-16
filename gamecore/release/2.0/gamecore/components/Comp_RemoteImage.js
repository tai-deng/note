"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const WXImage_1 = require("../wechat/WXImage");
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
 * 远程图片
 */
let Comp_RemoteImage = class Comp_RemoteImage extends cc.Component {
    /**
     * 远程图片
     */
    constructor() {
        super(...arguments);
        this.imageURL = "";
    }
    start() {
        this._sprite = this.node.getComponent(cc.Sprite);
        if (!this._sprite) {
            this._sprite = this.node.addComponent(cc.Sprite);
        }
        if (this.imageURL) {
            this.setImageURL(this.imageURL);
        }
    }
    // update (dt) {}
    setImageURL(v) {
        this._sprite.spriteFrame = WXImage_1.default.createImage(this.imageURL);
    }
};
__decorate([
    property({
        displayName: "图片URL"
    })
], Comp_RemoteImage.prototype, "imageURL", void 0);
Comp_RemoteImage = __decorate([
    ccclass
], Comp_RemoteImage);
exports.default = Comp_RemoteImage;
