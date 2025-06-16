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
/* D:\serpack-js\packages\serpack\src\index.ts */ "0": (function(__serpack_require__,__non_serpack_require__,module,exports) { Object.defineProperty(exports, "__esModule", {
  value: !0
});
var e = exports, r = {
  Compiler: function () {
    return t.Compiler;
  },
  CompilerOptions: function () {
    return t.CompilerOptions;
  }
};
for (var o in r) Object.defineProperty(e, o, {
  enumerable: !0,
  get: r[o]
});
const t = __serpack_require__("./core");
function n(e, r) {
  return (Object.keys(e).forEach(function (o) {
    "default" === o || Object.prototype.hasOwnProperty.call(r, o) || Object.defineProperty(r, o, {
      enumerable: !0,
      get: function () {
        return e[o];
      }
    });
  }), e);
}
(n(__serpack_require__("./core/functions"), exports), n(__serpack_require__("./core/parse"), exports), n(__serpack_require__("./config"), exports), n(__serpack_require__("./compile"), exports), n(__serpack_require__("./plugin"), exports), n(__serpack_require__("./dependencies"), exports));
 }),
/* D:\serpack-js\packages\serpack\src\core\index.ts */ "1": (function(__serpack_require__,__non_serpack_require__,module,exports) { (Object.defineProperty(exports, "__esModule", {
  value: !0
}), Object.defineProperty(exports, "Compiler", {
  enumerable: !0,
  get: function () {
    return j;
  }
}));
const e = __serpack_require__("path"), r = __serpack_require__("fs"), t = __serpack_require__("@swc/core"), i = __serpack_require__("@serpack/logger"), n = __serpack_require__("oxc-parser"), o = __serpack_require__("oxc-resolver"), s = __serpack_require__("estree-walker"), l = __serpack_require__("astring"), a = __serpack_require__("source-map"), u = __serpack_require__("deepmerge-ts"), p = __serpack_require__("module"), d = __serpack_require__("./parse"), c = __serpack_require__("./functions"), m = __serpack_require__("./loader"), v = __serpack_require__("../lib/root");
function _(e) {
  var r, t, i, n = 2;
  for ("undefined" != typeof Symbol && ((t = Symbol.asyncIterator, i = Symbol.iterator)); n--; ) {
    if (t && null != (r = e[t])) return r.call(e);
    if (i && null != (r = e[i])) return new f(r.call(e));
    (t = "@@asyncIterator", i = "@@iterator");
  }
  throw TypeError("Object is not async iterable");
}
function f(e) {
  function r(e) {
    if (Object(e) !== e) return Promise.reject(TypeError(e + " is not an object."));
    var r = e.done;
    return Promise.resolve(e.value).then(function (e) {
      return {
        value: e,
        done: r
      };
    });
  }
  return ((f = function (e) {
    (this.s = e, this.n = e.next);
  }).prototype = {
    s: null,
    n: null,
    next: function () {
      return r(this.n.apply(this.s, arguments));
    },
    return: function (e) {
      var t = this.s.return;
      return void 0 === t ? Promise.resolve({
        value: e,
        done: !0
      }) : r(t.apply(this.s, arguments));
    },
    throw: function (e) {
      var t = this.s.return;
      return void 0 === t ? Promise.reject(e) : r(t.apply(this.s, arguments));
    }
  }, new f(e));
}
function y(e, r, t, i, n, o, s) {
  try {
    var l = e[o](s), a = l.value;
  } catch (e) {
    t(e);
    return;
  }
  l.done ? r(a) : Promise.resolve(a).then(i, n);
}
function h(e) {
  return function () {
    var r = this, t = arguments;
    return new Promise(function (i, n) {
      var o = e.apply(r, t);
      function s(e) {
        y(o, i, n, s, l, "next", e);
      }
      function l(e) {
        y(o, i, n, s, l, "throw", e);
      }
      s(void 0);
    });
  };
}
function O(e, r, t) {
  return ((r in e) ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e);
}
function g(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {}, i = Object.keys(t);
    ("function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(t).filter(function (e) {
      return Object.getOwnPropertyDescriptor(t, e).enumerable;
    }))), i.forEach(function (r) {
      O(e, r, t[r]);
    }));
  }
  return e;
}
const E = ['cjs', 'mjs', 'js', 'cts', 'mts', 'ts', 'jsx', 'tsx'], b = [...E, 'json'], R = ['ts', 'cts', 'mts', 'tsx'];
class j {
  getTime() {
    let e = performance.now() - this._DEV.startTime;
    return (this._DEV.startTime = performance.now(), this._DEV.sum += e, e.toFixed(1));
  }
  pluginArray(e) {
    var r, t;
    return (null !== (t = null === (r = this.parserOptions.plugins) || void 0 === r ? void 0 : r.map(r => r[e])) && void 0 !== t ? t : []).filter(e => null != e);
  }
  transform(n = this.entry) {
    var o = this;
    return h(function* () {
      let s = ((0, r.readFileSync))(n, 'utf-8');
      if (!E.includes(((0, e.extname))(n).slice(1))) {
        let e = n.replace(/\\/g, '/');
        if ((null === (v = o.parserOptions) || void 0 === v ? void 0 : v.type) === "script") return {
          code: `module.exports=/*export*/${c.__NON_SERPACK_REQUIRE__}(\`./$\{${c.__SERPACK_REQUIRE__}("path").relative(__dirname, "${e}").replace(/\\\\/g, '/')}\`);`,
          map: {}
        };
        if (!(null === (f = o.parserOptions) || void 0 === f ? void 0 : f.type) || (null === (y = o.parserOptions) || void 0 === y ? void 0 : y.type) === 'module') {
          let r = ((0, m.load))(e, s);
          return {
            code: r.code,
            map: r.map
          };
        }
        ((0, i.error))(`unknown options.type: ${null === (h = o.parserOptions) || void 0 === h ? void 0 : h.type}`);
      }
      (null === (a = o.parserOptions) || void 0 === a ? void 0 : a.type) === "script" && ((o.parserOptions.globals || (o.parserOptions.globals = {}), o.parserOptions.globals.vars || (o.parserOptions.globals.vars = {}), o.parserOptions.globals.vars.__filename = JSON.stringify(n), o.parserOptions.globals.vars.__dirname = JSON.stringify(((0, e.dirname))(n))));
      let l = yield ((0, t.transform))(s, ((0, u.deepmerge))({
        filename: n,
        isModule: !0,
        sourceMaps: !0,
        module: {
          type: 'commonjs',
          strict: !1,
          strictMode: !1
        },
        jsc: {
          externalHelpers: !!o.parserOptions.runtime,
          target: 'es2015',
          parser: {
            syntax: "typescript" === o.sourceType ? "typescript" : "ecmascript"
          },
          minify: {
            compress: !0,
            mangle: !0
          },
          transform: {
            optimizer: {
              globals: {
                envs: (null === (p = o.parserOptions.globals) || void 0 === p ? void 0 : p.env) || ({}),
                vars: (null === (d = o.parserOptions.globals) || void 0 === d ? void 0 : d.vars) || ({})
              }
            }
          }
        }
      }, o.parserOptions.swcOptions));
      __DEV__ && ((0, i.dev))(`Module "${n}" compiled in ${o.getTime()}`);
      var a, p, d, v, f, y, h, O, g = !1, b = !1;
      try {
        for (var R, j = _(o.pluginArray('onCompile')); g = !(R = yield j.next()).done; g = !1) {
          let e = R.value, r = yield e({
            filename: {
              original: n,
              resolved: n
            },
            output: l,
            source: s
          });
          (r && r.code && (l.code = r.code), r && r.map && (l.code = r.map));
        }
      } catch (e) {
        (b = !0, O = e);
      } finally {
        try {
          g && null != j.return && (yield j.return());
        } finally {
          if (b) throw O;
        }
      }
      return {
        code: l.code,
        map: JSON.parse(l.map)
      };
    })();
  }
  resolve(t = process.cwd(), n) {
    var o, s, l, a, u;
    let d = this.resolver.sync(t, n), c = d.path;
    if (!c) return;
    for (let e of this.pluginArray('onLoad')) e({
      filename: {
        original: n,
        resolved: c
      }
    });
    let m = ((0, e.parse))(c).ext.slice(1);
    if (b.includes(m)) {
      if (null === (s = this.parserOptions) || void 0 === s || null === (o = s.forceExternal) || void 0 === o ? void 0 : o.includes(n)) {
        ((0, i.debug))(`Resolving module: ${c} [rejected - externals]`);
        return;
      }
      if (p.builtinModules.includes(c)) {
        ((0, i.debug))(`Resolving module: ${c} [rejected - builtin]`);
        return;
      }
      if (null == c ? void 0 : c.includes('node_modules')) {
        if (this.parserOptions.nodeExternal) {
          ((0, i.debug))(`Resolving module: ${c} [rejected - node_modules]`);
          return;
        }
        if ((null === (a = this.parserOptions.externals) || void 0 === a ? void 0 : a.length) === 0) return c;
        let e = ((0, v.findPackage))(c);
        if (!e) return c;
        let {name: t} = JSON.parse(((0, r.readFileSync))(e).toString());
        if (null === (u = this.parserOptions.externals) || void 0 === u ? void 0 : u.includes(t)) return;
        return c;
      }
      return ((null === (l = d.error) || void 0 === l ? void 0 : l.length) > 0 && console.error(d.error), c);
    }
  }
  compile(r = this.entry, t = ((0, e.join))(process.cwd(), 'path')) {
    var n = this;
    return h(function* () {
      let o = n.resolve(((0, e.dirname))(t), r);
      if (!o) {
        ((0, i.warn))(`Cannot resolve module: ${r}`);
        return;
      }
      (((r = o) in n.id) || (n.id[r] = Object.keys(n.id).length), ((0, i.debug))(`Resolving module: ${r}`));
      let s = yield n.transform(r), a = n.parseModule(r, s.code, n.parserOptions);
      n.modules[r] = {
        code: ((0, l.generate))(a.ast, {
          generator: ((u = g({}, l.GENERATOR), d = d = {
            ParenthesizedExpression(e, r) {
              (r.write('('), this[e.expression.type](e.expression, r), r.write(')'));
            }
          }, Object.getOwnPropertyDescriptors ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(d)) : (function (e, r) {
            var t = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var i = Object.getOwnPropertySymbols(e);
              t.push.apply(t, i);
            }
            return t;
          })(Object(d)).forEach(function (e) {
            Object.defineProperty(u, e, Object.getOwnPropertyDescriptor(d, e));
          }), u))
        }),
        map: s.map
      };
      var u, d, c, m = !1, v = !1;
      try {
        for (var f, y = _(a.modules); m = !(f = yield y.next()).done; m = !1) {
          let t = f.value;
          if (p.builtinModules.includes(t)) continue;
          let i = n.resolve(((0, e.dirname))(r), t);
          n.modules[i] || (yield n.compile(t, r));
        }
      } catch (e) {
        (v = !0, c = e);
      } finally {
        try {
          m && null != y.return && (yield y.return());
        } finally {
          if (v) throw c;
        }
      }
    })();
  }
  parseModule(t, o, l) {
    let a = null != o ? o : ((0, r.readFileSync))(t, 'utf-8'), {program: u} = ((0, n.parseSync))(t, a, {
      sourceType: 'module'
    }), p = {
      modules: [],
      id: this.id
    }, m = this.resolve.bind(this), v = ((0, s.walk))(u, {
      enter(r) {
        if ('CallExpression' === r.type && 'Identifier' === r.callee.type && 'require' === r.callee.name && 'Literal' === r.arguments[0].type) {
          let i = r.arguments[0].value, n = m(((0, e.dirname))(t), i);
          if (!n) return (r.callee.name = c.__SERPACK_REQUIRE__, r);
          (n in p.id) || (p.id[n] = Object.keys(p.id).length);
          let o = p.id[n];
          (p.modules.push(i), r.callee.name = c.__SERPACK_REQUIRE__, r.arguments[0].value = `sp:${o}`);
        }
        if ('ImportDeclaration' === r.type && 'Literal' === r.source.type) {
          let i = r.source.value, n = m(((0, e.dirname))(t), i);
          if (!n) return;
          (n in p.id) || (p.id[n] = Object.keys(p.id).length);
          let o = p.id[n];
          (p.modules.push(i), r.source.value = `sp:${o}`, this.replace(((0, d.importToRequire))(r)));
        }
      },
      leave(e, r) {
        var i, n;
        'CallExpression' === e.type && (null === (i = l.modifier) || void 0 === i ? void 0 : i.caller) && ((e = (null === (n = l.modifier) || void 0 === n ? void 0 : n.caller(e, r, {
          filename: t
        })) || e, this.replace(e)));
      }
    });
    return (this.id = p.id, __DEV__ && ((0, i.dev))(`Module "${t}" parsed in ${this.getTime()}`), {
      ast: v,
      modules: p.modules
    });
  }
  bundle() {
    var r = this;
    return h(function* () {
      let t, {modules: n, target: o} = r, s = [], l = new Set(), u = r.parserOptions.sourcemap, p = 1;
      var d, m, v, f = !1, y = !1;
      try {
        for (var h, O = _(r.pluginArray('onBundle')); f = !(h = yield O.next()).done; f = !1) {
          let e = h.value;
          yield e();
        }
      } catch (e) {
        (y = !0, v = e);
      } finally {
        try {
          f && null != O.return && (yield O.return());
        } finally {
          if (y) throw v;
        }
      }
      if (((null === (d = r.parserOptions) || void 0 === d ? void 0 : d.banner) && ((s.push(r.parserOptions.banner), p += r.parserOptions.banner.split('\n').length)), ((0, i.debug))(`modules: ${JSON.stringify(r.id)}`), u)) {
        let i = (null === (b = r.parserOptions) || void 0 === b || null === (E = b.sourcemapOptions) || void 0 === E ? void 0 : E.sourcemapRoot) || ((0, e.dirname))(r.entry);
        t = new a.SourceMapGenerator({
          file: 'bundle.js',
          sourceRoot: i
        });
      }
      let g = ['(function(modules) {', `  var ${c.__SERPACK_MODULE_CACHE__}={};`, `  function ${c.__SERPACK_REQUIRE__}(id){`, '    if (!id.startsWith("sp:")) return require(id);', `    if (${c.__SERPACK_MODULE_CACHE__}[id.slice(3)]) return ${c.__SERPACK_MODULE_CACHE__}[id.slice(3)];`, '    const module={exports:{}};', `    ${c.__SERPACK_MODULE_CACHE__}[id.slice(3)]="${c.__SERPACK_MODULE_PENDING__}";`, `    modules[id.slice(3)].call(module.exports, ${c.__SERPACK_REQUIRE__}, ${c.__NON_SERPACK_REQUIRE__}, module, module.exports);`, `    ${c.__SERPACK_MODULE_CACHE__}[id.slice(3)]=module.exports;`, '    return module.exports;', '  }', `  module.exports=${c.__SERPACK_REQUIRE__}("sp:0");`, '})({'];
      ('browser' === o && g.unshift('/*browser-support*/', 'var module={exports:{}};', 'function require(id){throw new Error(`Cannot find module "${id}"`);}'), r.parserOptions.runtime && (g = [`  var ${c.__SERPACK_ENV__}=${JSON.stringify({
        target: r.target
      })};`, `  ${'node' === r.target ? 'process.env' : 'window'}.__RUNTIME__=JSON.stringify(${c.__SERPACK_ENV__});`, 'module.exports=({']), s.push(...g), p += g.length);
      var E, b, R, j = !1, x = !1;
      try {
        for (var w, S, P, $ = _(Object.entries(n)); j = !(P = yield $.next()).done; j = !1) {
          let [i, n] = P.value, o = `/* ${i} */ "${r.id[i]}": (function(${c.__SERPACK_REQUIRE__},__non_serpack_require__,module,exports) { `, d = `${o}${n.code} }),`;
          if ((s.push(d), u && Object.keys(n.map).length > 0)) {
            let s = yield new a.SourceMapConsumer(n.map), u = (null === (S = r.parserOptions) || void 0 === S || null === (w = S.sourcemapOptions) || void 0 === w ? void 0 : w.sourcemapRoot) || ((0, e.dirname))(r.entry);
            (s.eachMapping(r => {
              if (r.source) {
                let n = r.source;
                if ((n = (n = ((0, e.isAbsolute))(n) ? ((0, e.relative))(u, n) : ((0, e.relative))(u, ((0, e.join))(((0, e.dirname))(i), n))).replace(/\\/g, '/'), t.addMapping({
                  source: n,
                  original: {
                    line: r.originalLine,
                    column: r.originalColumn
                  },
                  generated: {
                    line: p,
                    column: r.generatedColumn + o.length
                  },
                  name: r.name
                }), !l.has(n))) {
                  let e = s.sourceContentFor(r.source, !0);
                  e && ((t.setSourceContent(n, e), l.add(n)));
                }
              }
            }), s.destroy());
          }
          p += d.split('\n').length;
        }
      } catch (e) {
        (x = !0, R = e);
      } finally {
        try {
          j && null != $.return && (yield $.return());
        } finally {
          if (x) throw R;
        }
      }
      return (s.push('});'), p += 1, (null === (m = r.parserOptions) || void 0 === m ? void 0 : m.footer) && ((s.push(r.parserOptions.footer), p += r.parserOptions.footer.split('\n').length)), __DEV__ && ((0, i.dev))(`Module bundled in ${r.getTime()} (sum: ${r._DEV.sum.toFixed(2)})`), {
        code: s.join('\n'),
        map: u ? t.toString() : null
      });
    })();
  }
  constructor(t, i) {
    for (let n of ((O(this, "entry", void 0), O(this, "source", void 0), O(this, "modules", void 0), O(this, "parserOptions", void 0), O(this, "sourceType", void 0), O(this, "resolver", void 0), O(this, "resolverOptions", void 0), O(this, "id", void 0), O(this, "target", void 0), O(this, "_DEV", void 0), ((0, e.isAbsolute))(t) || (t = ((0, e.join))(process.cwd(), t)), this.entry = t, this.modules = {}, this.source = ((0, r.readFileSync))(t, 'utf-8'), this.parserOptions = i || ({}), this.sourceType = R.includes(((0, e.parse))(t).ext.slice(1)) ? "typescript" : "javascript", this.resolverOptions = this.parserOptions.resolverOptions || ({}), this.id = {}, this.target = this.parserOptions.target || 'node', this.resolver = new o.ResolverFactory(g({
      conditionNames: ['node', 'import'],
      mainFields: ['module', 'main'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.d.ts']
    }, this.resolverOptions)), this.pluginArray('onSetup')))) {
      let e = n(this.parserOptions);
      e && (this.parserOptions = g({}, this.parserOptions, e));
    }
    __DEV__ && (this._DEV = {
      startTime: performance.now(),
      sum: 0
    });
  }
}
 }),
