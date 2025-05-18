/* ** This is core package compiled using serpack ** */

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
/* D:\serpack-js\packages\serpack\src\index.ts */ "0": (function(__serpack_require__,__non_serpack_require__,module,exports) { var i = Object.defineProperty;
var C = Object.getOwnPropertyDescriptor;
var n = Object.getOwnPropertyNames;
var s = Object.prototype.hasOwnProperty;
var O = (m, p) => {
  for (var e in p) i(m, e, {
    get: p[e],
    enumerable: !0
  });
}, x = (m, p, e, l) => {
  if (p && typeof p == "object" || typeof p == "function") for (let f of n(p)) !s.call(m, f) && f !== e && i(m, f, {
    get: () => p[f],
    enumerable: !(l = C(p, f)) || l.enumerable
  });
  return m;
}, r = (m, p, e) => (x(m, p, "default"), e && x(e, p, "default"));
var a = m => x(i({}, "__esModule", {
  value: !0
}), m);
var o = {};
O(o, {
  Compiler: () => t.Compiler,
  CompilerOptions: () => t.CompilerOptions
});
module.exports = a(o);
var t = __serpack_require__("sp:1");
r(o, __serpack_require__("sp:2"), module.exports);
r(o, __serpack_require__("sp:3"), module.exports);
r(o, __serpack_require__("sp:4"), module.exports);
r(o, __serpack_require__("sp:5"), module.exports);
r(o, __serpack_require__("sp:6"), module.exports);
r(o, __serpack_require__("sp:7"), module.exports);
 }),
