(function(modules) {
  var __serpack_module_cache__={};
  function __serpack_require__(id){
    if (!id.startsWith("sp:")) return require(id);
    if (__serpack_module_cache__[id.slice(3)]) return __serpack_module_cache__[id.slice(3)];
    const module={exports:{}};
    __serpack_module_cache__[id.slice(3)]="__serpack_module_pending__";
    modules[id.slice(3)].call(module.exports, __serpack_require__, require, module, module.exports);
    __serpack_module_cache__[id.slice(3)]=module.exports;
    return module.exports;
  }
  module.exports=__serpack_require__("sp:0");
})({
/* D:\serpack\fixtures\sourcemap\index.ts */ "0": (function(__serpack_require__,__non_serpack_require__,module,exports) { 'use strict';Object.defineProperty(exports,'__esModule',{value:!0});const e=__serpack_require__('path'),r=__serpack_require__('sp:1'),t=__serpack_require__('sp:2');try{(0,t.somethingWrong)();}catch(t){(0,r.emit)(t,(0,e.join)('./fixtures/sourcemap/compiled.js.map'));} }),
/* D:\serpack\fixtures\sourcemap\comsumer\index.ts */ "1": (function(__serpack_require__,__non_serpack_require__,module,exports) { 'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),function(e,n){for(var r in n)Object.defineProperty(e,r,{enumerable:!0,get:n[r]});}(exports,{emit:function(){return l;},parse:function(){return o;}});const e=__serpack_require__('fs'),n=__serpack_require__('source-map'),r=__serpack_require__('sp:3');function t(e,n,r,t,i,o,u){try{var l=e[o](u),s=l.value;}catch(e){r(e);return;}l.done?n(s):Promise.resolve(s).then(t,i);}function i(e){return function(){var n=this,r=arguments;return new Promise(function(i,o){var u=e.apply(n,r);function l(e){t(u,i,o,l,s,'next',e);}function s(e){t(u,i,o,l,s,'throw',e);}l(void 0);});};}function o(e,n){return u.apply(this,arguments);}function u(){return(u=i(function*(t,i){let o=(0,r.parseError)(t),u=o[0].loc.slice(1,-1),l=u.split(':'),s=l.pop(),c={filename:u,line:Number(l.pop()),column:Number(s)};if(!(0,e.existsSync)(i))throw Error('.map file desn\'t exist');let a=JSON.parse((0,e.readFileSync)(i,'utf-8')),p=new n.SourceMapConsumer(a),f=(yield p).originalPositionFor(c),m=f.source,y=(0,e.readFileSync)(m,'utf-8').split('\n'),d=y[f.line-1];return o.unshift({at:'',loc:`${m}:${f.line}:${f.column}`}),{line:d,originalFile:y,stacks:o};})).apply(this,arguments);}function l(e,n){return s.apply(this,arguments);}function s(){return(s=i(function*(e,n){let r=yield o(e,n);console.log(e.message),console.log(`> ${r.line} (at ${r.stacks[0].loc})`);})).apply(this,arguments);} }),
/* D:\serpack\fixtures\sourcemap\comsumer\parse.ts */ "3": (function(__serpack_require__,__non_serpack_require__,module,exports) { 'use strict';function e(e){var r;let t=null===(r=e.stack)||void 0===r?void 0:r.split('\n').slice(1);return null==t?void 0:t.map(e=>{e=e.slice(7);let r={at:'',loc:''};return r.loc=(/\([^)]*\)/.exec(e)||[])[0]||'',r.at=e.replace(r.loc,''),r;});}Object.defineProperty(exports,'__esModule',{value:!0}),Object.defineProperty(exports,'parseError',{enumerable:!0,get:function(){return e;}}); }),
/* D:\serpack\fixtures\sourcemap\something-wrong.ts */ "2": (function(__serpack_require__,__non_serpack_require__,module,exports) { 'use strict';function e(){throw Error('Something is wrong!');}Object.defineProperty(exports,'__esModule',{value:!0}),Object.defineProperty(exports,'somethingWrong',{enumerable:!0,get:function(){return e;}}); }),
});