/* D:\serpack-js\packages\serpack-logger\dist\index.mjs */ "8": (function(__serpack_require__,__non_serpack_require__,module,exports) { let e;
Object.defineProperty(exports, "__esModule", {
  value: !0
});
var r = exports, n = {
  COMPILER_LOG_LEVEL_TYPE: function () {
    return u;
  },
  debug: function () {
    return a;
  },
  dev: function () {
    return f;
  },
  error: function () {
    return c;
  },
  info: function () {
    return l;
  },
  warn: function () {
    return i;
  }
};
for (var o in n) Object.defineProperty(r, o, {
  enumerable: !0,
  get: n[o]
});
__serpack_require__("colors");
var u = (((e = u || ({}))[e.ERROR = 0] = "ERROR", e[e.WARN = 1] = "WARN", e[e.INFO = 2] = "INFO", e[e.DEBUG = 3] = "DEBUG", e));
process.argv.includes("--compiler-debug") && (global.COMPILER_LOG_LEVEL = "debug");
var t = (function (e) {
  if (!e) return 2;
  switch (e.toUpperCase()) {
    case "ERROR":
      return 0;
    case "WARN":
      return 1;
    case "INFO":
    default:
      return 2;
    case "DEBUG":
      return 3;
  }
})(global.COMPILER_LOG_LEVEL);
function c(e) {
  t >= 0 && console.error(`[ERROR]: ${e}`.red);
}
function i(e) {
  t >= 1 && console.warn(`[WARN]: ${e}`.yellow);
}
function l(e) {
  t >= 2 && console.info(`[INFO]: ${e}`.blue);
}
function a(e) {
  t >= 3 && console.debug(`[DEBUG]: ${e}`.cyan);
}
function f(e) {
  console.debug(`[DEV]: ${e}`.gray);
}
 }),
