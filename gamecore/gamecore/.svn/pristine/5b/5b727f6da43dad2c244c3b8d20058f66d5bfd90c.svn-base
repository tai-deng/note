import Command from "../gamecore/legs/Command";
import XYJAPI from "../gamecore/xiaoyaoji/XYJAPI";
import WXCore from "../gamecore/wechat/WXCore";

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
 * 分享游戏命令
 * 
 */
@ccclass
export default class ShareGameCommand extends Command {
    
    /**
     * 复写执行函数
     */
    execute() {
        let title:string = this.data["title"];
        let imageURL:string = this.data["imageurl"];
        let queryStr:string = "openId=" + XYJAPI.userOpenID + "&channel=" + XYJAPI.inviterChannel;

        WXCore.shareApp(title, imageURL, queryStr);
    }
}
