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
  module.exports = __serpack_require__('sp:0');
})({
  /*[0]scripts\build.ts*/ 0: (
    __serpack_require__,
    __non_serpack_require__,
    module,
    exports
  ) => {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: !0 });
    const e = require('child_process'),
      t = require('esbuild'),
      r = require('esbuild-node-externals'),
      n = require('fs'),
      o = (function (e, t) {
        if (e && e.__esModule) return e;
        if (null === e || ('object' != typeof e && 'function' != typeof e))
          return { default: e };
        var r = s(void 0);
        if (r && r.has(e)) return r.get(e);
        var n = { __proto__: null },
          o = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i in e)
          if ('default' !== i && Object.prototype.hasOwnProperty.call(e, i)) {
            var c = o ? Object.getOwnPropertyDescriptor(e, i) : null;
            c && (c.get || c.set) ? Object.defineProperty(n, i, c) : (n[i] = e[i]);
          }
        return (n.default = e), r && r.set(e, n), n;
      })(require('glob')),
      i = require('path'),
      c = __serpack_require__('sp:1');
    function s(e) {
      if ('function' != typeof WeakMap) return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (s = function (e) {
        return e ? r : t;
      })(e);
    }
    for (const s of o.globSync(['packages/**/*/build.json'])) {
      console.log(`> ${(0, i.join)(process.cwd(), s)}`);
      let o = JSON.parse((0, n.readFileSync)((0, i.join)(process.cwd(), s), 'utf-8')),
        a = (0, i.dirname)(s),
        p = (0, i.join)(a, 'dist');
      (0, n.existsSync)(p) && (0, n.rmSync)(p, { recursive: !0, force: !0 });
      let f = {
        entryPoints: o.map((e) => (0, i.join)(a, e)),
        logLevel: 'info',
        platform: 'node',
        outbase: (0, i.join)(a, './src'),
        outdir: (0, i.join)(a, './dist'),
        metafile: !0,
        minify: !0,
        plugins: [
          (0, r.nodeExternalsPlugin)({ packagePath: (0, i.join)(a, 'package.json') }),
          c.esmSplitCodeToCjs,
        ],
      };
      if (
        ((0, t.build)(
          (function (e, t) {
            return (
              (t = null != t ? t : {}),
              Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
                : (function (e, t) {
                    var r = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                      var n = Object.getOwnPropertySymbols(e);
                      r.push.apply(r, n);
                    }
                    return r;
                  })(Object(t)).forEach(function (r) {
                    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                  }),
              e
            );
          })(
            (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {},
                  n = Object.keys(r);
                'function' == typeof Object.getOwnPropertySymbols &&
                  (n = n.concat(
                    Object.getOwnPropertySymbols(r).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(r, e).enumerable;
                    })
                  )),
                  n.forEach(function (t) {
                    var n;
                    (n = r[t]),
                      t in e
                        ? Object.defineProperty(e, t, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                          })
                        : (e[t] = n);
                  });
              }
              return e;
            })({}, f),
            {
              format: 'esm',
              bundle: !0,
              chunkNames: 'chunks/[hash]',
              outExtension: { '.js': '.mjs' },
            }
          )
        ),
        process.argv.includes('--types'))
      ) {
        var l, u;
        console.log('+ Generating .d.ts ');
        let t = (0, e.exec)('tsc --emitDeclarationOnly --declaration', { cwd: a });
        null === (l = t.stderr) ||
          void 0 === l ||
          l.on('data', (e) => console.error(e.toString())),
          null === (u = t.stdout) ||
            void 0 === u ||
            u.on('data', (e) => console.log(e.toString())),
          t.on('close', () => {
            console.log('+ .d.ts compilation done\n');
          });
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
    var e;
    Object.defineProperty(exports, '__esModule', { value: !0 }),
      Object.defineProperty(exports, 'esmSplitCodeToCjs', {
        enumerable: !0,
        get: function () {
          return i;
        },
      });
    const t = (e = require('esbuild')) && e.__esModule ? e : { default: e };
    function n(e, t, n, i, o, r, s) {
      try {
        var u = e[r](s),
          l = u.value;
      } catch (e) {
        n(e);
        return;
      }
      u.done ? t(l) : Promise.resolve(l).then(i, o);
    }
    const i = {
      name: 'esmSplitCodeToCjs',
      setup(e) {
        var i, o;
        e.onEnd(
          ((i = function* (n) {
            var i, o;
            let r = Object.keys(
              null !==
                (o = null === (i = n.metafile) || void 0 === i ? void 0 : i.outputs) &&
                void 0 !== o
                ? o
                : {}
            ).filter((e) => e.endsWith('mjs') || e.endsWith('js'));
            yield t.default.build({
              outdir: e.initialOptions.outdir,
              entryPoints: r,
              allowOverwrite: !0,
              minify: !0,
              format: 'cjs',
              logLevel: 'info',
              outExtension: { '.js': '.js' },
            });
          }),
          (o = function () {
            var e = this,
              t = arguments;
            return new Promise(function (o, r) {
              var s = i.apply(e, t);
              function u(e) {
                n(s, o, r, u, l, 'next', e);
              }
              function l(e) {
                n(s, o, r, u, l, 'throw', e);
              }
              u(void 0);
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
