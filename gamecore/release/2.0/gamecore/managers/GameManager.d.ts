import SoundsManager from "./SoundsManager";
import PopUpManager from "./PopUpManager";
import EventManager from "./EventManager";
import DataManager from "./DataManager";
import ItemManager from "./item/ItemManager";
import Context from "./legs/Context";
import SceneManager from "./scene/SceneManager";
export default class GameManager {
    static gameVersion: string;
    static gameInternalVersionCode: string;
    static isDebug: boolean;
    private static _eventManager;
    static readonly eventManager: EventManager;
    private static _sceneManager;
    static readonly sceneManager: SceneManager;
    private static _dataManager;
    static readonly dataManager: DataManager;
    private static _soundsManager;
    static readonly soundsManager: SoundsManager;
    private static _popUpManager;
    static readonly popUpManager: PopUpManager;
    private static _itemManager;
    static readonly itemManager: ItemManager;
    private static _context;
    static readonly context: Context;
    private static _canVibrate;
    /**
     * 获取是否可震动
     */
    static readonly canVibrate: boolean;
    /**关闭震动*/
    static vibrateOff(): void;
    /**
     * 开启震动
     */
    static vibrateOn(): void;
    private static _isOnWX;
    /**
     * 是否是在微信环境下
     */
    static readonly isOnWX: boolean;
    private static _isAndroid;
    /**
     * 是否是android环境
     *
     */
    static readonly isAndroid: boolean;
    private static _todayValue;
    /**
     * 获取今日日期值。比如2018-07-07
     */
    static readonly todayValue: string;
    /**
     * 添加版本信息
     *
     */
    static addVersionInfo(): void;
    private static _initialized;
    private static init;
    private static _temp;
}
