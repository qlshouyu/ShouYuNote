<template>
  <yu-drap-view :maxWidth="300" :minWidth="60">
    <yu-note-list slot="yu-left"></yu-note-list>
    <div slot="yu-right">
    </div>
  </yu-drap-view>
</template>
<script>
import NoteList from '../../components/comm/NewNote'
export default {
  components: {
    'yu-note-list': NoteList
  }
}
</script>
