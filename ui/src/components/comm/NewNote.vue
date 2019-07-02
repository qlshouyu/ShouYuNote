<template>
  <ul class="list">
    <li v-for="item in list" :key="item.id">
      {{item.name}}
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {id: '1', name: '日记一', time: '2019-11-12 10:12'},
        {id: '2', name: '日记二', time: '2019-11-12 10:01'}
      ]
    }
  }
}
</script>
<style lang="less">
.list {
  width: 100%;
  height: 100%;
  li {

  }
}
</style>
