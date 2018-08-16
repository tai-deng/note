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
var WXUser_1;
const { ccclass, property } = cc._decorator;
/**
 * 微信用户相关接口库
 */
let WXUser = WXUser_1 = class WXUser {
    /**
     * 用户登陆
     */
    static login() {
        console.log("----  WXUser ----");
        console.log("-  login  -");
        if (typeof wx == "undefined")
            return;
        wx.login({
            success: function (res) {
                console.log("login success");
                console.log(res);
                wx.getUserInfo({
                    lang: "zh_CN",
                    success: (res) => {
                        WXUser_1._userInfo = res["userInfo"];
                    },
                    fail: (err) => {
                        console.log(err);
                        // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                        if (err.errMsg.indexOf('auth deny') > -1 || err.errMsg.indexOf('auth denied') > -1) {
                            // 处理用户拒绝授权的情况
                        }
                    }
                });
            }
        });
    }
    /**
     * 获取用户信息
     *
     * avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqQSQwjEuu9SZySQFUTib2mUJW3ZytyjXAye34Jh5KUTBaicPMrnkkGtKBWZ3XrU3VXvJvYFvrXEK2Q/132"
     * city: "Changsha"
     * country: "China"
     * gender: 1
     * language: "zh_CN"
     * nickName:"laan"
     * province: "Hunan"
     *
     */
    static get userInfo() {
        return WXUser_1._userInfo;
    }
    static createUserInfoButton() {
        let button = wx.createUserInfoButton({
            type: 'text',
            text: '获取用户信息',
            withCredentials: true,
            lang: "zh_CN",
            style: {
                left: 10,
                top: 76,
                width: 200,
                height: 40,
                lineHeight: 40,
                backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        });
        button.onTap((res) => {
            console.log("user info button on tap");
            console.log(res);
            WXUser_1._userInfo = res["userInfo"];
        });
    }
};
//用户信息
WXUser._userInfo = null;
WXUser = WXUser_1 = __decorate([
    ccclass
], WXUser);
exports.default = WXUser;
