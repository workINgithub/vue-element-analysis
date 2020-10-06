<template>
  <div style="margin: 20px;">
    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
    <!-- <el-tag>play ground</el-tag> -->
    <!-- <input type="text">
    <el-switch v-model="switchVal" ref="switch" @input="reportInactiveValue"></el-switch> -->

    <explore-scroll-bar />
  </div>
</template>

<script>
import ExploreScrollBar from './scrollbar/scrollbar.vue';
  export default {
    components: {
      ExploreScrollBar
    },
    data() {
      return {
        input: 'Hello Element UI!',
        switchVal: true
      };
    },

    mounted () {
      // this.$refs.switch.focus()
    },

    methods: {
      // askAPI (value) {
      //   console.log(value)
      //   setTimeout(() => {
      //     console.log('2s')
      //     this.switchVal = ! this.switchVal
      //   }, 2000)
      // },
      // reportInactiveValue (iv) {
      //   console.log(iv)
      // }
    }
  };
</script>