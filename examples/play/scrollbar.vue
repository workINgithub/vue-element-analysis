<template>
  <el-scrollbar>
    <div class="scroll-wrap">
      <li v-for="item of list" :key="item"
          class="scroll-item">
        {{item}}
      </li>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'explore-srollbar',
  data () {
    return {
      list: [1,2,3,4,5,6,7,8,9]
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrap {
  height: 300px;
}
.scroll-item {
  height: 60px;
  background-color: coral;
}
</style>