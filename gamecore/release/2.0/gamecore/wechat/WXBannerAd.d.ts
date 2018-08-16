import { GameCoreLocation } from "../GameCoreLocation";
/**
 * 微信条形广告
 *
 */
export default class WXBannerAd extends cc.Node {
    private static _currentAd;
    static readonly currentAd: WXBannerAd;
    maxHeight: number;
    borderWeight: number;
    private static _theAd;
    private _adID;
    private _location;
    private _bannerAd;
    private _maxWidth;
    private _isNewAd;
    private _vertialIndent;
    private _horizontalIndent;
    /**
     *
     * @param adID                  广告ID
     * @param location              广告位置
     * @param maxWidth              广告最大宽
     * @param verticalIndent        广告垂直方向上偏移像素
     * @param horizontalIndent      广告水平方向上偏移像素
     */
    constructor(adID: string, location?: GameCoreLocation, maxWidth?: number, verticalIndent?: number, horizontalIndent?: number);
    /**
     *
     *
     */
    private createAd;
    private _adRect;
    /**
     * 获取广告在屏幕上的矩形区域
     */
    readonly adRect: cc.Rect;
    /**
     * 重新布局
     */
    private relayout;
    private _isShowing;
    /**
     * 广告是否正在显示
     *
     */
    readonly isShowing: boolean;
    /**
     * 显示广告
     */
    show(): void;
    /**
     * 隐藏广告
     */
    hide(): void;
    private _disposed;
    /**
     * 销毁广告
     *
     *
     * @param   doReal 是否真的释放。如果是，则销毁广告，否则只是隐藏。
     *
     */
    dispose(doReal?: boolean): void;
    /**
     * 广告加载完成回调
     */
    private adLoadCallback;
    /**
     * 广告resize回调
     */
    private adResizeCallback;
    /**
     * 广告错误回调
     */
    private adErrorCallback;
}
