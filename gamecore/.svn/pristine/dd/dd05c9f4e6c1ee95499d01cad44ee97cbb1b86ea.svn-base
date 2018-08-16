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
var Utils_1;
const { ccclass, property } = cc._decorator;
/**
 * 功能管理
 */
let Utils = Utils_1 = class Utils {
    //============================================================================
    //iphone x 顶部条高度
    static get iphoneXTopBarHeight() {
        return 44;
    }
    //iphone x 底部条高度
    static get iphoneXBottomBarHeight() {
        return 44;
    }
    /**
     * 检查是否是iphoneX
     *
     */
    static get isIphoneX() {
        try {
            return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
        }
        catch (error) {
        }
        return false;
    }
    /**
     * 创建舞台截图
     *
     */
    static getSnapshot() {
        let snapshotNode = new cc.Node();
        snapshotNode.width = cc.winSize.width;
        snapshotNode.height = cc.winSize.height;
        let sprite = snapshotNode.addComponent(cc.Sprite);
        // node.parent = cc.director.getScene();
        let camera = cc.Camera.findCamera(cc.director.getScene());
        // 新建一个 RenderTexture，并且设置 camera 的 targetTexture 为新建的 RenderTexture，这样 camera 的内容将会渲染到新建的 RenderTexture 中。
        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.winSize.width, cc.winSize.height);
        camera.targetTexture = texture;
        sprite.spriteFrame = new cc.SpriteFrame(texture);
        // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        camera.render(cc.director.getScene());
        //不再需要渲染
        camera.targetTexture = null;
        //TODO:... 不好意思，不太理解为什么要这样。罪过罪过
        snapshotNode.scaleY = -1;
        return snapshotNode;
    }
    /**
     * 将cocos中canvas的rect数据转换为屏幕中的rect数据
     *
     * @param rect
     */
    static toScreenRect(rect) {
        let newRect = rect.clone();
        // console.log(newRect.x, newRect.y, newRect.width, newRect.height, newRect.xMin, newRect.yMax);
        //转换为左上角作为(0, 0)点的坐标
        newRect.x = rect.xMin;
        newRect.y = cc.winSize.height - newRect.yMax;
        // console.log(newRect.x, newRect.y, newRect.width, newRect.height);
        //获取屏幕尺寸
        let screenSize = cc.view.getFrameSize();
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // console.log(screenSize.width, screenSize.height);
        //计算缩放比例
        //TODO:NEXT，需要检查canvas的适配策略
        let s = screenSize.height / cc.winSize.height;
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", s);
        newRect.x *= s;
        newRect.y *= s;
        newRect.width *= s;
        newRect.height *= s;
        // console.log(newRect.x, newRect.y, newRect.width, newRect.height);
        return newRect;
    }
    /**
     * 将屏幕中的矩形区域，转换为cocos中canvas的矩形区域
     *
     * @param rect
     */
    static fromScreenRect(rect) {
        // console.log("!!!!!!!!!!!!!!!!!!!!!!");
        // console.log("fromScreenRect");
        let newRect = rect.clone();
        // console.log(newRect.x, newRect.y, newRect.width, newRect.height);
        //获取屏幕尺寸
        let screenSize = cc.view.getFrameSize();
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // console.log(screenSize.width, screenSize.height);
        newRect.y = screenSize.height - newRect.y - newRect.height;
        //计算缩放比例
        //TODO:NEXT，需要检查canvas的适配策略
        let s = screenSize.height / cc.winSize.height;
        newRect.x /= s;
        newRect.y /= s;
        newRect.width /= s;
        newRect.height /= s;
        let canvasRect = new cc.Rect(newRect.x, newRect.y, newRect.width, newRect.height);
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", s);
        // console.log(canvasRect.x, canvasRect.y, canvasRect.width, canvasRect.height)
        return canvasRect;
    }
    /**
     * 将一个值转换为整型。如果失败，则返回0
     *
     * @param value
     */
    static toInt(value) {
        let v = parseInt("" + value);
        if (isNaN(v))
            v = 0;
        return v;
    }
    /**
     * 自动缩放内容
     *
     * @param content
     */
    static scaleContentAuto(content) {
        let desS = 1334 / 750; //设计比例
        let winS = cc.winSize.height / cc.winSize.width;
        console.log("【scaleContentAuto】", desS, winS);
        if (winS > desS) {
            content.scale = cc.winSize.width / 750;
        }
    }
    /**
     * 将一个label的值增加到或减少到另外一个值。
     * 比如是整数。
     *
     * @param label
     * @param v
     * @param duration          动画时间
     */
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
                // console.log("label to value", v, label.string);
                clearInterval(Utils_1._labelToValueMap[uuid]);
            }
            else {
                label.string = "" + (currentV + Math.floor(stepV * step));
                // console.log(v, label.string);
            }
        }, 50);
    }
    /**
     * 将fromNode节点的一个点，转换为toNode节点中的位置
     *
     * @param po
     * @param fromNode
     * @param toNode
     */
    static positionToPosition(po, fromNode, toNode) {
        // console.log("【positionToPosition】")
        // console.log("original point", po.x, po.y);
        po = new cc.Vec2(po.x, po.x);
        po.x += fromNode.width * fromNode.anchorX;
        po.y += fromNode.height * fromNode.anchorY;
        po = fromNode.convertToWorldSpace(po);
        // console.log("world point", po.x, po.y);
        po = toNode.convertToNodeSpace(po);
        po.x -= toNode.width * toNode.anchorX;
        po.y -= toNode.height * toNode.anchorY;
        // console.log("to node point", po.x, po.y);
        return po;
    }
    /**
     * 创建一个带颜色的点
     *
     * @param size
     */
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
//==============================================================
Utils._labelToValueMap = {};
Utils = Utils_1 = __decorate([
    ccclass
], Utils);
exports.default = Utils;