/* D:\serpack-js\packages\serpack\src\core\index.ts */ "1": (function(__serpack_require__,__non_serpack_require__,module,exports) { var w = Object.defineProperty;
var F = Object.getOwnPropertyDescriptor;
var K = Object.getOwnPropertyNames;
var G = Object.prototype.hasOwnProperty;
var X = (g, e) => {
  for (var i in e) w(g, i, {
    get: e[i],
    enumerable: !0
  });
}, H = (g, e, i, r) => {
  if (e && typeof e == "object" || typeof e == "function") for (let s of K(e)) !G.call(g, s) && s !== i && w(g, s, {
    get: () => e[s],
    enumerable: !(r = F(e, s)) || r.enumerable
  });
  return g;
};
var Q = g => H(w({}, "__esModule", {
  value: !0
}), g);
var W = {};
X(W, {
  Compiler: () => q
});
module.exports = Q(W);
var n = __serpack_require__("path"), v = __serpack_require__("fs"), h = __serpack_require__("sp:8"), T = __serpack_require__("acorn"), A = __serpack_require__("oxc-resolver"), M = __serpack_require__("estree-walker"), x = __serpack_require__("source-map"), k = __serpack_require__("deepmerge-ts"), L = __serpack_require__("astring"), J = __serpack_require__("esbuild"), R = __serpack_require__("module"), U = __serpack_require__("sp:3"), a = __serpack_require__("sp:2"), D = __serpack_require__("sp:9"), I = __serpack_require__("sp:10");
const P = ["cjs", "mjs", "js", "cts", "mts", "ts", "jsx", "tsx"], V = [...P, "json"], B = ["ts", "cts", "mts", "tsx"];
class q {
  entry;
  source;
  modules;
  parserOptions;
  sourceType;
  resolver;
  resolverOptions;
  id;
  target;
  constructor(e, i) {
    ((0, n.isAbsolute)(e) || (e = (0, n.join)(process.cwd(), e)), this.entry = e, this.modules = {}, this.source = (0, v.readFileSync)(e, "utf-8"), this.parserOptions = i || ({}), this.sourceType = B.includes((0, n.parse)(e).ext.slice(1)) ? "typescript" : "javascript", this.resolverOptions = this.parserOptions.resolverOptions || ({}), this.id = {}, this.target = this.parserOptions.target || "node", this.resolver = new A.ResolverFactory({
      conditionNames: ["node", "import"],
      mainFields: ["module", "main"],
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".d.ts"],
      ...this.resolverOptions
    }));
    for (const r of this.pluginArray("onSetup")) {
      const s = r(this.parserOptions);
      s && (this.parserOptions = {
        ...this.parserOptions,
        ...s
      });
    }
  }
  pluginArray(e) {
    var i, r;
    return ((r = (i = this.parserOptions.plugins) == null ? void 0 : i.map(s => s[e])) != null ? r : []).filter(s => s != null);
  }
  async transform(e = this.entry) {
    var s, c, o, u, m;
    const i = (0, v.readFileSync)(e, "utf-8");
    if (!P.includes((0, n.extname)(e).slice(1))) {
      const t = e.replace(/\\/g, "/");
      if (((s = this.parserOptions) == null ? void 0 : s.type) === "script") return {
        code: `module.exports=/*export*/${a.__NON_SERPACK_REQUIRE__}(\`./\${${a.__SERPACK_REQUIRE__}("path").relative(__dirname, "${t}").replace(/\\\\/g, '/')}\`);`,
        map: {}
      };
      if (!((c = this.parserOptions) != null && c.type) || ((o = this.parserOptions) == null ? void 0 : o.type) === "module") {
        const p = (0, D.load)(t, i);
        return {
          code: p.code,
          map: p.map
        };
      }
      (0, h.error)(`unknown options.type: ${(u = this.parserOptions) == null ? void 0 : u.type}`);
    }
    ((m = this.parserOptions) == null ? void 0 : m.type) === "script" && (this.parserOptions.globals || (this.parserOptions.globals = {}), this.parserOptions.globals.vars || (this.parserOptions.globals.vars = {}), this.parserOptions.globals.vars.__filename = JSON.stringify(e), this.parserOptions.globals.vars.__dirname = JSON.stringify((0, n.dirname)(e)));
    const r = await (0, J.transform)(i, (0, k.deepmerge)({
      minify: !0,
      define: {},
      sourcemap: !0,
      format: "cjs",
      loader: "ts",
      target: "node12"
    }, {}));
    if (r.warnings) for (const t of r.warnings) (0, h.warn)(t.text);
    for await (const t of this.pluginArray("onCompile")) {
      const p = await t({
        filename: {
          original: e,
          resolved: e
        },
        output: r,
        source: i
      });
      (p && p.code && (r.code = p.code), p && p.map && (r.code = p.map));
    }
    return {
      code: r.code,
      map: JSON.parse(r.map)
    };
  }
  resolve(e = process.cwd(), i) {
    var o, u, m, t, p;
    const r = this.resolver.sync(e, i), s = r.path;
    if (!s) return;
    for (const l of this.pluginArray("onLoad")) l({
      filename: {
        original: i,
        resolved: s
      }
    });
    const c = (0, n.parse)(s).ext.slice(1);
    if (V.includes(c)) {
      if ((u = (o = this.parserOptions) == null ? void 0 : o.forceExternal) != null && u.includes(i)) {
        (0, h.debug)(`Resolving module: ${s} [rejected - externals]`);
        return;
      }
      if (R.builtinModules.includes(s)) {
        (0, h.debug)(`Resolving module: ${s} [rejected - builtin]`);
        return;
      }
      if (s != null && s.includes("node_modules")) {
        if (this.parserOptions.nodeExternal) {
          (0, h.debug)(`Resolving module: ${s} [rejected - node_modules]`);
          return;
        }
        if (((m = this.parserOptions.externals) == null ? void 0 : m.length) === 0) return s;
        const l = (0, I.findPackage)(s);
        if (!l) return s;
        const d = JSON.parse((0, v.readFileSync)(l).toString()), {name: y} = d;
        return (t = this.parserOptions.externals) != null && t.includes(y) ? void 0 : s;
      }
      return (((p = r.error) == null ? void 0 : p.length) > 0 && console.error(r.error), s);
    }
  }
  async compile(e = this.entry, i = (0, n.join)(process.cwd(), "path")) {
    const r = this.resolve((0, n.dirname)(i), e);
    if (!r) {
      (0, h.warn)(`Cannot resolve module: ${e}`);
      return;
    }
    (e = r, (e in this.id) || (this.id[e] = Object.keys(this.id).length), (0, h.debug)(`Resolving module: ${e}`));
    const s = await this.transform(e), c = this.parseModule(e, s.code, this.parserOptions);
    this.modules[e] = {
      code: (0, L.generate)(c.ast, {}),
      map: s.map
    };
    for await (const o of c.modules) {
      if (R.builtinModules.includes(o)) continue;
      const u = this.resolve((0, n.dirname)(e), o);
      this.modules[u] || await this.compile(o, e);
    }
  }
  parseModule(e, i, r) {
    const s = i != null ? i : (0, v.readFileSync)(e, "utf-8"), c = (0, T.parse)(s, {
      sourceType: "module",
      ecmaVersion: "latest",
      ...r == null ? void 0 : r.parserOptions
    }), o = {
      modules: [],
      id: this.id
    }, u = this.resolve.bind(this), m = (0, M.walk)(c, {
      enter(t) {
        if (t.type === "CallExpression" && t.callee.type === "Identifier" && t.callee.name === "require" && t.arguments[0].type === "Literal") {
          const p = t.arguments[0].value, l = u((0, n.dirname)(e), p);
          if (!l) return (t.callee.name = a.__SERPACK_REQUIRE__, t);
          (l in o.id) || (o.id[l] = Object.keys(o.id).length);
          const d = o.id[l];
          (o.modules.push(p), t.callee.name = a.__SERPACK_REQUIRE__, t.arguments[0].value = `sp:${d}`, t.arguments[0].raw = `"sp:${d}"`, console.log(t.arguments[0]));
        }
        if (t.type === "ImportDeclaration" && t.source.type === "Literal") {
          const p = t.source.value, l = u((0, n.dirname)(e), p);
          if (!l) return;
          (l in o.id) || (o.id[l] = Object.keys(o.id).length);
          const d = o.id[l];
          (o.modules.push(p), t.source.value = `sp:${d}`, this.replace((0, U.importToRequire)(t)));
        }
      },
      leave(t, p) {
        var l, d;
        t.type === "CallExpression" && ((l = r.modifier) != null && l.caller) && (t = ((d = r.modifier) == null ? void 0 : d.caller(t, p)) || t, this.replace(t));
      }
    });
    return (this.id = o.id, {
      ast: m,
      modules: o.modules
    });
  }
  async bundle() {
    var t, p, l, d, y, E;
    const {modules: e, target: i} = this, r = [], s = new Set(), c = this.parserOptions.sourcemap;
    let o = 1, u;
    for await (const O of this.pluginArray("onBundle")) await O();
    if (((t = this.parserOptions) != null && t.banner && (r.push(this.parserOptions.banner), o += this.parserOptions.banner.split(`
`).length), (0, h.debug)(`modules: ${JSON.stringify(this.id)}`), c)) {
      const O = ((l = (p = this.parserOptions) == null ? void 0 : p.sourcemapOptions) == null ? void 0 : l.sourcemapRoot) || (0, n.dirname)(this.entry);
      u = new x.SourceMapGenerator({
        file: "bundle.js",
        sourceRoot: O
      });
    }
    let m = ["(function(modules) {", `  var ${a.__SERPACK_MODULE_CACHE__}={};`, `  function ${a.__SERPACK_REQUIRE__}(id){`, '    if (!id.startsWith("sp:")) return require(id);', `    if (${a.__SERPACK_MODULE_CACHE__}[id.slice(3)]) return ${a.__SERPACK_MODULE_CACHE__}[id.slice(3)];`, "    const module={exports:{}};", `    ${a.__SERPACK_MODULE_CACHE__}[id.slice(3)]="${a.__SERPACK_MODULE_PENDING__}";`, `    modules[id.slice(3)].call(module.exports, ${a.__SERPACK_REQUIRE__}, ${a.__NON_SERPACK_REQUIRE__}, module, module.exports);`, `    ${a.__SERPACK_MODULE_CACHE__}[id.slice(3)]=module.exports;`, "    return module.exports;", "  }", `  module.exports=${a.__SERPACK_REQUIRE__}("sp:0");`, "})({"];
    (i === "browser" && m.unshift("/*browser-support*/", "var module={exports:{}};", 'function require(id){throw new Error(`Cannot find module "${id}"`);}'), this.parserOptions.runtime && (m = [`  var ${a.__SERPACK_ENV__}=${JSON.stringify({
      target: this.target
    })};`, `  ${this.target === "node" ? "process.env" : "window"}.__RUNTIME__=JSON.stringify(${a.__SERPACK_ENV__});`, "module.exports=({"]), r.push(...m), o += m.length);
    for await (const [O, $] of Object.entries(e)) {
      const C = `/* ${O} */ "${this.id[O]}": (function(${a.__SERPACK_REQUIRE__},__non_serpack_require__,module,exports) { `, S = `${C}${$.code} }),`;
      if ((r.push(S), c && Object.keys($.map).length > 0)) {
        const b = await new x.SourceMapConsumer($.map), j = ((y = (d = this.parserOptions) == null ? void 0 : d.sourcemapOptions) == null ? void 0 : y.sourcemapRoot) || (0, n.dirname)(this.entry);
        (b.eachMapping(_ => {
          if (_.source) {
            let f = _.source;
            if (((0, n.isAbsolute)(f) ? f = (0, n.relative)(j, f) : f = (0, n.relative)(j, (0, n.join)((0, n.dirname)(O), f)), f = f.replace(/\\/g, "/"), u.addMapping({
              source: f,
              original: {
                line: _.originalLine,
                column: _.originalColumn
              },
              generated: {
                line: o,
                column: _.generatedColumn + C.length
              },
              name: _.name
            }), !s.has(f))) {
              const N = b.sourceContentFor(_.source, !0);
              N && (u.setSourceContent(f, N), s.add(f));
            }
          }
        }), b.destroy());
      }
      o += S.split(`
`).length;
    }
    return (r.push("});"), o += 1, (E = this.parserOptions) != null && E.footer && (r.push(this.parserOptions.footer), o += this.parserOptions.footer.split(`
`).length), {
      code: r.join(`
`),
      map: c ? u.toString() : null
    });
  }
}
 }),
