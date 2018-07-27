import GameManager from "./gamecore/managers/GameManager";
import CommandEventType from "./commands/CommandEventType";
import AlertCommand from "./commands/AlertCommand";
import ShareGameCommand from "./commands/ShareGameCommand";

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
 * 游戏系统类
 * 
 */
@ccclass
export default class GameSystem extends cc.Component {

    //是否已初始化
    private static _initialized:boolean;


    public static init():void {
        if (GameSystem._initialized) return;
        GameSystem._initialized = true;

        //设置版本号
        GameManager.gameVersion = "1.0";
        GameManager.isDebug = true;
        GameManager.addVersionInfo();

        //popup使用毛玻璃效果
        GameManager.popUpManager.useBlurEffect = true;

        //设置常用的音乐素材
        GameManager.soundsManager.tapSoundSource = "/resources/sounds/tap.mp3";

        //绑定事件到命令。一旦通过GameManager.eventManager来派发事件，就会执行事件绑定的命令
        GameManager.context.mapEvent(CommandEventType.SHOW_ALERT, AlertCommand);
        GameManager.context.mapEvent(CommandEventType.SHARE_GAME, ShareGameCommand);
    }

}
