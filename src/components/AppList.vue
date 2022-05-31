<script setup lang="ts">
  import { reactive } from 'vue'
  import { defineComponent } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const data = reactive({
    divList: [{ name: '应用1' }],
    count: 0
    // demoList:[
    //   {
    //     id:1,title:'demo1'
    //   },
    //   {
    //     id:2,title:'demo2'
    //   },
    //   {
    //     id:3,title:'demo3'
    //   },
    //   {
    //     id:4,title:'demo4'
    //   },
    // ],
  })

  defineProps<{ msg: string }>()
  //新建项目
  ///
  const addAPP = () => {
    var name = prompt('应用名称')

    if (name) {
      //填写内容并“确定”
      // console.log(name);
      data.divList.push({ name: name })
    } else if (name === '') {
      //未填写但“确定”
      data.count++
      data.divList.push({ name: '默认项目' + data.count })
    } else {
      //“取消”事件
      alert('你已取消当前操作')
    }

    // console.log(name);
    // data.divList.push({name:name});
  }

  //删除
  const remove = (i) => {
    ElMessageBox.confirm('确定要删除当前这个应用项目吗?', '删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    })
      .then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功'
          //删除当前app
        }),
          data.divList.splice(i, 1)
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '删除已取消'
        })
      })
    return {
      remove
    }
  }

  //点击跳转s
  const jump = (i) => {
    router.push('/app/vitejs-vite-jcy7tb/design/0e8f2c8af85c4a548ebfe9b16dc297ab')
  }
</script>

<template>
  <div class="main">
    <div class="top">
      <input type="button" value="新建" @click="addAPP" />
    </div>
    <div class="buttom">我创建的...</div>

    <div class="myapp" v-for="(item, pos) in data.divList">
      <!-- v-for="(item, pos) in data.divList" -->
      <div class="application">
        <input type="button" class="jump" @click="jump(pos)" :value="item.name" />
        <el-button class="remove" type="text" @click="remove(pos)">应用删除</el-button>
      </div>
    </div>
    <div> </div>

    <!-- <li v-for="item in data.demoList">
        <router-link :to="'/demo/' + item.id">
          {{item.title}}
        </router-link>
      </li> -->
  </div>
</template>

<style scoped>
  .top {
    height: 30%;
    width: 100%;
    background-color: pink;
    flex: auto;
  }
  .jump {
    height: 100px;
    width: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
  }
  .remove {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .buttom {
    height: 70%;
    width: 100%;
    background-color: powderblue;
  }
  #btn {
    content: left;
  }
  .application {
    height: 200px;
    width: 250px;
    background-color: pink;
    display: flex;
    float: left;
    position: relative;
    margin-left: 10px;
    margin-bottom: 10px;
  }
</style>
