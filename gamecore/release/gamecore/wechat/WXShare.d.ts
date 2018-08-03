/**
 * 微信分享相关接口
 *
 */
export default class WXShare {
    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     *
     * @param title             分享title
     * @param imageURL          分享的图片加载地址
     * @param queryObj          分享携带参数
     *
     * @see https://developers.weixin.qq.com/minigame/dev/document/share/wx.onShareAppMessage.html
     */
    static setOnShareAppMessage(title: string, imageURL: string, queryObj?: object): void;
    /**
     * 分享app
     *
     * @param   title       分享的title
     * @param   imageURL    分享的图片url
     * @param   queryObj    分享携带数据
     */
    static shareApp(title: string, imageURL: string, queryObj?: object): void;
    /**
     * 分享到群
     *
     * @param   title       分享的title
     * @param   imageURL    分享的图片url
     * @param   queryObj    分享携带数据
     * @param   callback    返回回调。接受一个string类型参数，为shareTicket
     */
    static shareAppToGroup(title: string, imageURL: string, queryObj?: object, callback?: Function): void;
}
