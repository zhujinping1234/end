<template>
  <el-dropdown :hide-on-click="false">
    <div class="el-dropdown-link">
      <svg t="1646467354441" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2064" width="25" height="30"><path d="M237.44 943.36H101.12a94.08 94.08 0 0 1-94.08-94.08v-135.68a94.08 94.08 0 0 1 94.08-94.72h136.32a94.08 94.08 0 0 1 94.08 94.72v135.68a94.08 94.08 0 0 1-94.08 94.08z m-136.32-261.12a31.36 31.36 0 0 0-31.36 31.36v135.68a31.36 31.36 0 0 0 31.36 31.36h136.32a30.72 30.72 0 0 0 30.72-31.36v-135.68a30.72 30.72 0 0 0-30.72-31.36zM579.84 943.36H444.16a94.08 94.08 0 0 1-94.08-94.08v-135.68a94.08 94.08 0 0 1 94.08-94.72h135.68a94.08 94.08 0 0 1 94.08 94.72v135.68a94.08 94.08 0 0 1-94.08 94.08z m-135.68-261.12a31.36 31.36 0 0 0-31.36 31.36v135.68a31.36 31.36 0 0 0 31.36 31.36h135.68a31.36 31.36 0 0 0 31.36-31.36v-135.68a31.36 31.36 0 0 0-31.36-31.36zM922.88 943.36h-136.32a94.08 94.08 0 0 1-94.08-94.08v-135.68a94.08 94.08 0 0 1 94.08-94.72h136.32a94.08 94.08 0 0 1 94.08 94.72v135.68a94.08 94.08 0 0 1-94.08 94.08z m-136.32-261.12a30.72 30.72 0 0 0-30.72 31.36v135.68a30.72 30.72 0 0 0 30.72 31.36h136.32a31.36 31.36 0 0 0 31.36-31.36v-135.68a31.36 31.36 0 0 0-31.36-31.36zM922.88 576H101.12A88.96 88.96 0 0 1 12.16 485.76V169.6a88.96 88.96 0 0 1 88.96-88.96h821.76a88.96 88.96 0 0 1 88.96 88.96v316.16A88.96 88.96 0 0 1 922.88 576zM101.12 133.12a36.48 36.48 0 0 0-37.12 36.48v316.16a36.48 36.48 0 0 0 36.48 36.48h822.4a36.48 36.48 0 0 0 37.12-36.48V169.6a36.48 36.48 0 0 0-36.48-36.48z" fill="#cdcdcd" p-id="2065"></path></svg>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <draggable
          class="dragArea list-group"
          :list="componentAvatarList"
          :group="{ name: 'people', pull: 'clone', put: false }"
          item-key="name"
          :clone="cloneDefault"
        >
          <template #item="{ element }">
            <el-dropdown-item class="list-group-item">{{ element.name }}</el-dropdown-item>
          </template>
        </draggable>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import { ref, reactive, watch, watchEffect, onMounted, getCurrentInstance } from 'vue'
  import draggable from 'vuedraggable'
  import { Component, ComponentAvatar, ComponentInstnace } from '../model/AppInstanceModel'
  import { createUuid } from '../utils/UuidCreator'
  import allStore from '../store/stores/StoreAll'


  let componentAvatarList: ComponentAvatar[] = reactive(
    allStore.moduleStore().getArrayOfAvaliableCompAvatar()
  )

  const cloneDefault = (draggedData: ComponentAvatar): ComponentInstnace => {
    return allStore.moduleStore().getComponentInstanceByCompId(draggedData.id)
  }
</script>

<style scoped>
  .dragArea {
    /* 组件列表横向布局 */
    /* display: flex; */
    cursor: pointer;
  }
  .list-group-item {
    text-align: center;
    height: 30px;
    width: 100px;
    /* outline: 1px dashed; */
    line-height: 50px;
    flex: 1;
    font-size: 50%;
  }
  .icon {
    margin-right: 8px;
  }
  .el-dropdown-link {
    height: 30px;
    width: 60px;
    line-height: 30px;
    color: aliceblue;
    cursor: pointer;
    /* margin: 0 30px; */
  }
  .el-dropdown-link:hover {
    color: rgb(106, 213, 255);
  }
</style>
