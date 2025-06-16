<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { TAG_COLOR_MAP } from '@/constants/tags'

const route = useRoute()
const influencer = ref(null)

const tagStyle = (tag) => TAG_COLOR_MAP[tag] ?? 'bg-gray-200 text-black'

onMounted(async () => {
  const id = route.params.id || route.query.id
  const res = await fetch(`/api/v1/influencer/${id}`)
  const resData = await res.json()
  influencer.value = resData.data
})
</script>

<template>
  <div v-if="influencer" class="w-full bg-white rounded-2xl shadow p-8 mb-10">
    <div class="flex gap-6">
      <img :src="influencer.thumbnail" alt="썸네일" class="w-28 h-28 rounded-full object-cover mr-3" />
      <div class="flex flex-col justify-center">
        <h1 class="text-2xl font-bold">{{ influencer.name }}</h1>

        <div class="flex flex-wrap gap-2 mt-2">
          <span
            v-for="tag in influencer.tags"
            :key="tag"
            class="px-2 py-1 rounded-full text-sm font-medium mb-3"
            :class="tagStyle(tag)"
          >
            # {{ tag }}
          </span>
        </div>

        <div class="flex flex-col mt-4 gap-2 text-md text-gray-medium">
          <div class="flex items-center gap-3">
            <Icon icon="logos:youtube-icon" class="w-9 h-9" />
            <span>{{ influencer.subscribers ? `구독자 ${influencer.subscribers}` : '해당 없음' }}</span>
          </div>

          <div class="flex items-center gap-4">
            <Icon icon="skill-icons:instagram" class="w-9 h-9" />
            <span>{{ influencer.instaFollowers ? `팔로워 ${influencer.instaFollowers}` : '해당 없음' }}</span>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div v-else>Loading...</div>
</template>
