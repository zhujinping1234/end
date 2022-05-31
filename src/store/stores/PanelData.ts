import { defineStore } from 'pinia'
import { PanelInstance } from '../../model/AppInstanceModel'
export let panelStore = defineStore('main1', {
  state: (): PanelInstance => {
    return {
      CompId: '',
      CompName: '',
      json: {},
      cssJson: '',
      pageContainer: [],
      compExampleId: '',
      attributePanelData: {},
      structuralCssJson: '',
      structuralExampleStyleJson: '',
      structuralData: [],
      current: { id: '', name: '', comp_id: '', finput: '' },
      getCurrentPage: {},
      currentRouter: ''
    }
  }
})
