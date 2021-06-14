import { debounce } from "./utils";
import BackTop from 'components/content/backTop/BackTop'

//监听项目图片加载
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    // 1.图片加载完成的事件监听
    //对于refresh非常频繁问题，进行防抖操作，this.$refs尽量在mounted中使用。如果用在created中，可能会出现调用不成功
    this.refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      this.refresh()
    }
    // 监听图片加载传出的事件，调用刷新功能
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

//点击回到顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    // 1.判断BackTop是否显示
    BackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    },
    // 2.回到顶部
    backClick() {
      //this.$refs.scroll访问scroll组件，然后调用scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
  }
}
