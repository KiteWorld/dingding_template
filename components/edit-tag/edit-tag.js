Component({
  mixins: [],
  data: {},
  props: {
    tips: '无', // tagsList 为空数组时，显示
    title: "", //标题
    titleDes: "点击选择", //描述信息
    toUrl: "", //跳转页面
    tagsList: [],
    textFeild: "", // 
    disabled: false, // 为 true 只显示 tag
    extraParam: null, // 额外参数
    hasLine: true, //是否下边框
    isShowTitle: true, //是否显示标题
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    toSelect() {
      my.navigateTo({
        url: this.props.toUrl
      });
    },
    toDel(e) {
      const index = e.target.dataset.index
      this.props.onDel(index, this.props.extraParam)
    },
    onClick(e) {
      if (this.props.onClick) {
        const index = e.target.dataset.index
        this.props.onClick(index)
      }
    }
  },
});