/* D:\serpack-js\packages\serpack\src\core\parse.ts */ "3": (function(__serpack_require__,__non_serpack_require__,module,exports) { function e(e) {
  if ('ImportDeclaration' === e.type) {
    let {specifiers: t, source: r} = e;
    if (0 === t.length) return {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        optional: !1,
        callee: {
          type: 'Identifier',
          name: 'require'
        },
        arguments: [r]
      }
    };
    if (1 === t.length) {
      let e = t[0], {name: i} = e.local;
      if ('ImportDefaultSpecifier' === e.type || 'ImportNamespaceSpecifier' === e.type) return {
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: [{
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: i
          },
          init: {
            type: 'CallExpression',
            optional: !1,
            callee: {
              type: 'Identifier',
              name: 'require'
            },
            arguments: [r]
          }
        }]
      };
    }
    if (t.length > 1) {
      let e = t.find(e => 'ImportDefaultSpecifier' === e.type), i = t.filter(e => 'ImportSpecifier' === e.type), p = [];
      if (e) {
        let {name: t} = e.local;
        p.push({
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: t
          },
          init: {
            type: 'CallExpression',
            optional: !1,
            callee: {
              type: 'Identifier',
              name: 'require'
            },
            arguments: [r]
          }
        });
      }
      for (let e of i) {
        let {name: t} = e.local, i = e.imported && 'Identifier' === e.imported.type ? e.imported.name : '';
        p.push({
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: t
          },
          init: {
            type: 'MemberExpression',
            object: {
              type: 'CallExpression',
              optional: !1,
              callee: {
                type: 'Identifier',
                name: 'require'
              },
              arguments: [r]
            },
            property: {
              type: 'Identifier',
              name: i
            },
            computed: !1
          }
        });
      }
      return {
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: p
      };
    }
  }
  return e;
}
(Object.defineProperty(exports, "__esModule", {
  value: !0
}), Object.defineProperty(exports, "importToRequire", {
  enumerable: !0,
  get: function () {
    return e;
  }
}));
 }),
