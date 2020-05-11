<template>
  <v-app app>
    <h1>Title</h1>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  middleware: 'chat',
  data() {
    return {}
  }
}
</script>
