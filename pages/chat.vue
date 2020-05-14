<template>
  <div class="chat__wrap">
    <div class="chat__chat">
      <ul>
        <Message
          v-for="message in messages"
          :key="message.id"
          :name="message.name"
          :text="message.text"
          owner
        />
      </ul>
    </div>
    <div class="chat__form"></div>
  </div>
</template>

<script>
import Message from '@/components/Message'
import { mapState } from 'vuex'
export default {
  components: {
    Message
  },
  head() {
    return {
      title: `Room ${this.user.room}`
    }
  },
  computed: mapState(['user', 'messages'])
}
</script>

<style lang="scss" scoped>
.chat {
  &__wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  &__form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    height: 80px;
    background-color: #212121;
  }

  &__chat {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 80px;
    padding: 20px;
    overflow-y: auto;
  }
}
</style>
