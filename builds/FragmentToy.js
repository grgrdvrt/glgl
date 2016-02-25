(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _glglCoreContext = require("../glgl/core/Context");

var _glglCoreContext2 = _interopRequireDefault(_glglCoreContext);

var _glglCoreDrawCall = require("../glgl/core/DrawCall");

var _glglCoreDrawCall2 = _interopRequireDefault(_glglCoreDrawCall);

var _glglCoreDrawCallData = require("../glgl/core/DrawCallData");

var _glglCoreDrawCallData2 = _interopRequireDefault(_glglCoreDrawCallData);

var _glglCoreProgram = require("../glgl/core/Program");

var _glglCoreProgram2 = _interopRequireDefault(_glglCoreProgram);

var _glglSceneObjectsMesh = require("../glgl/sceneObjects/Mesh");

var _glglSceneObjectsMesh2 = _interopRequireDefault(_glglSceneObjectsMesh);

var _glglPrimitivesQuadGeometry = require("../glgl/primitives/QuadGeometry");

var _glglPrimitivesQuadGeometry2 = _interopRequireDefault(_glglPrimitivesQuadGeometry);

var _utilsLoop = require("../utils/Loop");

var _utilsLoop2 = _interopRequireDefault(_utilsLoop);

var _utilsMouse = require("../utils/Mouse");

var _utilsMouse2 = _interopRequireDefault(_utilsMouse);

var _glglCoreTexture = require("../glgl/core/Texture");

var _glglCoreTexture2 = _interopRequireDefault(_glglCoreTexture);

var vertex = "precision mediump float;\n\nattribute vec3 aVertexPosition;\n\nuniform float time;\nuniform vec2 uFrameSize;\n\nvarying vec2 vPos;\n\nvoid main(void)\n{\n  vPos = aVertexPosition.xy;\n  gl_Position = vec4(aVertexPosition, 1.0);\n}";

var defaultFragment = "precision mediump float;\n\nuniform vec2 uFrameSize;\nuniform float time;\nconst vec3 off = vec3(-1.0, 0.0, 1.0);\nvarying vec2 vPos;\n\nvec3 white = vec3(1.0);\nvec3 black = vec3(0.0);\nvec3 red = vec3(1.0, 0.0, 0.0);\n\nvoid main(void)\n{\n  float radius = 0.5;\n  float inCircle = step(length(vPos) - radius, 0.0);\n  float timeValue = 0.5 + 0.5 * cos(0.01 * time);\n  gl_FragColor = vec4(mix(mix(white, red, timeValue), black, inCircle), 1.0);\n}";

var FragmentToy = (function () {
  function FragmentToy(canvas) {
    _classCallCheck(this, FragmentToy);

    this.context = new _glglCoreContext2["default"](canvas);
    this.drawCallData = new _glglCoreDrawCallData2["default"]();
    this.quad = new _glglPrimitivesQuadGeometry2["default"]();
    this.setSource(defaultFragment);
  }

  _createClass(FragmentToy, [{
    key: "setSource",
    value: function setSource(fragment) {
      this.drawCallData.params.program = new _glglCoreProgram2["default"](vertex, fragment);
    }
  }, {
    key: "start",
    value: function start(loopCallback) {
      var _this = this;

      this.loopCallback = loopCallback;
      new _utilsLoop2["default"](function (frameId) {
        return _this.render(frameId);
      });
    }
  }, {
    key: "setUniforms",
    value: function setUniforms(values) {
      this.drawCallData.setUniforms(values);
    }
  }, {
    key: "render",
    value: function render(frameId) {
      this.context.clear();
      if (this.loopCallback !== undefined) {
        this.loopCallback(frameId);
      }
      var drawCall = new _glglCoreDrawCall2["default"]([this.quad.getDrawCallData(), this.context.viewport.getDrawCallData(), this.drawCallData]);
      drawCall.exec(this.context);
    }
  }]);

  return FragmentToy;
})();

exports["default"] = FragmentToy;

window.FragmentToy = FragmentToy;
FragmentToy.Texture = _glglCoreTexture2["default"];
FragmentToy.Mouse = _utilsMouse2["default"];
module.exports = exports["default"];

},{"../glgl/core/Context":4,"../glgl/core/DrawCall":5,"../glgl/core/DrawCallData":6,"../glgl/core/Program":8,"../glgl/core/Texture":9,"../glgl/primitives/QuadGeometry":18,"../glgl/sceneObjects/Mesh":19,"../utils/Loop":21,"../utils/Mouse":22}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var AttributeBuffer = (function () {
  function AttributeBuffer() {
    _classCallCheck(this, AttributeBuffer);

    this.glBuffer = undefined;
    this.data = undefined;
    this.isInit = false;
  }

  _createClass(AttributeBuffer, [{
    key: "initGL",
    value: function initGL(gl) {
      this.glBuffer = gl.createBuffer();
      this.isInit = true;
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.data = data;
      this.needsUpdate = true;
    }
  }, {
    key: "updateGL",
    value: function updateGL(gl) {
      gl.bindBuffer(_consts2["default"].ARRAY_BUFFER, this.glBuffer);
      gl.bufferData(_consts2["default"].ARRAY_BUFFER, this.data, _consts2["default"].STATIC_DRAW);
      this.needsUpdate = false;
    }
  }]);

  return AttributeBuffer;
})();

exports["default"] = AttributeBuffer;
module.exports = exports["default"];

},{"./consts":12}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var sizes = {};
sizes[_consts2["default"].INT] = 1;
sizes[_consts2["default"].FLOAT] = 1;
sizes[_consts2["default"].FLOAT_VEC2] = 2;
sizes[_consts2["default"].FLOAT_VEC3] = 3;
sizes[_consts2["default"].FLOAT_VEC4] = 4;
sizes[_consts2["default"].INT_VEC2] = 2;
sizes[_consts2["default"].INT_VEC3] = 3;
sizes[_consts2["default"].INT_VEC4] = 4;
sizes[_consts2["default"].FLOAT_MAT2] = 4;
sizes[_consts2["default"].FLOAT_MAT3] = 9;
sizes[_consts2["default"].FLOAT_MAT4] = 16;

var AttributeInput = (function () {
  function AttributeInput(name, size, type, location) {
    _classCallCheck(this, AttributeInput);

    this.name = name;
    this.size = size;
    this.type = type;
    this.location = location;
    this.itemSize = sizes[this.type];
  }

  _createClass(AttributeInput, [{
    key: "updateGL",
    value: function updateGL(gl, buffer) {
      if (buffer.needsUpdate) {
        buffer.updateGL(gl);
      }
      gl.bindBuffer(_consts2["default"].ARRAY_BUFFER, buffer.glBuffer);
      gl.vertexAttribPointer(this.location, this.itemSize, _consts2["default"].FLOAT, false, 0, 0);
    }
  }]);

  return AttributeInput;
})();

exports["default"] = AttributeInput;
module.exports = exports["default"];

},{"./consts":12}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var _Viewport = require("./Viewport");

var _Viewport2 = _interopRequireDefault(_Viewport);

var _mathVec2 = require("../math/Vec2");

var _mathVec22 = _interopRequireDefault(_mathVec2);

var _utilsSignal = require("../../utils/Signal");

var _utilsSignal2 = _interopRequireDefault(_utilsSignal);

var Context = (function () {
  function Context(canvas) {
    _classCallCheck(this, Context);

    this.canvas = canvas;

    this.viewport = new _Viewport2["default"]();

    this._checkSizeBind = this.checkSize.bind(this);
    this.resized = new _utilsSignal2["default"]();
    this.autoSize = true;
    this.autoClear = true;
    this.glFrameBuffer = null;

    try {
      this.glContext = this.canvas.getContext("webgl");
    } catch (e) {}
    if (!this.glContext) console.log("Could not initialise WebGL, sorry :-(");

    //console.log(this.glContext.getSupportedExtensions().join("\n"));
    //console.log(this.glContext);

    this.viewport.initGL(this.glContext);
    this.clear();

    this.isInit = true;
  }

  _createClass(Context, [{
    key: "checkSize",
    value: function checkSize() {
      var c = this.canvas;
      if (c.width === c.clientWidth && c.height === c.clientHeight) return;
      this.resize(c.clientWidth, c.clientHeight);
    }
  }, {
    key: "resize",
    value: function resize(w, h) {
      /*if(this.viewport.width === undefined){
        this.viewport.resize(w, h);
      }
      else {
        this.viewport.resize(
          w * this.viewport.width / this.width,
          h * this.viewport.height / this.height
        );
      }*/
      this.viewport.resize(w, h);
      this.width = w;
      this.height = h;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.resized.dispatch(this.width, this.height);
    }
  }, {
    key: "clear",
    value: function clear() {
      var gl = this.glContext;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      this.viewport.clear();
    }
  }, {
    key: "autoSize",
    get: function get() {
      return this._autoSize;
    },
    set: function set(value) {
      if (this._autoSize === value) {
        return;
      }

      this._autoSize = value;
      if (this._autoSize) {
        window.addEventListener("resize", this._checkSizeBind);
      } else {
        window.removeEventListener("resize", this._checkSizeBind);
      }
      this.checkSize();
    }
  }]);

  return Context;
})();

exports["default"] = Context;
module.exports = exports["default"];

},{"../../utils/Signal":23,"../math/Vec2":16,"./Viewport":11,"./consts":12}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var _UniformInput = require("./UniformInput");

var _UniformInput2 = _interopRequireDefault(_UniformInput);

