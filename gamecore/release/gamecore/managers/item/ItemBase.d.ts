/**
 * 道具基类
 */
export default class ItemBase extends cc.Node {
    id: string;
    protected _type: number;
    /**
     * 获取道具类型
     *
     * @see ItemTypes;
     *
     */
    readonly type: number;
    protected _name: string;
    /**
     * 道具名称
     */
    readonly name: string;
    protected _desc: string;
    /**
     * 道具描述
     */
    readonly desc: string;
    /**
     * 使用道具
     */
    useItem(): void;
}
