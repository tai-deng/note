import { GameCoreLocation } from "../GameCoreLocation";
/**
 * 一个banner广告
 */
export default class WXABannerAd extends cc.Component {
    adID: string;
    adLocation: GameCoreLocation;
    maxWidth: number;
    verticalIndent: number;
    horizontalIndent: number;
    maxHeight: number;
    defaultAd: cc.Node;
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