var DrawCall = (function () {
  function DrawCall(drawCallDatas) {
    _classCallCheck(this, DrawCall);

    this.drawCallDatas = [];

    this.ids = undefined;
    this.program = undefined;
    this.drawMethod = _consts2["default"].TRIANGLES;

    this.addData(drawCallDatas);
  }

  _createClass(DrawCall, [{
    key: "addData",
    value: function addData(drawCallDatas) {
      if (drawCallDatas === undefined) return;
      function flatten(arr, obj) {
        if (Array.isArray(obj)) {
          for (var i = 0, n = obj.length; i < n; i++) {
            flatten(arr, obj[i]);
          }
        } else {
          arr.push(obj);
        }
        return arr;
      }

      var arr = flatten([], drawCallDatas);
      for (var i = 0, n = arr.length; i < n; i++) {
        var dData = arr[i];
        this.drawCallDatas.push(dData);
        for (var k in dData.params) {
          this[k] = dData.params[k];
        }
      }
    }
  }, {
    key: "_setAttributes",
    value: function _setAttributes(gl) {
      var inputs = this.program.attributesInputs;
      for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var buffer = undefined;
        for (var j = this.drawCallDatas.length - 1; j >= 0; j--) {
          var b = this.drawCallDatas[j].attributes[input.name];
          if (b !== undefined) {
            buffer = b;
            break;
          }
        }
        if (!buffer.isInit) {
          buffer.initGL(gl);
        }
        input.updateGL(gl, buffer);
      }
    }
  }, {
    key: "_setInputs",
    value: function _setInputs(gl, inputs, candidates) {
      for (var _name in inputs) {
        var input = inputs[_name];
        if (input.constructor === _UniformInput2["default"]) {
          this._setUniform(gl, _name, input, candidates);
        } else if (Array.isArray(input)) {
          this._setArray(gl, _name, input, candidates);
        } else {
          this._setStruct(gl, _name, input, candidates);
        }
      }
    }
  }, {
    key: "_setUniform",
    value: function _setUniform(gl, name, input, candidates) {
      for (var i = candidates.length - 1; i >= 0; i--) {
        var data = candidates[i][name];
        if (data !== undefined) {
          input.updateGL(gl, data);
          break;
        }
      }
    }
  }, {
    key: "_setArray",
    value: function _setArray(gl, name, input, candidates) {
      var newCandidates = [];
      for (var i = candidates.length - 1; i >= 0; i--) {
        var data = candidates[i][name];
        if (Array.isArray(data)) {
          for (var j = 0, n = data.length; j < n; j++) {
            newCandidates.push(data[j]);
          }
        } else if (data !== undefined) {
          newCandidates.push(data);
        }
        if (newCandidates.length >= input.length) {
          break;
        }
      }
      for (var i = 0, n = Math.min(newCandidates.length, input.length); i < n; i++) {
        this._setInputs(gl, input[i], [newCandidates[i]]);
      }
    }
  }, {
    key: "_setStruct",
    value: function _setStruct(gl, name, input, candidates) {
      var newCandidates = [];
      for (var i = candidates.length - 1; i >= 0; i--) {
        var data = candidates[i][name];
        if (data !== undefined) {
          newCandidates.push(data);
        }
      }
      this._setInputs(gl, input, newCandidates);
    }
  }, {
    key: "_setUniforms",
    value: function _setUniforms(gl) {
      var inputs = this.program.uniformsInputs;
      var uniforms = [];
      for (var i = 0; i < this.drawCallDatas.length; i++) {
        uniforms[i] = this.drawCallDatas[i].uniforms;
      }

      this._setInputs(gl, inputs, uniforms);
    }
  }, {
    key: "exec",
    value: function exec(context, target) {
      var gl = context.glContext;

      if (target === undefined) {
        target = context;
      }

      if (!target.isInit) {
        target.initGL(gl);
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.glFrameBuffer);
      gl.viewport(0, 0, target.viewport.width, target.viewport.height);

      if (!this.program.isInit) {
        this.program.initGL(gl);
      }
      var glProgram = this.program.glProgram;
      gl.useProgram(glProgram);

      this._setAttributes(gl);
      this._setUniforms(gl);

      if (this.ids === undefined) {
        var attributesCount = 0;
        console.warn("attributesCount must be fixed");
        gl.drawArrays(this.drawMethod, 0, attributesCount);
      } else {
        if (!this.ids.isInit) {
          this.ids.initGL(gl, glProgram);
        }
        if (this.ids.needsUpdate) {
          this.ids.updateGL(gl);
        }
        gl.bindBuffer(_consts2["default"].ELEMENT_ARRAY_BUFFER, this.ids.buffer);
        gl.drawElements(this.drawMethod, this.ids.count, this.ids.type, 0);
      }
    }
  }]);

  return DrawCall;
})();

exports["default"] = DrawCall;
module.exports = exports["default"];

},{"./UniformInput":10,"./consts":12}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _IdsAttribute = require("./IdsAttribute");

var _IdsAttribute2 = _interopRequireDefault(_IdsAttribute);

var _AttributeBuffer = require("./AttributeBuffer");

var _AttributeBuffer2 = _interopRequireDefault(_AttributeBuffer);

var DrawCallData = (function () {
  function DrawCallData(attributes, uniforms) {
    _classCallCheck(this, DrawCallData);

    this.params = {};
    this.attributes = {};
    this.uniforms = {};
    if (attributes !== undefined) {
      this.setAttributes(attributes);
    }
    if (uniforms !== undefined) {
      this.setUniforms(uniforms);
    }
  }

  _createClass(DrawCallData, [{
    key: "setIds",
    value: function setIds(data) {
      if (this.params.ids === undefined) {
        this.params.ids = new _IdsAttribute2["default"]();
      }
      this.params.ids.setData(data);
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(data) {
      for (var _name in data) {
        var aBuffer = this.attributes[_name];
        if (aBuffer === undefined) {
          aBuffer = this.attributes[_name] = new _AttributeBuffer2["default"]();
        }
        aBuffer.setData(data[_name]);
      }
    }
  }, {
    key: "setUniforms",
    value: function setUniforms(data) {
      for (var _name2 in data) {
        this.uniforms[_name2] = data[_name2];
      }
    }
  }]);

  return DrawCallData;
})();

exports["default"] = DrawCallData;
module.exports = exports["default"];

},{"./AttributeBuffer":2,"./IdsAttribute":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var IdsAttribute = (function () {
  function IdsAttribute() {
    _classCallCheck(this, IdsAttribute);

    this.data = undefined;
    this.buffer = undefined;
    this.location = undefined;
    this.isInit = false;
    this.needsUpdate = true;
  }

  _createClass(IdsAttribute, [{
    key: "setData",
    value: function setData(data) {
      this.data = data;
      this.needsUpdate = true;
    }
  }, {
    key: "initGL",
    value: function initGL(gl, program) {
      this.buffer = gl.createBuffer();
      this.location = gl.getAttribLocation(program, "ids");
      this.isInit = true;
    }
  }, {
    key: "updateGL",
    value: function updateGL(gl) {
      if (this.type !== _consts2["default"].UNSIGNED_INT && this.data.constructor === Uint32Array) {
        var extension = gl.getExtension("OES_element_index_uint");
        if (extension === undefined) {
          console.warn("extension 'OES_element_index_uint' not available, large meshes won't render properly");
          this.type = _consts2["default"].UNSIGNED_SHORT;
        } else {
          this.type = _consts2["default"].UNSIGNED_INT;
        }
      } else {
        this.type = _consts2["default"].UNSIGNED_SHORT;
      }

      this.count = this.data.length;
      gl.bindBuffer(_consts2["default"].ELEMENT_ARRAY_BUFFER, this.buffer);
      gl.bufferData(_consts2["default"].ELEMENT_ARRAY_BUFFER, this.data, _consts2["default"].STATIC_DRAW);
      this.needsUpdate = false;
    }
  }]);

  return IdsAttribute;
})();

exports["default"] = IdsAttribute;
module.exports = exports["default"];

},{"./consts":12}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var _UniformInput = require("./UniformInput");

var _UniformInput2 = _interopRequireDefault(_UniformInput);

var _AttributeInput = require("./AttributeInput");

var _AttributeInput2 = _interopRequireDefault(_AttributeInput);

function initShader(gl, src, type) {
  var shader = gl.createShader(type);

  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, _consts2["default"].COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

function extractAttributes(gl, program) {
  var attributes = [];
  var locationsCount = gl.getProgramParameter(program, _consts2["default"].ACTIVE_ATTRIBUTES);
  for (var i = 0; i < locationsCount; i++) {
    var infos = gl.getActiveAttrib(program, i);
    if (infos === -1 || infos === undefined || infos === null) {
      break;
    }
    var _location = gl.getAttribLocation(program, infos.name);
    gl.enableVertexAttribArray(_location);
    attributes[i] = new _AttributeInput2["default"](infos.name, infos.size, infos.type, _location);
  }
  return attributes;
}

function extractUniforms(gl, program) {
  var uniforms = [];
  var locationsCount = gl.getProgramParameter(program, _consts2["default"].ACTIVE_UNIFORMS);
  for (var i = 0; i < locationsCount; i++) {
    var infos = gl.getActiveUniform(program, i);
    if (infos === -1 || infos === undefined || infos === null) {
      break;
    }
    var _location2 = gl.getUniformLocation(program, infos.name);
    uniforms[i] = new _UniformInput2["default"](infos.name, infos.size, infos.type, _location2);
  }
  return uniforms;
}

function readShaderInputs(gl, program) {
  var result = {
    attributes: extractAttributes(gl, program),
    uniforms: {}
  };

  //extract arrays and structs
  extractUniforms(gl, program).forEach(function (item) {
    var target = result.uniforms;
    var key = undefined;
    var path = item.name.replace(/\[/g, ".").replace(/\]/g, "").split(".");
    path.forEach(function (pathItem) {
      if (key !== undefined) {
        if (target[key] === undefined) {
          var index = parseInt(pathItem);
          if (index < 0 || index >= 0) {
            target[key] = [];
            pathItem = index;
          } else {
            target[key] = {};
          }
        }
        target = target[key];
      }
      key = pathItem;
    });
    target[key] = item;
  });
  return result;
}

var Program = (function () {
  function Program(vertexShaderSrc, fragmentShaderSrc) {
    _classCallCheck(this, Program);

    this.vertexShaderSrc = vertexShaderSrc;
    this.fragmentShaderSrc = fragmentShaderSrc;
    this.attributesInputs = undefined;
    this.uniformsInputs = undefined;
    this.isInit = false;
  }

  _createClass(Program, [{
    key: "initGL",
    value: function initGL(gl) {
      this.glProgram = gl.createProgram();

      var vShader = initShader(gl, this.vertexShaderSrc, _consts2["default"].VERTEX_SHADER);
      gl.attachShader(this.glProgram, vShader);

      var fShader = initShader(gl, this.fragmentShaderSrc, _consts2["default"].FRAGMENT_SHADER);
      gl.attachShader(this.glProgram, fShader);

      gl.linkProgram(this.glProgram);

      var inputs = readShaderInputs(gl, this.glProgram);
      this.attributesInputs = inputs.attributes;
      this.uniformsInputs = inputs.uniforms;

      if (!gl.getProgramParameter(this.glProgram, _consts2["default"].LINK_STATUS)) {
        throw new Error("Could not initialise shaders");
      }
      this.isInit = true;
    }
  }]);

  return Program;
})();

exports["default"] = Program;
module.exports = exports["default"];

},{"./AttributeInput":3,"./UniformInput":10,"./consts":12}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Texture = (function () {
  function Texture(image) {
    _classCallCheck(this, Texture);

    this.image = image;
    this.isInit = false;
    this.textureId = getAvailableId();
  }

  _createClass(Texture, [{
    key: "initGL",
    value: function initGL(gl) {
      this.glContext = gl;
      this.glTexture = gl.createTexture();

      gl.activeTexture(gl.TEXTURE0 + this.textureId);
      gl.bindTexture(gl.TEXTURE_2D, this.glTexture);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.bindTexture(gl.TEXTURE_2D, null);
      this.isInit = true;
    }
  }, {
    key: "updateGL",
    value: function updateGL(gl) {
      gl.activeTexture(gl.TEXTURE0 + this.textureId);
      gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
      gl.bindTexture(gl.TEXTURE_2D, null);
      this.needsUpdate = false;
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[Texture w:" + this._image.width + " h:" + this._image.height + " image : " + this._image + "]";
    }
  }, {
    key: "dispose",
    value: function dispose() {
      ids[i] = false;
      //TODO: actual dispose
    }
  }, {
    key: "image",
    get: function get() {
      return this._image;
    },
    set: function set(value) {
      this._image = value;
      this.needsUpdate = true;
    }
  }]);

  return Texture;
})();

