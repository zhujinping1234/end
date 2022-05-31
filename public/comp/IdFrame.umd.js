!(function (e, o) {
  'object' == typeof exports && 'undefined' != typeof module
    ? o(exports, require('vue'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'vue'], o)
    : o((e = 'undefined' != typeof globalThis ? globalThis : e || self), e.Vue)
})(this, function (e, o) {
  'use strict'
  o.pushScopeId('data-v-6d419e74')
  const d = { class: 'divcss' },
    t = o.createVNode('div', { id: 'title', class: 'divtitlecss' }, ' 我是标题 ', -1),
    i = o.createVNode('div', { id: 'value' }, ' 我是内容 ', -1)
  o.popScopeId()
  var s = o.defineComponent({
    setup: (e) => (e, s) => (o.openBlock(), o.createBlock('div', d, [t, i]))
  })
  ;(s.__scopeId = 'data-v-6d419e74'),
    (e.IdFrame = s),
    Object.defineProperty(e, '__esModule', { value: !0 })
})
