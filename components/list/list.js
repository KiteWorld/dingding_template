import { TASK_TYPE_NAME } from "../../common/emun"
import { getList } from '../../api/repairApply'
Component({
  mixins: [],
  data: {
    TASK_TYPE_NAME,
    pageNo: 1,
    pageSize: 10,
    total: 0,
    orders: [],
  },
  props: {
    title: "",
    status: "",
    feildMap: {
      id: 'applyId',
      orderNo: "applyNo",
      status: 'status'
    },
    listProps: {
      api: '',
      param: {}
    },
    detailMode: 'id', 
  },
  didMount() {
    this.props.onGetInstance(this)
    this.load()
  },
  didUpdate() {
  },
  didUnmount() { },

  methods: {
    toUp(e) {
      console.log(e)
    },
    onScroll() {
      this.load()
    },

    onClickItem(e) {
      const param = this.props.detailMode !== "item" ? e.target.dataset.id : e.target.dataset.item
      this.props.onClickItem(param)
    },

    async load() {
      const { pageSize, pageNo, total, orders } = this.data
      if (total !== 0 && total <= orders.length) return
      const res = await getList(this.props.listProps.api, {
        pageNo,
        pageSize,
        ...this.props.listProps.param
      })
      if (!res) return false
      this.setData({
        orders: orders.concat(res.records)
      })
      this.data.total = res.total
      this.data.pageNo++
      return true
    },

    async init() {
      this.setData({
        pageNo: 1,
        total: 0,
        orders: []
      })
      return this.load()
    }
  }
});
