<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        {{ message.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  head() {
    return {
      title: `Room ${this.user.room}`
    }
  },
  computed: mapState(['user', 'messages'])
}
</script>
