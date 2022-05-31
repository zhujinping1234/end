<!--
 * @Descripttion: el-submenu封装
 * @Author: superman
 * @Date: 2021-11-26 08:28:32
 * @LastEditors: superman
 * @LastEditTime: 2022-01-06 15:01:44
-->
<template>
  <el-submenu>
    <template slot="title">
      <div class="submenu-box">
        <div class="submenu-font">
          {{ content }}
        </div>
        <div>
          <i class="el-icon-circle-plus-outline"></i>
        </div>
      </div>
    </template>
    <slot></slot>
  </el-submenu>
</template>

<script setup lang="ts">
const props = defineProps({
  content: {
    type: String,
    default: 'This is some long text that will not fit in the box'
  }
})
</script>

<style lang="scss" scoped>
.submenu-box {
  display: flex;
  .submenu-font {
    width: 75%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
