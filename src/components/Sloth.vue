<template>
  <div class="sloth" v-on:click="$emit('like')">
    <slot name="imageProfile" v-bind="$attrs"></slot>
    <slot></slot>
    <span>
      <img class="heart-icon" v-bind:class="{ inactive: likeCount == 0 }" src="@/assets/icons/heart.png"/>
      {{ likeCount }}
    </span>
    
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    likeCount: {
      type: Number,
      required: true,
    },
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
  margin-left: 20px;
}
.inactive {
  filter: brightness(5) invert(1);
}
</style>