/* D:\serpack-js\packages\serpack\src\core\functions.ts */ "2": (function(__serpack_require__,__non_serpack_require__,module,exports) { Object.defineProperty(exports, "__esModule", {
  value: !0
});
var _ = exports, e = {
  __ESM__: function () {
    return u;
  },
  __NON_SERPACK_REQUIRE__: function () {
    return t;
  },
  __SERPACK_ENV__: function () {
    return E;
  },
  __SERPACK_MODULE_CACHE__: function () {
    return c;
  },
  __SERPACK_MODULE_PENDING__: function () {
    return o;
  },
  __SERPACK_REQUIRE__: function () {
    return n;
  }
};
for (var r in e) Object.defineProperty(_, r, {
  enumerable: !0,
  get: e[r]
});
const n = '__serpack_require__', t = 'require', u = '__esm__', c = '__serpack_module_cache__', o = '__serpack_module_pending__', E = '__serpack_env__';
 }),
/* D:\serpack-js\packages\serpack\src\core\loader.ts */ "9": (function(__serpack_require__,__non_serpack_require__,module,exports) { (Object.defineProperty(exports, "__esModule", {
  value: !0
}), Object.defineProperty(exports, "load", {
  enumerable: !0,
  get: function () {
    return r;
  }
}));
const e = __serpack_require__("path"), n = __serpack_require__("@serpack/logger"), t = __serpack_require__("vlq");
function r(r, o) {
  let s = ((0, e.extname))(r).slice(1);
  return 'json' === s ? {
    code: `module.exports=${o};`,
    map: (function (e, n) {
      let r = JSON.parse(n);
      return {
        version: 3,
        file: e,
        sources: [e],
        names: [],
        sourcesContent: [n],
        mappings: (function (e) {
          let n = 0, r = '';
          (r += ((0, t.encode))([n, 0, 0, 0]), n += 15, r += `,${((0, t.encode))([0, 0, 0, 0])}`);
          let o = Object.entries(e);
          return (o.forEach(([e, s], c) => {
            (r += `,${((0, t.encode))([1, 0, 0, n])}`, n += e.length + 2, n += 2);
            let l = JSON.stringify(s);
            (r += `,${((0, t.encode))([1, 0, 0, n])}`, n += l.length, c < o.length - 1 && (n += 2));
          }), r);
        })(r),
        sourceRoot: ''
      };
    })(r, o)
  } : ((((0, n.warn))(`Unsupported extension: .${s} (file: ${r})`), {
    code: '',
    map: null
  }));
}
 }),
