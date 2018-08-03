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
var WXImage_1;
const { ccclass, property } = cc._decorator;
/**
 * 微信和图片相关的接口
 */
let WXImage = WXImage_1 = class WXImage {
    /**
     * 创建图片
     *
     */
    static createImage(imageURL) {
        cc.info("----  WXImage ----");
        cc.info("-  createImage  -");
        cc.info(imageURL);
        if (typeof wx == "undefined")
            return null;
        let tex = new cc.Texture2D();
        let icon = wx.createImage();
        icon.src = imageURL;
        icon.onload = function () {
            tex.initWithElement(icon);
            tex.handleLoadedTexture();
        };
        return new cc.SpriteFrame(tex);
    }
    /**
     * 保存图片到相册
     *
     * @param imagePath
     * @param success               保存成功回调
     * @param fail                  保存失败回调
     * @param complete              完成回调
     */
    static saveImageToPhotosAlbum(imagePath, success = null, fail = null, complete = null) {
        cc.info("----  WXImage ----");
        cc.info("-  saveImageToPhotosAlbum  -");
        cc.info(imagePath);
        if (typeof wx == "undefined")
            return;
        try {
            wx.saveImageToPhotosAlbum({
                "filePath": imagePath,
                "success": success,
                "fail": fail,
                "complete": complete,
            });
        }
        catch (error) {
        }
    }
    /**
     * 预览图片
     *
     * @param images 图片的url列表
     */
    static previewImage(images) {
        cc.info("----  WXImage ----");
        cc.info("-  previewImage  -");
        cc.info(images);
        if (typeof wx == "undefined")
            return;
        try {
            wx.previewImage({
                "urls": images
            });
        }
        catch (error) {
        }
    }
    /**
     * 获取屏幕截图
     *
     * @param scale     缩放系数
     *
     * @return  截图保存的临时文件目录
     */
    static getSnapshotFile(scale = 0.5) {
        cc.info("----  WXImage ----");
        cc.info("-  getSnapshotFile  -");
        if (typeof wx == "undefined")
            return;
        // let winSize:cc.Size = cc.director.getWinSize();
        // cc.info(winSize.width, winSize.height);
        let frameSize = cc.view.getFrameSize();
        let ratio = cc.view.getDevicePixelRatio();
        // cc.info(frameSize.width, frameSize.height, );
        let canvas = cc.game.canvas;
        let tempFilePath = canvas.toTempFilePathSync({
            x: 0,
            y: 0,
            // width: winSize.width,
            // height: winSize.height,
            destWidth: frameSize.width * ratio * scale,
            destHeight: frameSize.height * ratio * scale,
        });
        return tempFilePath;
    }
    /**
     * 获取屏幕截图
     *
     */
    static getSnapshotImage() {
        cc.info("----  WXImage ----");
        cc.info("-  getSnapshotImage  -");
        if (typeof wx == "undefined")
            return null;
        // let frameSize:cc.Size = cc.view.getFrameSize();
        // let ratio:number = cc.view.getDevicePixelRatio();
        let canvas = cc.game.canvas;
        let data = canvas.toDataURL();
        return WXImage_1.createImage(data);
    }
};
WXImage = WXImage_1 = __decorate([
    ccclass
], WXImage);
exports.default = WXImage;
