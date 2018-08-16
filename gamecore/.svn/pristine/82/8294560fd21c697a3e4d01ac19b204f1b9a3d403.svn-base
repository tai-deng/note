export default class SoundsManager {
    popUpSoundSource: string;
    tapSoundSource: string;
    private sceneBgSounds;
    private sceneBgSoundURLs;
    /**
     *
     */
    constructor();
    pushSceneBgMusic(sourceURL: string): void;
    popSceneBgMusic(): void;
    private refreshBgMusic;
    private _musicMuted;
    readonly musicMuted: boolean;
    private _soundMuted;
    readonly soundMuted: boolean;
    muteMusic(): void;
    unmuteMusic(): void;
    private _musicVolume;
    musicVolume: number;
    muteSound(): void;
    unmuteSound(): void;
    private _soundVolume;
    soundVolume: number;
    private _audioClipMap;
    private _loopAudioMap;
    /**
     * 播放音效
     *
     * @param   sourceURL           音乐url
     * @param   loop                是否循环播放
     */
    playSound(sourceURL: string, loop?: boolean): void;
    private playSound_do;
    /**
     * 停止播放音效。只有设置了循环播放的音效才能被停止
     *
     * @param sourceURL
     */
    stopSound(sourceURL: string): void;
    /**
     * 重置所有音效数据；清空缓存数据。
     *
     */
    reset(): void;
    /**
     * 播放点击音效。前提是已经设置了 SoundsManager.tapSoundSource;
     */
    playTapSound(): void;
}