exports["default"] = Texture;

var ids = [];
var maxIds = 32;

function getAvailableId() {
  var id;
  for (var i = 0; i < maxIds; i++) {
    if (!ids[i]) {
      id = i;
      break;
    }
  }
  if (id === undefined) {
    throw new Error("Too many textures");
  }
  ids[id] = true;

  return id;
}
module.exports = exports["default"];

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var uploadFuncs = {};
uploadFuncs[_consts2["default"].FLOAT] = function (gl, data) {
  gl.uniform1f(this.location, data);
};
uploadFuncs[_consts2["default"].INT] = function (gl, data) {
  gl.uniform1i(this.location, data);
};
uploadFuncs[_consts2["default"].FLOAT_VEC2] = function (gl, data) {
  gl.uniform2f(this.location, data.x, data.y);
};
uploadFuncs[_consts2["default"].INT_VEC2] = function (gl, data) {
  gl.uniform2i(this.location, data.x, data.y);
};
uploadFuncs[_consts2["default"].FLOAT_VEC3] = function (gl, data) {
  gl.uniform3f(this.location, data.x, data.y, data.z);
};
uploadFuncs[_consts2["default"].INT_VEC3] = function (gl, data) {
  gl.uniform3i(this.location, data.x, data.y, data.z);
};
uploadFuncs[_consts2["default"].FLOAT_VEC4] = function (gl, data) {
  gl.uniform4f(this.location, data.x, data.y, data.z, data.w);
};
uploadFuncs[_consts2["default"].INT_VEC4] = function (gl, data) {
  gl.uniform4i(this.location, data.x, data.y, data.z, data.w);
};

uploadFuncs[_consts2["default"].FLOAT_MAT2] = function (gl, data) {
  gl.uniformMatrix2fv(this.location, false, data);
};
uploadFuncs[_consts2["default"].FLOAT_MAT3] = function (gl, data) {
  gl.uniformMatrix3fv(this.location, false, data);
};
uploadFuncs[_consts2["default"].FLOAT_MAT4] = function (gl, data) {
  gl.uniformMatrix4fv(this.location, false, data);
};

uploadFuncs[_consts2["default"].SAMPLER_2D] = function (gl, data) {
  if (!data.isInit) {
    data.initGL(gl);
  }
  if (data.needsUpdate) {
    data.updateGL(gl);
  }
  gl.activeTexture(gl.TEXTURE0 + data.textureId);
  gl.bindTexture(gl.TEXTURE_2D, data.glTexture);
  gl.uniform1i(this.location, data.textureId);
};

var uploadFuncsV = {};
uploadFuncsV[_consts2["default"].FLOAT] = function (gl, data) {
  gl.uniform1fv(this.location, data);
};
uploadFuncsV[_consts2["default"].INT] = function (gl, data) {
  gl.uniform1iv(this.location, data);
};
uploadFuncsV[_consts2["default"].FLOAT_VEC2] = function (gl, data) {
  gl.uniform2fv(this.location, data);
};
uploadFuncsV[_consts2["default"].int2] = function (gl, data) {
  gl.uniform2iv(this.location, data);
};
uploadFuncsV[_consts2["default"].FLOAT_VEC3] = function (gl, data) {
  gl.uniform3fv(this.location, data);
};
uploadFuncsV[_consts2["default"].INT_VEC3] = function (gl, data) {
  gl.uniform3iv(this.location, data);
};
uploadFuncsV[_consts2["default"].FLOAT_VEC4] = function (gl, data) {
  gl.uniform4fv(this.location, data);
};
uploadFuncsV[_consts2["default"].INT4] = function (gl, data) {
  gl.uniform4iv(this.location, data);
};

var UniformInput = (function () {
  function UniformInput(name, size, type, location) {
    _classCallCheck(this, UniformInput);

    this.name = name;
    this.size = size;
    this.type = type;
    this.location = location;

    var funcsSet = size === 1 ? uploadFuncs : uploadFuncsV;
    this.updateFunc = funcsSet[this.type];
  }

  _createClass(UniformInput, [{
    key: "updateGL",
    value: function updateGL(gl, data) {
      this.updateFunc(gl, data.valueOf());
    }
  }]);

  return UniformInput;
})();

exports["default"] = UniformInput;
module.exports = exports["default"];

},{"./consts":12}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utilsSignal = require("../../utils/Signal");

var _utilsSignal2 = _interopRequireDefault(_utilsSignal);

var _DrawCallData = require("./DrawCallData");

var _DrawCallData2 = _interopRequireDefault(_DrawCallData);

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var _mathVec2 = require("../math/Vec2");

var _mathVec22 = _interopRequireDefault(_mathVec2);

var Viewport = (function () {
  function Viewport() {
    _classCallCheck(this, Viewport);

    this.drawCallData = new _DrawCallData2["default"]();
    this.resized = new _utilsSignal2["default"]();
    this.isInit = false;
    this.frameSize = new _mathVec22["default"]();
  }

  _createClass(Viewport, [{
    key: "initGL",
    value: function initGL(gl) {
      this.glContext = gl;
      this.isInit = true;
    }
  }, {
    key: "resize",
    value: function resize(w, h) {
      this.width = w;
      this.height = h;
      this.frameSize.set(this.width, this.height);
      this.resized.dispatch(this.width, this.height);
    }
  }, {
    key: "clear",
    value: function clear() {
      if (!this.isInit) {
        return;
      }
      var gl = this.glContext;
      gl.enable(_consts2["default"].DEPTH_TEST);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(_consts2["default"].COLOR_BUFFER_BIT | _consts2["default"].DEPTH_BUFFER_BIT);
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      this.drawCallData.setUniforms({
        "uFrameSize": this.frameSize
      });
      return this.drawCallData;
    }
  }]);

  return Viewport;
})();

