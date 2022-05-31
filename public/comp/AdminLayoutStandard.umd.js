!(function (e, o) {
  'object' == typeof exports && 'undefined' != typeof module
    ? o(exports, require('vue'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'vue'], o)
    : o((e = 'undefined' != typeof globalThis ? globalThis : e || self), e.Vue)
})(this, function (e, o) {
  'use strict'
  var t = { name: 'AdminLayoutStandard' }
  const d = o.withScopeId('data-v-2f851802')
  o.pushScopeId('data-v-2f851802')
  const l = { class: 'col' },
    a = { class: 'col-f' },
    s = o.createVNode('div', { 'data-slot': 'left' }, null, -1),
    c = { class: 'col-super' },
    n = { class: 'col-t' },
    r = o.createVNode('div', { 'data-slot': 'top' }, null, -1),
    i = { class: 'col-b' },
    u = o.createVNode('div', { 'data-slot': 'right' }, null, -1)
  o.popScopeId()
  const f = d(
    (e, t, d, f, p, v) => (
      o.openBlock(),
      o.createBlock('div', l, [
        o.createVNode('div', a, [o.renderSlot(e.$slots, 'left', {}, () => [s], {}, !0)]),
        o.createVNode('div', c, [
          o.createVNode('div', n, [o.renderSlot(e.$slots, 'top', {}, () => [r], {}, !0)]),
          o.createVNode('div', i, [o.renderSlot(e.$slots, 'right', {}, () => [u], {}, !0)])
        ])
      ])
    )
  )
  ;(t.render = f),
    (t.__scopeId = 'data-v-2f851802'),
    (e.AdminLayoutStandard = t),
    Object.defineProperty(e, '__esModule', { value: !0 }),
    (e[Symbol.toStringTag] = 'Module')
})
