const __log=(...args)=>console.log("message: " + args.join(''));
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
/* D:\serpack-js\fixtures\modifier\index.ts */
"0": (function(__serpack_require__,__non_serpack_require__,module,exports) { function l(...e) {
    return e;
}
__log(l("hello")), __log(l("hello2"));

}),
});