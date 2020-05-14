<template>
  <div>
    <div v-if="name === 'admin'" class="message__system">
      <p>
        {{ text }}
      </p>
      <hr />
    </div>
    <div v-else class="message__wrap">
      <div class="message__message" :class="{ message__owner: owner }">
        <small>
          <strong>{{ name }}</strong>
        </small>
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  &__system {
    margin-bottom: 10px;
    text-align: center;

    p {
      margin-bottom: 10px;
    }
  }

  &__wrap {
    display: flex;
    flex-direction: column;
  }

  &__message {
    padding: 10px;
    width: 60%;
    margin: 0 10px;
    box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
    border-radius: 4px;
    background-color: #1976d2;
    margin-bottom: 10px;

    p {
      margin-bottom: 0;
    }
  }

  &__owner {
    background-color: #fff;
    color: #000;
    align-self: flex-end;
  }
}
</style>
