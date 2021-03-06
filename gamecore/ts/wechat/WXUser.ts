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
 * 微信用户相关接口库
 */
@ccclass
export default class WXUser {


    /**
     * 用户登陆
     */
    static login():void {
        cc.info("----  WXUser ----");
        cc.info("-  login  -");
        
        if(typeof wx == "undefined") return;
        
        wx.login({
            success: function (res) {
                cc.info("login success");
                cc.info(res);

                wx.getUserInfo({
                    lang: "zh_CN",
                    success: (res) => {
                        WXUser._userInfo = res["userInfo"];
                    },
                    fail: (err) => {
                        cc.info(err);
                        // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                        if (err.errMsg.indexOf('auth deny') > -1 || err.errMsg.indexOf('auth denied') > -1 ) {
                          // 处理用户拒绝授权的情况
                        }
                    }
                });
            }
        });
    }


    //用户信息
    private static _userInfo:object = null;


    /**
     * 获取用户信息
     * 
     * avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqQSQwjEuu9SZySQFUTib2mUJW3ZytyjXAye34Jh5KUTBaicPMrnkkGtKBWZ3XrU3VXvJvYFvrXEK2Q/132"
     * city: "Changsha"
     * country: "China"
     * gender: 1
     * language: "zh_CN"
     * nickName:"laan"
     * province: "Hunan"
     * 
     */
    public static get userInfo():object {
        return WXUser._userInfo;
    }



    public static createUserInfoButton():any {
        let button = wx.createUserInfoButton({
            type: 'text',
            text: '获取用户信息',
            withCredentials: true, 
            lang: "zh_CN",
            style: {
                left: 10,
                top: 76,
                width: 200,
                height: 40,
                lineHeight: 40,
                backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        })

        button.onTap((res) => {
            cc.info("user info button on tap");
            cc.info(res);
            
            WXUser._userInfo = res["userInfo"];
        })
    }

    

}
