;(function (t, e) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? e(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], e)
    : ((t = typeof globalThis != 'undefined' ? globalThis : t || self), e(t, t.Vue))
})(this, function (t, e) {
  'use strict'
  const r = { style: { width: '100%', height: '100%' } },
    s = { key: 0, style: { width: '100%', height: '100%' } },
    i = e.defineComponent({
      props: { slotList: { type: Array, default: [] }, page: { type: String, default: '' } },
      setup(l) {
        const o = l
        return (c, d) => (
          e.openBlock(),
          e.createElementBlock('div', r, [
            (e.openBlock(!0),
            e.createElementBlock(
              e.Fragment,
              null,
              e.renderList(
                o.slotList,
                (n) => (
                  e.openBlock(),
                  e.createElementBlock(
                    e.Fragment,
                    { key: n },
                    [
                      o.page == `${n.name}`
                        ? (e.openBlock(),
                          e.createElementBlock('div', s, [e.renderSlot(c.$slots, `${n.name}`)]))
                        : e.createCommentVNode('', !0)
                    ],
                    64
                  )
                )
              ),
              128
            ))
          ])
        )
      }
    })
  ;;(t.Router = i), Object.defineProperty(t, '__esModule', { value: !0 })
})
