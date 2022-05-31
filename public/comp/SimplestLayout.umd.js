!(function (e, o) {
  'object' == typeof exports && 'undefined' != typeof module
    ? o(exports, require('vue'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'vue'], o)
    : o((e = 'undefined' != typeof globalThis ? globalThis : e || self), e.Vue)
})(this, function (e, o) {
  'use strict'
  var t = { name: 'SimplestLayout' }
  const n = o.withScopeId('data-v-3e3cf9e1')
  o.pushScopeId('data-v-3e3cf9e1')
  const d = o.createVNode('div', { class: 'col' }, 'only only slot', -1)
  o.popScopeId()
  const l = n(
    (e, t, n, l, c, s) => (
      o.openBlock(),
      o.createBlock(o.Fragment, null, [d, o.renderSlot(e.$slots, 'default', {}, void 0, !0)], 64)
    )
  )
  ;(t.render = l),
    (t.__scopeId = 'data-v-3e3cf9e1'),
    (e.SimplestLayout = t),
    Object.defineProperty(e, '__esModule', { value: !0 }),
    (e[Symbol.toStringTag] = 'Module')
})
