<template>
    <el-table :data="projectList" style="width: 100%"  >
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Msg" prop="msg" />
      <el-table-column label="操作" align="right">

        

        <template #default="scope">

          <el-button size="small" type="danger" 
          onclick="test()"
            >设计</el-button
          >
          <el-button
            size="small"
            type="danger"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageMsg.pagenum"
        :page-size="pageMsg.pagesize"
        background
        layout="prev, pager, next"
        :total="pageMsg.total"
      >
      </el-pagination>
    </div>
    -->
  
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useStore} from './store' 

const props = defineProps({
  teamId: {
    type: String,
    required:false
  }
})


useStore().switchTeam(props.teamId);

const projectList=ref(useStore().projectListOfCurrentTeam);






</script>