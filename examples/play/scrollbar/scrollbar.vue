<template>
  <el-scrollbar :view-style="viewStyle">
    <li v-for="item of list" :key="item"
        class="scroll-item">
      {{item}}
    </li>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'explore-srollbar',
  data () {
    return {
      list: [1,2,3,4,5,6,7,8,9],
      viewStyle: {
        height: '300px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrap {
  height: 300px;
  overflow: scroll;
}
.scroll-item {
  height: 60px;
  background-color: white;
}

.wrap {
  height: 200px;
  .inner {
    height: 300px;
    background-image: linear-gradient(#e66465, #9198e5);
  }
}
</style>