/* D:\serpack-js\packages\serpack\src\lib\root.ts */ "10": (function(__serpack_require__,__non_serpack_require__,module,exports) { (Object.defineProperty(exports, "__esModule", {
  value: !0
}), Object.defineProperty(exports, "findPackage", {
  enumerable: !0,
  get: function () {
    return r;
  }
}));
const e = __serpack_require__("fs"), n = __serpack_require__("path");
function r(r) {
  return (function r(t) {
    if (!t || 0 === t.length) return null;
    let i = ((0, n.join))(...t);
    if (((0, e.existsSync))(((0, n.join))(i, 'package.json'))) return ((0, n.join))(i, 'package.json');
    let o = ((0, n.parse))(i).dir;
    return i === o ? null : r(o.split(n.sep));
  })(((0, n.normalize))(r).split(n.sep));
}
 }),
/* D:\serpack-js\packages\serpack\src\config.ts */ "4": (function(__serpack_require__,__non_serpack_require__,module,exports) { Object.defineProperty(exports, "__esModule", {
  value: !0
});
var e = exports, r = {
  defineConfig: function () {
    return d;
  },
  loadConfig: function () {
    return h;
  }
};
for (var t in r) Object.defineProperty(e, t, {
  enumerable: !0,
  get: r[t]
});
const n = __serpack_require__("@serpack/logger"), i = __serpack_require__("fs"), o = __serpack_require__("path"), u = __serpack_require__("./compile"), l = __serpack_require__("./runtime");
function c(e) {
  var r, t, n, i = 2;
  for ("undefined" != typeof Symbol && ((t = Symbol.asyncIterator, n = Symbol.iterator)); i--; ) {
    if (t && null != (r = e[t])) return r.call(e);
    if (n && null != (r = e[n])) return new s(r.call(e));
    (t = "@@asyncIterator", n = "@@iterator");
  }
  throw TypeError("Object is not async iterable");
}
function s(e) {
  function r(e) {
    if (Object(e) !== e) return Promise.reject(TypeError(e + " is not an object."));
    var r = e.done;
    return Promise.resolve(e.value).then(function (e) {
      return {
        value: e,
        done: r
      };
    });
  }
  return ((s = function (e) {
    (this.s = e, this.n = e.next);
  }).prototype = {
    s: null,
    n: null,
    next: function () {
      return r(this.n.apply(this.s, arguments));
    },
    return: function (e) {
      var t = this.s.return;
      return void 0 === t ? Promise.resolve({
        value: e,
        done: !0
      }) : r(t.apply(this.s, arguments));
    },
    throw: function (e) {
      var t = this.s.return;
      return void 0 === t ? Promise.reject(e) : r(t.apply(this.s, arguments));
    }
  }, new s(e));
}
function a(e, r, t, n, i, o, u) {
  try {
    var l = e[o](u), c = l.value;
  } catch (e) {
    t(e);
    return;
  }
  l.done ? r(c) : Promise.resolve(c).then(n, i);
}
function f(e) {
  return function () {
    var r = this, t = arguments;
    return new Promise(function (n, i) {
      var o = e.apply(r, t);
      function u(e) {
        a(o, n, i, u, l, "next", e);
      }
      function l(e) {
        a(o, n, i, u, l, "throw", e);
      }
      u(void 0);
    });
  };
}
function p(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(), t = new WeakMap();
  return (p = function (e) {
    return e ? t : r;
  })(e);
}
function y(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != typeof e && "function" != typeof e) return {
    default: e
  };
  var t = p(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
    __proto__: null
  }, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var o in e) if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
    var u = i ? Object.getOwnPropertyDescriptor(e, o) : null;
    u && (u.get || u.set) ? Object.defineProperty(n, o, u) : n[o] = e[o];
  }
  return (n.default = e, t && t.set(e, n), n);
}
function d(e) {
  return e;
}
function v() {
  return (v = f(function* (e = process.cwd()) {
    let r = {
      json: ['.serpackrc', '.serpackrc.json'],
      js: ['.serpackrc.js'],
      ts: ['.serpackrc.ts']
    };
    for (let t of ((r.json = r.json.map(r => ((0, o.join))(e, r)), r.js = r.js.map(r => ((0, o.join))(e, r)), r.ts = r.ts.map(r => ((0, o.join))(e, r)), r.json))) try {
      if (((0, i.existsSync))(t)) {
        let e = ((0, i.readFileSync))(t, 'utf-8');
        return JSON.parse(e);
      }
    } catch (e) {
      ((0, n.error))(e);
    }
    var t, l = !1, s = !1;
    try {
      for (var a, f = c(r.js); l = !(a = yield f.next()).done; l = !1) {
        let e = a.value, r = `./${((0, o.relative))(__dirname, e).replace(/\\/g, '/')}`;
        if (((0, i.existsSync))(e)) try {
          return require(r);
        } catch (e) {
          return yield Promise.resolve(r).then(e => y(require(e)));
        }
      }
    } catch (e) {
      (s = !0, t = e);
    } finally {
      try {
        l && null != f.return && (yield f.return());
      } finally {
        if (s) throw t;
      }
    }
    var p, d = !1, v = !1;
    try {
      for (var h, j = c(r.ts); d = !(h = yield j.next()).done; d = !1) {
        let e = h.value;
        try {
          if (((0, i.existsSync))(e)) {
            let r = yield ((0, u.compile))(e, {
              globals: {
                vars: {
                  __dirname: JSON.stringify(((0, o.dirname))(e)),
                  __filename: JSON.stringify(e)
                }
              }
            }), t = ((0, o.join))(process.cwd(), 'scfg.js');
            ((0, i.writeFileSync))(t, r.code);
            let n = `./${((0, o.relative))(__dirname, t).replace(/\\/g, '/')}`;
            try {
              let e = require(n);
              return (((0, i.rmSync))(t), e);
            } catch (r) {
              let e = yield Promise.resolve(n).then(e => y(require(e)));
              return (((0, i.rmSync))(t), e);
            }
          }
        } catch (e) {
          ((0, n.error))(e);
        }
      }
    } catch (e) {
      (v = !0, p = e);
    } finally {
      try {
        d && null != j.return && (yield j.return());
      } finally {
        if (v) throw p;
      }
    }
    return {};
  })).apply(this, arguments);
}
function h() {
  return j.apply(this, arguments);
}
function j() {
  return (j = f(function* (e = process.cwd()) {
    ((0, o.isAbsolute))(e) || (e = ((0, o.join))(process.cwd(), e));
    let r = yield (function () {
      return v.apply(this, arguments);
    })(e);
    return ((0, l.__importDefault))(r);
  })).apply(this, arguments);
}
 }),
