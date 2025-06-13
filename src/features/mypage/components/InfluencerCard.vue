<script setup>
defineProps({
  influencer: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="w-24 text-center">
    <img :src="influencer.img" alt="프로필" class="w-full h-auto rounded shadow" />
    <p class="text-sm mt-1">{{ influencer.name }}</p>
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
}
</style>
