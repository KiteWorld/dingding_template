import { isEmpty } from "../../utils/utils"

Component({
  mixins: [],
  data: {
    result: null
  },
  props: {
    tagList: [],
    value: null,
    disabled: false
  },
  didMount() {
    this.setData({
      result: this.props.value
    })
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    selectResult(e) {
      if (this.props.disabled) return
      const value = e.target.targetDataset.value
      if (isEmpty(value)) {
        this.setData({
          result: value
        })
        this.props.onSelect(value)
      }
    },
  },
});
