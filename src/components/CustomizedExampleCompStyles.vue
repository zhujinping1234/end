<script lang="ts">
  import { h, computed, watch, ref } from 'vue'
  export default {
    props: {
      exampleRawCss: {
        type: String,
        required: true
      }
    },
    setup(props: { exampleRawCss: string }) {
      //  let compiledCss=ref('')

      //   watch(
      //   () =>props.exampleRawCss,
      //   () => {
      //       if (props.exampleRawCss && props.exampleRawCss.length > 0) {
      //         const prefixedCss: any = prefixCss(props.exampleRawCss)

      //       //   return prefixedCss
      //         compiledCss.value=prefixedCss

      //         console.log( compiledCss.value=="h1{color:black}");

      //       }
      //       // return ''
      //   },
      //    { deep: true }
      // )

      const compiledCss = computed(() => {
        if (props.exampleRawCss && props.exampleRawCss.length > 0) {
          const prefixedCss: string = prefixCss(props.exampleRawCss)

          return prefixedCss
        }
        return ''
      })

      const prefixCss = (css: string) => {
        //   let id = `#${this.wrapperId}`
        let char
        let nextChar
        let isAt
        let isIn
        //   const classLen = id.length

        // makes sure the id will not concatenate the selector
        //   id += ' '

        // removes comments
        css = css.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '')

        // makes sure nextChar will not target a space
        css = css.replace(/}(\s*)@/g, '}@')
        css = css.replace(/}(\s*)}/g, '}}')

        for (let i = 0; i < css.length - 2; i++) {
          char = css[i]
          nextChar = css[i + 1]

          if (char === '@' && nextChar !== 'f') isAt = true
          if (!isAt && char === '{') isIn = true
          if (isIn && char === '}') isIn = false

          if (
            !isIn &&
            nextChar !== '@' &&
            nextChar !== '}' &&
            (char === '}' || char === ',' || ((char === '{' || char === ';') && isAt))
          ) {
            css = css.slice(0, i + 1) + css.slice(i + 1)
            //   i += classLen
            isAt = false
          }
        }

        // prefix the first select if it is not `@media` and if it is not yet prefixed
        //   if (css.indexOf(id) !== 0 && css.indexOf('@') !== 0) css = id + css
        return css
      }

      return {
        compiledCss,
        prefixCss
      }
    },
    render(compiledCss: string) {
      // return h(
      //   'h1',           // 标签名称
      //   props.compiledCss  // 标签内容
      // )
      //  const styleElement: any = h('style', {
      //         domProps: {
      //           innerHTML: "compiledCss"
      //         }
      //       })
      // console.log(JSON.parse(JSON.stringify(compiledCss)));

      return h('style', JSON.parse(JSON.stringify(compiledCss)).compiledCss)
    }
  }
</script>
