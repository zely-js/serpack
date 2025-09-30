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
/* D:\serpack-js\fixtures\sourcemap-plugin\index.ts */
"0": (function(__serpack_require__,__non_serpack_require__,module,exports) { "a";var e;
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const r = __serpack_require__('sp:1'), o = __serpack_require__('sp:2'), s = (e = __serpack_require__('sp:3')) && e.__esModule ? e : {
    default: e
};
try {
    console.log(`JSON Data: ${JSON.stringify(s.default)}!`), (0, o.somethingWrong)();
} catch (e) {
    (0, r.emit)(e, './fixtures/sourcemap-plugin/compiled.js.map');
}

}),

/* D:\serpack-js\fixtures\sourcemap\comsumer\index.ts */
"1": (function(__serpack_require__,__non_serpack_require__,module,exports) { "a";Object.defineProperty(exports, "__esModule", {
    value: !0
});
var e = exports, n = {
    emit: function() {
        return a;
    },
    parse: function() {
        return s;
    }
};
for(var r in n)Object.defineProperty(e, r, {
    enumerable: !0,
    get: n[r]
});
const t = __serpack_require__("fs"), i = __serpack_require__("source-map"), o = __serpack_require__('sp:4');
function u(e, n, r, t, i, o, u) {
    try {
        var l = e[o](u), s = l.value;
    } catch (e) {
        r(e);
        return;
    }
    l.done ? n(s) : Promise.resolve(s).then(t, i);
}
function l(e) {
    return function() {
        var n = this, r = arguments;
        return new Promise(function(t, i) {
            var o = e.apply(n, r);
            function l(e) {
                u(o, t, i, l, s, "next", e);
            }
            function s(e) {
                u(o, t, i, l, s, "throw", e);
            }
            l(void 0);
        });
    };
}
function s(e, n) {
    return c.apply(this, arguments);
}
function c() {
    return (c = l(function*(e, n) {
        let r = (0, o.parseError)(e), u = r[0].loc.slice(1, -1), l = u.split(':'), s = l.pop(), c = {
            filename: u,
            line: Number(l.pop()),
            column: Number(s)
        };
        if (!(0, t.existsSync)(n)) throw Error(".map file desn't exist");
        let a = JSON.parse((0, t.readFileSync)(n, 'utf-8')), p = new i.SourceMapConsumer(a), f = (yield p).originalPositionFor(c), m = f.source, y = (0, t.readFileSync)(m, 'utf-8').split('\n'), d = y[f.line - 1];
        return r.unshift({
            at: '',
            loc: `${m}:${f.line}:${f.column}`
        }), {
            line: d,
            originalFile: y,
            stacks: r
        };
    })).apply(this, arguments);
}
function a(e, n) {
    return p.apply(this, arguments);
}
function p() {
    return (p = l(function*(e, n) {
        let r = yield s(e, n);
        console.log(e.message), console.log(`> ${r.line} (at ${r.stacks[0].loc})`);
    })).apply(this, arguments);
}

}),

/* D:\serpack-js\fixtures\sourcemap\comsumer\parse.ts */
"4": (function(__serpack_require__,__non_serpack_require__,module,exports) { "a";function e(e) {
    var r;
    let t = null === (r = e.stack) || void 0 === r ? void 0 : r.split('\n').slice(1);
    return null == t ? void 0 : t.map((e)=>{
        e = e.slice(7);
        let r = {
            at: '',
            loc: ''
        };
        return r.loc = (/\([^)]*\)/.exec(e) || [])[0] || '', r.at = e.replace(r.loc, ''), r;
    });
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "parseError", {
    enumerable: !0,
    get: function() {
        return e;
    }
});

}),

/* D:\serpack-js\fixtures\sourcemap-plugin\something-wrong.ts */
"2": (function(__serpack_require__,__non_serpack_require__,module,exports) { "a";function e() {
    throw Error('Something is wrong!');
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "somethingWrong", {
    enumerable: !0,
    get: function() {
        return e;
    }
});

}),

/* D:\serpack-js\package.json */
"3": (function(__serpack_require__,__non_serpack_require__,module,exports) { module.exports={
  "private": true,
  "workspaces": [
    "packages/**/*"
  ],
  "devDependencies": {
    "@swc-node/register": "^1.10.9",
    "@swc/core": "^1.7.3",
    "@types/escodegen": "^0.0.10",
    "@types/node": "^18.11.10",
    "@typescript-eslint/eslint-plugin": "^5.62.0",
    "@typescript-eslint/parser": "^5.36.1",
    "esbuild": "^0.18.14",
    "esbuild-node-externals": "^1.8.0",
    "escodegen": "^2.1.0",
    "eslint": "^8.43.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.25.4",
    "glob": "^11.0.0",
    "typescript": "^5.6.2",
    "vite-tsconfig-paths": "4.3.2",
    "vitest": "^2.1.8"
  },
  "scripts": {
    "build": "node -r @swc-node/register scripts/build.ts",
    "lint-fix": "eslint --fix --ext .js,.ts .",
    "test": "vitest"
  },
  "version": "0.0.0"
}
;
}),
});