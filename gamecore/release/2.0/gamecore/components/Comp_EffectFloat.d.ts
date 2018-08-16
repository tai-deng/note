/**
 * 循环浮动效果
 */
export default class Comp_EffectFloat extends cc.Component {
    duration: number;
    delay: number;
    distanceY: number;
    distanceX: number;
    private _theAction;
    start(): void;
    play(): void;
    private effectCompleteCallback;
    /**
     * 暂停效果
     */
    stop(): void;
    onDestroy(): void;
}
