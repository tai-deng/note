/**
 * 微信功能类
 */
export default class WXUtils {
    /**
     * 显示信息提示
     *
     * @param info 信息内容
     * @param duration 显示时间（毫秒）
     */
    static showToast(info: string, duration?: number): void;
    /**
     * 跳转至小程序
     *
     * 必须是同一公众号下，而非同个 open 账号下
     *
     * @param appID
     * @param path
     * @param extraData
     *
     * @see https://developers.weixin.qq.com/minigame/dev/document/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html
     */
    static navigateToMiniProgram(appID: string, path?: string, extraData?: object): void;
}
