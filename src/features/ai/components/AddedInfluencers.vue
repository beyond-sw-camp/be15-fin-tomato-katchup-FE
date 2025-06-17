<template>
  <div class="w-[270px] h-[1040px] bg-white p-4 rounded shadow flex flex-col">
    <h3 class="text-base font-bold mb-4">추가된 인플루언서</h3>

    <div
      v-for="influencer in addedInfluencers"
      :key="influencer.id"
      class="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3"
    >
      <div class="flex items-center gap-3">
        <img :src="influencer.imageUrl" alt="profile" class="w-10 h-10 rounded-full object-cover" />
        <div class="flex flex-col">
          <span class="text-sm font-semibold">{{ influencer.name }}</span>
          <div class="flex items-center gap-1 mt-1">
            <Icon icon="logos:youtube-icon" width="16" height="16" />
            <Icon icon="skill-icons:instagram" width="16" height="16" />
          </div>
        </div>
      </div>
      <Icon
        icon="iconamoon:close-bold"
        class="cursor-pointer text-gray-400 hover:text-red-500"
        width="20"
        @click="$emit('remove', influencer.id)"
      />
    </div>

    <button
      class="mt-auto bg-[#A6C8E9] text-white rounded py-2 text-sm hover:brightness-95"
    >
      리스트업에 추가하기
    </button>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
defineProps(['addedInfluencers'])
defineEmits(['remove'])
</script>
