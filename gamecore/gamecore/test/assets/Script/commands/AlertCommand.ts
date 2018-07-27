import Command from "../gamecore/legs/Command";
import GameCoreEvent from "../gamecore/GameCoreEvent";
import GameManager from "../gamecore/managers/GameManager";
import MyAlert from "../prefabs/MyAlert";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 弹出alert命令
 */

@ccclass
export default class AlertCommand extends Command {

    constructor() {
        super();

        //设置预制体加载路径后，该命令会在加载完预制体后执行 execute 方法。
        this._prefabURL = "prefabs/MyAlert";
    }

    /**
     * 复写执行函数
     */
    public execute() {
        cc.info("execute");
        
        let alert:cc.Node = cc.instantiate(this.prefab);
        if (alert) {
            //传递参数
            alert.getComponent(MyAlert).data = this.data;

            //弹出内容
            GameManager.popUpManager.addPopUp(alert, true, false);
        }
    }
}
