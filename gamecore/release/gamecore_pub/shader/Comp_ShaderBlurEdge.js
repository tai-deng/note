"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _default_vert = require("./base/ccShader_Default_Vert.js");
const _default_vert_no_mvp = require("./base/ccShader_Default_Vert_noMVP.js");
const _blur_edge_detail_frag = require("./ccShaderBlurEdgeFrag.js");
const { ccclass, property } = cc._decorator;
let Comp_ShaderBlurEdge = class Comp_ShaderBlurEdge extends cc.Component {
    onLoad() {
        this._use();
    }
    _use() {
        this._program = new cc.GLProgram();
        if (cc.sys.isNative) {
            cc.log("use native GLProgram");
            this._program.initWithString(_default_vert_no_mvp, _blur_edge_detail_frag);
            this._program.link();
            this._program.updateUniforms();
        }
        else {
            this._program.initWithVertexShaderByteArray(_default_vert, _blur_edge_detail_frag);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            this._program.link();
            this._program.updateUniforms();
        }
        let _uniWidthStep = this._program.getUniformLocationForName("widthStep");
        let _uniHeightStep = this._program.getUniformLocationForName("heightStep");
        let _uniStrength = this._program.getUniformLocationForName("strength");
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
            glProgram_state.setUniformFloat(_uniWidthStep, (1.0 / this.node.getContentSize().width));
            glProgram_state.setUniformFloat(_uniHeightStep, (1.0 / this.node.getContentSize().height));
            glProgram_state.setUniformFloat(_uniStrength, 1.0);
        }
        else {
            this._program.setUniformLocationWith1f(_uniWidthStep, (1.0 / this.node.getContentSize().width));
            this._program.setUniformLocationWith1f(_uniHeightStep, (1.0 / this.node.getContentSize().height));
            this._program.setUniformLocationWith1f(_uniStrength, 1.0);
        }
        this.setProgram(this.node._sgNode);
    }
    setProgram(node) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
            node.setGLProgramState(glProgram_state);
        }
        else {
            node.setShaderProgram(this._program);
        }
        var children = node.children;
        if (!children)
            return;
        for (var i = 0; i < children.length; i++) {
            this.setProgram(children[i], this._program);
        }
    }
};
Comp_ShaderBlurEdge = __decorate([
    ccclass
], Comp_ShaderBlurEdge);
exports.default = Comp_ShaderBlurEdge;
