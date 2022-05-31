<!--
 * @Descripttion: 菜单中的一行，代表api，基于el-menu-item
 * @Author: superman
 * @Date: 2021-11-25 16:30:21
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 10:32:21
-->
<template>
  <el-menu-item>
    <div class="menu-item-box">
      <el-tag
        :color="getRequestColor(data.type)"
        size="small"
        style="color: #fff"
      >
        <!-- TODO全局filter -->
        {{ data.type }}
      </el-tag>
      <div class="menu-item-content">
        <div class="menu-item-content-font">
          {{ data.summary }}
        </div>
        <div class="menu-item-content-icon">
          <el-icon @click.stop="delApi"><delete /></el-icon>
        </div>
      </div>
    </div>
  </el-menu-item>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getRequestColor } from '@/constant/uniApi'
import { request } from '@/utils/axios'
import { Delete } from '@element-plus/icons-vue'

const store = useStore()
const router = useRouter()

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        id: '',
        path: '/default',
        summary: 'This is some long text that will not fit in the box',
        type: 'get'
      }
    }
  }
})
function delApi() {
  // TODO 浏览器这个提示 Added non-passive event listener to a scroll-blocking 'touchmove' event. Consider marking event handler as 'passive' to make the page more responsive
  ElMessageBox.confirm('此操作将永久删除该API, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      request(
        {
          method: 'delete',
          url: 'paths/item/operation/delete',
          data: {
            path: props.data.path,
            type: props.data.type
          }
        },
        true
      ).then(() => {
        const activeId = window.sessionStorage.getItem('activeId')
        if (activeId === props.data.id) {
          router.replace({
            name: 'uniApiHome'
          })
        }
        store.dispatch('uniApi/pullApiList')
      })
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.menu-item-box {
  display: flex;
  align-items: center;
  width: 100%;
  .menu-item-content {
    width: 100%;
    display: flex;
    padding: 0px 5px;
    .menu-item-content-font {
      width: 80%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .menu-item-content-icon {
      width: 20%;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