/* D:\serpack-js\packages\serpack-logger\dist\index.mjs */ "8": (function(__serpack_require__,__non_serpack_require__,module,exports) { var c = Object.defineProperty;
var R = Object.getOwnPropertyDescriptor;
var g = Object.getOwnPropertyNames;
var N = Object.prototype.hasOwnProperty;
var b = (e, r) => {
  for (var o in r) c(e, o, {
    get: r[o],
    enumerable: !0
  });
}, d = (e, r, o, i) => {
  if (r && typeof r == "object" || typeof r == "function") for (let n of g(r)) !N.call(e, n) && n !== o && c(e, n, {
    get: () => r[n],
    enumerable: !(i = R(r, n)) || i.enumerable
  });
  return e;
};
var p = e => d(c({}, "__esModule", {
  value: !0
}), e);
var v = {};
b(v, {
  COMPILER_LOG_LEVEL_TYPE: () => t,
  debug: () => s,
  error: () => a,
  info: () => l,
  warn: () => f
});
module.exports = p(v);
var A = __serpack_require__("colors"), t = (e => (e[e.ERROR = 0] = "ERROR", e[e.WARN = 1] = "WARN", e[e.INFO = 2] = "INFO", e[e.DEBUG = 3] = "DEBUG", e))(t || ({}));
process.argv.includes("--compiler-debug") && (global.COMPILER_LOG_LEVEL = "debug");
function U(e) {
  if (!e) return 2;
  switch (e.toUpperCase()) {
    case "ERROR":
      return 0;
    case "WARN":
      return 1;
    case "INFO":
      return 2;
    case "DEBUG":
      return 3;
    default:
      return 2;
  }
}
var u = U(global.COMPILER_LOG_LEVEL);
function a(e) {
  u >= 0 && console.error(`[ERROR]: ${e}`.red);
}
function f(e) {
  u >= 1 && console.warn(`[WARN]: ${e}`.yellow);
}
function l(e) {
  u >= 2 && console.info(`[INFO]: ${e}`.blue);
}
function s(e) {
  u >= 3 && console.debug(`[DEBUG]: ${e}`.cyan);
}
 }),