exports["default"] = Viewport;
module.exports = exports["default"];

},{"../../utils/Signal":23,"../math/Vec2":16,"./DrawCallData":6,"./consts":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {

  /* ClearBufferMask */
  DEPTH_BUFFER_BIT: 0x00000100,
  STENCIL_BUFFER_BIT: 0x00000400,
  COLOR_BUFFER_BIT: 0x00004000,

  /* BeginMode */
  POINTS: 0x0000,
  LINES: 0x0001,
  LINE_LOOP: 0x0002,
  LINE_STRIP: 0x0003,
  TRIANGLES: 0x0004,
  TRIANGLE_STRIP: 0x0005,
  TRIANGLE_FAN: 0x0006,

  /* AlphaFunction (not supported in ES20) */
  /* NEVER */
  /* LESS */
  /* EQUAL */
  /* LEQUAL */
  /* GREATER */
  /* NOTEQUAL */
  /* GEQUAL */
  /* ALWAYS */

  /* BlendingFactorDest */
  ZERO: 0,
  ONE: 1,
  SRC_COLOR: 0x0300,
  ONE_MINUS_SRC_COLOR: 0x0301,
  SRC_ALPHA: 0x0302,
  ONE_MINUS_SRC_ALPHA: 0x0303,
  DST_ALPHA: 0x0304,
  ONE_MINUS_DST_ALPHA: 0x0305,

  /* BlendingFactorSrc */
  /* ZERO */
  /* ONE */
  DST_COLOR: 0x0306,
  ONE_MINUS_DST_COLOR: 0x0307,
  SRC_ALPHA_SATURATE: 0x0308,
  /* SRC_ALPHA */
  /* ONE_MINUS_SRC_ALPHA */
  /* DST_ALPHA */
  /* ONE_MINUS_DST_ALPHA */

  /* BlendEquationSeparate */
  FUNC_ADD: 0x8006,
  BLEND_EQUATION: 0x8009,
  BLEND_EQUATION_RGB: 0x8009, /* same as BLEND_EQUATION */
  BLEND_EQUATION_ALPHA: 0x883D,

  /* BlendSubtract */
  FUNC_SUBTRACT: 0x800A,
  FUNC_REVERSE_SUBTRACT: 0x800B,

  /* Separate Blend Functions */
  BLEND_DST_RGB: 0x80C8,
  BLEND_SRC_RGB: 0x80C9,
  BLEND_DST_ALPHA: 0x80CA,
  BLEND_SRC_ALPHA: 0x80CB,
  CONSTANT_COLOR: 0x8001,
  ONE_MINUS_CONSTANT_COLOR: 0x8002,
  CONSTANT_ALPHA: 0x8003,
  ONE_MINUS_CONSTANT_ALPHA: 0x8004,
  BLEND_COLOR: 0x8005,

  /* Buffer Objects */
  ARRAY_BUFFER: 0x8892,
  ELEMENT_ARRAY_BUFFER: 0x8893,
  ARRAY_BUFFER_BINDING: 0x8894,
  ELEMENT_ARRAY_BUFFER_BINDING: 0x8895,

  STREAM_DRAW: 0x88E0,
  STATIC_DRAW: 0x88E4,
  DYNAMIC_DRAW: 0x88E8,

  BUFFER_SIZE: 0x8764,
  BUFFER_USAGE: 0x8765,

  CURRENT_VERTEX_ATTRIB: 0x8626,

  /* CullFaceMode */
  FRONT: 0x0404,
  BACK: 0x0405,
  FRONT_AND_BACK: 0x0408,

  /* DepthFunction */
  /* NEVER */
  /* LESS */
  /* EQUAL */
  /* LEQUAL */
  /* GREATER */
  /* NOTEQUAL */
  /* GEQUAL */
  /* ALWAYS */

  /* EnableCap */
  /* TEXTURE_2D */
  CULL_FACE: 0x0B44,
  BLEND: 0x0BE2,
  DITHER: 0x0BD0,
  STENCIL_TEST: 0x0B90,
  DEPTH_TEST: 0x0B71,
  SCISSOR_TEST: 0x0C11,
  POLYGON_OFFSET_FILL: 0x8037,
  SAMPLE_ALPHA_TO_COVERAGE: 0x809E,
  SAMPLE_COVERAGE: 0x80A0,

  /* ErrorCode */
  NO_ERROR: 0,
  INVALID_ENUM: 0x0500,
  INVALID_VALUE: 0x0501,
  INVALID_OPERATION: 0x0502,
  OUT_OF_MEMORY: 0x0505,

  /* FrontFaceDirection */
  CW: 0x0900,
  CCW: 0x0901,

  /* GetPName */
  LINE_WIDTH: 0x0B21,
  ALIASED_POINT_SIZE_RANGE: 0x846D,
  ALIASED_LINE_WIDTH_RANGE: 0x846E,
  CULL_FACE_MODE: 0x0B45,
  FRONT_FACE: 0x0B46,
  DEPTH_RANGE: 0x0B70,
  DEPTH_WRITEMASK: 0x0B72,
  DEPTH_CLEAR_VALUE: 0x0B73,
  DEPTH_FUNC: 0x0B74,
  STENCIL_CLEAR_VALUE: 0x0B91,
  STENCIL_FUNC: 0x0B92,
  STENCIL_FAIL: 0x0B94,
  STENCIL_PASS_DEPTH_FAIL: 0x0B95,
  STENCIL_PASS_DEPTH_PASS: 0x0B96,
  STENCIL_REF: 0x0B97,
  STENCIL_VALUE_MASK: 0x0B93,
  STENCIL_WRITEMASK: 0x0B98,
  STENCIL_BACK_FUNC: 0x8800,
  STENCIL_BACK_FAIL: 0x8801,
  STENCIL_BACK_PASS_DEPTH_FAIL: 0x8802,
  STENCIL_BACK_PASS_DEPTH_PASS: 0x8803,
  STENCIL_BACK_REF: 0x8CA3,
  STENCIL_BACK_VALUE_MASK: 0x8CA4,
  STENCIL_BACK_WRITEMASK: 0x8CA5,
  VIEWPORT: 0x0BA2,
  SCISSOR_BOX: 0x0C10,
  /* SCISSOR_TEST */
  COLOR_CLEAR_VALUE: 0x0C22,
  COLOR_WRITEMASK: 0x0C23,
  UNPACK_ALIGNMENT: 0x0CF5,
  PACK_ALIGNMENT: 0x0D05,
  MAX_TEXTURE_SIZE: 0x0D33,
  MAX_VIEWPORT_DIMS: 0x0D3A,
  SUBPIXEL_BITS: 0x0D50,
  RED_BITS: 0x0D52,
  GREEN_BITS: 0x0D53,
  BLUE_BITS: 0x0D54,
  ALPHA_BITS: 0x0D55,
  DEPTH_BITS: 0x0D56,
  STENCIL_BITS: 0x0D57,
  POLYGON_OFFSET_UNITS: 0x2A00,
  /* POLYGON_OFFSET_FILL */
  POLYGON_OFFSET_FACTOR: 0x8038,
  TEXTURE_BINDING_2D: 0x8069,
  SAMPLE_BUFFERS: 0x80A8,
  SAMPLES: 0x80A9,
  SAMPLE_COVERAGE_VALUE: 0x80AA,
  SAMPLE_COVERAGE_INVERT: 0x80AB,

  /* GetTextureParameter */
  /* TEXTURE_MAG_FILTER */
  /* TEXTURE_MIN_FILTER */
  /* TEXTURE_WRAP_S */
  /* TEXTURE_WRAP_T */

  COMPRESSED_TEXTURE_FORMATS: 0x86A3,

  /* HintMode */
  DONT_CARE: 0x1100,
  FASTEST: 0x1101,
  NICEST: 0x1102,

  /* HintTarget */
  GENERATE_MIPMAP_HINT: 0x8192,

  /* DataType */
  BYTE: 0x1400,
  UNSIGNED_BYTE: 0x1401,
  SHORT: 0x1402,
  UNSIGNED_SHORT: 0x1403,
  INT: 0x1404,
  UNSIGNED_INT: 0x1405,
  FLOAT: 0x1406,

  /* PixelFormat */
  DEPTH_COMPONENT: 0x1902,
  ALPHA: 0x1906,
  RGB: 0x1907,
  RGBA: 0x1908,
  LUMINANCE: 0x1909,
  LUMINANCE_ALPHA: 0x190A,

  /* PixelType */
  /* UNSIGNED_BYTE */
  UNSIGNED_SHORT_4_4_4_4: 0x8033,
  UNSIGNED_SHORT_5_5_5_1: 0x8034,
  UNSIGNED_SHORT_5_6_5: 0x8363,

  /* Shaders */
  FRAGMENT_SHADER: 0x8B30,
  VERTEX_SHADER: 0x8B31,
  MAX_VERTEX_ATTRIBS: 0x8869,
  MAX_VERTEX_UNIFORM_VECTORS: 0x8DFB,
  MAX_VARYING_VECTORS: 0x8DFC,
  MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8B4D,
  MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0x8B4C,
  MAX_TEXTURE_IMAGE_UNITS: 0x8872,
  MAX_FRAGMENT_UNIFORM_VECTORS: 0x8DFD,
  SHADER_TYPE: 0x8B4F,
  DELETE_STATUS: 0x8B80,
  LINK_STATUS: 0x8B82,
  VALIDATE_STATUS: 0x8B83,
  ATTACHED_SHADERS: 0x8B85,
  ACTIVE_UNIFORMS: 0x8B86,
  ACTIVE_ATTRIBUTES: 0x8B89,
  SHADING_LANGUAGE_VERSION: 0x8B8C,
  CURRENT_PROGRAM: 0x8B8D,

  /* StencilFunction */
  NEVER: 0x0200,
  LESS: 0x0201,
  EQUAL: 0x0202,
  LEQUAL: 0x0203,
  GREATER: 0x0204,
  NOTEQUAL: 0x0205,
  GEQUAL: 0x0206,
  ALWAYS: 0x0207,

  /* StencilOp */
  /* ZERO */
  KEEP: 0x1E00,
  REPLACE: 0x1E01,
  INCR: 0x1E02,
  DECR: 0x1E03,
  INVERT: 0x150A,
  INCR_WRAP: 0x8507,
  DECR_WRAP: 0x8508,

  /* StringName */
  VENDOR: 0x1F00,
  RENDERER: 0x1F01,
  VERSION: 0x1F02,

  /* TextureMagFilter */
  NEAREST: 0x2600,
  LINEAR: 0x2601,

  /* TextureMinFilter */
  /* NEAREST */
  /* LINEAR */
  NEAREST_MIPMAP_NEAREST: 0x2700,
  LINEAR_MIPMAP_NEAREST: 0x2701,
  NEAREST_MIPMAP_LINEAR: 0x2702,
  LINEAR_MIPMAP_LINEAR: 0x2703,

  /* TextureParameterName */
  TEXTURE_MAG_FILTER: 0x2800,
  TEXTURE_MIN_FILTER: 0x2801,
  TEXTURE_WRAP_S: 0x2802,
  TEXTURE_WRAP_T: 0x2803,

  /* TextureTarget */
  TEXTURE_2D: 0x0DE1,
  TEXTURE: 0x1702,

  TEXTURE_CUBE_MAP: 0x8513,
  TEXTURE_BINDING_CUBE_MAP: 0x8514,
  TEXTURE_CUBE_MAP_POSITIVE_X: 0x8515,
  TEXTURE_CUBE_MAP_NEGATIVE_X: 0x8516,
  TEXTURE_CUBE_MAP_POSITIVE_Y: 0x8517,
  TEXTURE_CUBE_MAP_NEGATIVE_Y: 0x8518,
  TEXTURE_CUBE_MAP_POSITIVE_Z: 0x8519,
  TEXTURE_CUBE_MAP_NEGATIVE_Z: 0x851A,
  MAX_CUBE_MAP_TEXTURE_SIZE: 0x851C,

  /* TextureUnit */
  TEXTURE0: 0x84C0,
  TEXTURE1: 0x84C1,
  TEXTURE2: 0x84C2,
  TEXTURE3: 0x84C3,
  TEXTURE4: 0x84C4,
  TEXTURE5: 0x84C5,
  TEXTURE6: 0x84C6,
  TEXTURE7: 0x84C7,
  TEXTURE8: 0x84C8,
  TEXTURE9: 0x84C9,
  TEXTURE10: 0x84CA,
  TEXTURE11: 0x84CB,
  TEXTURE12: 0x84CC,
  TEXTURE13: 0x84CD,
  TEXTURE14: 0x84CE,
  TEXTURE15: 0x84CF,
  TEXTURE16: 0x84D0,
  TEXTURE17: 0x84D1,
  TEXTURE18: 0x84D2,
  TEXTURE19: 0x84D3,
  TEXTURE20: 0x84D4,
  TEXTURE21: 0x84D5,
  TEXTURE22: 0x84D6,
  TEXTURE23: 0x84D7,
  TEXTURE24: 0x84D8,
  TEXTURE25: 0x84D9,
  TEXTURE26: 0x84DA,
  TEXTURE27: 0x84DB,
  TEXTURE28: 0x84DC,
  TEXTURE29: 0x84DD,
  TEXTURE30: 0x84DE,
  TEXTURE31: 0x84DF,
  ACTIVE_TEXTURE: 0x84E0,

  /* TextureWrapMode */
  REPEAT: 0x2901,
  CLAMP_TO_EDGE: 0x812F,
  MIRRORED_REPEAT: 0x8370,

  /* Uniform Types */
  FLOAT_VEC2: 0x8B50,
  FLOAT_VEC3: 0x8B51,
  FLOAT_VEC4: 0x8B52,
  INT_VEC2: 0x8B53,
  INT_VEC3: 0x8B54,
  INT_VEC4: 0x8B55,
  BOOL: 0x8B56,
  BOOL_VEC2: 0x8B57,
  BOOL_VEC3: 0x8B58,
  BOOL_VEC4: 0x8B59,
  FLOAT_MAT2: 0x8B5A,
  FLOAT_MAT3: 0x8B5B,
  FLOAT_MAT4: 0x8B5C,
  SAMPLER_2D: 0x8B5E,
  SAMPLER_CUBE: 0x8B60,

  /* Vertex Arrays */
  VERTEX_ATTRIB_ARRAY_ENABLED: 0x8622,
  VERTEX_ATTRIB_ARRAY_SIZE: 0x8623,
  VERTEX_ATTRIB_ARRAY_STRIDE: 0x8624,
  VERTEX_ATTRIB_ARRAY_TYPE: 0x8625,
  VERTEX_ATTRIB_ARRAY_NORMALIZED: 0x886A,
  VERTEX_ATTRIB_ARRAY_POINTER: 0x8645,
  VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 0x889F,

  /* Read Format */
  IMPLEMENTATION_COLOR_READ_TYPE: 0x8B9A,
  IMPLEMENTATION_COLOR_READ_FORMAT: 0x8B9B,

  /* Shader Source */
  COMPILE_STATUS: 0x8B81,

  /* Shader Precision-Specified Types */
  LOW_FLOAT: 0x8DF0,
  MEDIUM_FLOAT: 0x8DF1,
  HIGH_FLOAT: 0x8DF2,
  LOW_INT: 0x8DF3,
  MEDIUM_INT: 0x8DF4,
  HIGH_INT: 0x8DF5,

  /* Framebuffer Object. */
  FRAMEBUFFER: 0x8D40,
  RENDERBUFFER: 0x8D41,

  RGBA4: 0x8056,
  RGB5_A1: 0x8057,
  RGB565: 0x8D62,
  DEPTH_COMPONENT16: 0x81A5,
  STENCIL_INDEX: 0x1901,
  STENCIL_INDEX8: 0x8D48,
  DEPTH_STENCIL: 0x84F9,

  RENDERBUFFER_WIDTH: 0x8D42,
  RENDERBUFFER_HEIGHT: 0x8D43,
  RENDERBUFFER_INTERNAL_FORMAT: 0x8D44,
  RENDERBUFFER_RED_SIZE: 0x8D50,
  RENDERBUFFER_GREEN_SIZE: 0x8D51,
  RENDERBUFFER_BLUE_SIZE: 0x8D52,
  RENDERBUFFER_ALPHA_SIZE: 0x8D53,
  RENDERBUFFER_DEPTH_SIZE: 0x8D54,
  RENDERBUFFER_STENCIL_SIZE: 0x8D55,

  FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 0x8CD0,
  FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 0x8CD1,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 0x8CD2,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 0x8CD3,

  COLOR_ATTACHMENT0: 0x8CE0,
  DEPTH_ATTACHMENT: 0x8D00,
  STENCIL_ATTACHMENT: 0x8D20,
  DEPTH_STENCIL_ATTACHMENT: 0x821A,

  NONE: 0,

  FRAMEBUFFER_COMPLETE: 0x8CD5,
  FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 0x8CD6,
  FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 0x8CD7,
  FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 0x8CD9,
  FRAMEBUFFER_UNSUPPORTED: 0x8CDD,

  FRAMEBUFFER_BINDING: 0x8CA6,
  RENDERBUFFER_BINDING: 0x8CA7,
  MAX_RENDERBUFFER_SIZE: 0x84E8,

  INVALID_FRAMEBUFFER_OPERATION: 0x0506,

  /* WebGL-specific enums */
  UNPACK_FLIP_Y_WEBGL: 0x9240,
  UNPACK_PREMULTIPLY_ALPHA_WEBGL: 0x9241,
  CONTEXT_LOST_WEBGL: 0x9242,
  UNPACK_COLORSPACE_CONVERSION_WEBGL: 0x9243,
  BROWSER_DEFAULT_WEBGL: 0x9244
};
module.exports = exports["default"];

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Vec3 = require("./Vec3");

var _Vec32 = _interopRequireDefault(_Vec3);

//row major 3x3 matrix
//www.j3d.org/matrix_faq/matrfaq_latest.html

var tx = new _Vec32["default"]();
var ty = new _Vec32["default"]();
var tz = new _Vec32["default"]();

var Mat3 = (function () {
  function Mat3() {
    var a = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    var b = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var c = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var d = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    var e = arguments.length <= 4 || arguments[4] === undefined ? 1 : arguments[4];
    var f = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
    var g = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
    var h = arguments.length <= 7 || arguments[7] === undefined ? 0 : arguments[7];
    var i = arguments.length <= 8 || arguments[8] === undefined ? 1 : arguments[8];

    _classCallCheck(this, Mat3);

    this.data = new Float32Array(9);
    this.set(a, b, c, d, e, f, g, h, i);
  }

  _createClass(Mat3, [{
    key: "identity",
    value: function identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }
  }, {
    key: "set",
    value: function set() {
      var a = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      var b = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var c = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var d = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
      var e = arguments.length <= 4 || arguments[4] === undefined ? 1 : arguments[4];
      var f = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
      var g = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
      var h = arguments.length <= 7 || arguments[7] === undefined ? 0 : arguments[7];
      var i = arguments.length <= 8 || arguments[8] === undefined ? 1 : arguments[8];

      var t = this.data;
      t[0] = a;t[3] = b;t[6] = c;
      t[1] = d;t[4] = e;t[7] = f;
      t[2] = g;t[5] = h;t[8] = i;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(mat) {
      var t0 = this.data;
      var t1 = mat.data;
      t0[0] = t1[0];t0[3] = t1[3];t0[6] = t1[6];
      t0[1] = t1[1];t0[4] = t1[4];t0[7] = t1[7];
      t0[2] = t1[2];t0[5] = t1[5];t0[8] = t1[8];
      return this;
    }
  }, {
    key: "transformVector",
    value: function transformVector(v) {
      var t = this.data;
      var x = v.x,
          y = v.y,
          z = v.z;
      v.x = t[0] * x + t[3] * y + t[6] * z;
      v.y = t[1] * x + t[4] * y + t[7] * z;
      v.z = t[2] * x + t[5] * y + t[8] * z;
      return v;
    }

    //m x this
  }, {
    key: "multiplyMat",
    value: function multiplyMat(m) {
      var t = m.data;
      this.multiply(t[0], t[3], t[6], t[1], t[4], t[7], t[2], t[5], t[8]);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(a, b, c, d, e, f, g, h, i) {
      var t = this.data;
      var t0 = t[0],
          t3 = t[3],
          t6 = t[6];
      var t1 = t[1],
          t4 = t[4],
          t7 = t[7];
      var t2 = t[2],
          t5 = t[5],
          t8 = t[8];

      t[0] = a * t0 + b * t1 + c * t2;
      t[1] = d * t0 + e * t1 + f * t2;
      t[2] = g * t0 + h * t1 + i * t2;

      t[3] = a * t3 + b * t4 + c * t5;
      t[4] = d * t3 + e * t4 + f * t5;
      t[5] = g * t3 + h * t4 + i * t5;

      t[6] = a * t6 + b * t7 + c * t8;
      t[7] = d * t6 + e * t7 + f * t8;
      t[8] = g * t6 + h * t7 + i * t8;
      return this;
    }
  }, {
    key: "setRotation",
    value: function setRotation(x, y, z, angle) {
      var s = 1 / Math.hypot(x, y, z);
      x *= s;
      y *= s;
      z *= s;

      var si = Math.sin(angle);
      var co = Math.cos(angle);
      var ic = 1 - co;

      return this.set(x * x * ic + co, y * x * ic - si * z, z * x * ic + si * y, x * y * ic + si * z, y * y * ic + co, z * y * ic - si * x, x * z * ic - si * y, y * z * ic + si * x, z * z * ic + co);
    }
  }, {
    key: "rotate",
    value: function rotate(x, y, z, angle) {
      var s = 1 / Math.hypot(x, y, z);
      x *= s;
      y *= s;
      z *= s;
      var si = Math.sin(angle);
      var co = Math.cos(angle);
      var ic = 1 - co;

      return this.multiply(x * x * ic + co, y * x * ic - si * z, z * x * ic + si * y, x * y * ic + si * z, y * y * ic + co, z * y * ic - si * x, x * z * ic - si * y, y * z * ic + si * x, z * z * ic + co);
    }
  }, {
    key: "invert",
    value: function invert() {
      var det = this.determinant;
      if (Math.abs(det) < 0.0005) {
        return this.identity();
      }
      var t = this.data;

      var iDet = 1 / det;
      return this.set((t[4] * t[8] - t[7] * t[5]) * iDet, -(t[3] * t[8] - t[5] * t[6]) * iDet, (t[3] * t[7] - t[4] * t[6]) * iDet, -(t[1] * t[8] - t[7] * t[2]) * iDet, (t[0] * t[8] - t[2] * t[6]) * iDet, -(t[0] * t[7] - t[1] * t[6]) * iDet, (t[1] * t[5] - t[2] * t[4]) * iDet, -(t[0] * t[5] - t[2] * t[3]) * iDet, (t[0] * t[4] - t[3] * t[1]) * iDet);
    }
  }, {
    key: "transpose",
    value: function transpose() {
      var t = this.data;
      return this.set(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]);
    }
  }, {
    key: "lookAt",
    value: function lookAt(position, target, up) {
      tz.copy(target).sub(position).normalize();
      tx.copy(tz).cross(up).normalize();
      if (tx.length === 0) {
        if (tx.x === 0) {
          tx.set(1, 0, 0);
        } else {
          tx.set(-(tx.y + tx.z) / tx.x, 1, 1).normalize();
        }
      }
      ty.copy(tx).cross(tz);

      this.set(tx.x, ty.x, -tz.x, tx.y, ty.y, -tz.y, tx.z, ty.z, -tz.z);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      var cloneMat = new Mat3();
      var t0 = this.data;
      var t1 = cloneMat.data;
      for (var i = 0; i < 9; i++) {
        t1[i] = t0[i];
      }
      return cloneMat;
    }
  }, {
    key: "toString",
    value: function toString() {
      var t = this.data;
      return "[Mat3\n      " + t[0] + ", " + t[3] + ", " + t[6] + "\n      " + t[1] + ", " + t[4] + ", " + t[7] + "\n      " + t[2] + ", " + t[5] + ", " + t[8] + "\n    ]";
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.data;
    }
  }, {
    key: "determinant",
    get: function get() {
      var t = this.data;
      return t[0] * (t[4] * t[8] - t[5] * t[7]) - t[3] * (t[1] * t[8] - t[2] * t[7]) + t[6] * (t[1] * t[5] - t[2] * t[4]);
    }
  }]);

  return Mat3;
})();

exports["default"] = Mat3;
module.exports = exports["default"];

},{"./Vec3":17}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Mat3 = require("./Mat3");

