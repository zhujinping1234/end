import { defineStore } from 'pinia'

 interface User {
   id: number
   name: string
   username: string
   phone: string
   createTime: string
   updateTime: string
 }

 type TeamRole='owner' | 'admin' | 'member'
 interface Team {
   id: number
   name: string
   role: TeamRole
   nickname: string
   status: MemberInviteState
   inviteId: number
   inviteTime: number
 }

type ProjectRole = 'owner' | 'collaborator' | 'readonly';
 interface Project {
   id: number
   name: string
   msg: string
   projectRole: ProjectRole
   updateTime: number
 }

type MemberInviteState = 'inviting' | 'ok';
 // 成员信息
interface MemberAdmin {
  id: number
  name: string
  data: string
  status: MemberInviteState
  memberAdmintRole: TeamRole
  updateTime: number
}


 interface State {
   currentUser: User | null
   currentTeam: Team | null
 }

 // useStore could be anything like useUser, useCart
 // the first argument is a unique id of the store across your application
 export const useStore = defineStore('main', {
   state: (): State => ({
     currentUser: null,
     currentTeam: null
     //用户信息
     //用户登录信息
     //当前切换的团队信息
   }),
   getters: {
    

     /**
      * 当前用户在当前团队中是否为管理员角色,或者所有者角色
      */
     isAdmin(): boolean {
       return true;
       //return this.currentTeam ? ['admin', 'owner'].includes(this.currentTeam.role) : false;
     },

     /**
      * 当前用户所属的所有团队
      * @returns 所有团队
      */
     teams() {
       return [
         { name: 'team1', id: 'team1' },
         { name: 'team2', id: 'team2' }
       ]
     },

     
         //  当前团队下所有成员信息
    memberAdminListOfCurrentTeam(): MemberAdmin[] {
      return [{ id: 1, name: '我是友琪', data: '不，我才是友琪', status: 'inviting', memberAdmintRole: 'admin', updateTime: 0 }]
     },
    
     projectListOfCurrentTeam(): Project[] {
       return [{ id: 1, name: 'test1', msg: 'test1', projectRole: 'owner', updateTime: 0 },
       { id: 2, name: 'test2', msg: 'test11', projectRole: 'collaborator', updateTime: 0 },
       { id: 3, name: 'test3', msg: 'test111', projectRole: 'readonly', updateTime: 0 }]
     },

     /**
      *
      * @returns 当前登录的用户信息
      */
     loginUser(state) {
       return state.currentUser
     }
   },

   actions: {
     /**
      * 切换团队
      * @param teamid 团队id 或者 undefined ,当undefined的时候表明为切换到当前用户的默认团队
      */
     switchTeam(teamid: string | undefined) {},
     /**
      * 根据邀请id获取邀请信息
      * @param inviteId 邀请ID
      * @returns
      */
     getInvitation(inviteId: String) {
       return { who: 'lxf', teamName: '123', teamId: '123', role: 'abc' }
     },
     /**
      * 当前用户接受邀请
      * @param inviteId 邀请id
      */
     acceptInvitation(inviteId: String): void {},
     /**
      * 当前用户拒绝邀请
      * @param inviteId 邀请id
      */
     declineInvitation(inviteId: Number): void {},

     /**
      * 登录
      * @param username 用户名
      * @param password 密码
      * @returns
      */
     async login(username: string, password: string) {
       return await new Promise((resolve, reject) => {
         this.currentUser = { lxf: 'lxf' }
         resolve(this.currentUser)
       })
     }
   }
 })
