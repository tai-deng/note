"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WXImage_1;
const { ccclass, property } = cc._decorator;
let WXImage = WXImage_1 = class WXImage {
    static createImage(imageURL) {
        console.log("----  WXImage ----");
        console.log("-  createImage  -");
        console.log(imageURL);
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
    static saveImageToPhotosAlbum(imagePath, success = null, fail = null, complete = null) {
        console.log("----  WXImage ----");
        console.log("-  saveImageToPhotosAlbum  -");
        console.log(imagePath);
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
    static previewImage(images) {
        console.log("----  WXImage ----");
        console.log("-  previewImage  -");
        console.log(images);
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
    static getSnapshotFile(scale = 0.5) {
        console.log("----  WXImage ----");
        console.log("-  getSnapshotFile  -");
        if (typeof wx == "undefined")
            return;
        let frameSize = cc.view.getFrameSize();
        let ratio = cc.view.getDevicePixelRatio();
        let canvas = cc.game.canvas;
        let tempFilePath = canvas.toTempFilePathSync({
            x: 0,
            y: 0,
            destWidth: frameSize.width * ratio * scale,
            destHeight: frameSize.height * ratio * scale,
        });
        return tempFilePath;
    }
    static getSnapshotImage() {
        console.log("----  WXImage ----");
        console.log("-  getSnapshotImage  -");
        if (typeof wx == "undefined")
            return null;
        let canvas = cc.game.canvas;
        let data = canvas.toDataURL();
        return WXImage_1.createImage(data);
    }
};
WXImage = WXImage_1 = __decorate([
    ccclass
], WXImage);
exports.default = WXImage;
