/**
 * legs框架上下文
 *
 */
export default class Context {
    private _eventMap;
    /**
     * 绑定事件至命令。收到该事件时，会新建一个命令并执行。
     *
     * @param eventName                 事件名
     * @param commandClass              命令类
     */
    mapEvent(eventName: string, commandClass: any): void;
    /**
     * 取消绑定事件
     *
     * @param eventName                     事件名
     * @param commandClass                  命令类。如果传递null，则取消绑定所有命令
     */
    unmapEvent(eventName: string, commandClass?: any): void;
    /**
     * 解绑所有事件
     */
    unmapAllEvent(): void;
    /**
     * 事件管理器
     */
    private eventsHandler;
}
