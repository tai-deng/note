import WXRankDataManager from "./rank/WXRankDataManager";
import WXRankEventNames from "./rank/WXRankEventNames";
import WXRankVO from "./rank/WXRankVO";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainSceneMain extends cc.Component {

    

    start () {
        WXRankDataManager.instance.on(WXRankEventNames.FRIEND_RANK_CHANGE, this.friendRankChangeHandler, this);
    }


    private friendRankChangeHandler(e:cc.Event):void {
        cc.info("【子域】排行榜数据改变");
        
        //我的排行榜数据
        let me:WXRankVO = WXRankDataManager.instance.friendRankMine;
        if (me) {
            cc.info("我的排行榜数据");
            cc.info(me.nickname, me.score, me.openID, me.avatar);
        }

        let next:WXRankVO = WXRankDataManager.instance.friendRankNext;
        if (next) {
            cc.info("即将超越");
            cc.info(next.nickname, next.score, next.openID, next.avatar);
        }

        let previous:WXRankVO = WXRankDataManager.instance.friendRankPrevious;
        if (previous) {
            cc.info("已超越");
            cc.info(previous.nickname, previous.score, previous.openID, previous.avatar);
        }
    }
}
