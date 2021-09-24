import { toast } from "/utils/utils"

export const listMixin = {
  data: {
    search: '',
    activeTab: 0,
  },

  //钉钉小程序无法通过 ref 或者 this.selectComponent 来获取实例，只能通过子组件给父组件传参的方式实现
  onGetInstance(instance) {
    this.list = instance
  },
  onGetSerachInstance(instance) {
    this.searchComp = instance
  }
}

export const detailMixin = {
  data: {
    disabled: false,
    loading: false,
    delWorkTaskPartss: [],
    delWorkTaskProjects: []
  },
  inputRemark(value) {
    this.setData({
      "formResult.handleResultRemark": value
    })
  },
  delProject(delIndex) {
    const workTaskProjects = this.data.formResult.workTaskProjects
    const delItem = workTaskProjects[delIndex]
    const param = {
      "formResult.workTaskProjects": workTaskProjects.filter((x, index) => index != delIndex),
    }
    if (delItem && delItem.workTaskId) {
      delItem.isDeleted = true
      param.delWorkTaskProjects = [...this.data.delWorkTaskProjects, delItem]
    }
    this.setData(param)
  },
  delParts(delIndex) {
    const workTaskPartss = this.data.formResult.workTaskPartss
    const delItem = workTaskPartss[delIndex]
    const param = {
      "formResult.workTaskPartss": workTaskPartss.filter((x, index) => index != delIndex),
    }
    if (delItem && delItem.workTaskId) {
      delItem.isDeleted = true
      param.delWorkTaskPartss = [...this.data.delWorkTaskPartss, delItem]
    }
    this.setData(param)
  },
}

export const mixins = {
  listMixin,
  detailMixin
}