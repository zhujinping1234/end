<template>
  <el-table :data="releaseRecord" style="width: 100%" v-if="dataNull1">
    <el-table-column fixed prop="id" label="Id" width="120" />
    <el-table-column fixed prop="name" label="Name" width="220" />
    <el-table-column prop="organizationId" label="OrganizationId" width="150" />
    <el-table-column prop="organizationName" label="OrganizationName" width="200" />
    <el-table-column prop="uploadTime" label="UploadTime" width="230" />
    <el-table-column prop="uploaderId" label="UploaderId" width="160" />
    <el-table-column prop="uploaderName" label="UploaderName" width="160" />
    <el-table-column prop="version" label="Version" width="120" />

    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click.prevent="deleteRow(scope.$index)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div v-if="dataNull2" style="font-size: 100px"> 发布记录为空 </div>
</template>

<script setup lang="ts">
  import { post, get } from '../../axios/index'
  import { ref, reactive } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  let dataNull1 = true
  let dataNull2 = true

    // 获取发布记录，添加到releaseRecord
  let params = { page: 1, size: 100, organizationId: route.query.organizationId }
  get('package/page', params).then((res: any) => {
    releaseRecord.value.push(...res.data.list)
  })
  const releaseRecord = ref([
    {
      id: '1',
      name: 'Tom',
      organizationId: 1,
      organizationName: 'xyq',
      uploadTime: 1648878643529,
      uploaderId: 35,
      uploaderName: 'www',
      version: '0.0.1'
    }
  ])

  // 判断发布记录数组是否为空，空则不显示
  if (releaseRecord.value.length == 0) {
    dataNull1 = false
  }else {dataNull2 = false}

  // 删除某一条记录
  const deleteRow = (index: number) => {
    // releaseRecord.value.splice(index, 1)
    alert('不能删除！')
  }

  // 获取organizationId值
  // console.log( route.query.organizationId);


</script>

<style scoped></style>
