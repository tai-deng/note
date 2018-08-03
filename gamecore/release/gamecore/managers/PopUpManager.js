"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameManager_1 = require("./GameManager");
const GameCoreEvent_1 = require("../GameCoreEvent");
const WXCore_1 = require("../wechat/WXCore");
const Comp_ShaderBlurEdge_1 = require("../shader/Comp_ShaderBlurEdge");
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
let PopUpManager = class PopUpManager {
    constructor() {
        //是否使用毛玻璃效果
        this.useBlurEffect = false;
        /**
         * {
         *      "uuid":[content, bg, cleanupWhenRemoved]
         *
         * }
         */
        this._popUpMap = {};
        this._popUpCount = 0;
    }
    /**
     * 获取弹出层数量
     *
     */
    get popUpCount() {
        return this._popUpCount;
    }
    /**
     * 创建背景
     */
    createPopUpBg(alpha = 160) {
        let winSize = cc.director.getWinSize();
        //半透明节点
        let alphaNode = new cc.Node();
        alphaNode.width = winSize.width;
        alphaNode.height = winSize.height;
        var ctx = alphaNode.addComponent(cc.Graphics);
        ctx.fillColor = new cc.Color(0, 0, 0, alpha);
        // ctx.fillColor = cc.Color.RED;
        ctx.lineWidth = 0;
        ctx.fillRect(0, 0, winSize.width, winSize.height);
        ctx.stroke();
        if (this.useBlurEffect !== true) {
            alphaNode.addComponent(cc.BlockInputEvents);
            return alphaNode;
        }
        let bg = new cc.Node();
        bg.width = winSize.width;
        bg.height = winSize.height;
        //毛玻璃效果
        let filePath = WXImage_1.default.getSnapshotFile();
        if (filePath) {
            let frameSize = cc.view.getFrameSize();
            let ratio = cc.view.getDevicePixelRatio();
            cc.info("frame size", frameSize.width, frameSize.height);
            cc.info("win size", winSize.width, winSize.height);
            cc.info("ratio", ratio);
            let ttW = frameSize.width * ratio * 0.5;
            let ttH = frameSize.height * ratio * 0.5;
            cc.info("ttW", ttW, "ttH", ttH);
            let blurNode = new cc.Node();
            blurNode.width = ttW;
            blurNode.height = ttH;
            blurNode.scaleX = winSize.width / ttW;
            blurNode.scaleY = winSize.height / ttH;
            // blurNode.scaleX = winSize.width / ttW;
            // blurNode.scaleY = winSize.height / ttH;
            let sprite = blurNode.addComponent(cc.Sprite);
            // sprite.spriteFrame = WXCore.createImage(filePath);
            sprite.spriteFrame = WXCore_1.default.createImage(cc.url.raw(filePath));
            setTimeout(function () {
                blurNode.addComponent(Comp_ShaderBlurEdge_1.default);
            }, 2);
            bg.addChild(blurNode);
            //TODO:DEBUG
            // WXUtils.saveImageToPhotosAlbum(filePath);
        }
        //半透明节点
        bg.addChild(alphaNode);
        bg.addComponent(cc.BlockInputEvents);
        return bg;
    }
    /**
     * 添加弹出面板。
     *
     * 弹出内容抛出GameCoreEvent.COMMON_CLOS事件时，会关闭面板。
     *
     * @param node                      弹出内容
     * @param modal                     是否禁用面板底层内容交互
     * @param closeWhenTapOutside       点击弹出内容外围是否关闭面板
     * @param scaleFactor               内容缩放因子。0.8表示内容会缩放至屏幕宽的0.8（或者高的0.8）
     * @param contentBgAlpha            内容背景透明度0-255
     * @param cleanupWhenRemoved        移除弹出时是否释放
     */
    addPopUp(node, modal = true, closeWhenTapOutside = false, scaleFactor = 0.8, contentBgAlpha = 160, cleanupWhenRemoved = true) {
        let winSize = cc.director.getWinSize();
        //中心点
        let centerPoint = new cc.Vec2(0, 0);
        //容器
        let container = cc.find("Canvas");
        if (!container) {
            container = cc.director.getScene();
            centerPoint = new cc.Vec2(winSize.width / 2, winSize.height / 2);
        }
        let udid = node.uuid;
        //记录数据
        this._popUpMap[udid] = [node, null, cleanupWhenRemoved];
        let bg = null;
        if (modal) {
            bg = this.createPopUpBg(contentBgAlpha);
            bg.y = centerPoint.y;
            bg.x = centerPoint.x;
            container.addChild(bg);
            this._popUpMap[udid][1] = bg;
        }
        node.x = centerPoint.y;
        node.y = centerPoint.x;
        container.addChild(node);
        //弹出层数量增加
        this._popUpCount++;
        let toScale;
        if (scaleFactor == 1) {
            toScale = 1;
        }
        else {
            toScale = Math.min(winSize.width * scaleFactor / node.width, winSize.height * scaleFactor / node.height);
        }
        node.scale = 0.5;
        node.opacity = 255;
        let action = cc.scaleTo(0.5, toScale, toScale).easing(cc.easeBackOut());
        // let spawn = cc.spawn(action);
        let callback = cc.callFunc(function () {
            //添加事件
            node.on(GameCoreEvent_1.default.COMMON_CLOSE, GameManager_1.default.popUpManager.nodeCloseEventHandler, GameManager_1.default.popUpManager);
            if (bg && closeWhenTapOutside) {
                bg.on(cc.Node.EventType.TOUCH_END, GameManager_1.default.popUpManager.popUpBgTapHandler, GameManager_1.default.popUpManager);
            }
        });
        node.stopAllActions();
        node.runAction(cc.sequence(action, callback));
        //添加事件
        // node.on(GameCoreEvent.COMMON_CLOSE, this.nodeCloseEventHandler, this);
        //播放音效
        GameManager_1.default.soundsManager.playSound(GameManager_1.default.soundsManager.popUpSoundSource);
        //微小震动
        if (GameManager_1.default.canVibrate) {
            WXCore_1.default.vibrateShort();
        }
    }
    /**
     * PopUp面板点击
     *
     * @param e
     */
    popUpBgTapHandler(e) {
        let targetBG = e.currentTarget;
        for (var uuid in this._popUpMap) {
            //[content, bg]
            let v = this._popUpMap[uuid];
            if (v && v[1] == targetBG) {
                let content = v[0];
                if (content) {
                    content.dispatchEvent(new cc.Event(GameCoreEvent_1.default.COMMON_CLOSE, false));
                }
            }
        }
    }
    /**
     * node关闭事件控制
     *
     * @param evt
     */
    nodeCloseEventHandler(evt) {
        let node = evt.currentTarget;
        this.removePopUp(node);
    }
    /**
     * 移除弹出
     *
     * @param node
     */
    removePopUp(node) {
        if (!node)
            return;
        if (this._popUpMap[node.uuid]) {
            node.off(GameCoreEvent_1.default.COMMON_CLOSE, this.nodeCloseEventHandler);
            //[content, bg, cleanupWhenRemoved]
            let bg = this._popUpMap[node.uuid][1];
            let cleanup = this._popUpMap[node.uuid][2];
            delete this._popUpMap[node.uuid];
            //弹出层数量减少
            this._popUpCount--;
            let spawn = cc.spawn(cc.scaleTo(0.3, 0.5, 0.5).easing(cc.easeBackIn()), cc.fadeTo(0.3, 0));
            let callback = cc.callFunc(function () {
                if (node && node.parent) {
                    // 调用一个节点的 removeFromParent 后，它不一定就能完全从内存中释放，
                    // 因为有可能由于一些逻辑上的问题，导致程序中仍然引用到了这个对象。
                    // 因此如果一个节点不再使用了，请直接调用它的 destroy 而不是 removeFromParent。
                    // destroy 不但会激活组件上的 onDestroy，还会降低内存泄露的几率，同时减轻内存泄露时的后果。
                    if (cleanup)
                        node.destroy();
                    else
                        node.removeFromParent(false);
                    // node.removeFromParent(cleanup);
                }
                if (bg && bg.parent) {
                    if (cleanup)
                        bg.destroy();
                    else
                        bg.removeFromParent(false);
                    // bg.removeFromParent(cleanup);
                }
            });
            node.stopAllActions();
            node.runAction(cc.sequence(spawn, callback));
        }
    }
};
PopUpManager = __decorate([
    ccclass
], PopUpManager);
exports.default = PopUpManager;
