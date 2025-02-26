/* ** This is core package compiled using serpack ** */

(function (modules) {
  var __serpack_module_cache__ = {};
  function __serpack_require__(id) {
    if (!id.startsWith('sp:')) return require(id);
    if (__serpack_module_cache__[id.slice(3)])
      return __serpack_module_cache__[id.slice(3)];
    const module = { exports: {} };
    __serpack_module_cache__[id.slice(3)] = '__serpack_module_pending__';
    modules[id.slice(3)].call(
      module.exports,
      __serpack_require__,
      require,
      module,
      module.exports
    );
    __serpack_module_cache__[id.slice(3)] = module.exports;
    return module.exports;
  }
  module.exports = __serpack_require__('sp:0');
})({
  /* D:\serpack\packages\serpack\src\index.ts */ 0: function (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: !0 }),
      (function (e, r) {
        for (var t in r) Object.defineProperty(e, t, { enumerable: !0, get: r[t] });
      })(exports, {
        Compiler: function () {
          return e.Compiler;
        },
        CompilerOptions: function () {
          return e.CompilerOptions;
        },
      });
    const e = __serpack_require__('sp:1');
    function r(e, r) {
      return (
        Object.keys(e).forEach(function (t) {
          'default' === t ||
            Object.prototype.hasOwnProperty.call(r, t) ||
            Object.defineProperty(r, t, {
              enumerable: !0,
              get: function () {
                return e[t];
              },
            });
        }),
        e
      );
    }
    r(__serpack_require__('sp:2'), exports),
      r(__serpack_require__('sp:3'), exports),
      r(__serpack_require__('sp:4'), exports),
      r(__serpack_require__('sp:5'), exports),
      r(__serpack_require__('sp:6'), exports);
  },
  /* D:\serpack\packages\serpack\src\core\index.ts */ 1: function (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: !0 }),
      Object.defineProperty(exports, 'Compiler', {
        enumerable: !0,
        get: function () {
          return R;
        },
      });
    const e = require('path'),
      r = require('fs'),
      t = require('@swc/core'),
      i = __serpack_require__('sp:7'),
      n = require('acorn'),
      o = require('oxc-resolver'),
      s = require('estree-walker'),
      l = require('escodegen'),
      u = require('source-map'),
      a = require('module'),
      p = __serpack_require__('sp:3'),
      d = __serpack_require__('sp:2'),
      c = __serpack_require__('sp:8'),
      v = __serpack_require__('sp:9');
    function m(e) {
      var r,
        t,
        i,
        n = 2;
      for (
        'undefined' != typeof Symbol &&
        ((t = Symbol.asyncIterator), (i = Symbol.iterator));
        n--;

      ) {
        if (t && null != (r = e[t])) return r.call(e);
        if (i && null != (r = e[i])) return new _(r.call(e));
        (t = '@@asyncIterator'), (i = '@@iterator');
      }
      throw TypeError('Object is not async iterable');
    }
    function _(e) {
      function r(e) {
        if (Object(e) !== e) return Promise.reject(TypeError(e + ' is not an object.'));
        var r = e.done;
        return Promise.resolve(e.value).then(function (e) {
          return { value: e, done: r };
        });
      }
      return (
        ((_ = function (e) {
          (this.s = e), (this.n = e.next);
        }).prototype = {
          s: null,
          n: null,
          next: function () {
            return r(this.n.apply(this.s, arguments));
          },
          return: function (e) {
            var t = this.s.return;
            return void 0 === t
              ? Promise.resolve({ value: e, done: !0 })
              : r(t.apply(this.s, arguments));
          },
          throw: function (e) {
            var t = this.s.return;
            return void 0 === t ? Promise.reject(e) : r(t.apply(this.s, arguments));
          },
        }),
        new _(e)
      );
    }
    function f(e, r, t, i, n, o, s) {
      try {
        var l = e[o](s),
          u = l.value;
      } catch (e) {
        t(e);
        return;
      }
      l.done ? r(u) : Promise.resolve(u).then(i, n);
    }
    function y(e) {
      return function () {
        var r = this,
          t = arguments;
        return new Promise(function (i, n) {
          var o = e.apply(r, t);
          function s(e) {
            f(o, i, n, s, l, 'next', e);
          }
          function l(e) {
            f(o, i, n, s, l, 'throw', e);
          }
          s(void 0);
        });
      };
    }
    function h(e, r, t) {
      return (
        r in e
          ? Object.defineProperty(e, r, {
              value: t,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[r] = t),
        e
      );
    }
    function g(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {},
          i = Object.keys(t);
        'function' == typeof Object.getOwnPropertySymbols &&
          (i = i.concat(
            Object.getOwnPropertySymbols(t).filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })
          )),
          i.forEach(function (r) {
            h(e, r, t[r]);
          });
      }
      return e;
    }
    const O = ['cjs', 'mjs', 'js', 'cts', 'mts', 'ts', 'jsx', 'tsx'],
      E = [...O, 'json'],
      b = ['ts', 'cts', 'mts', 'tsx'];
    class R {
      pluginArray(e) {
        var r, t;
        return (
          null !==
            (t =
              null === (r = this.parserOptions.plugins) || void 0 === r
                ? void 0
                : r.map((r) => r[e])) && void 0 !== t
            ? t
            : []
        ).filter((e) => null != e);
      }
      transform(n = this.entry) {
        var o = this;
        return y(function* () {
          let s = (0, r.readFileSync)(n, 'utf-8');
          if (!O.includes((0, e.extname)(n).slice(1))) {
            let e = n.replace(/\\/g, '/');
            if (
              (null === (v = o.parserOptions) || void 0 === v ? void 0 : v.type) ===
              'script'
            )
              return {
                code: `module.exports=/*export*/${d.__NON_SERPACK_REQUIRE__}(\`./$\{${d.__SERPACK_REQUIRE__}("path").relative(__dirname, "${e}").replace(/\\\\/g, '/')}\`);`,
                map: {},
              };
            if (
              !(null === (_ = o.parserOptions) || void 0 === _ ? void 0 : _.type) ||
              (null === (f = o.parserOptions) || void 0 === f ? void 0 : f.type) ===
                'module'
            )
              return { code: (0, c.load)(e, s), map: {} };
            (0, i.error)(
              `unknown options.type: ${
                null === (y = o.parserOptions) || void 0 === y ? void 0 : y.type
              }`
            );
          }
          (null === (u = o.parserOptions) || void 0 === u ? void 0 : u.type) ===
            'script' &&
            (o.parserOptions.globals || (o.parserOptions.globals = {}),
            o.parserOptions.globals.vars || (o.parserOptions.globals.vars = {}),
            (o.parserOptions.globals.vars.__filename = JSON.stringify(n)),
            (o.parserOptions.globals.vars.__dirname = JSON.stringify((0, e.dirname)(n))));
          let l = yield (0, t.transform)(s, {
            filename: n,
            isModule: !0,
            sourceMaps: !0,
            module: { type: 'commonjs', strict: !1 },
            jsc: {
              externalHelpers: !!o.parserOptions.runtime,
              target: 'es2015',
              parser: {
                syntax: 'typescript' === o.sourceType ? 'typescript' : 'ecmascript',
              },
              minify: { compress: !0, mangle: !0 },
              transform: {
                optimizer: {
                  globals: {
                    envs:
                      (null === (a = o.parserOptions.globals) || void 0 === a
                        ? void 0
                        : a.env) || {},
                    vars:
                      (null === (p = o.parserOptions.globals) || void 0 === p
                        ? void 0
                        : p.vars) || {},
                  },
                },
              },
            },
          });
          var u,
            a,
            p,
            v,
            _,
            f,
            y,
            h,
            g = !1,
            E = !1;
          try {
            for (
              var b, R = m(o.pluginArray('onCompile'));
              (g = !(b = yield R.next()).done);
              g = !1
            ) {
              let e = b.value,
                r = yield e({
                  filename: { original: n, resolved: n },
                  output: l,
                  source: s,
                });
              r && r.code && (l.code = r.code), r && r.map && (l.code = r.map);
            }
          } catch (e) {
            (E = !0), (h = e);
          } finally {
            try {
              g && null != R.return && (yield R.return());
            } finally {
              if (E) throw h;
            }
          }
          return { code: l.code, map: JSON.parse(l.map) };
        })();
      }
      resolve(t = process.cwd(), n) {
        var o, s, l, u, p;
        let d = this.resolver.sync(t, n),
          c = d.path;
        if (!c) return;
        for (let e of this.pluginArray('onLoad'))
          e({ filename: { original: n, resolved: c } });
        let m = (0, e.parse)(c).ext.slice(1);
        if (E.includes(m)) {
          if (
            null === (s = this.parserOptions) || void 0 === s
              ? void 0
              : null === (o = s.forceExternal) || void 0 === o
              ? void 0
              : o.includes(n)
          ) {
            (0, i.debug)(`Resolving module: ${c} [rejected - externals]`);
            return;
          }
          if (a.builtinModules.includes(c)) {
            (0, i.debug)(`Resolving module: ${c} [rejected - builtin]`);
            return;
          }
          if (null == c ? void 0 : c.includes('node_modules')) {
            if (this.parserOptions.nodeExternal) {
              (0, i.debug)(`Resolving module: ${c} [rejected - node_modules]`);
              return;
            }
            if (
              (null === (u = this.parserOptions.externals) || void 0 === u
                ? void 0
                : u.length) === 0
            )
              return c;
            let e = (0, v.findPackage)(c);
            if (!e) return c;
            let { name: t } = JSON.parse((0, r.readFileSync)(e).toString());
            if (
              null === (p = this.parserOptions.externals) || void 0 === p
                ? void 0
                : p.includes(t)
            )
              return;
            return c;
          }
          return (
            (null === (l = d.error) || void 0 === l ? void 0 : l.length) > 0 &&
              console.error(d.error),
            c
          );
        }
      }
      compile(r = this.entry, t = (0, e.join)(process.cwd(), 'path')) {
        var n = this;
        return y(function* () {
          let o = n.resolve((0, e.dirname)(t), r);
          if (!o) {
            (0, i.warn)(`Cannot resolve module: ${r}`);
            return;
          }
          (r = o) in n.id || (n.id[r] = Object.keys(n.id).length),
            (0, i.debug)(`Resolving module: ${r}`);
          let s = yield n.transform(r),
            u = n.parseModule(r, s.code, n.parserOptions);
          n.modules[r] = {
            code: (0, l.generate)(u.ast, { format: { compact: !0 }, comment: !0 }),
            map: s.map,
          };
          var p,
            d = !1,
            c = !1;
          try {
            for (var v, _ = m(u.modules); (d = !(v = yield _.next()).done); d = !1) {
              let t = v.value;
              if (a.builtinModules.includes(t)) continue;
              let i = n.resolve((0, e.dirname)(r), t);
              n.modules[i] || (yield n.compile(t, r));
            }
          } catch (e) {
            (c = !0), (p = e);
          } finally {
            try {
              d && null != _.return && (yield _.return());
            } finally {
              if (c) throw p;
            }
          }
        })();
      }
      parseModule(t, i, o) {
        let l = null != i ? i : (0, r.readFileSync)(t, 'utf-8'),
          u = (0, n.parse)(
            l,
            g(
              { sourceType: 'module', ecmaVersion: 'latest' },
              null == o ? void 0 : o.parserOptions
            )
          ),
          a = { modules: [], id: this.id },
          c = this.resolve.bind(this),
          v = (0, s.walk)(u, {
            enter(r) {
              if (
                'CallExpression' === r.type &&
                'Identifier' === r.callee.type &&
                'require' === r.callee.name &&
                'Literal' === r.arguments[0].type
              ) {
                let i = r.arguments[0].value,
                  n = c((0, e.dirname)(t), i);
                if (!n) return;
                n in a.id || (a.id[n] = Object.keys(a.id).length);
                let o = a.id[n];
                a.modules.push(i),
                  (r.callee.name = d.__SERPACK_REQUIRE__),
                  (r.arguments[0].value = `sp:${o}`);
              }
              if ('ImportDeclaration' === r.type && 'Literal' === r.source.type) {
                let i = r.source.value,
                  n = c((0, e.dirname)(t), i);
                if (!n) return;
                n in a.id || (a.id[n] = Object.keys(a.id).length);
                let o = a.id[n];
                a.modules.push(i),
                  (r.source.value = `sp:${o}`),
                  this.replace((0, p.importToRequire)(r));
              }
            },
          });
        return (this.id = a.id), { ast: v, modules: a.modules };
      }
      bundle() {
        var r = this;
        return y(function* () {
          let t;
          let { modules: n } = r,
            o = [],
            s = new Set(),
            l = r.parserOptions.sourcemap,
            a = 1;
          var p,
            c,
            v,
            _ = !1,
            f = !1;
          try {
            for (
              var y, h = m(r.pluginArray('onBundle'));
              (_ = !(y = yield h.next()).done);
              _ = !1
            ) {
              let e = y.value;
              yield e();
            }
          } catch (e) {
            (f = !0), (v = e);
          } finally {
            try {
              _ && null != h.return && (yield h.return());
            } finally {
              if (f) throw v;
            }
          }
          (null === (p = r.parserOptions) || void 0 === p ? void 0 : p.banner) &&
            (o.push(r.parserOptions.banner),
            (a += r.parserOptions.banner.split('\n').length)),
            (0, i.debug)(`modules: ${JSON.stringify(r.id)}`),
            l && (t = new u.SourceMapGenerator({ file: 'bundle.js' }));
          let g = [
            '(function(modules) {',
            `  var ${d.__SERPACK_MODULE_CACHE__}={};`,
            `  function ${d.__SERPACK_REQUIRE__}(id){`,
            '    if (!id.startsWith("sp:")) return require(id);',
            `    if (${d.__SERPACK_MODULE_CACHE__}[id.slice(3)]) return ${d.__SERPACK_MODULE_CACHE__}[id.slice(3)];`,
            '    const module={exports:{}};',
            `    ${d.__SERPACK_MODULE_CACHE__}[id.slice(3)]="${d.__SERPACK_MODULE_PENDING__}";`,
            `    modules[id.slice(3)].call(module.exports, ${d.__SERPACK_REQUIRE__}, ${d.__NON_SERPACK_REQUIRE__}, module, module.exports);`,
            `    ${d.__SERPACK_MODULE_CACHE__}[id.slice(3)]=module.exports;`,
            '    return module.exports;',
            '  }',
            `  module.exports=${d.__SERPACK_REQUIRE__}("sp:0");`,
            '})({',
          ];
          r.parserOptions.runtime &&
            (g = [
              '(function(modules) {',
              `  var ${d.__SERPACK_ENV__}=${JSON.stringify({ target: r.target })};`,
              `  ${
                'node' === r.target ? 'process.env' : 'window'
              }.__RUNTIME__=JSON.stringify(${d.__SERPACK_ENV__});`,
              `const ${d.__SERPACK_REQUIRE__}=require("serpack/runtime").createRequire(modules);`,
              `module.exports=${d.__SERPACK_REQUIRE__}("sp:0")`,
              '})({',
            ]),
            o.push(...g),
            (a += g.length);
          var O,
            E = !1,
            b = !1;
          try {
            for (
              var R, S = m(Object.entries(n));
              (E = !(R = yield S.next()).done);
              E = !1
            ) {
              let [i, n] = R.value,
                p = `/* ${i} */ "${r.id[i]}": (function(${d.__SERPACK_REQUIRE__},__non_serpack_require__,module,exports) { `,
                c = `${p}${n.code} }),`;
              if ((o.push(c), l)) {
                let i = yield new u.SourceMapConsumer(n.map);
                i.eachMapping((n) => {
                  var o, l;
                  t.addMapping({
                    source: (0, e.relative)(
                      (null === (l = r.parserOptions) || void 0 === l
                        ? void 0
                        : null === (o = l.sourcemapOptions) || void 0 === o
                        ? void 0
                        : o.sourcemapRoot) || (0, e.dirname)(r.entry),
                      n.source
                    ),
                    original: { line: n.originalLine, column: n.originalColumn },
                    generated: { line: a, column: n.generatedColumn + p.length },
                    name: n.name,
                  }),
                    n.source &&
                      !s.has(n.source) &&
                      (s.add(n.source),
                      t.setSourceContent(n.source, i.sourceContentFor(n.source, !0)));
                });
              }
              a += c.split('\n').length;
            }
          } catch (e) {
            (b = !0), (O = e);
          } finally {
            try {
              E && null != S.return && (yield S.return());
            } finally {
              if (b) throw O;
            }
          }
          return (
            o.push('});'),
            (a += 1),
            (null === (c = r.parserOptions) || void 0 === c ? void 0 : c.footer) &&
              (o.push(r.parserOptions.footer),
              (a += r.parserOptions.footer.split('\n').length)),
            { code: o.join('\n'), map: l ? t.toString() : null }
          );
        })();
      }
      constructor(t, i) {
        for (let n of (h(this, 'entry', void 0),
        h(this, 'source', void 0),
        h(this, 'modules', void 0),
        h(this, 'parserOptions', void 0),
        h(this, 'sourceType', void 0),
        h(this, 'resolver', void 0),
        h(this, 'resolverOptions', void 0),
        h(this, 'id', void 0),
        h(this, 'target', void 0),
        (0, e.isAbsolute)(t) || (t = (0, e.join)(process.cwd(), t)),
        (this.entry = t),
        (this.modules = {}),
        (this.source = (0, r.readFileSync)(t, 'utf-8')),
        (this.parserOptions = i || {}),
        (this.sourceType = b.includes((0, e.parse)(t).ext.slice(1))
          ? 'typescript'
          : 'javascript'),
        (this.resolverOptions = this.parserOptions.resolverOptions || {}),
        (this.id = {}),
        (this.target = this.parserOptions.target || 'node'),
        (this.resolver = new o.ResolverFactory(
          g(
            {
              conditionNames: ['node', 'import'],
              mainFields: ['module', 'main'],
              extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.d.ts'],
            },
            this.resolverOptions
          )
        )),
        this.pluginArray('onSetup'))) {
          let e = n(this.parserOptions);
          e && (this.parserOptions = g({}, this.parserOptions, e));
        }
      }
    }
  },
  /* D:\serpack\packages\serpack-logger\dist\index.mjs */ 7: function (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) {
    'use strict';
    let e;
    Object.defineProperty(exports, '__esModule', { value: !0 }),
      (function (e, r) {
        for (var n in r) Object.defineProperty(e, n, { enumerable: !0, get: r[n] });
      })(exports, {
        COMPILER_LOG_LEVEL_TYPE: function () {
          return r;
        },
        debug: function () {
          return c;
        },
        error: function () {
          return o;
        },
        info: function () {
          return u;
        },
        warn: function () {
          return t;
        },
      }),
      require('colors');
    var r =
      (((e = r || {})[(e.ERROR = 0)] = 'ERROR'),
      (e[(e.WARN = 1)] = 'WARN'),
      (e[(e.INFO = 2)] = 'INFO'),
      (e[(e.DEBUG = 3)] = 'DEBUG'),
      e);
    process.argv.includes('--compiler-debug') && (global.COMPILER_LOG_LEVEL = 'debug');
    var n = (function (e) {
      if (!e) return 2;
      switch (e.toUpperCase()) {
        case 'ERROR':
          return 0;
        case 'WARN':
          return 1;
        case 'INFO':
        default:
          return 2;
        case 'DEBUG':
          return 3;
      }
    })(global.COMPILER_LOG_LEVEL);
    function o(e) {
      n >= 0 && console.error(`[ERROR]: ${e}`.red);
    }
    function t(e) {
      n >= 1 && console.warn(`[WARN]: ${e}`.yellow);
    }
    function u(e) {
      n >= 2 && console.info(`[INFO]: ${e}`.blue);
    }
    function c(e) {
      n >= 3 && console.debug(`[DEBUG]: ${e}`.cyan);
    }
  },
  /* D:\serpack\packages\serpack\src\core\parse.ts */ 3: function (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) {
    'use strict';
    function e(e) {
      if ('ImportDeclaration' === e.type) {
        let { specifiers: t, source: r } = e;
        if (0 === t.length)
          return {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: !1,
              callee: { type: 'Identifier', name: 'require' },
              arguments: [r],
            },
          };
        if (1 === t.length) {
          let e = t[0],
            { name: i } = e.local;
          if (
            'ImportDefaultSpecifier' === e.type ||
            'ImportNamespaceSpecifier' === e.type
          )
            return {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name: i },
                  init: {
                    type: 'CallExpression',
                    optional: !1,
                    callee: { type: 'Identifier', name: 'require' },
                    arguments: [r],
                  },
                },
              ],
            };
        }
        if (t.length > 1) {
          let e = t.find((e) => 'ImportDefaultSpecifier' === e.type),
            i = t.filter((e) => 'ImportSpecifier' === e.type),
            p = [];
          if (e) {
            let { name: t } = e.local;
            p.push({
              type: 'VariableDeclarator',
              id: { type: 'Identifier', name: t },
              init: {
                type: 'CallExpression',
                optional: !1,
                callee: { type: 'Identifier', name: 'require' },
                arguments: [r],
              },
            });
          }
          for (let e of i) {
            let { name: t } = e.local,
              i = e.imported && 'Identifier' === e.imported.type ? e.imported.name : '';
            p.push({
              type: 'VariableDeclarator',
              id: { type: 'Identifier', name: t },
              init: {
                type: 'MemberExpression',
                object: {
                  type: 'CallExpression',
                  optional: !1,
                  callee: { type: 'Identifier', name: 'require' },
                  arguments: [r],
                },
                property: { type: 'Identifier', name: i },
                computed: !1,
              },
            });
          }
          return { type: 'VariableDeclaration', kind: 'const', declarations: p };
        }
      }
      return e;
    }
    Object.defineProperty(exports, '__esModule', { value: !0 }),
      Object.defineProperty(exports, 'importToRequire', {
        enumerable: !0,
        get: function () {
          return e;
        },
      });
  },
  /* D:\serpack\packages\serpack\src\core\functions.ts */ 2: function (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: !0 }),
      (function (_, e) {
        for (var r in e) Object.defineProperty(_, r, { enumerable: !0, get: e[r] });
      })(exports, {
        __ESM__: function () {
          return r;
        },
        __NON_SERPACK_REQUIRE__: function () {
          return e;
        },
        __SERPACK_ENV__: function () {
          return u;
        },
        __SERPACK_MODULE_CACHE__: function () {
          return n;
        },
        __SERPACK_MODULE_PENDING__: function () {
          return t;
        },
        __SERPACK_REQUIRE__: function () {
          return _;
        },
      });
    const _ = '__serpack_require__',
      e = 'require',
      r = '__esm__',
      n = '__serpack_module_cache__',
      t = '__serpack_module_pending__',
      u = '__serpack_env__';
  },
  /* D:\serpack\packages\serpack\src\core\loader.ts */ 8: function (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: !0 }),
      Object.defineProperty(exports, 'load', {
        enumerable: !0,
        get: function () {
          return t;
        },
      });
    const e = require('path'),
      r = __serpack_require__('sp:7');
    function t(t, n) {
      let o = (0, e.extname)(t).slice(1);
      if ('json' === o) return `module.exports=${n};`;
      (0, r.warn)(`Unsupported extension: .${o} (file: ${t})`);
    }
  },
  /* D:\serpack\packages\serpack\src\lib\root.ts */ 9: function (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: !0 }),
      Object.defineProperty(exports, 'findPackage', {
        enumerable: !0,
        get: function () {
          return r;
        },
      });
    const e = require('fs'),
      n = require('path');
    function r(r) {
      return (function r(t) {
        if (!t || 0 === t.length) return null;
        let i = (0, n.join)(...t);
        if ((0, e.existsSync)((0, n.join)(i, 'package.json')))
          return (0, n.join)(i, 'package.json');
        let s = (0, n.parse)(i).dir;
        return i === s ? null : r(s.split(n.sep));
      })((0, n.normalize)(r).split(n.sep));
    }
  },
  /* D:\serpack\packages\serpack\src\config.ts */ 4: function (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: !0 }),
      (function (e, r) {
        for (var t in r) Object.defineProperty(e, t, { enumerable: !0, get: r[t] });
      })(exports, {
        defineConfig: function () {
          return a;
        },
        loadConfig: function () {
          return p;
        },
      });
    const e = __serpack_require__('sp:7'),
      r = require('fs'),
      t = require('path'),
      n = __serpack_require__('sp:5');
    function i(e) {
      var r,
        t,
        n,
        i = 2;
      for (
        'undefined' != typeof Symbol &&
        ((t = Symbol.asyncIterator), (n = Symbol.iterator));
        i--;

      ) {
        if (t && null != (r = e[t])) return r.call(e);
        if (n && null != (r = e[n])) return new o(r.call(e));
        (t = '@@asyncIterator'), (n = '@@iterator');
      }
      throw TypeError('Object is not async iterable');
    }
    function o(e) {
      function r(e) {
        if (Object(e) !== e) return Promise.reject(TypeError(e + ' is not an object.'));
        var r = e.done;
        return Promise.resolve(e.value).then(function (e) {
          return { value: e, done: r };
        });
      }
      return (
        ((o = function (e) {
          (this.s = e), (this.n = e.next);
        }).prototype = {
          s: null,
          n: null,
          next: function () {
            return r(this.n.apply(this.s, arguments));
          },
          return: function (e) {
            var t = this.s.return;
            return void 0 === t
              ? Promise.resolve({ value: e, done: !0 })
              : r(t.apply(this.s, arguments));
          },
          throw: function (e) {
            var t = this.s.return;
            return void 0 === t ? Promise.reject(e) : r(t.apply(this.s, arguments));
          },
        }),
        new o(e)
      );
    }
    function u(e, r, t, n, i, o, u) {
      try {
        var l = e[o](u),
          c = l.value;
      } catch (e) {
        t(e);
        return;
      }
      l.done ? r(c) : Promise.resolve(c).then(n, i);
    }
    function l(e) {
      return function () {
        var r = this,
          t = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(r, t);
          function l(e) {
            u(o, n, i, l, c, 'next', e);
          }
          function c(e) {
            u(o, n, i, l, c, 'throw', e);
          }
          l(void 0);
        });
      };
    }
    function c(e) {
      if ('function' != typeof WeakMap) return null;
      var r = new WeakMap(),
        t = new WeakMap();
      return (c = function (e) {
        return e ? t : r;
      })(e);
    }
    function s(e, r) {
      if (!r && e && e.__esModule) return e;
      if (null === e || ('object' != typeof e && 'function' != typeof e))
        return { default: e };
      var t = c(r);
      if (t && t.has(e)) return t.get(e);
      var n = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if ('default' !== o && Object.prototype.hasOwnProperty.call(e, o)) {
          var u = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          u && (u.get || u.set) ? Object.defineProperty(n, o, u) : (n[o] = e[o]);
        }
      return (n.default = e), t && t.set(e, n), n;
    }
    function a(e) {
      return e;
    }
    function f() {
      return (f = l(function* (o = process.cwd()) {
        let u = {
          json: ['.serpackrc', '.serpackrc.json'],
          js: ['.serpackrc.js'],
          ts: ['.serpackrc.ts'],
        };
        for (let n of ((u.json = u.json.map((e) => (0, t.join)(o, e))),
        (u.js = u.js.map((e) => (0, t.join)(o, e))),
        (u.ts = u.ts.map((e) => (0, t.join)(o, e))),
        u.json))
          try {
            if ((0, r.existsSync)(n)) {
              let e = (0, r.readFileSync)(n, 'utf-8');
              return JSON.parse(e);
            }
          } catch (r) {
            (0, e.error)(r);
          }
        var l,
          c = !1,
          a = !1;
        try {
          for (var f, p = i(u.js); (c = !(f = yield p.next()).done); c = !1) {
            let e = f.value,
              n = `./${(0, t.relative)(__dirname, e).replace(/\\/g, '/')}`;
            if ((0, r.existsSync)(e))
              try {
                return require(n);
              } catch (e) {
                return yield Promise.resolve(n).then((e) => s(require(e)));
              }
          }
        } catch (e) {
          (a = !0), (l = e);
        } finally {
          try {
            c && null != p.return && (yield p.return());
          } finally {
            if (a) throw l;
          }
        }
        var y,
          d = !1,
          v = !1;
        try {
          for (var h, j = i(u.ts); (d = !(h = yield j.next()).done); d = !1) {
            let i = h.value;
            try {
              if ((0, r.existsSync)(i)) {
                let e = yield (0, n.compile)(i, {
                    globals: {
                      vars: {
                        __dirname: JSON.stringify((0, t.dirname)(i)),
                        __filename: JSON.stringify(i),
                      },
                    },
                  }),
                  o = (0, t.join)(process.cwd(), 'scfg.js');
                (0, r.writeFileSync)(o, e.code);
                let u = `./${(0, t.relative)(__dirname, o).replace(/\\/g, '/')}`;
                try {
                  let e = require(u);
                  return (0, r.rmSync)(o), e;
                } catch (t) {
                  let e = yield Promise.resolve(u).then((e) => s(require(e)));
                  return (0, r.rmSync)(o), e;
                }
              }
            } catch (r) {
              (0, e.error)(r);
            }
          }
        } catch (e) {
          (v = !0), (y = e);
        } finally {
          try {
            d && null != j.return && (yield j.return());
          } finally {
            if (v) throw y;
          }
        }
        return {};
      })).apply(this, arguments);
    }
    function p() {
      return y.apply(this, arguments);
    }
    function y() {
      return (y = l(function* (e = process.cwd()) {
        (0, t.isAbsolute)(e) || (e = (0, t.join)(process.cwd(), e));
        let r = yield (function () {
          return f.apply(this, arguments);
        })(e);
        return (null == r ? void 0 : r.default) || r;
      })).apply(this, arguments);
    }
  },
  /* D:\serpack\packages\serpack\src\compile.ts */ 5: function (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: !0 }),
      Object.defineProperty(exports, 'compile', {
        enumerable: !0,
        get: function () {
          return t;
        },
      });
    const e = __serpack_require__('sp:7'),
      r = __serpack_require__('sp:1');
    function n(e, r, n, t, o, i, u) {
      try {
        var c = e[i](u),
          l = c.value;
      } catch (e) {
        n(e);
        return;
      }
      c.done ? r(l) : Promise.resolve(l).then(t, o);
    }
    function t(e, r) {
      return o.apply(this, arguments);
    }
    function o() {
      var t;
      return (
        (t = function* (n, t) {
          let o = performance.now(),
            i = new r.Compiler(n, t);
          yield i.compile(n);
          let u = yield i.bundle();
          return (
            (0, e.debug)(
              `Compiled Successfully in ${(performance.now() - o).toFixed()}ms`
            ),
            { code: u.code, map: u.map }
          );
        }),
        (o = function () {
          var e = this,
            r = arguments;
          return new Promise(function (o, i) {
            var u = t.apply(e, r);
            function c(e) {
              n(u, o, i, c, l, 'next', e);
            }
            function l(e) {
              n(u, o, i, c, l, 'throw', e);
            }
            c(void 0);
          });
        }).apply(this, arguments)
      );
    }
  },
  /* D:\serpack\packages\serpack\src\plugin.ts */ 6: function (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: !0 });
  },
});
