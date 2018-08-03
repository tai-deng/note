"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
/**
 * 道具类型
 */
let ItemTypes = class ItemTypes {
};
//虚拟道具。虚拟道具，不能添加到道具管理其中，仅仅是方便用户扩展。
ItemTypes.ABSTRACT = 0;
//全局道具。获得后，可一直保留
ItemTypes.GLOBAL = 1;
//游戏中道具，获得后只能在当局游戏中使用
ItemTypes.IN_GAME = 2;
ItemTypes = __decorate([
    ccclass
], ItemTypes);
exports.default = ItemTypes;
