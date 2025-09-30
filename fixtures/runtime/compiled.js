  var __serpack_env__={"target":"node"};
  process.env.__RUNTIME__=JSON.stringify(__serpack_env__);
module.exports=({
/* D:\serpack-js\fixtures\runtime\index.ts */
"0": (function(__serpack_require__,__non_serpack_require__,module,exports) { (Object.defineProperty(exports, "__esModule", {
  value: !0
}), Object.defineProperty(exports, "default", {
  enumerable: !0,
  get: function () {
    return r;
  }
}));
const e = __serpack_require__('sp:1')._(__serpack_require__("virtual:hello"));
console.log(`Hello ${e.default.name}`);
const r = e.default;

}),

/* D:\serpack-js\node_modules\@swc\helpers\esm\_interop_require_default.js */
"1": (function(__serpack_require__,__non_serpack_require__,module,exports) { function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
(Object.defineProperty(exports, "__esModule", {
  value: !0
}), Object.defineProperty(exports, "_", {
  enumerable: !0,
  get: function () {
    return e;
  }
}));

}),
});