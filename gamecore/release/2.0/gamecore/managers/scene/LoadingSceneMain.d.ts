/**
 * 加载场景脚本
 */
export default class LoadingSceneMain extends cc.Component {
    titleNode: cc.Node;
    iconNode: cc.Node;
    logoNode: cc.Node;
    start(): void;
    /**
     * 销毁前操作。这里会做一些动画
     */
    doPreDestory(duration?: number): void;
    onDestroy(): void;
}