/* D:\serpack-js\packages\serpack\src\core\parse.ts */ "3": (function(__serpack_require__,__non_serpack_require__,module,exports) { var o = Object.defineProperty;
var c = Object.getOwnPropertyDescriptor;
var f = Object.getOwnPropertyNames;
var m = Object.prototype.hasOwnProperty;
var y = (t, e) => {
  for (var r in e) o(t, r, {
    get: e[r],
    enumerable: !0
  });
}, d = (t, e, r, a) => {
  if (e && typeof e == "object" || typeof e == "function") for (let n of f(e)) !m.call(t, n) && n !== r && o(t, n, {
    get: () => e[n],
    enumerable: !(a = c(e, n)) || a.enumerable
  });
  return t;
};
var u = t => d(o({}, "__esModule", {
  value: !0
}), t);
var x = {};
y(x, {
  importToRequire: () => I
});
module.exports = u(x);
function I(t) {
  if (t.type === "ImportDeclaration") {
    const {specifiers: e, source: r} = t;
    if (e.length === 0) return {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        optional: !1,
        callee: {
          type: "Identifier",
          name: "require"
        },
        arguments: [r]
      }
    };
    if (e.length === 1) {
      const a = e[0], {name: n} = a.local;
      if (a.type === "ImportDefaultSpecifier" || a.type === "ImportNamespaceSpecifier") return {
        type: "VariableDeclaration",
        kind: "const",
        declarations: [{
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: n
          },
          init: {
            type: "CallExpression",
            optional: !1,
            callee: {
              type: "Identifier",
              name: "require"
            },
            arguments: [r]
          }
        }]
      };
    }
    if (e.length > 1) {
      const a = e.find(i => i.type === "ImportDefaultSpecifier"), n = e.filter(i => i.type === "ImportSpecifier"), p = [];
      if (a) {
        const {name: i} = a.local;
        p.push({
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: i
          },
          init: {
            type: "CallExpression",
            optional: !1,
            callee: {
              type: "Identifier",
              name: "require"
            },
            arguments: [r]
          }
        });
      }
      for (const i of n) {
        const {name: l} = i.local, s = i.imported && i.imported.type === "Identifier" ? i.imported.name : "";
        p.push({
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: l
          },
          init: {
            type: "MemberExpression",
            object: {
              type: "CallExpression",
              optional: !1,
              callee: {
                type: "Identifier",
                name: "require"
              },
              arguments: [r]
            },
            property: {
              type: "Identifier",
              name: s
            },
            computed: !1
          }
        });
      }
      return {
        type: "VariableDeclaration",
        kind: "const",
        declarations: p
      };
    }
  }
  return t;
}
 }),
