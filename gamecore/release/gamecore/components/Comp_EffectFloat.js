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
const { ccclass, property } = cc._decorator;
/**
 * 循环浮动效果
 */
let Comp_EffectFloat = class Comp_EffectFloat extends cc.Component {
    /**
     * 循环浮动效果
     */
    constructor() {
        super(...arguments);
        this.duration = 1.5;
        this.delay = 2;
        this.distanceY = 20;
        this.distanceX = 0;
    }
    start() {
        this.play();
    }
    play() {
        if (this._theAction)
            return;
        this.unschedule(this.play);
        this._theAction = this.node.runAction(cc.sequence(cc.moveTo(this.duration, this.node.x + this.distanceX, this.node.y + this.distanceY).easing(cc.easeOut(1)), cc.moveTo(this.duration, this.node.x, this.node.y).easing(cc.easeBackIn()), cc.callFunc(this.effectCompleteCallback, this)));
    }
    effectCompleteCallback() {
        this._theAction = null;
        let delay = this.delay * Math.random() / 2 + this.delay / 2;
        this.schedule(this.play, delay, 1);
    }
    /**
     * 暂停效果
     */
    stop() {
        this.unschedule(this.play);
        if (this._theAction) {
            this.node.stopAction(this._theAction);
            this._theAction = null;
        }
    }
    // update (dt) {}
    onDestroy() {
        this.stop();
    }
};
__decorate([
    property({
        displayName: "浮动特效时长(秒)"
    })
], Comp_EffectFloat.prototype, "duration", void 0);
__decorate([
    property({
        displayName: "浮动间隔时长(秒)"
    })
], Comp_EffectFloat.prototype, "delay", void 0);
__decorate([
    property({
        displayName: "浮动距离(y)"
    })
], Comp_EffectFloat.prototype, "distanceY", void 0);
__decorate([
    property({
        displayName: "浮动距离(x)"
    })
], Comp_EffectFloat.prototype, "distanceX", void 0);
Comp_EffectFloat = __decorate([
    ccclass
], Comp_EffectFloat);
exports.default = Comp_EffectFloat;
