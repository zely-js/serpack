(function(modules) {
  var __serpack_module_cache__={};
  function _interopRequireDefault(mod){
    return mod&&mod.__esModule ? mod.default : mod
  }
  function __serpack_require__(id){
    if (!id.startsWith("sp:")) return _interopRequireDefault(require(id));
    if (__serpack_module_cache__[id.slice(3)]) return __serpack_module_cache__[id.slice(3)];
    const module={exports:{}};
    __serpack_module_cache__[id.slice(3)]="__serpack_module_pending__";
    modules[id.slice(3)].call(module.exports, __serpack_require__, require, module, module.exports);
    __serpack_module_cache__[id.slice(3)]=module.exports;
    return module.exports;
  }
  module.exports=__serpack_require__("sp:0");
})({
/* D:\serpack\fixtures\sourcemap\index.ts */ "0": (function(__serpack_require__,__non_serpack_require__,module,exports) { 'use strict';Object.defineProperty(exports,'__esModule',{value:!0});const e=__serpack_require__('sp:1'),r=__serpack_require__('sp:2');try{(0,r.somethingWrong)();}catch(r){(0,e.emit)(r,'./fixtures/sourcemap/compiled.js.map');} }),
/* D:\serpack\fixtures\sourcemap\comsumer\index.ts */ "1": (function(__serpack_require__,__non_serpack_require__,module,exports) { 'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),function(e,n){for(var r in n)Object.defineProperty(e,r,{enumerable:!0,get:n[r]});}(exports,{emit:function(){return s;},parse:function(){return u;}});const e=__serpack_require__('fs'),n=__serpack_require__('path'),r=__serpack_require__('source-map'),t=__serpack_require__('sp:3');function i(e,n,r,t,i,o,u){try{var l=e[o](u),s=l.value;}catch(e){r(e);return;}l.done?n(s):Promise.resolve(s).then(t,i);}function o(e){return function(){var n=this,r=arguments;return new Promise(function(t,o){var u=e.apply(n,r);function l(e){i(u,t,o,l,s,'next',e);}function s(e){i(u,t,o,l,s,'throw',e);}l(void 0);});};}function u(e,n){return l.apply(this,arguments);}function l(){return(l=o(function*(i,o){let u=(0,t.parseError)(i),l=u[0].loc.slice(1,-1),s=l.split(':'),c=s.pop(),a={filename:l,line:Number(s.pop()),column:Number(c)};if(!(0,e.existsSync)(o))throw Error('.map file desn\'t exist');let p=JSON.parse((0,e.readFileSync)(o,'utf-8')),f=new r.SourceMapConsumer(p),m=(yield f).originalPositionFor(a),y=(0,n.join)((0,n.dirname)(s.join(':')),m.source),d=(0,e.readFileSync)(y,'utf-8').split('\n'),h=d[m.line-1];return u.unshift({at:'',loc:`${y}:${m.line}:${m.column}`}),{line:h,originalFile:d,stacks:u};})).apply(this,arguments);}function s(e,n){return c.apply(this,arguments);}function c(){return(c=o(function*(e,n){let r=yield u(e,n);console.log(e.message),console.log(`> ${r.line} (at ${r.stacks[0].loc})`);})).apply(this,arguments);} }),
/* D:\serpack\fixtures\sourcemap\comsumer\parse.ts */ "3": (function(__serpack_require__,__non_serpack_require__,module,exports) { 'use strict';function e(e){var r;let t=null===(r=e.stack)||void 0===r?void 0:r.split('\n').slice(1);return null==t?void 0:t.map(e=>{e=e.slice(7);let r={at:'',loc:''};return r.loc=(/\([^)]*\)/.exec(e)||[])[0]||'',r.at=e.replace(r.loc,''),r;});}Object.defineProperty(exports,'__esModule',{value:!0}),Object.defineProperty(exports,'parseError',{enumerable:!0,get:function(){return e;}}); }),
/* D:\serpack\fixtures\sourcemap\something-wrong.ts */ "2": (function(__serpack_require__,__non_serpack_require__,module,exports) { 'use strict';function e(){throw Error('Something is wrong!');}Object.defineProperty(exports,'__esModule',{value:!0}),Object.defineProperty(exports,'somethingWrong',{enumerable:!0,get:function(){return e;}}); }),
});