/* D:\serpack-js\packages\serpack\src\core\functions.ts */ "2": (function(__serpack_require__,__non_serpack_require__,module,exports) { var r = Object.defineProperty;
var t = Object.getOwnPropertyDescriptor;
var p = Object.getOwnPropertyNames;
var s = Object.prototype.hasOwnProperty;
var n = (e, _) => {
  for (var o in _) r(e, o, {
    get: _[o],
    enumerable: !0
  });
}, R = (e, _, o, c) => {
  if (_ && typeof _ == "object" || typeof _ == "function") for (let E of p(_)) !s.call(e, E) && E !== o && r(e, E, {
    get: () => _[E],
    enumerable: !(c = t(_, E)) || c.enumerable
  });
  return e;
};
var C = e => R(r({}, "__esModule", {
  value: !0
}), e);
var N = {};
n(N, {
  __ESM__: () => P,
  __NON_SERPACK_REQUIRE__: () => A,
  __SERPACK_ENV__: () => K,
  __SERPACK_MODULE_CACHE__: () => S,
  __SERPACK_MODULE_PENDING__: () => a,
  __SERPACK_REQUIRE__: () => x
});
module.exports = C(N);
const x = "__serpack_require__", A = "require", P = "__esm__", S = "__serpack_module_cache__", a = "__serpack_module_pending__", K = "__serpack_env__";
 }),
/* D:\serpack-js\packages\serpack\src\core\loader.ts */ "9": (function(__serpack_require__,__non_serpack_require__,module,exports) { var i = Object.defineProperty;
var l = Object.getOwnPropertyDescriptor;
var m = Object.getOwnPropertyNames;
var f = Object.prototype.hasOwnProperty;
var d = (e, n) => {
  for (var t in n) i(e, t, {
    get: n[t],
    enumerable: !0
  });
}, $ = (e, n, t, o) => {
  if (n && typeof n == "object" || typeof n == "function") for (let r of m(n)) !f.call(e, r) && r !== t && i(e, r, {
    get: () => n[r],
    enumerable: !(o = l(n, r)) || o.enumerable
  });
  return e;
};
var x = e => $(i({}, "__esModule", {
  value: !0
}), e);
var j = {};
d(j, {
  load: () => h
});
module.exports = x(j);
var c = __serpack_require__("path"), p = __serpack_require__("sp:8"), s = __serpack_require__("vlq");
function S(e) {
  let n = 0, t = "";
  (t += (0, s.encode)([n, 0, 0, 0]), n += 15, t += `,${(0, s.encode)([0, 0, 0, 0])}`);
  const o = Object.entries(e);
  return (o.forEach(([r, u], a) => {
    (t += `,${(0, s.encode)([1, 0, 0, n])}`, n += r.length + 2, n += 2);
    const g = JSON.stringify(u);
    (t += `,${(0, s.encode)([1, 0, 0, n])}`, n += g.length, a < o.length - 1 && (n += 2));
  }), t);
}
function O(e, n) {
  const t = JSON.parse(n);
  return {
    version: 3,
    file: e,
    sources: [e],
    names: [],
    sourcesContent: [n],
    mappings: S(t),
    sourceRoot: ""
  };
}
function h(e, n) {
  const t = (0, c.extname)(e).slice(1);
  return t === "json" ? {
    code: `module.exports=${n};`,
    map: O(e, n)
  } : ((0, p.warn)(`Unsupported extension: .${t} (file: ${e})`), {
    code: "",
    map: null
  });
}
 }),
/* D:\serpack-js\packages\serpack\src\lib\root.ts */ "10": (function(__serpack_require__,__non_serpack_require__,module,exports) { var o = Object.defineProperty;
var u = Object.getOwnPropertyDescriptor;
var c = Object.getOwnPropertyNames;
var p = Object.prototype.hasOwnProperty;
var f = (r, n) => {
  for (var i in n) o(r, i, {
    get: n[i],
    enumerable: !0
  });
}, g = (r, n, i, s) => {
  if (n && typeof n == "object" || typeof n == "function") for (let e of c(n)) !p.call(r, e) && e !== i && o(r, e, {
    get: () => n[e],
    enumerable: !(s = u(n, e)) || s.enumerable
  });
  return r;
};
var m = r => g(o({}, "__esModule", {
  value: !0
}), r);
var j = {};
f(j, {
  findPackage: () => d
});
module.exports = m(j);
var a = __serpack_require__("fs"), t = __serpack_require__("path");
function l(r) {
  if (!r || r.length === 0) return null;
  const n = (0, t.join)(...r);
  if ((0, a.existsSync)((0, t.join)(n, "package.json"))) return (0, t.join)(n, "package.json");
  const i = (0, t.parse)(n).dir;
  return n === i ? null : l(i.split(t.sep));
}
function d(r) {
  const i = (0, t.normalize)(r).split(t.sep);
  return l(i);
}
 }),
