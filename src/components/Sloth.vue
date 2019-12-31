<template>
  <div class="sloth" v-on:click="$emit('like')">
    <slot></slot>
    <span>
      {{ likeCount }}
      <img class="heart-icon" src="@/assets/icons/heart.png"/>
    </span>

  </div>
</template>

<script>
export default {
  props: {
    likeCount: Number,
  }
};
</script>

<style scoped>
.sloth {
  border: 5px solid #BCD0CD;
}
.heart-icon {
  width: 20px;
  height: auto;
}

</style>