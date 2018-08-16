/**
 * 功能管理
 */
export default class Utils {
    static readonly iphoneXTopBarHeight: number;
    static readonly iphoneXBottomBarHeight: number;
    /**
     * 检查是否是iphoneX
     *
     */
    static readonly isIphoneX: boolean;
    /**
     * 创建舞台截图
     *
     */
    static getSnapshot(): cc.Node;
    /**
     * 将cocos中canvas的rect数据转换为屏幕中的rect数据
     *
     * @param rect
     */
    static toScreenRect(rect: cc.Rect): cc.Rect;
    /**
     * 将屏幕中的矩形区域，转换为cocos中canvas的矩形区域
     *
     * @param rect
     */
    static fromScreenRect(rect: cc.Rect): cc.Rect;
    /**
     * 将一个值转换为整型。如果失败，则返回0
     *
     * @param value
     */
    static toInt(value: any): number;
    /**
     * 自动缩放内容
     *
     * @param content
     */
    static scaleContentAuto(content: cc.Node): void;
    private static _labelToValueMap;
    /**
     * 将一个label的值增加到或减少到另外一个值。
     * 比如是整数。
     *
     * @param label
     * @param v
     * @param duration          动画时间
     */
    static labelStringToValue(label: cc.Label, v: number, duration?: number): void;
    /**
     * 将fromNode节点的一个点，转换为toNode节点中的位置
     *
     * @param po
     * @param fromNode
     * @param toNode
     */
    static positionToPosition(po: cc.Vec2, fromNode: cc.Node, toNode: cc.Node): cc.Vec2;
    /**
     * 创建一个带颜色的点
     *
     * @param size
     */
    static newPoint(size?: number, color?: cc.Color): cc.Node;
}
