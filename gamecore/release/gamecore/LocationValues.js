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
 * 定义位置常量
 */
let LocationValues = class LocationValues {
};
//顶部居中
LocationValues.TOP_CENTER = "TC";
//顶部靠左
LocationValues.TOP_LEFT = "TL";
//顶部靠右
LocationValues.TOP_RIGHT = "TR";
//底部居中
LocationValues.BOTTOM_CENTER = "BC";
//底部靠左
LocationValues.BOTTOM_LEFT = "BL";
//底部靠右
LocationValues.BOTTOM_RIGHT = "BR";
LocationValues = __decorate([
    ccclass
], LocationValues);
exports.default = LocationValues;
