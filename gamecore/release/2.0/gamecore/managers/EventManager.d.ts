/**
 * 事件管理
 */
export default class EventManager extends cc.EventTarget {
    /**
     *
     */
    constructor();
    /**
     * 派发事件。自动生成cc.Event对象。
     *
     * @param eventName         事件名称
     * @param data              携带数据
     */
    dispatchEventWith(eventName: string, data?: any): void;
}
