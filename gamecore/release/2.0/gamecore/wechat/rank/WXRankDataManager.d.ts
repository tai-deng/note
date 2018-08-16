import WXRankVO from "./WXRankVO";
/**
 * 微信排行榜数据管理器
 *
 */
export default class WXRankDataManager extends cc.Node {
    private static _instance;
    /**
     * 获取管理器单例
     */
    static readonly instance: WXRankDataManager;
    private _friendRankData;
    constructor();
    /**
     * 获取排行榜数据
     */
    readonly friendRankData: Array<WXRankVO>;
    private _friendRankNext;
    /**
     * 获取我的下一个超越的目标
     */
    readonly friendRankNext: WXRankVO;
    private _friendRankPrevious;
    /**
     * 获取我的上一个超越的目标
     */
    readonly friendRankPrevious: WXRankVO;
    private _friendRankMine;
    /**
     * 获取我排行榜数据
     */
    readonly friendRankMine: WXRankVO;
    private _myScore;
    /**
     * 设置我的分数
     */
    myScore: number;
    /**
     * avatarUrl	string	用户头像图片 url
     * city	string	用户所在城市
     * country	string	用户所在国家
     * gender	number	用户性别
     * language	string	显示 country province city 所用的语言
     * nickName	string	用户昵称
     * openId	string	用户 openId
     * province	string	用户所在省份
     */
    private _userInfo;
    /**
     * 获取个人信息
     */
    private getUserInfo;
    /**
     * 重新计算所有数据
     */
    private refreshAllData;
    /**
     * 排序数据
     */
    private sortFriendRankData;
    /**
     * 刷新排行榜数据
     *
     */
    refreshRankingData(): void;
}
