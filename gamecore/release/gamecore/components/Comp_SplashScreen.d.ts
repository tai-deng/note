/**
 * 启动屏场景。该脚本请挂载在场景下
 */
export default class Comp_SplashScreen extends cc.Component {
    mainSceneName: string;
    showTime: number;
    private _mainSceneLoaded;
    start(): void;
    private mainSceneLoadedCallback;
    private _passedTime;
    private doShowMainScene;
    onDestroy(): void;
}
