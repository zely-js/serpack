(function (modules) {
  var __serpack_module_cache__ = {};
  function __serpack_require__(id) {
    if (!id.startsWith('sp:')) return require(id);
    if (__serpack_module_cache__[id.slice(3)])
      return __serpack_module_cache__[id.slice(3)];
    const module = { exports: {} };
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
  return __serpack_require__('sp:0');
})({
  /*[0]scripts\build.ts*/ 0: (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) => {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: !0 });
    var e = require('child_process'),
      r = require('esbuild'),
      t = require('esbuild-node-externals'),
      n = require('fs'),
      o = (function (e, r) {
        if (e && e.__esModule) return e;
        if (null === e || ('object' != typeof e && 'function' != typeof e))
          return { default: e };
        var t = l(void 0);
        if (t && t.has(e)) return t.get(e);
        var n = { __proto__: null },
          o = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i in e)
          if ('default' !== i && Object.prototype.hasOwnProperty.call(e, i)) {
            var c = o ? Object.getOwnPropertyDescriptor(e, i) : null;
            c && (c.get || c.set) ? Object.defineProperty(n, i, c) : (n[i] = e[i]);
          }
        return (n.default = e), t && t.set(e, n), n;
      })(require('glob')),
      i = require('path'),
      c = __serpack_require__('sp:1');
    function l(e) {
      if ('function' != typeof WeakMap) return null;
      var r = new WeakMap(),
        t = new WeakMap();
      return (l = function (e) {
        return e ? t : r;
      })(e);
    }
    var a = o.globSync(['packages/**/*/build.json']),
      u = !0,
      s = !1,
      f = void 0;
    try {
      for (var p, d = a[Symbol.iterator](); !(u = (p = d.next()).done); u = !0)
        !(function () {
          var o = p.value;
          console.log('> '.concat((0, i.join)(process.cwd(), o)));
          var l = JSON.parse((0, n.readFileSync)((0, i.join)(process.cwd(), o), 'utf-8')),
            a = (0, i.dirname)(o),
            u = (0, i.join)(a, 'dist');
          (0, n.existsSync)(u) && (0, n.rmSync)(u, { recursive: !0, force: !0 });
          var s = {
            entryPoints: l.map(function (e) {
              return (0, i.join)(a, e);
            }),
            logLevel: 'info',
            platform: 'node',
            outbase: (0, i.join)(a, './src'),
            outdir: (0, i.join)(a, './dist'),
            metafile: !0,
            minify: !0,
            plugins: [
              (0, t.nodeExternalsPlugin)({ packagePath: (0, i.join)(a, 'package.json') }),
              c.esmSplitCodeToCjs,
            ],
          };
          if (
            ((0, r.build)(
              ((f = (function (e) {
                for (var r = 1; r < arguments.length; r++) {
                  var t = null != arguments[r] ? arguments[r] : {},
                    n = Object.keys(t);
                  'function' == typeof Object.getOwnPropertySymbols &&
                    (n = n.concat(
                      Object.getOwnPropertySymbols(t).filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                      })
                    )),
                    n.forEach(function (r) {
                      var n;
                      (n = t[r]),
                        r in e
                          ? Object.defineProperty(e, r, {
                              value: n,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0,
                            })
                          : (e[r] = n);
                    });
                }
                return e;
              })({}, s)),
              (d = {
                format: 'esm',
                bundle: !0,
                chunkNames: 'chunks/[hash]',
                outExtension: { '.js': '.mjs' },
              }),
              (d = null != d ? d : {}),
              Object.getOwnPropertyDescriptors
                ? Object.defineProperties(f, Object.getOwnPropertyDescriptors(d))
                : (function (e, r) {
                    var t = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                      var n = Object.getOwnPropertySymbols(e);
                      t.push.apply(t, n);
                    }
                    return t;
                  })(Object(d)).forEach(function (e) {
                    Object.defineProperty(f, e, Object.getOwnPropertyDescriptor(d, e));
                  }),
              f)
            ),
            process.argv.includes('--types'))
          ) {
            console.log('+ Generating .d.ts ');
            var f,
              d,
              y,
              b,
              j = (0, e.exec)('tsc --emitDeclarationOnly --declaration', { cwd: a });
            null === (y = j.stderr) ||
              void 0 === y ||
              y.on('data', function (e) {
                return console.error(e.toString());
              }),
              null === (b = j.stdout) ||
                void 0 === b ||
                b.on('data', function (e) {
                  return console.log(e.toString());
                }),
              j.on('close', function () {
                console.log('+ .d.ts compilation done\n');
              });
          }
        })();
    } catch (e) {
      (s = !0), (f = e);
    } finally {
      try {
        u || null == d.return || d.return();
      } finally {
        if (s) throw f;
      }
    }
  },
  /*[1]scripts\splitting.ts*/ 1: (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) => {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: !0 }),
      Object.defineProperty(exports, 'esmSplitCodeToCjs', {
        enumerable: !0,
        get: function () {
          return r;
        },
      });
    var e,
      t = (e = require('esbuild')) && e.__esModule ? e : { default: e };
    function n(e, t, n, r, o, i, u) {
      try {
        var l = e[i](u),
          a = l.value;
      } catch (e) {
        n(e);
        return;
      }
      l.done ? t(a) : Promise.resolve(a).then(r, o);
    }
    var r = {
      name: 'esmSplitCodeToCjs',
      setup: function (e) {
        var r, o;
        e.onEnd(
          ((r = function (n) {
            var r, o, i;
            return (function (e, t) {
              var n,
                r,
                o,
                i,
                u = {
                  label: 0,
                  sent: function () {
                    if (1 & o[0]) throw o[1];
                    return o[1];
                  },
                  trys: [],
                  ops: [],
                };
              return (
                (i = { next: l(0), throw: l(1), return: l(2) }),
                'function' == typeof Symbol &&
                  (i[Symbol.iterator] = function () {
                    return this;
                  }),
                i
              );
              function l(i) {
                return function (l) {
                  return (function (i) {
                    if (n) throw TypeError('Generator is already executing.');
                    for (; u; )
                      try {
                        if (
                          ((n = 1),
                          r &&
                            (o =
                              2 & i[0]
                                ? r.return
                                : i[0]
                                ? r.throw || ((o = r.return) && o.call(r), 0)
                                : r.next) &&
                            !(o = o.call(r, i[1])).done)
                        )
                          return o;
                        switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                          case 0:
                          case 1:
                            o = i;
                            break;
                          case 4:
                            return u.label++, { value: i[1], done: !1 };
                          case 5:
                            u.label++, (r = i[1]), (i = [0]);
                            continue;
                          case 7:
                            (i = u.ops.pop()), u.trys.pop();
                            continue;
                          default:
                            if (
                              !(o = (o = u.trys).length > 0 && o[o.length - 1]) &&
                              (6 === i[0] || 2 === i[0])
                            ) {
                              u = 0;
                              continue;
                            }
                            if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                              u.label = i[1];
                              break;
                            }
                            if (6 === i[0] && u.label < o[1]) {
                              (u.label = o[1]), (o = i);
                              break;
                            }
                            if (o && u.label < o[2]) {
                              (u.label = o[2]), u.ops.push(i);
                              break;
                            }
                            o[2] && u.ops.pop(), u.trys.pop();
                            continue;
                        }
                        i = t.call(e, u);
                      } catch (e) {
                        (i = [6, e]), (r = 0);
                      } finally {
                        n = o = 0;
                      }
                    if (5 & i[0]) throw i[1];
                    return { value: i[0] ? i[1] : void 0, done: !0 };
                  })([i, l]);
                };
              }
            })(this, function (u) {
              switch (u.label) {
                case 0:
                  return (
                    (i = Object.keys(
                      null !==
                        (o =
                          null === (r = n.metafile) || void 0 === r
                            ? void 0
                            : r.outputs) && void 0 !== o
                        ? o
                        : {}
                    ).filter(function (e) {
                      return e.endsWith('mjs') || e.endsWith('js');
                    })),
                    [
                      4,
                      t.default.build({
                        outdir: e.initialOptions.outdir,
                        entryPoints: i,
                        allowOverwrite: !0,
                        minify: !0,
                        format: 'cjs',
                        logLevel: 'info',
                        outExtension: { '.js': '.js' },
                      }),
                    ]
                  );
                case 1:
                  return u.sent(), [2];
              }
            });
          }),
          (o = function () {
            var e = this,
              t = arguments;
            return new Promise(function (o, i) {
              var u = r.apply(e, t);
              function l(e) {
                n(u, o, i, l, a, 'next', e);
              }
              function a(e) {
                n(u, o, i, l, a, 'throw', e);
              }
              l(void 0);
            });
          }),
          function (e) {
            return o.apply(this, arguments);
          })
        );
      },
    };
  },
});
