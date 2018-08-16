"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1;
const { ccclass, property } = cc._decorator;
let Utils = Utils_1 = class Utils {
    static get iphoneXTopBarHeight() {
        return 44;
    }
    static get iphoneXBottomBarHeight() {
        return 44;
    }
    static get isIphoneX() {
        try {
            return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
        }
        catch (error) {
        }
        return false;
    }
    static getSnapshot() {
        let snapshotNode = new cc.Node();
        snapshotNode.width = cc.winSize.width;
        snapshotNode.height = cc.winSize.height;
        let sprite = snapshotNode.addComponent(cc.Sprite);
        let camera = cc.Camera.findCamera(cc.director.getScene());
        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.winSize.width, cc.winSize.height);
        camera.targetTexture = texture;
        sprite.spriteFrame = new cc.SpriteFrame(texture);
        camera.render(cc.director.getScene());
        camera.targetTexture = null;
        snapshotNode.scaleY = -1;
        return snapshotNode;
    }
    static toScreenRect(rect) {
        let newRect = rect.clone();
        newRect.x = rect.xMin;
        newRect.y = cc.winSize.height - newRect.yMax;
        let screenSize = cc.view.getFrameSize();
        let s = screenSize.height / cc.winSize.height;
        newRect.x *= s;
        newRect.y *= s;
        newRect.width *= s;
        newRect.height *= s;
        return newRect;
    }
    static fromScreenRect(rect) {
        let newRect = rect.clone();
        let screenSize = cc.view.getFrameSize();
        newRect.y = screenSize.height - newRect.y - newRect.height;
        let s = screenSize.height / cc.winSize.height;
        newRect.x /= s;
        newRect.y /= s;
        newRect.width /= s;
        newRect.height /= s;
        let canvasRect = new cc.Rect(newRect.x, newRect.y, newRect.width, newRect.height);
        return canvasRect;
    }
    static toInt(value) {
        let v = parseInt("" + value);
        if (isNaN(v))
            v = 0;
        return v;
    }
    static scaleContentAuto(content) {
        let desS = 1334 / 750;
        let winS = cc.winSize.height / cc.winSize.width;
        console.log("【scaleContentAuto】", desS, winS);
        if (winS > desS) {
            content.scale = cc.winSize.width / 750;
        }
    }
    static labelStringToValue(label, v, duration = 0.5) {
        if (isNaN(v))
            return;
        let currentV = parseInt(label.string);
        if (isNaN(currentV) || currentV < 0)
            currentV = 0;
        if (currentV == v)
            return;
        let uuid = label.uuid;
        clearInterval(this._labelToValueMap[uuid]);
        let stepV = (v - currentV) / 10;
        let step = 0;
        this._labelToValueMap[uuid] = setInterval(function () {
            step++;
            if (step == 10) {
                label.string = "" + v;
                clearInterval(Utils_1._labelToValueMap[uuid]);
            }
            else {
                label.string = "" + (currentV + Math.floor(stepV * step));
            }
        }, 50);
    }
    static positionToPosition(po, fromNode, toNode) {
        po = new cc.Vec2(po.x, po.x);
        po.x += fromNode.width * fromNode.anchorX;
        po.y += fromNode.height * fromNode.anchorY;
        po = fromNode.convertToWorldSpace(po);
        po = toNode.convertToNodeSpace(po);
        po.x -= toNode.width * toNode.anchorX;
        po.y -= toNode.height * toNode.anchorY;
        return po;
    }
    static newPoint(size = 10, color = null) {
        let theNode = new cc.Node();
        theNode.width = size;
        theNode.height = size;
        var ctx = theNode.addComponent(cc.Graphics);
        if (color == null)
            color = new cc.Color(255, 0, 0, 160);
        ctx.fillColor = color;
        ctx.fillRect(0, 0, theNode.width, theNode.height);
        ctx.stroke();
        return theNode;
    }
};
Utils._labelToValueMap = {};
Utils = Utils_1 = __decorate([
    ccclass
], Utils);
exports.default = Utils;