var _Mat32 = _interopRequireDefault(_Mat3);

//visit :
//www.j3d.org/matrix_faq/matrfaq_latest.html
//http://www.songho.ca/opengl/gl_projectionmatrix.html

//row major 4x4 matrix

var Mat4 = (function () {
  function Mat4() {
    var a = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    var b = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var c = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var d = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    var e = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var f = arguments.length <= 5 || arguments[5] === undefined ? 1 : arguments[5];
    var g = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
    var h = arguments.length <= 7 || arguments[7] === undefined ? 0 : arguments[7];
    var i = arguments.length <= 8 || arguments[8] === undefined ? 0 : arguments[8];
    var j = arguments.length <= 9 || arguments[9] === undefined ? 0 : arguments[9];
    var k = arguments.length <= 10 || arguments[10] === undefined ? 1 : arguments[10];
    var l = arguments.length <= 11 || arguments[11] === undefined ? 0 : arguments[11];
    var m = arguments.length <= 12 || arguments[12] === undefined ? 0 : arguments[12];
    var n = arguments.length <= 13 || arguments[13] === undefined ? 0 : arguments[13];
    var o = arguments.length <= 14 || arguments[14] === undefined ? 0 : arguments[14];
    var p = arguments.length <= 15 || arguments[15] === undefined ? 1 : arguments[15];

    _classCallCheck(this, Mat4);

    this.data = new Float32Array(16);
    this.set(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
  }

  _createClass(Mat4, [{
    key: "identity",
    value: function identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
  }, {
    key: "set",
    value: function set() {
      var a = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      var b = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var c = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var d = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
      var e = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
      var f = arguments.length <= 5 || arguments[5] === undefined ? 1 : arguments[5];
      var g = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
      var h = arguments.length <= 7 || arguments[7] === undefined ? 0 : arguments[7];
      var i = arguments.length <= 8 || arguments[8] === undefined ? 0 : arguments[8];
      var j = arguments.length <= 9 || arguments[9] === undefined ? 0 : arguments[9];
      var k = arguments.length <= 10 || arguments[10] === undefined ? 1 : arguments[10];
      var l = arguments.length <= 11 || arguments[11] === undefined ? 0 : arguments[11];
      var m = arguments.length <= 12 || arguments[12] === undefined ? 0 : arguments[12];
      var n = arguments.length <= 13 || arguments[13] === undefined ? 0 : arguments[13];
      var o = arguments.length <= 14 || arguments[14] === undefined ? 0 : arguments[14];
      var p = arguments.length <= 15 || arguments[15] === undefined ? 1 : arguments[15];

      var t = this.data;
      t[0] = a;t[4] = b;t[8] = c;t[12] = d;
      t[1] = e;t[5] = f;t[9] = g;t[13] = h;
      t[2] = i;t[6] = j;t[10] = k;t[14] = l;
      t[3] = m;t[7] = n;t[11] = o;t[15] = p;
      return this;
    }
  }, {
    key: "transformVector",
    value: function transformVector(vec) {
      var t = this.data;
      var x = vec.x,
          y = vec.y,
          z = vec.z,
          w = vec.w;
      vec.x = t[0] * x + t[4] * y + t[8] * z + t[12] * w;
      vec.y = t[1] * x + t[5] * y + t[9] * z + t[13] * w;
      vec.z = t[2] * x + t[6] * y + t[10] * z + t[14] * w;
      vec.w = t[3] * x + t[7] * y + t[11] * z + t[15] * w;
      return vec;
    }
  }, {
    key: "multiplyMat",
    value: function multiplyMat(m) {
      var t = m.data;
      this.multiply(t[0], t[4], t[8], t[12], t[1], t[5], t[9], t[13], t[2], t[6], t[10], t[14], t[3], t[7], t[11], t[15]);
      return this;
    }
  }, {
    key: "multiplyMat3",
    value: function multiplyMat3(m) {
      var t = m.data;
      this.multiply3(t[0], t[3], t[6], t[1], t[4], t[7], t[2], t[5], t[8]);
      return this;
    }
  }, {
    key: "multiply3",
    value: function multiply3(a, b, c, d, e, f, g, h, i) {
      var t = this.data;
      var t0 = t[0],
          t4 = t[4],
          t8 = t[8],
          t12 = t[12];
      var t1 = t[1],
          t5 = t[5],
          t9 = t[9],
          t13 = t[13];
      var t2 = t[2],
          t6 = t[6],
          t10 = t[10],
          t14 = t[14];
      var t3 = t[3],
          t7 = t[7],
          t11 = t[11],
          t15 = t[15];

      t[0] = a * t0 + b * t1 + c * t2 + d * t3;
      t[1] = e * t0 + f * t1 + g * t2 + h * t3;
      t[2] = i * t0;
      t[3] = t3;

      t[4] = a * t4 + b * t5 + c * t6 + d * t7;
      t[5] = e * t4 + f * t5 + g * t6 + h * t7;
      t[6] = i * t4;
      t[7] = t7;

      t[8] = a * t8 + b * t9 + c * t10 + d * t11;
      t[9] = e * t8 + f * t9 + g * t10 + h * t11;
      t[10] = i * t8;
      t[11] = t11;

      t[12] = a * t12 + b * t13 + c * t14 + d * t15;
      t[13] = e * t12 + f * t13 + g * t14 + h * t15;
      t[14] = i * t12;
      t[15] = t15;

      return this;
    }
  }, {
    key: "scaleV",
    value: function scaleV(v) {
      this.scale(v.x, v.y, v.z);
    }
  }, {
    key: "scale",
    value: function scale(sx, sy, sz) {
      this.multiply(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "translateV",
    value: function translateV(v) {
      this.translate(v.x, v.y, v.z);
    }
  }, {
    key: "translate",
    value: function translate(tx, ty, tz) {
      this.multiply(1, 0, 0, tx, 0, 1, 0, ty, 0, 0, 1, tz, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
      var t = this.data;
      var t0 = t[0],
          t4 = t[4],
          t8 = t[8],
          t12 = t[12];
      var t1 = t[1],
          t5 = t[5],
          t9 = t[9],
          t13 = t[13];
      var t2 = t[2],
          t6 = t[6],
          t10 = t[10],
          t14 = t[14];
      var t3 = t[3],
          t7 = t[7],
          t11 = t[11],
          t15 = t[15];

      t[0] = a * t0 + b * t1 + c * t2 + d * t3;
      t[1] = e * t0 + f * t1 + g * t2 + h * t3;
      t[2] = i * t0 + j * t1 + k * t2 + l * t3;
      t[3] = m * t0 + n * t1 + o * t2 + p * t3;

      t[4] = a * t4 + b * t5 + c * t6 + d * t7;
      t[5] = e * t4 + f * t5 + g * t6 + h * t7;
      t[6] = i * t4 + j * t5 + k * t6 + l * t7;
      t[7] = m * t4 + n * t5 + o * t6 + p * t7;

      t[8] = a * t8 + b * t9 + c * t10 + d * t11;
      t[9] = e * t8 + f * t9 + g * t10 + h * t11;
      t[10] = i * t8 + j * t9 + k * t10 + l * t11;
      t[11] = m * t8 + n * t9 + o * t10 + p * t11;

      t[12] = a * t12 + b * t13 + c * t14 + d * t15;
      t[13] = e * t12 + f * t13 + g * t14 + h * t15;
      t[14] = i * t12 + j * t13 + k * t14 + l * t15;
      t[15] = m * t12 + n * t13 + o * t14 + p * t15;

      return this;
    }

    //http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
  }, {
    key: "invert",
    value: function invert() {
      var t = this.data;
      var a = t[0],
          b = t[4],
          c = t[8],
          d = t[12];
      var e = t[1],
          f = t[5],
          g = t[9],
          h = t[13];
      var i = t[2],
          j = t[6],
          k = t[10],
          l = t[14];
      var m = t[3],
          n = t[7],
          o = t[11],
          p = t[15];

      t[0] = g * l * n - h * k * n + h * j * o - f * l * o - g * j * p + f * k * p;
      t[4] = d * k * n - c * l * n - d * j * o + b * l * o + c * j * p - b * k * p;
      t[8] = c * h * n - d * g * n + d * f * o - b * h * o - c * f * p + b * g * p;
      t[12] = d * g * j - c * h * j - d * f * k + b * h * k + c * f * l - b * g * l;
      t[1] = h * k * m - g * l * m - h * i * o + e * l * o + g * i * p - e * k * p;
      t[5] = c * l * m - d * k * m + d * i * o - a * l * o - c * i * p + a * k * p;
      t[9] = d * g * m - c * h * m - d * e * o + a * h * o + c * e * p - a * g * p;
      t[13] = c * h * i - d * g * i + d * e * k - a * h * k - c * e * l + a * g * l;
      t[2] = f * l * m - h * j * m + h * i * n - e * l * n - f * i * p + e * j * p;
      t[6] = d * j * m - b * l * m - d * i * n + a * l * n + b * i * p - a * j * p;
      t[10] = b * h * m - d * f * m + d * e * n - a * h * n - b * e * p + a * f * p;
      t[14] = d * f * i - b * h * i - d * e * j + a * h * j + b * e * l - a * f * l;
      t[3] = g * j * m - f * k * m - g * i * n + e * k * n + f * i * o - e * j * o;
      t[7] = b * k * m - c * j * m + c * i * n - a * k * n - b * i * o + a * j * o;
      t[11] = c * f * m - b * g * m - c * e * n + a * g * n + b * e * o - a * f * o;
      t[15] = b * g * i - c * f * i + c * e * j - a * g * j - b * e * k + a * f * k;

      var det = a * t[0] + e * t[4] + i * t[8] + m * t[12];
      if (det === 0) {
        console.warn("Matrix can't be inverted :\n" + this.toString());
        this.identity();
      } else {
        var s = 1 / det;
        for (var _i = 0; _i < 16; _i++) {
          t[_i] *= s;
        }
      }

      return this;
    }
  }, {
    key: "transpose",
    value: function transpose() {
      var t = this.data;
      return this.set(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
    }
  }, {
    key: "copy",
    value: function copy(matrix) {
      var t0 = this.data;
      var t1 = matrix.data;
      for (var i = 0; i < 16; i++) {
        t0[i] = t1[i];
      }
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Mat4().copy(this);
    }
  }, {
    key: "toString",
    value: function toString() {
      var t = this.data;
      return "[Mat4\n      " + t[0] + ", " + t[4] + ", " + t[8] + ", " + t[12] + "\n      " + t[1] + ", " + t[5] + ", " + t[9] + ", " + t[13] + "\n      " + t[2] + ", " + t[6] + ", " + t[10] + ", " + t[14] + "\n      " + t[3] + ", " + t[7] + ", " + t[11] + ", " + t[15] + "\n    ]";
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.data;
    }
  }]);

  return Mat4;
})();

exports["default"] = Mat4;

var mat3 = new _Mat32["default"]();
var mat4 = new Mat4();

Mat4.projection = function (fov, aspect, near, far, out) {
  if (out === undefined) {
    out = new Mat4();
  }
  var t = out.data;

  var d = 1 / Math.tan(0.5 * fov);
  var inf = 1 / (near - far);
  t[0] = d / aspect;
  t[5] = d;
  t[10] = (near + far) * inf;
  t[11] = 2 * near * far * inf;
  t[14] = -1;
  t[1] = t[2] = t[3] = t[4] = t[6] = t[7] = t[8] = t[9] = t[12] = t[13] = t[15] = 0;
  return out;
};
module.exports = exports["default"];

},{"./Mat3":13}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Mat4 = require("./Mat4");

var _Mat42 = _interopRequireDefault(_Mat4);

var _Vec3 = require("./Vec3");

var _Vec32 = _interopRequireDefault(_Vec3);

//www.j3d.org/matrix_faq/matrfaq_latest.html

var Quaternion = (function () {
  function Quaternion(x, y, z, w) {
    _classCallCheck(this, Quaternion);

    this.set(x, y, z, w);

    this._rx = 0;
    this._ry = 0;
    this._rz = 0;
  }

  _createClass(Quaternion, [{
    key: "set",
    value: function set() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var w = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(q) {
      this.x = q.x;
      this.y = q.y;
      this.z = q.z;
      this.w = q.w;
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var s = 1 / this.length;
      this.x *= s;
      this.y *= s;
      this.z *= s;
      this.w *= s;
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(quat) {
      var x1 = this.x,
          y1 = this.y,
          z1 = this.z,
          w1 = this.w;
      var x2 = quat.x,
          y2 = quat.y,
          z2 = quat.z,
          w2 = quat.w;
      this.set(x1 * w2 + y1 * z2 - z1 * y2 + w1 * x2, y1 * w2 + z1 * x2 - x1 * z2 + w1 * y2, z1 * w2 + x1 * y2 - y1 * x2 + w1 * z2, -x1 * x2 - y1 * y2 - z1 * z2 + w1 * w2);
      return this;
    }
  }, {
    key: "add",
    value: function add(quat) {
      this.x += quat.x;
      this.y += quat.y;
      this.z += quat.z;
      this.w += quat.w;
      return this;
    }
  }, {
    key: "conjugate",
    value: function conjugate() {
      this.x *= -1;
      this.y *= -1;
      this.z *= -1;
      return this;
    }
  }, {
    key: "invert",
    value: function invert() {
      return this.conjugate().normalize();
    }
  }, {
    key: "setRotationFromAxisAngle",
    value: function setRotationFromAxisAngle(vec, angle) {
      this.setRotation(vec.x, vec.y, vec.z, angle);
      return this;
    }
  }, {
    key: "setRotation",
    value: function setRotation(rx, ry, rz, angle) {
      var s = 1 / Math.hypot(rx, ry, rz);
      angle *= 0.5;
      var sin = Math.sin(angle) * s;
      this.x = rx * sin;
      this.y = ry * sin;
      this.z = rz * sin;
      this.w = Math.cos(angle);
      return this;
    }
  }, {
    key: "transformVector",
    value: function transformVector(vec) {
      var quat = new Quaternion(vec.x, vec.y, vec.z, 0);
      var inv = this.clone().invert();
      vec.copy(this.clone().multiply(quat.multiply(inv)));
      return vec;
    }
  }, {
    key: "lookAt",
    value: function lookAt(position, target, up) {
      var newDir = new _Vec32["default"]().copy(target).sub(position).normalize();
      var baseDir = new _Vec32["default"](0, 0, -1);
      up = new _Vec32["default"](0, -1, 0);
      this.setRotationFromAxisAngle(baseDir.clone().cross(newDir), baseDir.angleWith(newDir));
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Quaternion(this.x, this.y, this.z, this.w);
    }
  }, {
    key: "toString",
    value: function toString() {
      return [this.x, this.y, this.z, this.w].join(", ");
    }
  }, {
    key: "length",
    get: function get() {
      return Math.hypot(this.x, this.y, this.z, this.w);
    }
  }, {
    key: "matrix",
    get: function get() {
      var s = 1 / this.length;
      var x = this.x * s;
      var y = this.y * s;
      var z = this.z * s;
      var w = this.w * s;

      var xx = x * x;
      var xy = x * y;
      var xz = x * z;
      var xw = x * w;
      var yy = y * y;
      var yz = y * z;
      var yw = y * w;
      var zz = z * z;
      var zw = z * w;

      return new _Mat42["default"](1 - 2 * (yy + zz), 2 * (xy - zw), 2 * (xz + yw), 0, 2 * (xy + zw), 1 - 2 * (xx + zz), 2 * (yz - xw), 0, 2 * (xz - yw), 2 * (yz + xw), 1 - 2 * (xx + yy), 0, 0, 0, 0, 1);
    }
  }]);

  return Quaternion;
})();

exports["default"] = Quaternion;
module.exports = exports["default"];

},{"./Mat4":14,"./Vec3":17}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec2 = (function () {
  function Vec2(x, y) {
    _classCallCheck(this, Vec2);

    this.x = x || 0;
    this.y = y || 0;
  }

  _createClass(Vec2, [{
    key: "set",
    value: function set(x, y) {
      this.x = x || 0;
      this.y = y || 0;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    }
  }, {
    key: "add",
    value: function add(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    }
  }, {
    key: "scale",
    value: function scale(s) {
      this.x *= s;
      this.y *= s;
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var s = 1 / this.length;
      this.x *= s;
      this.y *= s;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec2(this.x, this.y);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[Vec2 " + this.x + " " + this.y + "]";
    }
  }, {
    key: "length",
    get: function get() {
      return Math.hypot(this.x, this.y);
    },
    set: function set(l) {
      var s = l / this.length;
      this.x *= s;
      this.y *= s;
      return this;
    }
  }]);

  return Vec2;
})();

exports["default"] = Vec2;
module.exports = exports["default"];

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec3 = (function () {
  function Vec3() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    _classCallCheck(this, Vec3);

    this.set(x, y, z);
  }

  _createClass(Vec3, [{
    key: "set",
    value: function set() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
    }
  }, {
    key: "add",
    value: function add(v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
    }
  }, {
    key: "scale",
    value: function scale(s) {
      this.x *= s;
      this.y *= s;
      this.z *= s;
      return this;
    }
  }, {
    key: "negate",
    value: function negate() {
      return this.scale(-1);
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
  }, {
    key: "cross",
    value: function cross(v) {
      this.set(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
      return this;
    }
  }, {
    key: "getNormalVec",
    value: function getNormalVec() {
      if (this.x === 0) {
        return new Vec3(1, 0, 0);
      } else {
        return new Vec3(-(this.y + this.z) / this.x, 1, 1);
      }
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var s = 1 / this.length;
      this.x *= s;
      this.y *= s;
      this.z *= s;
      return this;
    }
  }, {
    key: "angleWith",
    value: function angleWith(v) {
      return Math.acos(this.dot(v) / (this.length * v.length));
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec3(this.x, this.y, this.z);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[Vec3 " + this.x + " " + this.y + " " + this.z + "]";
    }
  }, {
    key: "squaredLength",
    get: function get() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
  }, {
    key: "length",
    get: function get() {
      return Math.hypot(this.x, this.y, this.z);
    },
    set: function set(l) {
      var s = l / this.length;
      this.x *= s;
      this.y *= s;
      this.z *= s;
      return this;
    }
  }]);

  return Vec3;
})();

exports["default"] = Vec3;

Vec3.distance = function (v0, v1) {
  return Math.hypot(v1.x - v0.x, v1.y - v0.y, v1.z - v0.z);
};

Vec3.X = new Vec3(1, 0, 0);
Vec3.Y = new Vec3(0, 1, 0);
Vec3.Z = new Vec3(0, 0, 1);
module.exports = exports["default"];

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var QuadGeometry = (function () {
  function QuadGeometry() {
    _classCallCheck(this, QuadGeometry);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.setBuffers();
  }

  _createClass(QuadGeometry, [{
    key: "setBuffers",
    value: function setBuffers() {
      var positions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]);

      var uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);

      var ids = new Uint16Array([0, 2, 1, 0, 3, 2]);

      this.drawCallData.setIds(ids);
      this.drawCallData.setAttributes({
        aVertexPosition: positions,
        aUV: uvs
      });
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.drawCallData;
    }
  }]);

  return QuadGeometry;
})();

exports["default"] = QuadGeometry;
module.exports = exports["default"];

},{"../core/DrawCallData":6}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SceneNode2 = require("./SceneNode");

