<template>
  <div class="w-full border border-gray-medium rounded-md bg-white shadow-sm p-5">
    <div class="flex justify-between items-start mb-4">
      <div class="flex flex-col">
        <h3 class="text-lg font-semibold text-black">{{ client.name }}</h3>
        <p class="text-sm text-gray-dark">👥 (총 3명)</p>
        <p class="text-sm text-gray-medium mt-1">{{ client.address }}</p>
      </div>
      <button class="text-gray-medium">
        <i class="fas fa-ellipsis-v" />
      </button>
    </div>

    <div class="flex justify-between items-end">
      <p class="text-sm text-gray-dark">🙍 {{ client.contacts.join(', ') }}</p>
      <p class="text-sm font-semibold text-black">{{ client.price }} ₩</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  client: {
    type: Object,
    required: true
  }
})
</script>
