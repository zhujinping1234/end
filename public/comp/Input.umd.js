;(function (t, n) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? n(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], n)
    : ((t = typeof globalThis != 'undefined' ? globalThis : t || self), n(t, t.Vue))
})(this, function (t, n) {
  'use strict'
  var y = '',
    a = (e, s) => {
      const u = e.__vccOpts || e
      for (const [i, p] of s) u[i] = p
      return u
    }
  const o = {
      name: 'Input',
      props: {
        text: { type: String, required: !1, default: void 0 },
        Type: { type: String, required: !1, default: void 0 },
        Top: { type: String, required: !1, default: !1 },
        Left: { type: String, required: !1, default: !1 }
      },
      data() {
        return { top: '0', left: '0' }
      },
      computed: {},
      watch: {
        Top(e) {
          this.top = e
        },
        Left(e) {
          this.left = e
        }
      },
      methods: {}
    },
    r = () => {
      n.useCssVars((e) => ({ e4a37c58: e.top, '28162f68': e.left }))
    },
    d = o.setup
  o.setup = d ? (e, s) => (r(), d(e, s)) : r
  const f = o,
    _ = ['type', 'value']
  function l(e, s, u, i, p, v) {
    return (
      n.openBlock(),
      n.createElementBlock('div', null, [
        n.createElementVNode(
          'input',
          { type: u.Type, value: u.text, class: 'PositionInput' },
          null,
          8,
          _
        )
      ])
    )
  }
  var c = a(f, [
    ['render', l],
    ['__scopeId', 'data-v-432a6dd3']
  ])
  ;;(t.Input = c), Object.defineProperty(t, '__esModule', { value: !0 })
})
