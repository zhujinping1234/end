;(function (e, t) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? t(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], t)
    : ((e = typeof globalThis != 'undefined' ? globalThis : e || self), t(e, e.Vue))
})(this, function (e, t) {
  'use strict'
  var f = '',
    s = (n, r) => {
      const o = n.__vccOpts || n
      for (const [i, d] of r) o[i] = d
      return o
    }
  const c = {
      props: {},
      data() {
        return {}
      }
    },
    u = {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        'flex-flow': 'wrap',
        'align-content': 'flex-start'
      }
    }
  function _(n, r, o, i, d, l) {
    return (
      t.openBlock(),
      t.createElementBlock('div', u, [t.renderSlot(n.$slots, 'default', {}, void 0, !0)])
    )
  }
  var a = s(c, [
    ['render', _],
    ['__scopeId', 'data-v-3795de07']
  ])
  ;(e.directionContainer = a),
    Object.defineProperty(e, '__esModule', { value: !0 }),
    (e[Symbol.toStringTag] = 'Module')
})
