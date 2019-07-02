// 任务相关
import WaveSurfer from 'wavesurfer'
export default {
  wavesurfer: undefined,
  vue: undefined,
  initResult: function (lattices) {
    var results = []
    for (var i = 0; i < lattices.length; i++) {
      var o = lattices[i]
      var strResult = o.cnOnebestJson
      var result = JSON.parse(strResult)
      var ws = result.ws
      var strWord = ''
      for (var w = 0; w < ws.length; w++) {
        var wsItem = ws[w]
        var cw = wsItem.cw
        for (var cwIndex = 0; cwIndex < cw.length; cwIndex++) {
          var cwItem = cw[cwIndex]
          var s = cwItem.w
          strWord += s
        }
      }
      var b = o.beginTime / 100 + '秒'
      var e = o.endTime / 100 + '秒'
      var obResult = {beginTime: o.beginTime, endTime: o.endTime, time: b + ' ~ ' + e, word: strWord}
      results.push(obResult)
    }
    return results
  },
  formatTime: function (seconds) {
    let min = Math.floor(seconds / 60)
    let second = seconds % 60
    var hour
    var newMin
    var time
    if (min > 60) {
      hour = Math.floor(min / 60)
      newMin = min % 60
    }
    if (second < 10) { second = '0' + second }
    if (min < 10) { min = '0' + min }
    time = (hour ? (hour + ':' + newMin + ':' + second) : (min + ':' + second))
    return time
  },
  // 初始化播放器
  initPlay: function (vue) {
    var that = this
    this.vue = vue
    that.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#95A0B5',
      progressColor: '#ffffff',
      cursorColor: '#F8E71C',
      barWidth: 1,
      height: 66,
      hideScrollbar: true,
      xhr: { withCredentials: true }
    })
    // 加载成功
    that.wavesurfer.on('ready', () => {
      that.vue.allSecond = this.wavesurfer.getDuration()
      that.vue.duration = this.formatTime(Number(this.wavesurfer.getDuration().toFixed(0)))
      // 播放中
      that.vue.wavesurfer.on('audioprocess', () => {
        let tempSecond = that.wavesurfer.getCurrentTime()
        that.vue.currentTimeS = tempSecond * 1000
        that.vue.playProgress = Number(((Number(tempSecond) / Number(that.vue.allSecond)) * 100).toFixed(0))
        that.vue.currentTime = that.formatTime(Number(tempSecond.toFixed(0)))
        that.vue.scrollTag = true
      })
      // seek
      that.wavesurfer.on('seek', pos => {
        let currentTime = pos * that.wavesurfer.getDuration()
        that.vue.currentTimeS = currentTime * 1000
        that.vue.currentTime = that.formatTime(Number(currentTime).toFixed(0))
        that.vue.playProgress = Number(((Number(currentTime) / Number(that.vue.allSecond)) * 100).toFixed(0))
      })
      // seek
      that.wavesurfer.on('finish', pos => {
        that.vue.isPlay = false
        that.vue.scrollTag = false
      })
    })
    return this.wavesurfer
  },
  play: function () {
    this.wavesurfer.playPause()
    this.vue.isPlay = this.wavesurfer.isPlaying()
  },
  /**
   * 设置音量
   * @param value 音量大小
   */
  setVolume: function (value) {
    this.wavesurfer.setVolume(this.vue.volume / 100)
  },
  setPlayProgress: function (value) {
    this.wavesurfer.seekTo(value / 100)
  },
  stop: function () {
    this.wavesurfer.stop()
  }
}
