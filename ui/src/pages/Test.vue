<template>
  <div>test</div>
</template>
<script>
export default {
  name: 'Test',
  created: function () {
    this.getData()
  },
  methods: {
    getData: function () {
      var that = this
      this.$get({
        url: that.$config.menu,
        success: function (data) {
          console.info(data)
        }
      })
      this.$get({
        url: that.$config.app,
        success: function (data) {
          console.info(data)
        }
      })
    }
  }
}
</script>
<style>
</style>
