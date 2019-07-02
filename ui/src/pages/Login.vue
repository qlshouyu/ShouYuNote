<template>
  <div class="yu-box">
    <el-card class="yu-login-box" body-style="{background-color: white;padding: 0px !important;}">
      <div slot="header" class="header" >
        <span>登录</span>
      </div>
      <div class="yu-content">
        <el-form  label-width="60px" >
          <el-form-item label="用户名">
          <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="pwd"></el-input>
          </el-form-item>
         <el-button type="primary" class="yu-submit" @click="submit()">提交</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 'admin',
      pwd: 'admin'
    }
  },
  methods: {
    submit: function () {
      window.location.href = '/index'
    }
  }
}
</script>

<style lang="less" scoped>
.yu-box {
  width: 100%;
  height: 100%;
  background-color: #5d7ad8;
  .yu-login-box {
    width: 340px;
    height: 300px;
    position:absolute;
    right: 200px;
    top: 50%;
    margin-top: -170px;
    background-color: #5887ee;
    border: 0px !important
  }
  .header {
    background-color: #5887ee !important;
    padding: -20px !important;
    color: white
  }

}
.el-card__body {
  background-color: white
}
.yu-content {
  background-color: white;
  padding: 20px;
  height: 300px;
  .yu-submit {
    width: 100%
  }
}
</style>
