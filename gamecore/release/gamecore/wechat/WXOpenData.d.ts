/**
 * 微信开放数据域接口
 */
export default class WXOpenData {
    /**
     * 像子域发送消息
     *
     * @param msg
     */
    static postMessage(msg: object): void;
    /**
     * 上报用户分数
     */
    static saveUserScoreToCloud(score: number): void;
}
