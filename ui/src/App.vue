<template>
  <div ref="mainApp" style="height:100%" >
    <router-view/>
    <el-dialog  modal-append-to-body modal  ref="dialogGlob" :title="dialogOption.title" :visible.sync="dialogOption.show">
      <div ref="divBox" id="divBox"></div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'App',
  data () {
    return {
      dialogOption: {
        show: false,
        component: undefined,
        title: '提示'
      }
    }
  }
}
</script>

<style>
@import "./assets/css/main.css";
#app {
  width: 100%;
  height: 100%;
}
body,html {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px
}
</style>
