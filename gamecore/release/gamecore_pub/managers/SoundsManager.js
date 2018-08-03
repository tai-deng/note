"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let SoundsManager = class SoundsManager {
    constructor() {
        this.popUpSoundSource = null;
        this.tapSoundSource = null;
        this.sceneBgSoundIDs = [];
        this.sceneBgSoundURLs = [];
        this._musicMuted = false;
        this._soundMuted = false;
        this._musicVolume = 1;
        this._soundVolume = 1;
        this._audioClipMap = {};
        this._loopAudioMap = {};
        let v = cc.sys.localStorage.getItem("__l__soundsManager_soundMuted");
        if (v == "true") {
            this.muteSound();
        }
        v = cc.sys.localStorage.getItem("__l__soundsManager_musicMuted");
        if (v == "true") {
            this.muteMusic();
        }
    }
    pushSceneBgMusic(sourceURL) {
        let lastURL;
        if (this.sceneBgSoundURLs.length > 0) {
            lastURL = this.sceneBgSoundURLs[this.sceneBgSoundURLs.length - 1];
        }
        if (lastURL != sourceURL) {
            if (this.sceneBgSoundURLs.length > 0) {
                let lastBgSoundID = this.sceneBgSoundIDs[this.sceneBgSoundIDs.length - 1];
                cc.info("暂停背景音乐", this.sceneBgSoundURLs[this.sceneBgSoundURLs.length - 1]);
                cc.audioEngine.pause(lastBgSoundID);
            }
            let id = cc.audioEngine.play(cc.url.raw(sourceURL), true, this._musicVolume);
            this.sceneBgSoundIDs.push(id);
            this.sceneBgSoundURLs.push(sourceURL);
            cc.info("播放背景音乐", sourceURL);
            this.refreshBgMusic();
        }
    }
    popSceneBgMusic() {
        if (this.sceneBgSoundURLs.length <= 1)
            return;
        let bgSoundID = this.sceneBgSoundIDs.pop();
        cc.audioEngine.pause(bgSoundID);
        this.sceneBgSoundURLs.pop();
        bgSoundID = this.sceneBgSoundIDs[this.sceneBgSoundIDs.length - 1];
        cc.audioEngine.resume(bgSoundID);
        this.refreshBgMusic();
    }
    refreshBgMusic() {
        if (this.sceneBgSoundURLs.length == 0)
            return;
        let lastBgSoundID = this.sceneBgSoundIDs[this.sceneBgSoundIDs.length - 1];
        console.log("@@@lastBgSoundID", lastBgSoundID);
        if (this._musicMuted) {
            cc.audioEngine.pause(lastBgSoundID);
            cc.audioEngine.setVolume(lastBgSoundID, 0);
        }
        else {
            cc.audioEngine.resume(lastBgSoundID);
            cc.audioEngine.setVolume(lastBgSoundID, this._musicVolume);
        }
    }
    get musicMuted() {
        return this._musicMuted;
    }
    get soundMuted() {
        return this._soundMuted;
    }
    muteMusic() {
        if (this._musicMuted)
            return;
        this._musicMuted = true;
        this.refreshBgMusic();
        cc.sys.localStorage.setItem("__l__soundsManager_musicMuted", this._musicMuted);
    }
    unmuteMusic() {
        if (!this._musicMuted)
            return;
        this._musicMuted = false;
        this.refreshBgMusic();
        cc.sys.localStorage.setItem("__l__soundsManager_musicMuted", this._musicMuted);
    }
    get musicVolume() {
        return this._musicVolume;
    }
    set musicVolume(value) {
        if (value >= 0 && this._musicVolume != value) {
            this._musicVolume = value;
            this.refreshBgMusic();
        }
    }
    muteSound() {
        if (this._soundMuted)
            return;
        this._soundMuted = true;
        cc.sys.localStorage.setItem("__l__soundsManager_soundMuted", this._soundMuted);
    }
    unmuteSound() {
        if (!this._soundMuted)
            return;
        this._soundMuted = false;
        cc.sys.localStorage.setItem("__l__soundsManager_soundMuted", this._soundMuted);
    }
    get soundVolume() {
        return this._soundVolume;
    }
    set soundVolume(value) {
        if (value >= 0 && this._soundVolume != value) {
            this._soundVolume = value;
        }
    }
    playSound(sourceURL, loop = false) {
        if (!sourceURL)
            return;
        if (this._soundMuted)
            return;
        if (loop && this._loopAudioMap[sourceURL] != undefined) {
            return;
        }
        if (this._audioClipMap[sourceURL] != undefined) {
            this.playSound_do(sourceURL, loop);
        }
        else {
            cc.info("【playSound】load sound", sourceURL, loop);
            let script = this;
            let realURL = sourceURL.replace(/^\/?resources\//, "");
            cc.loader.loadRes(realURL, function (err, audio) {
                if (audio) {
                    script._audioClipMap[sourceURL] = audio;
                    script.playSound_do(sourceURL, loop);
                }
            });
        }
    }
    playSound_do(sourceURL, loop = false) {
        let clip = this._audioClipMap[sourceURL];
        if (!clip)
            return;
        let theAS = new cc.AudioSource();
        theAS.clip = clip;
        if (loop) {
            this._loopAudioMap[sourceURL] = theAS;
            theAS.loop = true;
        }
        theAS.volume = this._soundVolume;
        theAS.play();
    }
    stopSound(sourceURL) {
        let theAS = this._loopAudioMap[sourceURL];
        if (!theAS)
            return;
        theAS.stop();
        delete this._loopAudioMap[sourceURL];
    }
    reset() {
        this._audioClipMap = {};
        for (let key in this._loopAudioMap) {
            let theAS = this._loopAudioMap[key];
            if (theAS)
                theAS.stop();
        }
        this._loopAudioMap = {};
    }
    playTapSound() {
        if (this.tapSoundSource) {
            this.playSound(this.tapSoundSource);
        }
    }
};
SoundsManager.bgSoundID = NaN;
SoundsManager = __decorate([
    ccclass
], SoundsManager);
exports.default = SoundsManager;
