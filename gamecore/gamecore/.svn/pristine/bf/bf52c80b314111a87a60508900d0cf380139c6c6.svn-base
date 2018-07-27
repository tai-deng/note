import GameManager from "../gamecore/managers/GameManager";

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
 * 游戏主场景
 */
@ccclass
export default class GameSceneMain extends cc.Component {


    //返回节点
    @property(cc.Node)
    homeBtn:cc.Node = null;

    start () {
        //事件监听
        this.homeBtn.on(cc.Node.EventType.TOUCH_END, this.homeBtnTapHandler, this);

    }


    /**
     * Home控制按钮点击
     * 
     * @param e 
     */
    private homeBtnTapHandler(e:cc.Event):void {
        //播放点击音效
        GameManager.soundsManager.playTapSound();

        //进入游戏启动场景
        GameManager.sceneManager.popScene();
        // cc.director.loadScene("StartSence");

    }
}
