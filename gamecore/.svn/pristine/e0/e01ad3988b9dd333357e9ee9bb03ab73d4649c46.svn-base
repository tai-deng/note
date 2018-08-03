/**
 * 微信核心接口库
 */
export default class WXCore {
    static query: object;
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
    /**
     * 获取请求携带参数
     */
    static readonly queryData: object;
    /**
     * 获取系统信息
     *
     * @see https://developers.weixin.qq.com/minigame/dev/document/system/system-info/wx.getSystemInfoSync.html
     */
    private static getSystemInfo;
    /**
     * 显示信息提示
     *
     * @param info 信息内容
     * @param duration 显示时间（毫秒）
     */
    static showToast(info: string, duration?: number): void;
    static vibrateShort(): void;
    /**
     * 上报用户分数
     */
    static saveUserScore(score: number): void;
    /**
     * 获取我的数据
     *
     * @see https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getUserCloudStorage.html
     */
    static getUserScore(successCallback: Function, failCallback?: Function): void;
    /**
     * 获取我的好友数据
     */
    static getFriendData(successCallback: Function, failCallback?: Function): void;
    /**
     * 预览图片
     *
     * @param images 图片的url列表
     */
    static previewImage(images: Array<string>): void;
    /**
     * 保存图片到相册
     *
     * @param imagePath
     * @param success               保存成功回调
     * @param fail                  保存失败回调
     * @param complete              完成回调
     */
    static saveImageToPhotosAlbum(imagePath: string, success?: Function, fail?: Function, complete?: Function): void;
    /**
     * 分享app
     *
     * @param   title       分享的title
     * @param   imageURL    分享的图片url
     * @param   queryObj    分享携带数据
     * @param   callback    成功回调
     */
    static shareApp(title: string, imageURL: string, queryObj?: object, callback?: Function): void;
    /**
     * 设置关闭小游戏时，是否退出游戏
     *
     * @param v
     */
    /**
     * 创建图片
     *
     */
    static createImage(imageURL: string): cc.SpriteFrame;
    static getUserInfo(successCallback: any, failCallback: any): void;
    static setUserBestScore(score: number): void;
    static getUserBestScore(successCallback: any, failCallback: any): void;
}
