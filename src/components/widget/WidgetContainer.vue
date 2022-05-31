<template>
  <draggable
    class="dragArea"
    @move="move"
    tag="ul"
    :list="widgetDataArray"
    group="people"
    item-key="name"
  >
    <template #item="{ element }">
      <widget-of-no-cycle-depandency :widgetData="element" />
    </template>
  </draggable>
</template>
<script lang="ts">
  import draggable from 'vuedraggable'
  import { computed, defineAsyncComponent } from 'vue'

  export default {
    name: 'widget-container',
    props: {
      widgetDataArray: {
        required: true,
        type: Array,
        default: []
      }
    },

    components: {
      draggable,
      WidgetOfNoCycleDepandency: defineAsyncComponent(() => import('./Widget.vue'))
    },
    methods: {
      move: function (evt:any) {
        console.log(evt.element)
      }
    }
  }
</script>
<style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  .dragArea {
    /* min-height: 100%; */
    height: 100%;
    width: 100%;
    /* outline: 1px dashed; */
    /* flex-flow: wrap; */

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
  }
</style>
