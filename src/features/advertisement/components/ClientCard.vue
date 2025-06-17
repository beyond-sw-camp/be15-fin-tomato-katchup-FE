<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  client: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="w-full border border-gray-medium rounded-xl bg-white shadow-sm p-5 hover:bg-gray-100 transition-colors duration-200">
    <div class="flex justify-between items-start mb-4">
      <div class="flex flex-col justify-between min-h-[80px]">
        <h3 class="text-lg font-semibold text-black">{{ client.name }}</h3>

        <!-- 고객사원 아이콘 -->
        <p class="text-sm text-gray-dark">
          <Icon icon="f7:person-2" class="inline-block mr-0.5" width="18" height="18" />
          ( 총 3명 )
        </p>
        <p class="text-sm text-gray-medium mt-1">{{ client.address }}</p>
      </div>
      <button class="text-gray-medium">
        <i class="fas fa-ellipsis-v" />
      </button>
    </div>

    <!-- 담당자 아이콘 -->
    <div class="flex justify-between items-end">
      <p class="text-sm text-gray-dark flex items-end leading-none">
        <Icon icon="mdi:person-tie" class="inline-block mr-2 align-text-bottom" width="18" height="18" />
        {{ client.contacts.join(', ') }}
      </p>
      <p class="text-sm font-semibold text-black">{{ client.price }} ₩</p>
    </div>
  </div>
</template>
