/**
 * 小幺鸡api
 *
 * @see http://www.xiaoyaoji.cn/share/MsmrbiWWx/UNX8Vu1aN?password=wx
 */
export default class XYJAPI {
    private static _baseURL;
    static channelID: string;
    static gameVersion: string;
    static inviterOpenID: string;
    static inviterUserID: string;
    static inviterNickname: string;
    static inviterTime: number;
    static gameStartTime: number;
    static inviterAction: string;
    static inviterGameRecordID: string;
    static inviterChannel: string;
    static relayLimitedTime: number;
    static userOpenID: string;
    static userID: string;
    static userUnionID: string;
    static userNickname: string;
    private static userToken;
    private static encryptedData;
    private static iv;
    /**
     * avatarUrl	string	用户头像图片 url
     * city	        string	用户所在城市
     * country	    string	用户所在国家
     * gender	    number	用户性别
     * language	    string	显示 country province city 所用的语言
     * nickName	    string	用户昵称
     * openId	    string	用户 openId
     * province	    string	用户所在省份
     */
    private static _userInfo;
    static readonly userInfo: object;
    static _initialized: boolean;
    /**
     * 初始化
     */
    static init(): void;
    /**
     * 获取需要携带的数据
     *
     * @param shareType         分享类型。
     *
     * @see ShareTypes
     */
    static getShareQueryData(shareType?: string): object;
    /**
     * 检查是否是接力
     *
     * @param inTime        在游戏开始多少秒后可以接力
     */
    static checkCanRelay(inTime?: number): boolean;
    /**
     * 用户的登陆回调
     *
     *
     * @see http://www.xiaoyaoji.cn/share/MsmrbiWWx/MsJg6RxLg
     *
     * @param res
     */
    private static loginCallback;
    private static _code;
    /**
     * 登陆平台
     */
    static login(): void;
    /**
     * 向小幺鸡平台发送登陆反馈后回调
     */
    private static loginFeedbackCallback;
    /**
     * 获取用户信息
     */
    static getUserInfo(): void;
    /**
     * 获取用户信息回调
     * @param res
     */
    private static getUserInfoCallback;
    /**
     * 登陆绑定
     *
     * @param res
     */
    private static loginBindingCallback;
    private static _r_canShare;
    /**
     * 是否可以分享。
     */
    static readonly canShare: boolean;
    /**
     * 获取远程设置的是否可分享的值
     */
    private static getRemoteCanShare;
    private static _reviveCount;
    /**
     * 获取复活卡数量
     */
    static readonly reviveCount: number;
    /**
     * 获取复活卡数量。回调方法接收一个number类型的参数。
     */
    static getRevive(callback?: Function): void;
    /**
     * 使用复活卡
     *
     * @param callback
     */
    static useRevive(callback?: Function): void;
    /**
     * 保存分数
     *
     * @param score
     */
    static saveScore(score: number): void;
    private static _shareDataMap;
    /**
     * 获取分享数据
     *
     * @param callback      接受一个object对象:
     *
     * {"imageurl":string, "title":string}
     *
     */
    static getShareData(callback?: Function, status?: number): void;
    /**
     * 广告数据
     */
    private static _adImageData;
    /**
     * 获取交叉推广图。接收一个obj参数。
     *
     * {
     *      imageurl: XYJAPI._baseURL + "Upload/image/2018-06-06/P_15282657218141544.jpg ",
     *      title: "篮球大作战",
     *      bili: "4:3"
     * }
     *
     * @see http://www.xiaoyaoji.cn/share/MsmrbiWWx/Rif1Qd3cp
     */
    static getAdImageData(callback: Function, refreshAgain?: boolean): void;
    private static _wxMiniAppData;
    /**
     * 微信小程序数据
     *
     * {"imageurl":string}
     */
    static readonly wxMiniAppData: object;
    private static _isGettingWXMiniAppData;
    /**
     * 获取微信小程序数据
     *
     *
     * @see http://www.xiaoyaoji.cn/share/MsmrbiWWx/VBHsTd2nE
     *
     *
     *
     */
    private static getWXMiniAppData;
    /**
     * 上报接力分数
     *
     *
     * @param score             接力分数
     * @param startTime         接力开始时间（玩家开始玩游戏时间），秒
     *
     *
     * @see http://www.xiaoyaoji.cn/share/MsmrbiWWx/5DA71JiTP
     */
    static saveRelayScore(score: number, startTime: Date): void;
    private static _relayData;
    /**
     * 接力数据
     *
     *
     * @see Ball.Api.Room.Activity
     */
    static getRelayData(callback?: Function): void;
    /**
     * 获取分享邀请的好友个数（分渠道）
     *
     * @param 分享类型          1:增加基础分分享
     *
     * @see Ball.Api.Room.Activity
     */
    static getNewUserCountFromShare(shareStatus: string, callback?: Function): void;
    /**
     * 获取红包数据
     *
     * {
     *      "money":红包金额,
     *      "state":    1:可领取，2:已领取, 0:其他
     *      "message":
     * }
     *
     *
     * @see Ball.Api.Forward.Envelopes
     */
    static getHongBaoData(callback?: Function, useHongBao?: boolean): void;
    /**
     * 获取本局游戏成功邀请的好
     *
     *
     * @see http://www.xiaoyaoji.cn/share/MsmrbiWWx/D7MB1O0q4
     */
    static getNewsInCurrentGameRecord(recordID: string, callback?: Function): void;
    /**
     * 创建签名
     */
    static createSign(data: any): string;
}
