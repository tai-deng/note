import ItemBase from "./ItemBase";
/**
 * 道具管理器
 */
export default class ItemManager {
    private _allItems;
    /**
     * 获取道具
     */
    readonly allItems: Array<ItemBase>;
    /**
     * 根据道具名称获取道具
     *
     * @param itemName 道具名称
     */
    getItemsByName(itemName: string): Array<ItemBase>;
    /**
     * 道具被使用次数
     */
    private _inGameItemUsedCount;
    private _itemUsedCountTotal;
    /**
     * 获取某个游戏中道具在一句游戏中使用的次数
     *
     * @param itemName
     */
    getItemUsedCountInGame(itemName: string): number;
    /**
     * 获取某个游戏中道具在整个游戏中使用的次数
     *
     * @param itemName
     */
    getItemUsedCountTotal(itemName: string): number;
    /**
     * 使用道具
     *
     * @param item
     */
    useItem(item: ItemBase): void;
    /**
     * 添加道具
     *
     * @param item
     */
    addItem(item: ItemBase): void;
    /**
     * 移除道具
     *
     * @param item
     */
    removeItem(item: ItemBase): void;
    /**
     * 当游戏结束时，调用该方法，让游戏中道具数据清空。
     */
    gameEnded(): void;
}