var _SceneNode3 = _interopRequireDefault(_SceneNode2);

var _mathMat3 = require("../math/Mat3");

var _mathMat32 = _interopRequireDefault(_mathMat3);

var Mesh = (function (_SceneNode) {
  _inherits(Mesh, _SceneNode);

  function Mesh(geometry, material) {
    _classCallCheck(this, Mesh);

    _get(Object.getPrototypeOf(Mesh.prototype), "constructor", this).call(this);
    this._normalMatrix = new _mathMat32["default"]();
    this.triggersDrawCall = true;
    this.geometry = geometry;
    this.material = material;
  }

  _createClass(Mesh, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      this.drawCallData.setUniforms({
        globalTransform: this._globalTransform,
        normalMatrix: this.normalMatrix
      });
      return [this.drawCallData, this.geometry.getDrawCallData(), this.material.getDrawCallData()];
    }
  }, {
    key: "normalMatrix",
    get: function get() {
      var t = this._globalTransform.data;
      this._normalMatrix.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]).invert().transpose();
      return this._normalMatrix.clone();
    }
  }]);

  return Mesh;
})(_SceneNode3["default"]);

exports["default"] = Mesh;
module.exports = exports["default"];

},{"../math/Mat3":13,"./SceneNode":20}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _mathVec3 = require("../math/Vec3");

