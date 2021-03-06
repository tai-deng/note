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
 * 道具基类
 */
let ItemBase = class ItemBase extends cc.Node {
    /**
     * 获取道具类型
     *
     * @see ItemTypes;
     *
     */
    get type() {
        return this._type;
    }
    /**
     * 道具名称
     */
    get name() {
        return this._name;
    }
    /**
     * 道具描述
     */
    get desc() {
        return this._desc;
    }
    /**
     * 使用道具
     */
    useItem() {
    }
};
ItemBase = __decorate([
    ccclass
], ItemBase);
exports.default = ItemBase;
