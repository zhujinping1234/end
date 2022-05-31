<template>
  <button>abc</button>
  <div id="___codeeditordivid"></div>
</template>

<script lang="ts" setup>
  //TODO 这个id需要能确保唯一，需要UUID或者多个随机数/
  import sdk from '@stackblitz/sdk'
  import { VM } from '@stackblitz/sdk/typings/VM'
  import { ref, watchEffect, onMounted } from 'vue'
  import type { ICodeEditor, PageInstance, AppInstance, SlotChildren } from './CodeEditor'
  import { createVueTemplate } from './VueFileUtil'
  import { useStore } from 'vuex'

  const $store = useStore()

  let props = defineProps<{ appName: string }>()

  const emits = defineEmits<{
    (event: 'appLoaded', appInstance: AppInstance): void
  }>()

  let appdata = ref(
    JSON.parse(
      localStorage.getItem(props.appName) ||
        JSON.stringify({ id: '', name: props.appName, pages: [] })
    )
  )

  appdata.name = props.appName
  console.log('--------' + JSON.stringify(appdata.value))
  let sbvm: VM | null = null

  onMounted(async () => {
    // Create the project payload.
    sdk
      .embedProjectId('___codeeditordivid', props.appName, {
        openFile: 'src/components/Login.ts',
        hideExplorer: true,
        hideDevTools: false,
        devToolsHeight: 33,
        height: 800
      })
      .then((vm) => {
        sbvm = vm
        vm.getFsSnapshot().then((files) => {
          emits('appLoaded', loadApp())
        })
      })
  })

  const refreshEditorPages = function (pages: PageInstance[]) {
    let files: { [k: string]: string } = {}
    for (let page of pages) {
      let vueFileFullName: string = 'src/components/' + page.name + '.vue'
      ;(<any>files)[vueFileFullName] = createVueTemplate(page)
    }

    sbvm?.applyFsDiff({ create: files, destroy: [] })
  }

  let saveApp = function (appInst: AppInstance) {
    appdata.value = appInst
    // Object.assign((appdata, appInfo));
    refreshEditorPages(appInst.pages)
  }

  // 监听vuex值，保存代码
  watchEffect(() => {
    // refreshEditorPages($store.getters.getPages)
  })

  let loadApp = function (): AppInstance {
    let appInfo: AppInstance = appdata.value as AppInstance
    if (!appInfo.name) {
      appInfo.name = props.appName
    }
    return appInfo
  }

  defineExpose({ saveApp, loadApp } as ICodeEditor)
</script>