/* D:\serpack-js\packages\serpack\src\compile.ts */ "5": (function(__serpack_require__,__non_serpack_require__,module,exports) { (Object.defineProperty(exports, "__esModule", {
  value: !0
}), Object.defineProperty(exports, "compile", {
  enumerable: !0,
  get: function () {
    return o;
  }
}));
const e = __serpack_require__("@serpack/logger"), r = __serpack_require__("./core");
function n(e, r, n, o, t, i, u) {
  try {
    var c = e[i](u), l = c.value;
  } catch (e) {
    n(e);
    return;
  }
  c.done ? r(l) : Promise.resolve(l).then(o, t);
}
function o(e, r) {
  return t.apply(this, arguments);
}
function t() {
  var o;
  return (o = function* (n, o) {
    let t = performance.now(), i = new r.Compiler(n, o);
    yield i.compile(n);
    let u = yield i.bundle();
    return (((0, e.debug))(`Compiled Successfully in ${(performance.now() - t).toFixed()}ms`), {
      code: u.code,
      map: u.map
    });
  }, (t = function () {
    var e = this, r = arguments;
    return new Promise(function (t, i) {
      var u = o.apply(e, r);
      function c(e) {
        n(u, t, i, c, l, "next", e);
      }
      function l(e) {
        n(u, t, i, c, l, "throw", e);
      }
      c(void 0);
    });
  }).apply(this, arguments));
}
 }),
