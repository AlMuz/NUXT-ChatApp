<template>
  <h1>Chat page {{ user.name }}</h1>
</template>

<script>
import { mapState } from 'vuex'
export default {
  head() {
    return {
      title: `Room ${this.user.room}`
    }
  },
  computed: mapState(['user'])
}
</script>
