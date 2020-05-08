<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-btn @click="message">
        New Message
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  sockets: {
    connect: function() {
      console.log('socket connected')
    },
    customEmit: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      )
    }
  },
  methods: {
    message() {
      this.$socket.emit('createMessage', {
        text: 'from client'
      })
    }
  }
}
</script>
