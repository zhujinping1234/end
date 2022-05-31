;(function (e, t) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? t(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], t)
    : ((e = typeof globalThis != 'undefined' ? globalThis : e || self), t(e, e.Vue))
})(this, function (e, t) {
  'use strict'
  var i = (o, r) => {
    const n = o.__vccOpts || o
    for (const [s, d] of r) n[s] = d
    return n
  }
  const u = {
      name: 'Page',
      props: {},
      data() {
        return {}
      },
      computed: {},
      watch: {},
      methods: {}
    },
    c = { style: { width: '100%', height: '615px', overflow: 'auto' } }
  function f(o, r, n, s, d, p) {
    return t.openBlock(), t.createElementBlock('div', c, [t.renderSlot(o.$slots, 'default')])
  }
  var a = i(u, [['render', f]])
  ;;(e.Page = a), Object.defineProperty(e, '__esModule', { value: !0 })
})