/* D:\serpack-js\packages\serpack\src\config.ts */ "4": (function(__serpack_require__,__non_serpack_require__,module,exports) { var j = Object.create;
var a = Object.defineProperty;
var O = Object.getOwnPropertyDescriptor;
var d = Object.getOwnPropertyNames;
var _ = Object.getPrototypeOf, v = Object.prototype.hasOwnProperty;
var w = (t, o) => {
  for (var r in o) a(t, r, {
    get: o[r],
    enumerable: !0
  });
}, u = (t, o, r, e) => {
  if (o && typeof o == "object" || typeof o == "function") for (let s of d(o)) !v.call(t, s) && s !== r && a(t, s, {
    get: () => o[s],
    enumerable: !(e = O(o, s)) || e.enumerable
  });
  return t;
};
var c = (t, o, r) => (r = t != null ? j(_(t)) : {}, u(o || !t || !t.__esModule ? a(r, "default", {
  value: t,
  enumerable: !0
}) : r, t)), S = t => u(a({}, "__esModule", {
  value: !0
}), t);
var x = {};
w(x, {
  defineConfig: () => h,
  loadConfig: () => C
});
module.exports = S(x);
var p = __serpack_require__("sp:8"), n = __serpack_require__("fs"), i = __serpack_require__("path"), l = __serpack_require__("sp:5"), y = __serpack_require__("sp:11");
function h(t) {
  return t;
}
async function k(t = process.cwd()) {
  const o = {
    json: [".serpackrc", ".serpackrc.json"],
    js: [".serpackrc.js"],
    ts: [".serpackrc.ts"]
  };
  (o.json = o.json.map(r => (0, i.join)(t, r)), o.js = o.js.map(r => (0, i.join)(t, r)), o.ts = o.ts.map(r => (0, i.join)(t, r)));
  for (const r of o.json) try {
    if ((0, n.existsSync)(r)) {
      const e = (0, n.readFileSync)(r, "utf-8");
      return JSON.parse(e);
    }
  } catch (e) {
    (0, p.error)(e);
  }
  for await (const r of o.js) {
    const e = `./${(0, i.relative)(__dirname, r).replace(/\\/g, "/")}`;
    if ((0, n.existsSync)(r)) try {
      return require(e);
    } catch {
      return await Promise.resolve().then(() => c(require(e)));
    }
  }
  for await (const r of o.ts) try {
    if ((0, n.existsSync)(r)) {
      const e = await (0, l.compile)(r, {
        globals: {
          vars: {
            __dirname: JSON.stringify((0, i.dirname)(r)),
            __filename: JSON.stringify(r)
          }
        }
      }), s = (0, i.join)(process.cwd(), "scfg.js");
      (0, n.writeFileSync)(s, e.code);
      const f = `./${(0, i.relative)(__dirname, s).replace(/\\/g, "/")}`;
      try {
        const m = require(f);
        return ((0, n.rmSync)(s), m);
      } catch {
        const g = await Promise.resolve().then(() => c(require(f)));
        return ((0, n.rmSync)(s), g);
      }
    }
  } catch (e) {
    (0, p.error)(e);
  }
  return {};
}
async function C(t = process.cwd()) {
  (0, i.isAbsolute)(t) || (t = (0, i.join)(process.cwd(), t));
  const o = await k(t);
  return (0, y.__importDefault)(o);
}
 }),
/* D:\serpack-js\packages\serpack\src\compile.ts */ "5": (function(__serpack_require__,__non_serpack_require__,module,exports) { var m = Object.defineProperty;
var l = Object.getOwnPropertyDescriptor;
var s = Object.getOwnPropertyNames;
var a = Object.prototype.hasOwnProperty;
var u = (e, o) => {
  for (var n in o) m(e, n, {
    get: o[n],
    enumerable: !0
  });
}, d = (e, o, n, p) => {
  if (o && typeof o == "object" || typeof o == "function") for (let i of s(o)) !a.call(e, i) && i !== n && m(e, i, {
    get: () => o[i],
    enumerable: !(p = l(o, i)) || p.enumerable
  });
  return e;
};
var f = e => d(m({}, "__esModule", {
  value: !0
}), e);
var w = {};
u(w, {
  compile: () => c
});
module.exports = f(w);
var r = __serpack_require__("sp:8"), t = __serpack_require__("sp:1");
async function c(e, o) {
  const n = performance.now(), p = new t.Compiler(e, o);
  await p.compile(e);
  const i = await p.bundle();
  return ((0, r.debug)(`Compiled Successfully in ${(performance.now() - n).toFixed()}ms`), {
    code: i.code,
    map: i.map
  });
}
 }),
