;(function (t, e) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? e(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], e)
    : ((t = typeof globalThis != 'undefined' ? globalThis : t || self), e(t, t.Vue))
})(this, function (t, e) {
  'use strict'
  const n = e.createTextVNode('User'),
    s = e.createTextVNode('Config'),
    a = e.createTextVNode('Role'),
    i = e.createTextVNode('Task'),
    l = e.defineComponent({
      setup(_) {
        const d = e.ref('left')
        return (r, f) => {
          const o = e.resolveComponent('el-tab-pane'),
            c = e.resolveComponent('el-tabs')
          return (
            e.openBlock(),
            e.createBlock(
              c,
              {
                'tab-position': d.value,
                style: { height: '200px' },
                class: 'demo-tabs'
              },
              {
                default: e.withCtx(() => [
                  e.createVNode(o, { label: 'User' }, { default: e.withCtx(() => [n]), _: 1 }),
                  e.createVNode(o, { label: 'Config' }, { default: e.withCtx(() => [s]), _: 1 }),
                  e.createVNode(o, { label: 'Role' }, { default: e.withCtx(() => [a]), _: 1 }),
                  e.createVNode(o, { label: 'Task' }, { default: e.withCtx(() => [i]), _: 1 })
                ]),
                _: 1
              },
              8,
              ['tab-position']
            )
          )
        }
      }
    })
  ;(t.TabsLable = l),
    Object.defineProperty(t, '__esModule', { value: !0 }),
    (t[Symbol.toStringTag] = 'Module')
})
