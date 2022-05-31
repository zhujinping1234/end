;(function (n, t) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? t(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], t)
    : ((n = typeof globalThis != 'undefined' ? globalThis : n || self), t(n, n.Vue))
})(this, function (n, t) {
  'use strict'
  var m = '',
    i = (e, o) => {
      const s = e.__vccOpts || e
      for (const [_, a] of o) s[_] = a
      return s
    }
  const r = {
      name: 'Button',
      props: {
        label: { type: String, required: !1, default: void 0 },
        Top: { type: String, required: !1, default: !1 },
        Left: { type: String, required: !1, default: !1 }
      },
      data() {
        return { top: '0', left: '0' }
      },
      computed: {},
      methods: {},
      watch: {
        Top(e) {
          this.top = e
        },
        Left(e) {
          this.left = e
        }
      }
    },
    u = () => {
      t.useCssVars((e) => ({ '3c5eb09e': e.top, '4f7399de': e.left }))
    },
    d = r.setup
  r.setup = d ? (e, o) => (u(), d(e, o)) : u
  const f = r,
    l = { class: 'PositionBtn' }
  function c(e, o, s, _, a, y) {
    return (
      t.openBlock(),
      t.createElementBlock('div', null, [
        t.createElementVNode('button', l, [
          t.createElementVNode('span', null, t.toDisplayString(s.label), 1)
        ])
      ])
    )
  }
  var p = i(f, [
    ['render', c],
    ['__scopeId', 'data-v-13c369f2']
  ])
  ;;(n.Button = p), Object.defineProperty(n, '__esModule', { value: !0 })
})
