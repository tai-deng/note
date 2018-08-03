/**
 * 循环淡隐淡现效果
 */
export default class Comp_EffectFadeInAndOut extends cc.Component {
    duration: number;
    private _theAction;
    start(): void;
    play(): void;
    /**
     * 暂停效果
     */
    stop(): void;
    onDestroy(): void;
}
