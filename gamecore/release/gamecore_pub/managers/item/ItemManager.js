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
const { ccclass, property } = cc._decorator;
let ItemManager = class ItemManager {
    constructor() {
        this._allItems = [];
        this._inGameItemUsedCount = {};
        this._itemUsedCountTotal = {};
    }
    get allItems() {
        return this._allItems.concat();
    }
    getItemsByName(itemName) {
        let items = [];
        this._allItems.forEach(function (ele) {
            if (ele.name == itemName) {
                items.push(ele);
            }
        });
        return items;
    }
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
    getItemUsedCountTotal(itemName) {
        let v;
        if (this._itemUsedCountTotal[itemName] != undefined) {
            v = this._itemUsedCountTotal[itemName];
        }
        if (isNaN(v) || v < 0)
            v = 0;
        return v;
    }
    useItem(item) {
        let itemName = item.name;
        cc.info("used item " + itemName);
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
        item.useItem();
        this._allItems.splice(index, 1);
        GameManager_1.default.eventManager.dispatchEventWith(GameCoreEvent_1.default.ITEM_USED, item);
    }
    addItem(item) {
        if (!item || item.type == ItemTypes_1.default.ABSTRACT)
            return;
        if (this._allItems.indexOf(item) == -1) {
            this._allItems.push(item);
            cc.info("添加道具", item.name);
            GameManager_1.default.eventManager.dispatchEventWith(GameCoreEvent_1.default.ITEM_ADDED, item);
        }
    }
    removeItem(item) {
        let index = this.allItems.indexOf(item);
        if (index != -1) {
            this._allItems.splice(index, 1);
            GameManager_1.default.eventManager.dispatchEventWith(GameCoreEvent_1.default.ITEM_REMOVED, item);
        }
    }
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
