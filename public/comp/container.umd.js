;(function (o, e) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? e(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], e)
    : ((o = typeof globalThis != 'undefined' ? globalThis : o || self), e(o, o.Vue))
})(this, function (o, e) {
  'use strict'
  var v = '',
    d = (t, s) => {
      const c = t.__vccOpts || t
      for (const [S, V] of s) c[S] = V
      return c
    }
  const l = {},
    n = (t) => (e.pushScopeId('data-v-0cec109e'), (t = t()), e.popScopeId(), t),
    r = { class: 'col' },
    i = { class: 'col-f' },
    _ = n(() => e.createElementVNode('div', { 'data-slot': 'left' }, null, -1)),
    a = { class: 'col-super' },
    p = { class: 'col-t' },
    f = n(() => e.createElementVNode('div', { 'data-slot': 'top' }, null, -1)),
    h = { class: 'col-b' },
    u = n(() => e.createElementVNode('div', { 'data-slot': 'right' }, null, -1))
  function m(t, s) {
    return (
      e.openBlock(),
      e.createElementBlock('div', r, [
        e.createElementVNode('div', i, [e.renderSlot(t.$slots, 'left', {}, () => [_], !0)]),
        e.createElementVNode('div', a, [
          e.createElementVNode('div', p, [e.renderSlot(t.$slots, 'top', {}, () => [f], !0)]),
          e.createElementVNode('div', h, [e.renderSlot(t.$slots, 'right', {}, () => [u], !0)])
        ])
      ])
    )
  }
  var E = d(l, [
    ['render', m],
    ['__scopeId', 'data-v-0cec109e']
  ])
  ;(o.container = E),
    Object.defineProperty(o, '__esModule', { value: !0 }),
    (o[Symbol.toStringTag] = 'Module')
})
