<template>
  <!--
        成员角色管理
团队角色（所有者/管理者/普通成员），只有所有者才能改）
昵称


项目及角色列表（项目名、角色）



两种情况：
a.从成员管理进入
b.从邀请进入，完成时应能提示链接已经copy到剪贴板


    -->
  <!-- 弹窗界面 -->
  <div class="m-dialog-mask">
    <div class="m-modal">
      <div class="m-modal-content">
        <div @click="onClose" class="u-close">&#10006;</div>
        <div class="m-modal-header">
          <div class="u-head">标题</div>
        </div>
        <!-- 正文内容    -->

        <div class="m-modal-body">
          <!-- <label>项目名</label> <label>角色</label>   -->
          <div class="box">
            <!-- <label> 项目一       </label> -->
            <el-table :data="tableData" stripe style="width: 100%" :popper-append-to-body="false" ref="SelectChose">
              <el-table-column prop="name" label="项目名" width="180" />
              <el-table-column prop="data" label="备注" width="180" />
              <el-table-column prop="job" label="权限">
                <!-- 下拉列表 -->
                <template #default="scope">
                  <el-select    size="mini"  placeholder="Select"
                   
                    v-model='scope.row.job'
                    @visible-change="handleCellEdit(scope.$index,scope.row)" 
                    :popper-append-to-body="false" >
                  <el-option value="is_hot_tag" label="管理"></el-option>
                  <el-option value="is_latest_track_tag" label="只能查看"></el-option>
                  <el-option value="is_new_subhangye_tag" label="禁止访问"></el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="m-modal-footer" v-show="footer">
          <button class="u-cancel" @click="onClose">取消</button>
          <button class="u-confirm" @click="onConfirm">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Project } from '@stackblitz/sdk/typings/interfaces'
import { ref, reactive } from 'vue'
import { routerViewLocationKey } from 'vue-router'
 import { useStore } from './store'
  // sjo
  const tableData = useStore().projectListOfCurrentTeam



  // 下拉列表框
// callback是回调参数，scope是从表格传过来的参数
const SelectChose=ref(null)
   
const handleCellEdit =()=> {
    console.log(SelectChose.value.name)
    }

  //
  const hadleCellEdit = () => {
    //todo
  }
  // const props = defineProps({
  //   msg: String
  // })import { defineEmits } from 'vue'

  //回调父组件隐藏弹窗
  const emit = defineEmits(['onClose'])
  const onClose = () => {
    //todo
    emit('onClose')
  }

  const footer = () => {}

  const onConfirm = () => {
    emit('onClose')
  }
</script>

<style lang="less" scoped>
/deep/.el-table{
  overflow:visible !important;
}
/deep/.el-table .cell{
  overflow:visible !important;
}
/deep/.el-table__body-wrapper{
  overflow:visible !important;
}
  .m-dialog-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000000;
    background: rgba(0, 0, 0, 0.45);
    .m-modal {
      width: 720px;
      position: relative;
      top: calc(50% - 240px);
      margin: 0 auto;
      .m-modal-content {
        position: relative;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        .u-close {
          position: absolute;
          top: 16px;
          right: 24px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 18px;
          line-height: 22px;
          cursor: pointer;
          transition: color 0.3s;
          transform: rotate(45deg);
          &:hover {
            color: rgba(0, 0, 0, 0.75);
          }
        }
        .m-modal-header {
          height: 22px;
          padding: 16px 24px;
          color: rgba(0, 0, 0, 0.65);
          border-radius: 4px 4px 0 0;
          border-bottom: 1px solid #e8e8e8;
          .u-head {
            margin: 0;
            color: rgba(0, 0, 0, 0.85);
            font-weight: 500;
            font-size: 16px;
            line-height: 22px;
            word-wrap: break-word;
          }
        }
        .m-modal-body {
          height: 324px;
          padding: 24px;
          font-size: 16px;
          line-height: 1.5;
          word-wrap: break-word;
          .box {
            display: flex;
            flex-direction: row;
          }
        }
        .m-modal-footer {
          padding: 10px 16px;
          text-align: right;
          border-top: 1px solid #e8e8e8;

          .u-cancel {
            height: 32px;
            line-height: 32px;
            padding: 0 15px;
            font-size: 16px;
            border-radius: 4px;
            color: rgba(0, 0, 0, 0.65);
            background: #fff;
            border: 1px solid #d9d9d9;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            &:hover {
              color: #40a9ff;
              border-color: #40a9ff;
            }
          }
          .u-confirm {
            margin-left: 8px;
            height: 32px;
            line-height: 32px;
            padding: 0 15px;
            font-size: 16px;
            border-radius: 4px;
            background: #1890ff;
            border: 1px solid #1890ff;
            color: #fff;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            cursor: pointer;
            &:hover {
              color: #fff;
              background: #40a9ff;
              border-color: #40a9ff;
            }
          }
        }
      }
    }
  }
</style>
