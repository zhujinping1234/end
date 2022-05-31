;(function (t, e) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? e(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], e)
    : ((t = typeof globalThis != 'undefined' ? globalThis : t || self), e(t, t.Vue))
})(this, function (t, e) {
  ;('use strict')
  const r = { key: 0, style: { width: '100%', height: '100%' } },
    l = e.defineComponent({
      props: {
        slotNumber: { type: Number, default: 2 },
        Page: { type: String, default: 'page1' }
      },
      setup(s) {
        const n = s
        return (i, c) => (
          e.openBlock(!0),
          e.createElementBlock(
            e.Fragment,
            null,
            e.renderList(
              n.slotNumber,
              (o, d) => (
                e.openBlock(),
                e.createElementBlock(
                  e.Fragment,
                  { key: d },
                  [
                    n.Page == `page${o}`
                      ? (e.openBlock(),
                        e.createElementBlock('div', r, [e.renderSlot(i.$slots, `page${o}`)]))
                      : e.createCommentVNode('', !0)
                  ],
                  64
                )
              )
            ),
            128
          )
        )
      }
    })
  ;(t.Route = l), Object.defineProperty(t, '__esModule', { value: !0 })
})
