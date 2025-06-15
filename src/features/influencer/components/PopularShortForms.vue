<script setup>
const props = defineProps({
  reels: Array
})

const formatNumber = (num) => {
  return num >= 10000 ? `${(num / 10000).toFixed(1)}만` : num.toString()
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('ko-KR');
}
</script>

<template>
  <div class="dashboard-section">
    <p class="dashboard-title">인기 Reels</p>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="item in reels"
        :key="item.id"
        class="overflow-hidden hover:shadow-lg rounded-xl transition cursor-pointer"
      >
        <a :href="item.permalink" target="_blank">
          <img :src="item.thumbnail" alt="썸네일" class="w-full h-[150px] object-cover rounded-xl" />
        </a>

        <div class="p-2 text-sm font-bold truncate">{{ item.title }}</div>
        <div class="px-2 pb-2 text-xs text-gray-dark">
          <span>조회수 {{ formatNumber(item.plays) }} ・</span>
          <span>좋아요 {{ formatNumber(item.likes) }} ・</span>
          <span>댓글 {{ formatNumber(item.comments) }} ・</span>
          <span>{{ formatDate(item.timestamp) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
