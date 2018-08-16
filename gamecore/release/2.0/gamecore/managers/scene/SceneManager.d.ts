/**
 * 场景管理器
 */
export default class SceneManager {
    private static MIN_LOADING_TIME;
    private _sceneStack;
    loadingSceneName: string;
    private _currentSceneName;
    constructor();
    /**
     * 获取当前场景名称
     */
    readonly currentSceneName: string;
    /**
     * 推入场景
     *
     * @param sceneName 场景名称
     */
    pushScene(sceneName: string): void;
    /**
     * 预加载场景
     *
     * @param sceneName 场景名称
     */
    preloadScene(sceneName: string, success?: Function, fail?: Function): void;
    /**
     * 推出场景，回到上一个场景
     */
    popScene(): string;
    /**
     * 重置
     *
     */
    reset(): void;
    /**
     * 加载场景
     *
     * @param sceneName
     */
    private loadScene;
    /**
     * 场景加载完毕回调
     *
     * @param sceneName 加载的场景名
     */
    private sceneLoadedCallback;
    /**
     * 显示当前场景
     */
    private showCurrentScene;
    private _isLoading;
    private _startLoadingTime;
    /**
     * 是否正在加载场景
     */
    readonly isLoading: boolean;
    /**
     * 显示加载场景
     */
    private showLoadingScene;
    /**
     * 锁定场景不接受任何输入
     */
    lockSence(): void;
    /**
     * 是否解除所有锁定
     *
     * @param unlockAll
     */
    unlockSence(unlockAll: boolean): void;
}
