<template>
  <!-- 所有的item都展示同一个图片，同一个文字 -->
  <div class="tab-bar-item" @click="itemClick">
    <!-- 最外层的div定义其他属性，避免slot被替换时把属性也替换掉了 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- <div :class="{ active: isActive }"><slot name="item-text"></slot></div> -->
    <!-- <div :style="isActive ? { color: activeColor } : {}"><slot name="item-text"></slot></div> -->
    <!-- 当绑定的class或者style后跟的对象或者数组中的内容，如果过于复杂，可以放在一个methods或者computed中 -->
    <!-- 当模板里的某一内容过于复杂都可以抽出来放在一个methods或者computed中 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <img src="./assets/img/tabbar/home.svg" alt="" />
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      // home => home1(/home) = true
      // home => home1(/category) = false
      // home => home1(/cart) = false
      // home => home1(/profile) = false
      // 找字符串 找不到即为-1
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  /* tabbar常用高度49px */
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 去掉图片下面3px的空隙 */
  vertical-align: middle;
  margin-bottom: 2px;
}

/* .active {
  color: red;
} */
</style>>