<template>
  <div class="yu-drap-box">
    <div class="left" v-bind:style="leftStyle" id="left">
      <slot name="yu-left"></slot>
    </div>
    <div class="lineMove" id="drapLine"  @mousedown.stop="mouseDown" ></div>
    <div class="right" v-bind:style="rightStyle" id="right">
      <slot name="yu-right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    leftStyle: {
      type: String,
      default: ''
    },
    rightStyle: {
      type: String,
      default: ''
    },
    maxWidth: {
      type: Number,
      default: 400
    },
    minWidth: {
      type: Number,
      default: 60
    }
  },
  data () {
    return {
      drapLine: undefined,
      menuLeft: undefined,
      menuRight: undefined,
      isDrap: false,
      mouseX: 0
    }
  },
  render: function (createElement) {
    var left = this.$slots.left
    var body = this.$slots.default
    var right = this.$slots.right
    return createElement('div', [
      createElement('left', left),
      createElement('main', body),
      createElement('right', right)
    ])
  },
  created () {
    var that = this
    this.$nextTick(function () {
      that.drapLine = document.getElementById('drapLine')
      that.menuLeft = document.getElementById('left')
      that.menuRight = document.getElementById('right')
      var historyWidth = localStorage.getItem('sliderWidth')
      if (historyWidth) {
        that.menuLeft.style.width = historyWidth
        that.menuRight.style.left = historyWidth
      }
    })
  },
  methods: {
    mouseDown (ev) {
      var e = ev || window.event
      // e.preventDefault()
      this.mouseX = e.clientX - this.menuLeft.offsetWidth
      this.isDrap = true
      document.onmousemove = this.mouseMove
      document.onmouseup = this.mouseUp
    },
    mouseMove (ev) {
      if (this.isDrap === true) {
        var e = ev || window.event
        var leftWidth = e.clientX - this.mouseX
        leftWidth = leftWidth < this.minWidth ? this.minWidth : leftWidth
        leftWidth = leftWidth > this.maxWidth ? this.maxWidth : leftWidth
        this.menuLeft.style.width = leftWidth + 'px'
        this.menuRight.style.left = leftWidth + 'px'
      }
    },
    mouseUp (e) {
      console.log('33')
      this.isDrap = false
      document.onmousemove = null
      document.onmouseup = null
      localStorage.setItem('sliderWidth', this.menuLeft.style.width)
    }
  }
}
</script>
<style lang="less" scoped>
.yu-drap-box {
  width:100%;
  height: 100%;
  .left {
    width: 250px;
    background-color: #25313e;
    height: 100%;
    float: left;
    overflow: hidden;
  }
  .lineMove{
    cursor: w-resize;
    float: left;
    height: 100%;
    width: 5px;
  }
  .right {
    width: 250px;
    height: 100%;
    float: left;
    background-color: gray
  }
}
</style>
