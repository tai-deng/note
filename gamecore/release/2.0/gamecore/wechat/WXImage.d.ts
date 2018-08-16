/**
 * 微信和图片相关的接口
 */
export default class WXImage {
    /**
     * 创建图片
     *
     */
    static createImage(imageURL: string): cc.SpriteFrame;
    /**
     * 保存图片到相册
     *
     * @param imagePath
     * @param success               保存成功回调
     * @param fail                  保存失败回调
     * @param complete              完成回调
     */
    static saveImageToPhotosAlbum(imagePath: string, success?: Function, fail?: Function, complete?: Function): void;
    /**
     * 预览图片
     *
     * @param images 图片的url列表
     */
    static previewImage(images: Array<string>): void;
    /**
     * 获取屏幕截图
     *
     * @param scale     缩放系数
     *
     * @return  截图保存的临时文件目录
     */
    static getSnapshotFile(scale?: number): string;
    /**
     * 获取屏幕截图
     *
     */
    static getSnapshotImage(): cc.SpriteFrame;
}