/* D:\serpack-js\packages\serpack\src\runtime\index.ts */ "11": (function(__serpack_require__,__non_serpack_require__,module,exports) { function e(e, r) {
  return (Object.keys(e).forEach(function (t) {
    "default" === t || Object.prototype.hasOwnProperty.call(r, t) || Object.defineProperty(r, t, {
      enumerable: !0,
      get: function () {
        return e[t];
      }
    });
  }), e);
}
(Object.defineProperty(exports, "__esModule", {
  value: !0
}), e(__serpack_require__("./require"), exports), e(__serpack_require__("./env"), exports), e(__serpack_require__("./runtime"), exports), e(__serpack_require__("./resolve-esm"), exports));
 }),
/* D:\serpack-js\packages\serpack\src\runtime\require.ts */ "12": (function(__serpack_require__,__non_serpack_require__,module,exports) { Object.defineProperty(exports, "__esModule", {
  value: !0
});
var e = exports, r = {
  createBrowserRequire: function () {
    return i;
  },
  createNodeRequire: function () {
    return u;
  },
  createRequire: function () {
    return s;
  }
};
for (var t in r) Object.defineProperty(e, t, {
  enumerable: !0,
  get: r[t]
});
const n = __serpack_require__("../core/functions"), o = __serpack_require__("./env");
function u(e) {
  let r = {};
  function t(t) {
    let u = {
      exports: {}
    };
    return (r[t] = n.__SERPACK_MODULE_PENDING__, e[t].call(u.exports, o, require, u, u.exports), r[t] = u.exports, u.exports);
  }
  function o(n) {
    return e[n] ? t(n) : n.startsWith('sp:') ? r[n = n.slice(3)] ? r[n] : t(n) : require(n);
  }
  return o;
}
function i(e) {
  let r = {}, t = e => {
    throw Error(`Cannot find module "${e}"`);
  };
  return function o(u) {
    if (!u.startsWith('sp:')) throw Error(`Cannot find module "${u}"`);
    if (r[u = u.slice(3)]) return r[u];
    let i = {
      exports: {}
    };
    return (r[u] = n.__SERPACK_MODULE_PENDING__, e[u].call(i.exports, o, t, i, i.exports), r[u] = i.exports, i.exports);
  };
}
function s(e) {
  var r;
  return 'browser' === (null === (r = ((0, o.env))()) || void 0 === r ? void 0 : r.target) ? i(e) : u(e);
}
 }),
