import WXCore from "../gamecore/wechat/WXCore";
import WXUtils from "../gamecore/wechat/WXUtils";
import WXImage from "../gamecore/wechat/WXImage";
import Utils from "../gamecore/managers/Utils";
import WXOpenData from "../gamecore/wechat/WXOpenData";
import WXUser from "../gamecore/wechat/WXUser";

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
 * 微信接口demo
 */

@ccclass
export default class WechatDemo extends cc.Component {

    @property(cc.Node)
    loginBtn: cc.Node = null;

    //分享
    @property(cc.Node)
    shareBtn: cc.Node = null;

    //save score
    @property(cc.Node)
    saveScoreBtn: cc.Node = null;

    //截图
    @property(cc.Node)
    snapshotBtn: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.loginBtn.on(cc.Node.EventType.TOUCH_END, this.loginBtnTapHandler, this);
        this.saveScoreBtn.on(cc.Node.EventType.TOUCH_END, this.saveScoreBtnTapHandler, this);
        this.shareBtn.on(cc.Node.EventType.TOUCH_END, this.shareBtnTapHandler, this);

        this.snapshotBtn.on(cc.Node.EventType.TOUCH_END, this.snapshotBtnTapHandler, this);
    }

    // update (dt) {}


    private loginBtnTapHandler(e:cc.Event):void {
        WXUser.login();
    }


    private saveScoreBtnTapHandler(e:cc.Event):void {
        let v:number = Math.round(Math.random() * 100);

        WXUtils.showToast("保存分数" + v);

        WXOpenData.saveUserScoreToCloud(v);
    }
    
    
    private shareBtnTapHandler(e:cc.Event):void {
        // wx.showShareMenu({
        //     withShareTicket:true,
        // })
        
        // wx.onShareAppMessage({
        //     title: '页面分享标题',
        //     path: '/pages/path/to/target',
        //     success: function(res):void {
        //         cc.info("onShareAppMessage");
        //         cc.info(res);
        //         // console.log(res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
        //     }
        // });
        
        // wx.shareAppMessage({
        //     success: function(res):void {
        //         cc.info("shareAppMessage");
        //         cc.info(res);
        //         // console.log(res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
        //     }
        // });
        
        // wx.getShareInfo({
            //     "success":function(res):void {
                //         cc.info(res);
                //     }
                // });
    }
    
    private snapshotBtnTapHandler(e:cc.Event):void {
        let node:cc.Node = new cc.Node();
        let sprite:cc.Sprite = node.addComponent(cc.Sprite);

        let filePath:string = WXImage.getSnapshotFile();


        let FileSystemManager:any = wx.getFileSystemManager()
        FileSystemManager.readFile({
            "filePath":filePath, 
            "encoding":"base64", 
            "success":function(fileData):void {
                cc.info(fileData)
            },
            "fail":function(fileData):void {
                cc.info("fail");
                cc.info(fileData)
            }
        })

        cc.info("file path is ", filePath);
        // filePath = cc.url.raw(filePath)
        // cc.loader.loadRes(filePath, function(err, sf) {
            // cc.info("err", err);
            // sprite.spriteFrame = sf;
        // })
        // sprite.spriteFrame = WXCore.createImage(filePath);
        // sprite.spriteFrame = WXUtils.getSnapshotImage();
        
        // cc.director.getScene().addChild(node);



        // node = new cc.Node();
        // sprite = node.addComponent(cc.Sprite);
        // sprite.spriteFrame = WXUtils.getSnapshotImage();
        // cc.director.getScene().addChild(node);

    }
}
        