<template>
  <div class="w-[405px] min-h-[240px] p-4 border border-gray-200 rounded-xl bg-white font-sans flex flex-col">
    <div class="absolute top-3 right-3">
      <button class="flex flex-col gap-[2px]" @click="toggleDropdown">
        <span class="w-1 h-1 bg-black rounded-full" v-for="i in 3" :key="i"></span>
      </button>
      <div v-if="showDropdown" class="absolute top-0 right-7 flex flex-col bg-white border border-gray-300 rounded shadow-md z-10">
        <div class="px-3 py-2 text-sm text-center bg-gray-300 hover:bg-blue-100 cursor-pointer" @mouseover="hovered='edit'" @mouseleave="hovered=''">수정하기</div>
        <div class="px-3 py-2 text-sm text-center bg-gray-300 hover:bg-blue-100 cursor-pointer" @mouseover="hovered='delete'" @mouseleave="hovered=''">삭제하기</div>
      </div>
    </div>

    <div class="flex gap-3 items-start mb-3">
      <img :src="thumbnail || defaultThumbnail" alt="thumbnail" class="w-[100px] h-[100px] rounded-full object-cover border border-gray-100" />
      <div class="flex-1">
        <div class="flex items-center gap-1 text-base font-medium mb-1">
          <img :src="youtubeIcon" class="w-[18px] h-[18px]" alt="youtube" />
          <span class="font-bold">{{ name }}</span>
        </div>
        <div class="text-sm text-gray-500 mb-1">{{ subscribers }}</div>
        <div class="flex items-center gap-1 text-base font-medium mb-1">
          <img :src="instagramIcon" class="w-[18px] h-[18px]" alt="instagram" />
          <span class="font-bold">@{{ instagram }}</span>
        </div>
        <div class="text-sm text-gray-500 mb-2">{{ instaFollowers }}</div>

        <p class="text-sm leading-snug text-black break-words whitespace-normal">
          <span v-for="(tag, index) in tags" :key="index">
            #{{ tag }}<span v-if="index < tags.length - 1">, </span>
          </span>
        </p>
      </div>
    </div>

    <div class="flex items-center gap-1 text-sm text-gray-500 mt-auto pl-[2px]">
      <img :src="userIcon" class="w-5 h-5" alt="owner icon" />
      <span>{{ ownerName }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import youtubeIcon from '@/assets/icons/youtube.png'
import instagramIcon from '@/assets/icons/instagram.jpg'
import userIcon from '@/assets/icons/user.svg'
import defaultThumbnail from '@/assets/icons/logo.png'

defineProps({
  name: String,
  subscribers: String,
  instagram: String,
  instaFollowers: String,
  tags: Array,
  ownerName: String,
  thumbnail: String
})

const showDropdown = ref(false)
const hovered = ref('')
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}
</script>

<style scoped>
/* Tailwind로 대체됨 */
</style>
