const state = {
  StyleData: {
    'd8a972e5-40f3-4dce-84dd-48c4d6154b53': '',
    'd8a972e5-40f3-4dce-84dd-48c4d6154b52': '',
    'cbce1ed8-b8ed-4fc7-bcdc-1d4e66e95e61': '',
    e75846c89fb0444c90e9159c5ea73fc:
      '.col[data-v-0cec109e]{display:flex;width:100%;height:700px}.col-f[data-v-0cec109e]{background:#001529;flex:0 0 200px;max-width:200px;min-width:200px;width:200px;overflow:auto}.col-super[data-v-0cec109e]{overflow-x:hidden;display:flex;flex-direction:column;flex:auto}.col-t[data-v-0cec109e]{width:100%;max-height:60px;min-height:60px;height:60px;background:#001529}.col-b[data-v-0cec109e]{flex:auto}     ',
    '8725ae05-efd8-409c-bf8c-54751dc86e94': '',
    'db915494-64b1-4c51-baee-b3b0440f163f': '',
    '86dbdea3-826f-47a7-9a1d-09d4bb401470': '',
    'd924f9ba-10ca-434b-bc11-28249a806175': '',
    'cd4003be-98d0-4614-b43f-fa6a8e93648a': '',
    '1eaa3ae9-8c61-4ff6-bbd3-1fee9e1a64d9': '',
    '4c8a0c089e2e4deeba26f22a370b8780': '',
    '51afw3e21f6a51s32g1r165a13s2d1g5':
      '.outer[data-v-8cece13e]{width:20%;height:120px;border:1px solid rgb(230,230,230);border-radius:5px;box-shadow:2px 2px 10px #e0e0e0}.title[data-v-8cece13e]{height:35px;line-height:50px;font-size:20px;font-weight:900;text-align:center}.content[data-v-8cece13e]{font-size:30px;font-weight:500;text-align:center;margin-top:20px}',
    '1eaa3ae9-8c61-4ff6-bbd3-1fee9e1a64d1':
      '.col[data-v-eac7af96]{display:flex;width:100%;height:700px;flex-direction:column}.col-f[data-v-eac7af96]{background:#001529;flex:0 0 60px;max-height:60px;min-height:60px;height:60px}.col-super[data-v-eac7af96]{display:flex;flex:auto}.col-t[data-v-eac7af96]{overflow:auto;max-width:200px;min-width:200px;width:200px;height:100%;background:#001529}.col-b[data-v-eac7af96]{overflow:auto;flex:auto}      '
  }
}

const mutations = {
  setCompStyle: (state: any, obj: any) => {
    Object.keys(state.StyleData).forEach(function (key) {
      if (key == obj.compID) {
        state.StyleData[key] = obj.compStyle
        return
      }
    })
  }
}

export default {
  state,
  mutations
}
