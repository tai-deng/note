"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemTypes_1 = require("./ItemTypes");
const GameManager_1 = require("../GameManager");
const GameCoreEvent_1 = require("../../GameCoreEvent");
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
 * 道具管理器
 */
let ItemManager = class ItemManager {
    /**
     * 道具管理器
     */
    constructor() {
        //道具
        this._allItems = [];
        /**
         * 道具被使用次数
         */
        this._inGameItemUsedCount = {};
        this._itemUsedCountTotal = {};
    }
    /**
     * 获取道具
     */
    get allItems() {
        return this._allItems.concat();
    }
    /**
     * 根据道具名称获取道具
     *
     * @param itemName 道具名称
     */
    getItemsByName(itemName) {
        let items = [];
        this._allItems.forEach(function (ele) {
            if (ele.name == itemName) {
                items.push(ele);
            }
        });
        return items;
    }
    /**
     * 获取某个游戏中道具在一句游戏中使用的次数
     *
     * @param itemName
     */
    getItemUsedCountInGame(itemName) {
        let v;
        if (this._inGameItemUsedCount[itemName] != undefined) {
            v = this._inGameItemUsedCount[itemName];
        }
        cc.info("getItemUsedCountInGame");
        cc.info(JSON.stringify(this._inGameItemUsedCount));
        if (isNaN(v) || v < 0)
            v = 0;
        return v;
    }
    /**
     * 获取某个游戏中道具在整个游戏中使用的次数
     *
     * @param itemName
     */
    getItemUsedCountTotal(itemName) {
        let v;
        if (this._itemUsedCountTotal[itemName] != undefined) {
            v = this._itemUsedCountTotal[itemName];
        }
        if (isNaN(v) || v < 0)
            v = 0;
        return v;
    }
    /**
     * 使用道具
     *
     * @param item
     */
    useItem(item) {
        let itemName = item.name;
        cc.info("used item " + itemName);
        //检查道具是否存在
        let index = this._allItems.indexOf(item);
        if (index == -1)
            return;
        let v = this._inGameItemUsedCount[itemName];
        if (isNaN(v) || v < 0)
            v = 0;
        this._inGameItemUsedCount[itemName] = v + 1;
        v = this._itemUsedCountTotal[itemName];
        if (isNaN(v) || v < 0)
            v = 0;
        this._itemUsedCountTotal[itemName] = v + 1;
        //使用道具
        item.useItem();
        //删除
        this._allItems.splice(index, 1);
        //抛出事件
        GameManager_1.default.eventManager.dispatchEventWith(GameCoreEvent_1.default.ITEM_USED, item);
    }
    /**
     * 添加道具
     *
     * @param item
     */
    addItem(item) {
        if (!item || item.type == ItemTypes_1.default.ABSTRACT)
            return;
        if (this._allItems.indexOf(item) == -1) {
            this._allItems.push(item);
            cc.info("添加道具", item.name);
            //抛出事件
            GameManager_1.default.eventManager.dispatchEventWith(GameCoreEvent_1.default.ITEM_ADDED, item);
        }
    }
    /**
     * 移除道具
     *
     * @param item
     */
    removeItem(item) {
        let index = this.allItems.indexOf(item);
        if (index != -1) {
            this._allItems.splice(index, 1);
            //抛出事件
            GameManager_1.default.eventManager.dispatchEventWith(GameCoreEvent_1.default.ITEM_REMOVED, item);
        }
    }
    /**
     * 当游戏结束时，调用该方法，让游戏中道具数据清空。
     */
    gameEnded() {
        for (let i = 0; i < this._allItems.length; i++) {
            let item = this._allItems[i];
            if (item.type == ItemTypes_1.default.IN_GAME) {
                this._allItems.splice(i, 1);
                i--;
            }
        }
        this._inGameItemUsedCount = {};
    }
};
ItemManager = __decorate([
    ccclass
], ItemManager);
exports.default = ItemManager;
