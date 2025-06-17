<template>
  <div class="bg-[#f4f8fc] p-6 rounded-xl border border-blue-200 flex gap-6">
    <!-- 좌측 필터 -->
    <div class="w-[360px] pr-4 border-r border-blue-300 space-y-3 min-h-full">
      <div
        v-for="(filter, index) in filterOptions"
        :key="index"
        class="flex items-center justify-between border border-gray-300 bg-white px-2 py-1 rounded"
      >
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" v-model="filter.checked" />
          <span>{{ filter.label }}</span>
        </label>
        <select
          v-if="filter.levels"
          v-model="filter.level"
          class="text-xs bg-white border rounded px-1 py-0.5"
        >
          <option v-for="option in filter.levels" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>

    <!-- 우측 인플루언서 카드 리스트 -->
    <div class="flex-1 space-y-4 pl-2 overflow-y-auto max-h-[800px]">
    <div
        v-for="influencer in influencers"
        :key="influencer.id"
        class="flex justify-between items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-sm"
        @click="$emit('add-influencer', influencer)"
      >
        <!-- 프로필 + 태그 -->
        <div class="flex items-center gap-4">
          <img
            :src="influencer.imageUrl"
            alt="profile"
            class="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <div class="font-semibold text-black">{{ influencer.name }}</div>
            <div class="text-xs text-gray-500">@{{ influencer.username }}</div>
            <div class="flex flex-wrap gap-2 mt-1">
              <span
                v-for="tag in influencer.tags"
                :key="tag"
                :class="`${TAG_COLOR_MAP[tag]} px-2 py-1 rounded-full text-xs`"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- 팔로워 -->
        <div class="flex flex-col gap-2 items-end text-sm">
          <div class="flex items-center gap-1 text-black">
            <Icon icon="logos:youtube-icon" width="18" height="18" />
            <span>{{ influencer.followers }}</span>
          </div>
          <div class="flex items-center gap-1 text-black">
            <Icon icon="skill-icons:instagram" width="18" height="18" />
            <span>{{ influencer.views }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { reactive } from 'vue'
import { TAG_COLOR_MAP } from '@/constants/tags'

defineProps({
  influencers: Array
})

defineEmits(['add-influencer'])

const filterOptions = reactive([
  { label: '영향력 등급이 높아요', checked: true, level: '75% 이상', levels: ['25% 이상', '50% 이상', '75% 이상'] },
  { label: '알고리즘 스코어가 높아요', checked: false, level: '75% 이상', levels: ['25% 이상', '50% 이상', '75% 이상'] },
  { label: '카테고리가 일치해요', checked: false },
  { label: '선호 성별이 일치해요', checked: true },
  { label: '선호 연령이 일치해요', checked: false },
  { label: '노쇼 및 취소 이력이 없어요', checked: false },
  { label: '광고주 만족도가 높아요', checked: true, level: '75% 이상', levels: ['25% 이상', '50% 이상', '75% 이상'] },
  { label: '응답 속도가 빨라요', checked: false },
  { label: '계약 성공 확률이 높아요', checked: false },
  { label: '캠페인 전환율이 높아요', checked: false }
])
</script>
