/**
 * 一个banner广告
 */
export default class WXABannerAd extends cc.Component {
    adID: string;
    adLocation: string;
    maxWidth: number;
    verticalIndent: number;
    horizontalIndent: number;
    private _wxBannerAd;
    start(): void;
    /**
     * banner显示
     *
     * @param e
     */
    private adShowHandler;
    /**
     * banner隐藏
     *
     * @param e
     */
    private adHideHandler;
    private adResizeHandler;
    private static _isDoneFixed;
    private fixIphoneXBug;
    onDestroy(): void;
}
