"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameManager_1 = require("../GameManager");
const { ccclass, property } = cc._decorator;
/**
 * legs框架上下文
 *
 */
let Context = class Context {
    /**
     * legs框架上下文
     *
     */
    constructor() {
        //事件管理器
        this._eventMap = {};
    }
    /**
     * 绑定事件至命令。收到该事件时，会新建一个命令并执行。
     *
     * @param eventName                 事件名
     * @param commandClass              命令类
     */
    mapEvent(eventName, commandClass) {
        if (this._eventMap[eventName] == undefined) {
            this._eventMap[eventName] = [];
            GameManager_1.default.eventManager.on(eventName, this.eventsHandler, this);
        }
        let commandClasses = this._eventMap[eventName];
        if (commandClasses.indexOf(commandClass) == -1) {
            commandClasses.push(commandClass);
        }
    }
    /**
     * 取消绑定事件
     *
     * @param eventName                     事件名
     * @param commandClass                  命令类。如果传递null，则取消绑定所有命令
     */
    unmapEvent(eventName, commandClass = null) {
        let commandClasses = this._eventMap[eventName];
        if (commandClasses != undefined) {
            if (commandClass) {
                //取消绑定该事件的指定命令
                let index = commandClasses.indexOf(commandClass);
                if (index >= 0) {
                    commandClasses.splice(index, 1);
                    if (commandClasses.length == 0) {
                        delete this._eventMap[eventName];
                        GameManager_1.default.eventManager.off(eventName, this.eventsHandler, this);
                    }
                }
            }
            else {
                //取消绑定所有该事件的命令
                delete this._eventMap[eventName];
                GameManager_1.default.eventManager.off(eventName, this.eventsHandler, this);
            }
        }
    }
    /**
     * 解绑所有事件
     */
    unmapAllEvent() {
        for (let key in this._eventMap) {
            this.unmapEvent(key);
        }
    }
    /**
     * 事件管理器
     */
    eventsHandler(evt) {
        let eventName = evt.type;
        let eventData = evt["data"];
        let commandClasses = this._eventMap[eventName];
        if (commandClasses != undefined) {
            let len = commandClasses.length;
            for (let i = 0; i < len; i++) {
                let command = new commandClasses[i]();
                command.event = evt;
                command.data = eventData;
                //如果有设置预制体，先加载预制体
                if (command.prefabURL) {
                    command.loadPrefab(function () {
                        command.execute();
                    });
                }
                else {
                    command.execute();
                }
            }
        }
    }
};
Context = __decorate([
    ccclass
], Context);
exports.default = Context;