var _mathVec32 = _interopRequireDefault(_mathVec3);

var _mathQuaternion = require("../math/Quaternion");

var _mathQuaternion2 = _interopRequireDefault(_mathQuaternion);

var _mathMat4 = require("../math/Mat4");

var _mathMat42 = _interopRequireDefault(_mathMat4);

var _mathMat3 = require("../math/Mat3");

var _mathMat32 = _interopRequireDefault(_mathMat3);

var SceneNode = (function () {
  function SceneNode() {
    _classCallCheck(this, SceneNode);

    this.drawCallData = new _coreDrawCallData2["default"]();

    this._transform = new _mathMat42["default"]();
    this._globalTransform = new _mathMat42["default"]();
    this.position = new _mathVec32["default"]();
    this.orientation = new _mathMat32["default"]();
    //this.orientation = new Quaternion();
    this.scale = new _mathVec32["default"](1, 1, 1);
  }

  _createClass(SceneNode, [{
    key: "detach",
    value: function detach() {
      if (this.parent !== undefined) {
        this.parent.remove(this);
      }
    }
  }, {
    key: "lookAt",
    value: function lookAt(target, up) {
      this.orientation.lookAt(this.position, target, up);
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.drawCallData;
    }
  }, {
    key: "transform",
    get: function get() {
      //this._transform.multiplyMat3(this.orientation);
      var t = this.orientation.data;
      this._transform.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1);
      this._transform.scaleV(this.scale);
      this._transform.translateV(this.position);
      return this._transform.clone();
    }
  }, {
    key: "globalTransform",
    get: function get() {
      return this._globalTransform.clone();
    }
  }]);

  return SceneNode;
})();

