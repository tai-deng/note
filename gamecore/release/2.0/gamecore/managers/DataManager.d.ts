/**
 * 数据管理器。可以通过该管理器管理全局数据。
 */
export default class DataManager {
    private static L_KEY;
    /**
     * 数据
     */
    private _data;
    private _localData;
    constructor();
    private _lastChangedKey;
    /**
     * 获取上次变化值的key值
     */
    readonly lastChangedKey: string;
    /**
     * 设置全局数据。
     *
     *
     *
     * @param key               字段名
     * @param value             字段值
     * @param saveToLocal       是否保存到本地。如果保存到本地，字段值类型必须是简单类型，比如number、boolean、array
     * @param justToday         日期变化后是否删除。该参数只有在saveToLocal参数为true的时候生效。
     *
     */
    setData(key: string, value: any, saveToLocal?: boolean, justToday?: boolean): void;
    /**
     * 获取全局数据
     *
     * @param key
     */
    getData(key: string): any;
    /**
     * 移除数据
     *
     * @param key
     */
    remoteData(key: string): void;
    /**
     * 重置数据
     *
     */
    resetData(): void;
    private _hasChanged;
    private _changedKeys;
    /**
     * 序列化数据
     */
    private doSerialize;
    /**
     * 反序列化
     */
    private unserialize;
}
