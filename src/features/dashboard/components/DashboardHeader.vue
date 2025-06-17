<script setup>
import { TAG_COLOR_MAP } from '@/constants/tags'
import { Icon } from '@iconify/vue'

const props = defineProps({
  influencer: {
    type: Object,
    required: true
  }
})

const tagStyle = (tag) => TAG_COLOR_MAP[tag] ?? 'bg-gray-200 text-black'

const formatCount = (num) => {
  if (!num) return '해당 없음'
  const parsedNum = parseInt(num)
  return parsedNum >= 10000 ? `${Math.floor(parsedNum / 10000)}만명` : `${parsedNum}명`
}
</script>

<template>
  <div class="dashboard-section">
    <div class="flex gap-6">
      <img :src="influencer.thumbnail" alt="썸네일" class="w-28 h-28 rounded-full object-cover mr-3" />

      <div class="flex flex-col justify-center">
        <h1 class="text-2xl font-bold">{{ influencer.name }}</h1>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in influencer.tags"
            :key="tag"
            class="px-1.5 py-0.5 mt-1 rounded-full text-sm font-medium mb-3"
            :class="tagStyle(tag)"
          >
            # {{ tag }}
          </span>
        </div>

        <div class="flex flex-col gap-1 text-md text-gray-medium">
          <div class="flex items-center gap-3">
            <Icon icon="logos:youtube-icon" class="w-9 h-9" />
            <span>구독자 {{ formatCount(influencer.subscribers) }}</span>
          </div>

          <div class="flex items-center gap-3">
            <Icon icon="skill-icons:instagram" class="w-9 h-9" />
            <span>팔로워 {{ formatCount(influencer.instaFollowers) }}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