/* D:\serpack-js\packages\serpack\src\runtime\env.ts */ "13": (function(__serpack_require__,__non_serpack_require__,module,exports) { function e(e) {
  if (!e) {
    var n, r, o;
    if ('undefined' != typeof process && (null === (r = process) || void 0 === r || null === (n = r.env) || void 0 === n ? void 0 : n.__RUNTIME__)) return JSON.parse(process.env.__RUNTIME__);
    if ('undefined' != typeof window && (null === (o = window) || void 0 === o ? void 0 : o.__RUNTIME__)) return JSON.parse(window.__RUNTIME__);
  }
  return 'string' == typeof e ? JSON.parse(e) : e;
}
(Object.defineProperty(exports, "__esModule", {
  value: !0
}), Object.defineProperty(exports, "env", {
  enumerable: !0,
  get: function () {
    return e;
  }
}));
 }),
/* D:\serpack-js\packages\serpack\src\runtime\runtime.ts */ "14": (function(__serpack_require__,__non_serpack_require__,module,exports) { Object.defineProperty(exports, "__esModule", {
  value: !0
});
var e = exports, r = {
  Runtime: function () {
    return n;
  },
  createRuntime: function () {
    return l;
  }
};
for (var t in r) Object.defineProperty(e, t, {
  enumerable: !0,
  get: r[t]
});
const u = __serpack_require__("path"), i = __serpack_require__("./require");
function o(e, r, t) {
  return ((r in e) ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e);
}
class n {
  loadModule(e) {
    return this.require(e);
  }
  constructor(e) {
    (o(this, "__modules__", void 0), o(this, "require", void 0), this.__modules__ = e, this.require = ((0, i.createNodeRequire))(e));
  }
}
function l(e) {
  let r = new n(require(((0, u.isAbsolute))(e) ? e : ((0, u.resolve))(e)));
  return {
    runtime: r,
    execute: () => r.loadModule('sp:0'),
    createExternalModule(e, t) {
      r.__modules__[e] = t;
    }
  };
}
 }),
/* D:\serpack-js\packages\serpack\src\runtime\resolve-esm.ts */ "15": (function(__serpack_require__,__non_serpack_require__,module,exports) { function e(e) {
  return e.__esModule ? e.default : e;
}
(Object.defineProperty(exports, "__esModule", {
  value: !0
}), Object.defineProperty(exports, "__importDefault", {
  enumerable: !0,
  get: function () {
    return e;
  }
}));
 }),
/* D:\serpack-js\packages\serpack\src\plugin.ts */ "6": (function(__serpack_require__,__non_serpack_require__,module,exports) { Object.defineProperty(exports, "__esModule", {
  value: !0
});
 }),
/* D:\serpack-js\packages\serpack\src\dependencies.ts */ "7": (function(__serpack_require__,__non_serpack_require__,module,exports) { (Object.defineProperty(exports, "__esModule", {
  value: !0
}), Object.defineProperty(exports, "getDependencies", {
  enumerable: !0,
  get: function () {
    return t;
  }
}));
const e = __serpack_require__("./core");
function n(e, n, t, r, o, u, i) {
  try {
    var c = e[u](i), s = c.value;
  } catch (e) {
    t(e);
    return;
  }
  c.done ? n(s) : Promise.resolve(s).then(r, o);
}
function t(e, n) {
  return r.apply(this, arguments);
}
function r() {
  var t;
  return (t = function* (n, t) {
    let r = new e.Compiler(n, t || ({}));
    return (yield r.parseModule(n), Object.keys(r.modules));
  }, (r = function () {
    var e = this, r = arguments;
    return new Promise(function (o, u) {
      var i = t.apply(e, r);
      function c(e) {
        n(i, o, u, c, s, "next", e);
      }
      function s(e) {
        n(i, o, u, c, s, "throw", e);
      }
      c(void 0);
    });
  }).apply(this, arguments));
}
 }),
});