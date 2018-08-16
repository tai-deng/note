"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let GameCoreEvent = class GameCoreEvent extends cc.Event {
};
GameCoreEvent.COMMON_CLOSE = "commonClose";
GameCoreEvent.COMMON_READY = "commonReady";
GameCoreEvent.DATA_CHANGE = "dataChange";
GameCoreEvent.ITEM_ADDED = "itemAdded";
GameCoreEvent.ITEM_REMOVED = "itemRemoved";
GameCoreEvent.ITEM_USED = "itemUsed";
GameCoreEvent = __decorate([
    ccclass
], GameCoreEvent);
exports.default = GameCoreEvent;
