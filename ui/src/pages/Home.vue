<template>
  <div class="yu-container">
    <div class="top"></div>
    <div class="main">
      <yu-drap-view>
        <v-left slot="yu-left"></v-left>
      </yu-drap-view>
    </div>
  </div>
  <!-- <el-container>
    <el-header></el-header>
    <el-container>
      <el-aside width="180px">
        <v-left ></v-left>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container> -->
</template>
<script>
import vLeft from '../components/comm/Left.vue'
// import cps from '../assets/js/RemoteJs.js'
export default {
  name: 'Home',
  components: {
    vLeft
  },
  data () {
    return {
      dialogOption: {
        show: false,
        component: undefined,
        title: '提示'
      }
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
.yu-container {
  height: 100%;
  width: 100%;
  .top {
    height: 60px;
    background-color:#000000;
    color: white;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
  }
  .main{
    width: 100%;
    height: 100%;
    padding-top: 60px;
    position: relative;
    top: 0px;
    left: 0px;
  }
}
</style>
