<template>
  <div class="leftMenu" >
    <el-menu router style="height:100%"
          :default-active="$route.path"
          background-color="#41586e"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="el-menu-vertical-demo">
         <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>笔记本</span>
            </template>
            <el-menu-item index="1-1">笔记本一</el-menu-item>
            <el-menu-item index="1-2">笔记本二</el-menu-item>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="/report">
            <span slot="title">统计分析</span>
          </el-menu-item>
          <el-menu-item index="/dependent">
            <span slot="title">依赖服务信息</span>
          </el-menu-item>
          <el-menu-item index="/process">
            <span slot="title">转写流程</span>
          </el-menu-item>
        </el-menu>
  </div>
</template>
<script>
export default {
  name: 'left',
  data () {
    return {
      isCollapse: true,
      leftWidth: '60px'
    }
  },
  methods: {
    hover: function () {
      this.isCollapse = false
      console.info('select')
      this.leftWidth = '260px'
    },
    unHover: function () {
      console.info('no select')
      this.isCollapse = true
      this.leftWidth = '60px'
    }
  }
}
</script>
<style lang="less" scope>
@import '../../assets/css/left.less';
</style>
