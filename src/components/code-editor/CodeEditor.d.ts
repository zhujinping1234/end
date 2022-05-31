import { AppInstance } from '../../model/AppInstanceModel'

/**
 * 在给CodeEditor设定appName属性之后，
 * 可以保存savePage/saveApp保存数据，会被自动同步到localstorage供下次使用，可以loadApp获取信息验证。
 */
export interface ICodeEditor {
  /**保存整个App */
  // eslint-disable-next-line no-unused-vars
  saveApp: (appInstance: AppInstance) => void

  /**加载整个APP的数据*/
  loadApp: () => AppInstance
}
