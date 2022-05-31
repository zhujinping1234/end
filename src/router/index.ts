import { createRouter, createWebHistory } from 'vue-router'

import AppList from '../components/AppList.vue'
import AppDetail from '../components/AppDetail.vue'
import DesignServiceWithSuspense from '../components/DesignServiceWithSuspense.vue'
import uniApiHomeLayout from '../layout/uniApi/homeLayout/index.vue'
import Login from '../components/login/Login.vue'
import Register from '../components/register/Register.vue'
import Home from '../components/coworker/Home.vue'
import Collaborators from '../components/collaborators/Collaborators.vue'
import ReleaseRecord from '../components/release-record/ReleaseRecord.vue'
import ProjectListVue from '@/components/coworker/ProjectList.vue'
import MemberAdminListVue from '@/components/coworker/MemberAdminList.vue'
import InvitationVue from '@/components/coworker/Invitation.vue'
const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          name: 'default',
          path: '',
          component: ProjectListVue
        },
        {
          name: 'team',
          path: ':teamid',
          component: ProjectListVue
        },
        {
          name: 'teamMember',
          path: ':teamid/members',
          component: MemberAdminListVue,
          props: true
        },
        {
          name: 'invite',
          path: 'invite/:inviteId',
          component: InvitationVue,
          props: true
        }
      ]
    },

    {
      path: '/Collaborators',
      component: Collaborators
    },
    {
      path: '/Register',
      component: Register
    },
    {
      path: '/ReleaseRecord',
      component: ReleaseRecord
    },
    {
      path: '/AppList/:projectId',
      name: 'AppList',
      component: AppList
    },
    // TODO 需要修改路由规则
    {
      path: '/app/:appInstanceId',
      component: AppDetail,
      children: [
        {
          name: 'design',
          path: 'design/:componentInstanceId',
          component: DesignServiceWithSuspense
        },
        {
          // 代码页
          path: 'uniCode',
          name: 'uniCodeHome',
          component: () => import('../pages/uniApi/home/codeDetails/emptyPage.vue')
        },
        {
          path: 'uniApi',
          component: uniApiHomeLayout,
          children: [
            {
              path: '',
              name: 'uniApiHome',
              component: () => import('../pages/uniApi/home/index.vue')
            },
            {
              path: 'apiManageDetails/:id',
              name: 'apiManageDetails',
              component: () => import('../pages/uniApi/home/apiManageDetails/index.vue'),
              props: true
            },
            {
              path: 'addDataModel',
              name: 'addDataModel',
              component: () =>
                import(
                  '../layout/uniApi/homeLayout/components/dataModelMenu/components/addDataModel/index.vue'
                ),
              props: true
            },
            {
              path: 'dataModelDetails/:id',
              name: 'dataModelDetails',
              component: () => import('../pages/uniApi/home/dataModelDetails/index.vue'),
              props: true
            }
          ]
        }
      ]
    }
  ]
})

export default router
