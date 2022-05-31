;(function (t, e) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? e(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], e)
    : ((t = typeof globalThis != 'undefined' ? globalThis : t || self), e((t), t.Vue))
})(this, function (t, e) {
  'use strict'
  var f = '',
    d = (o, n) => {
      const _ = o.__vccOpts || o
      for (const [p, u] of n) _[p] = u
      return _
    }
  const s = {},
    c = (o) => (e.pushScopeId('data-v-8cece13e'), (o = o()), e.popScopeId(), o),
    i = { class: 'outer' },
    r = [
      c(() => e.createElementVNode('div', { class: 'title' }, '\u5728\u6B64\u8F93\u5165', -1)),
      c(() =>
        e.createElementVNode(
          'hr',
          { style: { height: '1px', border: 'none', 'border-top': '1px double #ccc' } },
          null,
          -1
        )
      ),
      c(() => e.createElementVNode('div', { class: 'content' }, '\u5728\u6B64\u8F93\u5165', -1))
    ]
  function a(o, n) {
    return e.openBlock(), e.createElementBlock('div', i, r)
  }
  var l = d(s, [
    ['render', a],
    ['__scopeId', 'data-v-8cece13e']
  ])
  ;(t.Tab = l),
    Object.defineProperty(t, '__esModule', { value: !0 }),
    (t[Symbol.toStringTag] = 'Module')
})
