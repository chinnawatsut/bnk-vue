<template>
  <div class="sloth" v-on:click="$emit('like')">
    <slot v-bind="$attrs"></slot>
    <span>
      {{ likeCount }}
      <img class="heart-icon" v-bind:class="{ inactive: likeCount == 0 }" src="@/assets/icons/heart.png"/>
    </span>

  </div>
</template>

<script>
export default {
  inheritAttrs: false,
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
.inactive {
  filter: brightness(5) invert(1);
}
</style>