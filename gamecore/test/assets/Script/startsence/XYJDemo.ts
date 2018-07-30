import XYJAPI from "../gamecore/xiaoyaoji/XYJAPI";

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
 * XYJ API测试
 */
@ccclass
export default class XYJDemo extends cc.Component {

    //初始化接口
    @property(cc.Node)
    initBtn: cc.Node = null;

    //提交分数按钮
    @property(cc.Node)
    saveScoreBtn: cc.Node = null;

    //上报接力分数
    @property(cc.Node)
    saveRelayScoreBtn: cc.Node = null;

    //获取接力数据
    @property(cc.Node)
    getRelayDataBtn: cc.Node = null;

    //获取红包数据
    @property(cc.Node)
    hongbaoDataBtn: cc.Node = null;

    // onLoad () {}

    start () {
        this.initBtn.on(cc.Node.EventType.TOUCH_END, this.initBtnTapHandler, this);
        this.saveScoreBtn.on(cc.Node.EventType.TOUCH_END, this.saveScoreBtnTapHandler, this);
        this.saveRelayScoreBtn.on(cc.Node.EventType.TOUCH_END, this.saveRelayScoreBtnTapHandler, this);
        this.getRelayDataBtn.on(cc.Node.EventType.TOUCH_END, this.getRelayDataBtnTapHandler, this);

        this.hongbaoDataBtn.on(cc.Node.EventType.TOUCH_END, this.hongbaoDataBtnTapHandler, this);
    }

    // update (dt) {}
    



    /**
     * 初始化接口
     * 
     * @param e
     */
    private initBtnTapHandler(e:cc.Event):void {
        XYJAPI.channelID = "1008";
        XYJAPI.gameVersion = "1.3";

        XYJAPI.init();
    }

    /**
     * 提交分数
     * 
     * @param e
     */
    private saveScoreBtnTapHandler(e:cc.Event):void {
        let score:number = 100 + Math.round(Math.random() * 100);
        XYJAPI.saveScore(score);
    }

    /**
     * 
     * @param e
     */
    private saveRelayScoreBtnTapHandler(e:cc.Event):void {
        //TODO:DEBUG
        //设置测试的接力发起者信息
        XYJAPI.inviterOpenID = "oc-l_4sgFYBffG4-YxmHmjdYKMMU";
        XYJAPI.inviterNickname = "Destiny";
        XYJAPI.inviterTime = Math.round(new Date().getTime() / 1000 - 20);

        XYJAPI.saveRelayScore(200, new Date());
    }

    /**
     * 
     * @param e
     */
    private getRelayDataBtnTapHandler(e:cc.Event):void {
        XYJAPI.getRelayData(function(data):void {
            cc.info(data);
        });
    }

    /**
     * 
     * @param e
     */
    private hongbaoDataBtnTapHandler(e:cc.Event):void {
        XYJAPI.getHongBaoData(function(data):void {
            cc.info(data);
        });
    }
}
