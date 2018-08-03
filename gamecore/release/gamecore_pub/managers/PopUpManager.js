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
const { ccclass, property } = cc._decorator;
let PopUpManager = class PopUpManager {
    constructor() {
        this.useBlurEffect = false;
        this._popUpMap = {};
        this._popUpCount = 0;
    }
    get popUpCount() {
        return this._popUpCount;
    }
    createPopUpBg(alpha = 160) {
        let winSize = cc.director.getWinSize();
        let alphaNode = new cc.Node();
        alphaNode.width = winSize.width;
        alphaNode.height = winSize.height;
        var ctx = alphaNode.addComponent(cc.Graphics);
        ctx.fillColor = new cc.Color(0, 0, 0, alpha);
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
            let sprite = blurNode.addComponent(cc.Sprite);
            sprite.spriteFrame = WXCore_1.default.createImage(cc.url.raw(filePath));
            setTimeout(function () {
                blurNode.addComponent(Comp_ShaderBlurEdge_1.default);
            }, 2);
            bg.addChild(blurNode);
        }
        bg.addChild(alphaNode);
        bg.addComponent(cc.BlockInputEvents);
        return bg;
    }
    addPopUp(node, modal = true, closeWhenTapOutside = false, scaleFactor = 0.8, contentBgAlpha = 160, cleanupWhenRemoved = true) {
        let winSize = cc.director.getWinSize();
        let centerPoint = new cc.Vec2(0, 0);
        let container = cc.find("Canvas");
        if (!container) {
            container = cc.director.getScene();
            centerPoint = new cc.Vec2(winSize.width / 2, winSize.height / 2);
        }
        let udid = node.uuid;
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
        let callback = cc.callFunc(function () {
            node.on(GameCoreEvent_1.default.COMMON_CLOSE, GameManager_1.default.popUpManager.nodeCloseEventHandler, GameManager_1.default.popUpManager);
            if (bg && closeWhenTapOutside) {
                bg.on(cc.Node.EventType.TOUCH_END, GameManager_1.default.popUpManager.popUpBgTapHandler, GameManager_1.default.popUpManager);
            }
        });
        node.stopAllActions();
        node.runAction(cc.sequence(action, callback));
        GameManager_1.default.soundsManager.playSound(GameManager_1.default.soundsManager.popUpSoundSource);
        if (GameManager_1.default.canVibrate) {
            WXCore_1.default.vibrateShort();
        }
    }
    popUpBgTapHandler(e) {
        let targetBG = e.currentTarget;
        for (var uuid in this._popUpMap) {
            let v = this._popUpMap[uuid];
            if (v && v[1] == targetBG) {
                let content = v[0];
                if (content) {
                    content.dispatchEvent(new cc.Event(GameCoreEvent_1.default.COMMON_CLOSE, false));
                }
            }
        }
    }
    nodeCloseEventHandler(evt) {
        let node = evt.currentTarget;
        this.removePopUp(node);
    }
    removePopUp(node) {
        if (!node)
            return;
        if (this._popUpMap[node.uuid]) {
            node.off(GameCoreEvent_1.default.COMMON_CLOSE, this.nodeCloseEventHandler);
            let bg = this._popUpMap[node.uuid][1];
            let cleanup = this._popUpMap[node.uuid][2];
            delete this._popUpMap[node.uuid];
            this._popUpCount--;
            let spawn = cc.spawn(cc.scaleTo(0.3, 0.5, 0.5).easing(cc.easeBackIn()), cc.fadeTo(0.3, 0));
            let callback = cc.callFunc(function () {
                if (node && node.parent) {
                    if (cleanup)
                        node.destroy();
                    else
                        node.removeFromParent(false);
                }
                if (bg && bg.parent) {
                    if (cleanup)
                        bg.destroy();
                    else
                        bg.removeFromParent(false);
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