/* D:\serpack-js\packages\serpack\src\runtime\index.ts */ "11": (function(__serpack_require__,__non_serpack_require__,module,exports) { var a = Object.defineProperty;
var b = Object.getOwnPropertyDescriptor;
var c = Object.getOwnPropertyNames;
var d = Object.prototype.hasOwnProperty;
var t = (f, e, p, x) => {
  if (e && typeof e == "object" || typeof e == "function") for (let m of c(e)) !d.call(f, m) && m !== p && a(f, m, {
    get: () => e[m],
    enumerable: !(x = b(e, m)) || x.enumerable
  });
  return f;
}, r = (f, e, p) => (t(f, e, "default"), p && t(p, e, "default"));
var g = f => t(a({}, "__esModule", {
  value: !0
}), f);
var o = {};
module.exports = g(o);
r(o, __serpack_require__("sp:12"), module.exports);
r(o, __serpack_require__("sp:13"), module.exports);
r(o, __serpack_require__("sp:14"), module.exports);
r(o, __serpack_require__("sp:15"), module.exports);
 }),
/* D:\serpack-js\packages\serpack\src\runtime\require.ts */ "12": (function(__serpack_require__,__non_serpack_require__,module,exports) { var _ = Object.defineProperty;
var f = Object.getOwnPropertyDescriptor;
var i = Object.getOwnPropertyNames;
var l = Object.prototype.hasOwnProperty;
var m = (t, e) => {
  for (var n in e) _(t, n, {
    get: e[n],
    enumerable: !0
  });
}, x = (t, e, n, u) => {
  if (e && typeof e == "object" || typeof e == "function") for (let r of i(e)) !l.call(t, r) && r !== n && _(t, r, {
    get: () => e[r],
    enumerable: !(u = f(e, r)) || u.enumerable
  });
  return t;
};
var q = t => x(_({}, "__esModule", {
  value: !0
}), t);
var R = {};
m(R, {
  createBrowserRequire: () => p,
  createNodeRequire: () => a,
  createRequire: () => w
});
module.exports = q(R);
var c = __serpack_require__("sp:2"), s = __serpack_require__("sp:13");
function a(t) {
  const e = {};
  function n(r) {
    const o = {
      exports: {}
    };
    return (e[r] = c.__SERPACK_MODULE_PENDING__, t[r].call(o.exports, u, require, o, o.exports), e[r] = o.exports, o.exports);
  }
  function u(r) {
    return t[r] ? n(r) : r.startsWith("sp:") ? (r = r.slice(3), e[r] ? e[r] : n(r)) : require(r);
  }
  return u;
}
function p(t) {
  const e = {}, n = r => {
    throw new Error(`Cannot find module "${r}"`);
  };
  function u(r) {
    if (!r.startsWith("sp:")) throw new Error(`Cannot find module "${r}"`);
    if ((r = r.slice(3), e[r])) return e[r];
    const o = {
      exports: {}
    };
    return (e[r] = c.__SERPACK_MODULE_PENDING__, t[r].call(o.exports, u, n, o, o.exports), e[r] = o.exports, o.exports);
  }
  return u;
}
function w(t) {
  var n;
  return ((n = (0, s.env)()) == null ? void 0 : n.target) === "browser" ? p(t) : a(t);
}
 }),
/* D:\serpack-js\packages\serpack\src\runtime\env.ts */ "13": (function(__serpack_require__,__non_serpack_require__,module,exports) { var i = Object.defineProperty;
var o = Object.getOwnPropertyDescriptor;
var R = Object.getOwnPropertyNames;
var p = Object.prototype.hasOwnProperty;
var d = (e, n) => {
  for (var r in n) i(e, r, {
    get: n[r],
    enumerable: !0
  });
}, f = (e, n, r, u) => {
  if (n && typeof n == "object" || typeof n == "function") for (let t of R(n)) !p.call(e, t) && t !== r && i(e, t, {
    get: () => n[t],
    enumerable: !(u = o(n, t)) || u.enumerable
  });
  return e;
};
var s = e => f(i({}, "__esModule", {
  value: !0
}), e);
var E = {};
d(E, {
  env: () => y
});
module.exports = s(E);
function y(e) {
  var n;
  if (!e) {
    if (typeof process < "u" && ((n = process == null ? void 0 : process.env) != null && n.__RUNTIME__)) return JSON.parse(process.env.__RUNTIME__);
    if (typeof window < "u" && (window != null && window.__RUNTIME__)) return JSON.parse(window.__RUNTIME__);
  }
  return typeof e == "string" ? JSON.parse(e) : e;
}
 }),
