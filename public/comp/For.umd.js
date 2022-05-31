;(function (t, e) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? e(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], e)
    : ((t = typeof globalThis != 'undefined' ? globalThis : t || self), e(t, t.Vue))
})(this, function (t, e) {
  'use strict'
  const r = {
      style: { 'min-height': '40px', width: '100%', border: 'black 1px solid', padding: '0' },
      id: 'fatherComp'
    },
    i = { id: 'comp', style: { 'list-style': 'none' } },
    l = e.defineComponent({
      props: { number: { type: Number, default: 1 } },
      setup(c) {
        const p = c
        let m = (o) => {
          var d = document.getElementById('fatherComp'),
            s = d.children.length
          for (let n = s - 1; n > 0; n--) d.removeChild(d.children[n])
          for (let n = 0; n < o - 1; n++) {
            var u = document.getElementById('comp'),
              f = u.cloneNode(!0),
              a = document.getElementById('fatherComp')
            a.appendChild(f)
          }
        }
        return (
          e.watch(
            () => p.number,
            (o) => {
              m(o)
            },
            { deep: !0 }
          ),
          (o, d) => (
            e.openBlock(),
            e.createElementBlock('ul', r, [
              e.createElementVNode('li', i, [e.renderSlot(o.$slots, 'comp1')])
            ])
          )
        )
      }
    })
  ;(t.For = l),
    Object.defineProperty(t, '__esModule', { value: !0 }),
    (t[Symbol.toStringTag] = 'Module')
})