exports["default"] = SceneNode;
module.exports = exports["default"];

},{"../core/DrawCallData":6,"../math/Mat3":13,"../math/Mat4":14,"../math/Quaternion":15,"../math/Vec3":17}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Signal = require("./Signal");

var _Signal2 = _interopRequireDefault(_Signal);

require("./polyfills");

var Loop = (function () {
  function Loop(callback, scope, autoPlay) {
    _classCallCheck(this, Loop);

    this.onUpdate = new _Signal2["default"]();
    this.isPaused = true;
    this.frameId = 0;
    if (callback) {
      this.onUpdate.add(callback, scope);
      if (autoPlay || autoPlay === undefined) {
        this.play();
      }
    }
  }

  _createClass(Loop, [{
    key: "play",
    value: function play() {
      if (!this.isPaused) return;
      this.isPaused = false;
      this._onUpdate();
    }
  }, {
    key: "_onUpdate",
    value: function _onUpdate() {
      //can cause the loop to be paused
      this.onUpdate.dispatch(this.frameId);
      if (!this.isPaused) {
        this._requestFrame = requestAnimationFrame(this._onUpdate.bind(this));
      }
      this.frameId++;
    }
  }, {
    key: "pause",
    value: function pause() {
      this.isPaused = true;
      cancelAnimationFrame(this._requestFrame);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.onUpdate.dispose();
      pause();
    }
  }]);

  return Loop;
})();

exports["default"] = Loop;
module.exports = exports["default"];

},{"./Signal":23,"./polyfills":24}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Signal = require("./Signal");

var _Signal2 = _interopRequireDefault(_Signal);

function getNumericStyleProperty(style, prop) {
  return parseInt(style.getPropertyValue(prop), 10);
}

function elementPosition(e) {
  var x = 0,
      y = 0;
  var inner = true;
  do {
    x += e.offsetLeft;
    y += e.offsetTop;
    var style = getComputedStyle(e, null);
    var borderTop = getNumericStyleProperty(style, "border-top-width");
    var borderLeft = getNumericStyleProperty(style, "border-left-width");
    y += borderTop;
    x += borderLeft;
    if (inner) {
      var paddingTop = getNumericStyleProperty(style, "padding-top");
      var paddingLeft = getNumericStyleProperty(style, "padding-left");
      y += paddingTop;
      x += paddingLeft;
    }
    inner = false;
  } while (Boolean(e = e.offsetParent));
  return { x: x, y: y };
}

var Mouse = (function () {
  function Mouse(target) {
    _classCallCheck(this, Mouse);

    this.x = this.y = 0;
    this.oldX = this.oldY = 0;
    this.isDown = false;
    this.target = target || document;

    this.onDown = new _Signal2["default"]();
    this.onUp = new _Signal2["default"]();
    this.onMove = new _Signal2["default"]();

    this._moveBind = this._onMouseMove.bind(this);
    this._downBind = this._onMouseDown.bind(this);
    this._upBind = this._onMouseUp.bind(this);
    this.target.onmousemove = this._moveBind;
    this.target.onmousedown = this._downBind;
    this.target.onmouseup = this._upBind;
  }

  _createClass(Mouse, [{
    key: "_onMouseMove",
    value: function _onMouseMove(e) {
      this.savePos();

      var p = elementPosition(e.target);
      this.x = e.pageX - p.x;
      this.y = e.pageY - p.y;
      this.onMove.dispatch();
    }
  }, {
    key: "_onMouseDown",
    value: function _onMouseDown(e) {
      this.isDown = true;
      this.savePos();
      this.onDown.dispatch();
    }
  }, {
    key: "_onMouseUp",
    value: function _onMouseUp(e) {
      this.isDown = false;
      this.savePos();
      this.onUp.dispatch();
    }
  }, {
    key: "savePos",
    value: function savePos() {
      this.oldX = this.x;
      this.oldY = this.y;
    }
  }, {
    key: "point",
    value: function point(pt) {
      pt = pt || {};
      pt.x = this.x;
      pt.y = this.y;
      return pt;
    }
  }, {
    key: "showHand",
    value: function showHand() {
      this.target.style.cursor = "hand";
    }
  }, {
    key: "hideHand",
    value: function hideHand() {
      this.target.style.cursor = "default";
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.onDown.dispose();
      this.onUp.dispose();
      this.onMove.dispose();

      if (this.target.onmousemove == this._moveBind) {
        this.target.onmousemove = null;
      }
      if (this.target.onmousedown == this._downBind) {
        this.target.onmousedown = null;
      }
      if (this.target.onmouseup == this._upBind) {
        this.target.onmouseup = null;
      }
    }
  }]);

  return Mouse;
})();

exports["default"] = Mouse;
module.exports = exports["default"];

},{"./Signal":23}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("./polyfills");

var Listener = (function () {
  function Listener(signal, callback, scope, args) {
    _classCallCheck(this, Listener);

    this.callback = callback;
    this.scope = scope;
    this.args = args;
    this.once = false;
  }

  _createClass(Listener, [{
    key: "dispatch",
    value: function dispatch(args) {
      this.callback.apply(this.scope, args.concat(this.args));
    }
  }]);

  return Listener;
})();

var Signal = (function () {
  function Signal() {
    _classCallCheck(this, Signal);

    this.listeners = [];
  }

  _createClass(Signal, [{
    key: "add",
    value: function add(callback, scope) {
      if (callback === undefined) {
        throw new Error("no callback specified");
      }
      var args = Array.prototype.slice.call(arguments, 2);
      var n = this.listeners.length;
      var listener = new Listener(this, callback, scope, args);
      this.listeners.push(listener);
      return listener;
    }
  }, {
    key: "addOnce",
    value: function addOnce(callback, scope) {
      var listener = this.add.apply(this, arguments);
      listener.once = true;
      return listener;
    }
  }, {
    key: "remove",
    value: function remove(callback, scope) {
      var n = this.listeners.length;
      for (var i = 0; i < n; i++) {
        var listener = this.listeners[i];
        if (listener.callback == callback && listener.scope == scope) {
          this.listeners.splice(i, 1);
          return;
        }
      }
    }
  }, {
    key: "removeListener",
    value: function removeListener(listener) {
      var id = this.listeners.length;
      if (id !== -1) {
        this.listeners.splice(id, 1);
      }
    }
  }, {
    key: "dispatch",
    value: function dispatch() {
      var args = Array.prototype.slice.call(arguments);
      var n = this.listeners.length;
      for (var i = 0; i < n; i++) {
        var listener = this.listeners[i];
        listener.dispatch(args);
        if (listener.once) {
          this.listeners.splice(i, 1);
          n--;
          i--;
        }
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.listeners = [];
    }
  }]);

  return Signal;
})();

exports["default"] = Signal;
module.exports = exports["default"];

},{"./polyfills":24}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
  return setTimeout(fn, 50 / 3);
};

window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || function (id) {
  clearTimeout(id);
};

if (!Function.prototype.bind) {
  Function.prototype.bind = function (scope) {
    if (!method) throw new Error("no method specified");
    var args = Array.prototype.slice.call(arguments, 2);
    return function () {
      var params = Array.prototype.slice.call(arguments);
      method.apply(scope, params.concat(args));
    };
  };
}

if (window.console === undefined || console.log === undefined) {
  window.console = {
    log: function log() {}
  };
}

exports["default"] = {};
module.exports = exports["default"];

},{}]},{},[1]);
