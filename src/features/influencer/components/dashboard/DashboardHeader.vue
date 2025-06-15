<script setup>
import { Icon } from '@iconify/vue'
import { TAG_COLOR_MAP } from '@/constants/tags'

const props = defineProps({
  name: String,
  thumbnail: String,
  tags: Array,
  subscribers: String,
  instaFollowers: String,
})

const tagStyle = (tag) => TAG_COLOR_MAP[tag] ?? 'bg-gray-200 text-black'
</script>

<template>
  <div class="w-full bg-white rounded-2xl shadow p-6 mb-10">
    <div class="flex gap-6">
      <img :src="thumbnail" class="w-36 h-36 rounded-full object-cover border" />
      <div class="flex flex-col justify-center">
        <h1 class="text-2xl font-bold">{{ name }}</h1>

        <div class="flex flex-wrap gap-2 mt-2">
          <span
            v-for="tag in tags"
            :key="tag"
            class="px-2 py-1 rounded-full text-sm font-medium"
            :class="tagStyle(tag)"
          >
            #{{ tag }}
          </span>
        </div>

        <div class="flex mt-4 gap-4">
          <div class="flex items-center gap-2">
            <Icon icon="logos:youtube-icon" class="w-6 h-6" />
            <span>{{ subscribers }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon="skill-icons:instagram" class="w-6 h-6" />
            <span>{{ instaFollowers }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
