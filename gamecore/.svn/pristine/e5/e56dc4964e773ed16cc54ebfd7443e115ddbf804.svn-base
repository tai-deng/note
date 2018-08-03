/**
 * command
 */
export default class Command {
    /**
     * prefab url to cc.Prefab
     */
    private static prefabMap;
    /**
     * 事件
     */
    event: cc.Event;
    /**
     * 事件携带数据
     */
    data: any;
    protected _prefabURL: string;
    /**
     * 获取资源加载路径
     */
    readonly prefabURL: string;
    /**
     * 获取资源是否已加载完成
     */
    readonly prefab: cc.Prefab;
    /**
     * 加载素材
     *
     * @param callback  回调方法
     *
     */
    loadPrefab(callback?: Function): void;
    /**
     * 执行命令
     */
    execute(): void;
    /**
     * 释放prefab
     *
     */
    destoryPrefab(): void;
    /**
     * 派发事件
     *
     * @param event
     */
    dispacheEvent(event: cc.Event): void;
    /**
     * 携带数据，派发事件
     *
     * @param eventName
     * @param data
     */
    dispacheEventWith(eventName: string, data?: any): void;
}
