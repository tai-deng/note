/**
 * 显示子域内容组件。需要显示子域内容时，请挂载该组件到一个空节点
 *
 */
export default class Comp_SubDomainContent extends cc.Component {
    delayTime: number;
    /**
     *
     */
    private _sharedSprite;
    private _sharedTex;
    start(): void;
    private _lastUpdateTime;
    update(dt: any): void;
    private _contentScale;
    /**
     * 更新子域内容
     */
    private updateSubDomainContent;
}
