/*onSetup*/console.log("\n----------\n");
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
/* D:\serpack\fixtures\plugin\index.ts */ "0": (function(__serpack_require__,__non_serpack_require__,module,exports) { console.log('inserted - D:\\serpack\\fixtures\\plugin\\index.ts');'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),__serpack_require__('sp:1'),console.log('File 1'); }),
/* D:\serpack\fixtures\plugin\foo\bar.ts */ "1": (function(__serpack_require__,__non_serpack_require__,module,exports) { console.log('inserted - D:\\serpack\\fixtures\\plugin\\foo\\bar.ts');'use strict';console.log('File 2'); }),
});