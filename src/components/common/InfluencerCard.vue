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
    <div class="border-[1.5px] rounded-lg p-5 shadow-sm mb-10">
        <div class="flex flex-wrap items-center justify-between gap-4">

            <!-- 유튜브명 -->
            <div class="flex items-center gap-4 min-w-[160px]">
                <img :src="influencer.thumbnail" alt="프로필" class="w-14 h-14 rounded-full object-cover" />
                <div class="font-semibold text-sm truncate w-[100px]" :title="influencer.name">
                    {{ influencer.name }}
                </div>
            </div>

            <!-- 인스타 아이디 -->
            <div class="w-[120px] text-sm font-semibold truncate text-center">
                {{ influencer.instagram }}
            </div>

            <!-- 유튜브 구독자 -->
            <div class="flex flex-col items-center w-[180px]">
                <span class="text-sm font-semibold truncate mb-2">{{ influencer.subscribers || '해당 없음' }}</span>
                <button class="flex items-center justify-center bg-white text-black border border-black rounded-lg text-sm font-bold p-2 whitespace-nowrap w-[150px]">
                    <Icon icon="logos:youtube-icon" width="24" height="24" class="mr-2" />
                    <span class="hidden md:inline">유튜브 대시보드</span>
                </button>
            </div>

            <!-- 인스타 팔로워 -->
            <div class="flex flex-col items-center w-[180px]">
                <span class="text-sm font-semibold truncate mb-2">{{ influencer.instaFollowers || '해당 없음' }}</span>
                <button class="flex items-center justify-center bg-white text-black border border-black rounded-lg font-semibold text-sm p-2 whitespace-nowrap w-[150px]">
                    <Icon icon="skill-icons:instagram" width="24" height="24" class="mr-2" />
                    <span class="hidden md:inline">인스타 대시보드</span>
                </button>
            </div>

            <!-- 성별 -->
            <div class="w-[80px] flex justify-center items-center">
                <div :class="[genderColor(influencer.targetGender), 'px-2 rounded-2xl font-semibold text-sm text-center']">
                    {{ genderLabel(influencer.targetGender) }}
                </div>
            </div>

            <!-- 연령대 -->
            <div class="w-[80px] flex justify-center items-center">
                <div class="bg-green-100 text-black px-2 rounded-xl font-semibold text-sm text-center">
                    {{ influencer.targetAgeGroup }}
                </div>
            </div>

        </div>

        <!-- 태그 -->
        <div class="flex flex-wrap gap-2 mt-4">
      <span
          v-for="tag in influencer.tags"
          :key="tag"
          class="text-xs rounded-lg px-1 py-0.5"
          :class="tagStyle(tag)"
      >
        # {{ tag }}
      </span>
        </div>
    </div>
</template>


