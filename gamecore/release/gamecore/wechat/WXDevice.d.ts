/**
 * 微信设备相关功能
 */
export default class WXDevice {
    /**
     * 获取系统信息
     *
     * @see https://developers.weixin.qq.com/minigame/dev/document/system/system-info/wx.getSystemInfoSync.html
     */
    private static getSystemInfo;
    private static _systemInfo;
    /**
     * 系统信息
     *
     * brand	    string	    手机品牌	1.5.0
     * model	    string	    手机型号
     * pixelRatio	number	    设备像素比
     * screenWidth	number	    屏幕宽度	1.1.0
     * screenHeight	number	    屏幕高度	1.1.0
     * windowWidth	number	    可使用窗口宽度
     * windowHeight	number	    可使用窗口高度
     * language	    string	    微信设置的语言
     * version	    string	    微信版本号
     * system	    string	    操作系统版本
     * platform	    string	    客户端平台
     * fontSizeSetting	number	用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位 px。	1.5.0
     * SDKVersion	    string	客户端基础库版本	1.1.0
     * benchmarkLevel	number	性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>=1 设备性能值，该值越高，设备性能越好(目前设备最高不到50)	1.8.0
     * battery	        number	电量，范围 1 - 100	1.9.0
     * wifiSignal	    number	wifi 信号强度，范围 0 - 4
     */
    static readonly systemInfo: object;
    /**
     * 获取wx SDK版本号
     */
    static readonly SDKVersion: string;
    private static _benchmarkLevel;
    /**
     * 获取性能得分
     *
     * 性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>=1 设备性能值，该值越高，设备性能越好(目前设备最高不到50)	1.8.0
     */
    static readonly benchmarkLevel: number;
    static vibrateShort(): void;
    static vibrateLong(): void;
}
