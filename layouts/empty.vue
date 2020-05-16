<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-snackbar v-model="snackbar" bottom color="info">
      {{ snackbarText }}
      <v-btn color="red" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      snackbarText: ''
    }
  },
  mounted() {
    // messages with their text
    const messages = []
    messages['noUser'] = 'User not authorized.'
    messages['leftChat'] = 'You successfully left the chat.'

    // if message query is in url
    if (this.$route.query.message) {
      // show snackbar with message
      this.snackbarText = messages[this.$route.query.message]
      this.snackbar = true
    }
  }
}
</script>
