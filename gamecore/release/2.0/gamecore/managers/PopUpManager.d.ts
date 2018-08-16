export default class PopUpManager {
    useBlurEffect: boolean;
    /**
     * {
     *      "uuid":[content, bg, cleanupWhenRemoved]
     *
     * }
     */
    private _popUpMap;
    private _popUpCount;
    /**
     * 获取弹出层数量
     *
     */
    readonly popUpCount: number;
    /**
     * 创建背景
     */
    private createPopUpBg;
    /**
     * 添加弹出面板。
     *
     * 弹出内容抛出GameCoreEvent.COMMON_CLOS事件时，会关闭面板。
     *
     * @param node                      弹出内容
     * @param modal                     是否禁用面板底层内容交互
     * @param closeWhenTapOutside       点击弹出内容外围是否关闭面板
     * @param scaleFactor               内容缩放因子。0.8表示内容会缩放至屏幕宽的0.8（或者高的0.8）
     * @param contentBgAlpha            内容背景透明度0-255
     * @param cleanupWhenRemoved        移除弹出时是否释放
     */
    addPopUp(node: cc.Node, modal?: boolean, closeWhenTapOutside?: boolean, scaleFactor?: number, contentBgAlpha?: number, cleanupWhenRemoved?: boolean): void;
    /**
     * PopUp面板点击
     *
     * @param e
     */
    private popUpBgTapHandler;
    /**
     * node关闭事件控制
     *
     * @param evt
     */
    private nodeCloseEventHandler;
    /**
     * 移除弹出
     *
     * @param node
     */
    removePopUp(node: cc.Node): void;
}
