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
  <div class="border-[1.5px] rounded-lg px-7 p-5 shadow-sm mb-10 justify-between">
    <div class="flex items-center justify-between mb-4">
      <!-- 유튜브명 -->
      <div class="flex items-center gap-10">
        <img :src="influencer.thumbnail" alt="프로필" class="w-12 h-12 rounded-full" />
        <div class="flex flex-col">
          <div class="font-semibold text-lg">{{ influencer.name }}</div>
        </div>
      </div>

      <!-- 인스타 아이디 -->
      <div class="flex items-center gap-4">
        <div class="flex flex-col">
          <div class="font-semibold text-lg">{{ influencer.instagram }}</div>
        </div>
      </div>

      <!-- 유튜브 구독자 -->
      <div class="flex flex-col items-center gap-2">
        <span class="text-lg font-semibold">
          {{ influencer.subscribers ? influencer.subscribers : '해당 없음' }}
        </span>
        <button class="flex items-center bg-white text-black border-[1.5px] border-black rounded-lg text-sm font-bold p-2">
          <Icon icon="logos:youtube-icon" width="30" height="30" class="mr-2" />
          유튜브 대시보드
        </button>
      </div>

      <!-- 인스타 팔로워 -->
      <div class="flex flex-col items-center gap-2">
        <span class="text-lg font-semibold">
          {{ influencer.instaFollowers ? influencer.instaFollowers : '해당 없음' }}
        </span>
        <button class="flex items-center bg-white text-black border-[1.5px] border-black rounded-lg text-sm font-bold p-2">
          <Icon icon="skill-icons:instagram" width="30" height="30" class="mr-2" />
          인스타 대시보드
        </button>
      </div>

      <!-- 성별 -->
      <div
        class="text-sm font-semibold px-2 py-1 rounded-xl text-black"
        :class="genderColor(influencer.targetGender)"
      >
        {{ genderLabel(influencer.targetGender) }}
      </div>

      <!-- 연령대 -->
      <div class="text-sm font-semibold bg-green-100 text-black px-2 py-1 rounded-xl">
        {{ influencer.targetAgeGroup }}
      </div>
    </div>

      <!-- 태그 -->
    <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in influencer.tags"
          :key="tag"
          class="text-sm rounded-lg px-2 py-0.5"
          :class="tagStyle(tag)"
        ># {{ tag }}</span>
      </div>
    </div>
</template>
