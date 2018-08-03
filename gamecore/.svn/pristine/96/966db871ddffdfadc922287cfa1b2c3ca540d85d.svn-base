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
     * 将cocos中canvas的rect数据转换为屏幕中的rect数据
     *
     * @param rect
     */
    static toScreenRect(rect) {
        // cc.info("!!!!!!!!!!!!!!!!!!!!!!");
        let winSize = cc.director.getWinSize();
        let newRect = rect.clone();
        // cc.info(newRect.x, newRect.y, newRect.width, newRect.height, newRect.xMin, newRect.yMax);
        //转换为左上角作为(0, 0)点的坐标
        newRect.x = rect.xMin;
        newRect.y = winSize.height - newRect.yMax;
        // cc.info(newRect.x, newRect.y, newRect.width, newRect.height);
        //获取屏幕尺寸
        let screenSize = cc.view.getFrameSize();
        // cc.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // cc.info(screenSize.width, screenSize.height);
        //计算缩放比例
        //TODO:NEXT，需要检查canvas的适配策略
        let s = screenSize.height / winSize.height;
        // cc.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", s);
        newRect.x *= s;
        newRect.y *= s;
        newRect.width *= s;
        newRect.height *= s;
        // cc.info(newRect.x, newRect.y, newRect.width, newRect.height);
        return newRect;
    }
    /**
     * 将屏幕中的矩形区域，转换为cocos中canvas的矩形区域
     *
     * @param rect
     */
    static fromScreenRect(rect) {
        // cc.info("!!!!!!!!!!!!!!!!!!!!!!");
        // cc.info("fromScreenRect");
        let winSize = cc.director.getWinSize();
        let newRect = rect.clone();
        // cc.info(newRect.x, newRect.y, newRect.width, newRect.height);
        //获取屏幕尺寸
        let screenSize = cc.view.getFrameSize();
        // cc.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // cc.info(screenSize.width, screenSize.height);
        newRect.y = screenSize.height - newRect.y - newRect.height;
        //计算缩放比例
        //TODO:NEXT，需要检查canvas的适配策略
        let s = screenSize.height / winSize.height;
        newRect.x /= s;
        newRect.y /= s;
        newRect.width /= s;
        newRect.height /= s;
        let canvasRect = new cc.Rect(newRect.x, newRect.y, newRect.width, newRect.height);
        // cc.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", s);
        // cc.info(canvasRect.x, canvasRect.y, canvasRect.width, canvasRect.height)
        return canvasRect;
    }
    /**
     * 将cocos的资源路径转换为微信小游戏的资源路径。
     *
     * @param resourcePath
     */
    static toWechatMiniGameResourcePath(resourcePath) {
        if (resourcePath.charAt(0) == "/")
            resourcePath = resourcePath.substr(1);
        return "res/raw-assets/" + resourcePath;
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
        let desS = 750 / 1334; //设计比例
        let winSize = cc.director.getWinSize();
        let winS = winSize.height / winSize.width;
        if (winS > desS) {
            content.scale = winSize.width / 750;
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
                // cc.info("label to value", v, label.string);
                clearInterval(Utils_1._labelToValueMap[uuid]);
            }
            else {
                label.string = "" + (currentV + Math.floor(stepV * step));
                // cc.info(v, label.string);
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
        // cc.info("【positionToPosition】")
        // cc.info("original point", po.x, po.y);
        po = new cc.Vec2(po.x, po.x);
        po.x += fromNode.width * fromNode.anchorX;
        po.y += fromNode.height * fromNode.anchorY;
        po = fromNode.convertToWorldSpace(po);
        // cc.info("world point", po.x, po.y);
        po = toNode.convertToNodeSpace(po);
        po.x -= toNode.width * toNode.anchorX;
        po.y -= toNode.height * toNode.anchorY;
        // cc.info("to node point", po.x, po.y);
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
            color = new cc.Color(255, 0, 0, 255);
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