/* D:\serpack-js\packages\serpack\src\runtime\runtime.ts */ "14": (function(__serpack_require__,__non_serpack_require__,module,exports) { var i = Object.defineProperty;
var l = Object.getOwnPropertyDescriptor;
var c = Object.getOwnPropertyNames;
var p = Object.prototype.hasOwnProperty;
var m = (r, e) => {
  for (var u in e) i(r, u, {
    get: e[u],
    enumerable: !0
  });
}, a = (r, e, u, t) => {
  if (e && typeof e == "object" || typeof e == "function") for (let o of c(e)) !p.call(r, o) && o !== u && i(r, o, {
    get: () => e[o],
    enumerable: !(t = l(e, o)) || t.enumerable
  });
  return r;
};
var M = r => a(i({}, "__esModule", {
  value: !0
}), r);
var q = {};
m(q, {
  Runtime: () => _,
  createRuntime: () => y
});
module.exports = M(q);
var s = __serpack_require__("path"), n = __serpack_require__("sp:12");
class _ {
  __modules__;
  require;
  constructor(e) {
    (this.__modules__ = e, this.require = (0, n.createNodeRequire)(e));
  }
  loadModule(e) {
    return this.require(e);
  }
}
function y(r) {
  const e = (0, s.isAbsolute)(r) ? r : (0, s.resolve)(r), u = require(e), t = new _(u);
  return {
    runtime: t,
    execute() {
      return t.loadModule("sp:0");
    },
    createExternalModule(o, d) {
      t.__modules__[o] = d;
    }
  };
}
 }),
/* D:\serpack-js\packages\serpack\src\runtime\resolve-esm.ts */ "15": (function(__serpack_require__,__non_serpack_require__,module,exports) { var n = Object.defineProperty;
var _ = Object.getOwnPropertyDescriptor;
var a = Object.getOwnPropertyNames;
var i = Object.prototype.hasOwnProperty;
var l = (e, t) => {
  for (var u in t) n(e, u, {
    get: t[u],
    enumerable: !0
  });
}, o = (e, t, u, f) => {
  if (t && typeof t == "object" || typeof t == "function") for (let r of a(t)) !i.call(e, r) && r !== u && n(e, r, {
    get: () => t[r],
    enumerable: !(f = _(t, r)) || f.enumerable
  });
  return e;
};
var p = e => o(n({}, "__esModule", {
  value: !0
}), e);
var s = {};
l(s, {
  __importDefault: () => c
});
module.exports = p(s);
function c(e) {
  return e.__esModule ? e.default : e;
}
 }),
/* D:\serpack-js\packages\serpack\src\plugin.ts */ "6": (function(__serpack_require__,__non_serpack_require__,module,exports) { var e = Object.defineProperty;
var r = Object.getOwnPropertyDescriptor;
var l = Object.getOwnPropertyNames;
var m = Object.prototype.hasOwnProperty;
var u = (t, o, p, n) => {
  if (o && typeof o == "object" || typeof o == "function") for (let i of l(o)) !m.call(t, i) && i !== p && e(t, i, {
    get: () => o[i],
    enumerable: !(n = r(o, i)) || n.enumerable
  });
  return t;
};
var C = t => u(e({}, "__esModule", {
  value: !0
}), t);
var g = {};
module.exports = C(g);
 }),
/* D:\serpack-js\packages\serpack\src\dependencies.ts */ "7": (function(__serpack_require__,__non_serpack_require__,module,exports) { var i = Object.defineProperty;
var s = Object.getOwnPropertyDescriptor;
var c = Object.getOwnPropertyNames;
var m = Object.prototype.hasOwnProperty;
var l = (o, e) => {
  for (var r in e) i(o, r, {
    get: e[r],
    enumerable: !0
  });
}, u = (o, e, r, n) => {
  if (e && typeof e == "object" || typeof e == "function") for (let t of c(e)) !m.call(o, t) && t !== r && i(o, t, {
    get: () => e[t],
    enumerable: !(n = s(e, t)) || n.enumerable
  });
  return o;
};
var a = o => u(i({}, "__esModule", {
  value: !0
}), o);
var C = {};
l(C, {
  getDependencies: () => d
});
module.exports = a(C);
var p = __serpack_require__("sp:1");
async function d(o, e) {
  const r = new p.Compiler(o, e || ({}));
  return (await r.parseModule(o), Object.keys(r.modules));
}
 }),
});