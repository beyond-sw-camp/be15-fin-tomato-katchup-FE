<script setup>
import { TAG_COLOR_MAP } from '@/constants/tags.js'
import { Icon } from '@iconify/vue';

defineProps({
  influencer: Object
})

const tagStyle = (tag) => {
  return TAG_COLOR_MAP[tag] ?? 'bg-gray-200 text-black'
}

const genderColor = (gender) => {
  switch (gender) {
    case 'male':
      return 'bg-blue-200'
    case 'female':
      return 'bg-pink-200'
    case 'other':
      return 'bg-purple-200'
    default:
      return 'bg-gray-200'
  }
}

const genderLabel = (gender) => {
  switch (gender) {
    case 'male':
      return '남성'
    case 'female':
      return '여성'
    case 'other':
      return '혼합'
    default:
      return '기타'
  }
}
</script>

<template>
  <div class="border-[1.5px] rounded-lg px-7 py-5 shadow-sm mb-10">
    <div class="flex items-center justify-between mb-4">

      <!-- 유튜브명 -->
      <div class="flex items-center gap-4 w-[220px]">
        <img :src="influencer.thumbnail" alt="프로필" class="w-16 h-16 rounded-full" />
        <div class="font-semibold text-lg truncate w-[120px]" :title="influencer.name">
          {{ influencer.name }}
        </div>
      </div>

      <!-- 인스타 아이디 -->
      <div class="w-[150px] text-lg font-semibold truncate">
        {{ influencer.instagram }}
      </div>

      <!-- 유튜브 구독자 -->
      <div class="flex flex-col items-center gap-2 w-[240px]">
        <span class="text-lg font-semibold">{{ influencer.subscribers || '해당 없음' }}</span>
        <button class="flex items-center bg-white text-black border border-black rounded-lg text-sm font-bold p-2">
          <Icon icon="logos:youtube-icon" width="30" height="30" class="mr-2" />
          유튜브 대시보드
        </button>
      </div>

      <!-- 인스타 팔로워 -->
      <div class="flex flex-col items-center gap-2 w-[240px]">
        <span class="text-lg font-semibold">{{ influencer.instaFollowers || '해당 없음' }}</span>
        <button class="flex items-center bg-white text-black border border-black rounded-lg text-sm font-bold p-2">
          <Icon icon="skill-icons:instagram" width="30" height="30" class="mr-2" />
          인스타 대시보드
        </button>
      </div>

      <!-- 성별 -->
      <div class="w-[90px] flex justify-center items-center">
        <div :class="[genderColor(influencer.targetGender), 'px-3 py-1 rounded-xl text-sm text-black text-center']">
          {{ genderLabel(influencer.targetGender) }}
        </div>
      </div>

      <!-- 연령대 -->
      <div class="w-[90px] flex justify-center items-center">
        <div class="bg-green-100 text-black px-3 py-1 rounded-xl text-sm text-center">
          {{ influencer.targetAgeGroup }}
        </div>
      </div>

    </div>

    <!-- 태그 -->
    <div class="flex flex-wrap gap-2">
    <span
      v-for="tag in influencer.tags"
      :key="tag"
      class="text-sm rounded-lg px-2 py-0.5"
      :class="tagStyle(tag)"
    >
      # {{ tag }}
    </span>
    </div>
  </div>

</template>

