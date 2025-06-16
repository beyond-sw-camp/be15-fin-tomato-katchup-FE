<script setup>
const props = defineProps({
  platform: String, // 'instagram' or 'youtube'
  items: Array
})

const formatNumber = (num) => {
  return num >= 10000 ? `${(num / 10000).toFixed(1)}만` : num.toString()
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('ko-KR');
}

const getUrl = (item) => {
  return props.platform === 'instagram' ? item.permalink : item.videoUrl;
}

const getLikes = (item) => {
  return props.platform === 'instagram' ? item.likes : item.likeCount;
}

const getComments = (item) => {
  return props.platform === 'instagram' ? item.comments : item.commentCount;
}

const getTimestamp = (item) => {
  return props.platform === 'instagram' ? item.timestamp : item.publishedAt;
}

const getKey = (item) => {
  return props.platform === 'instagram' ? item.id : item.videoId;
}
</script>

<template>
  <div class="dashboard-section">
    <p class="dashboard-title">{{ platform === 'instagram' ? '인기 게시글' : '인기 영상' }}</p>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="item in items"
        :key="getKey(item)"
        class="overflow-hidden hover:shadow-lg rounded-xl transition cursor-pointer"
      >
        <a :href="getUrl(item)" target="_blank">
          <img :src="item.thumbnail" alt="썸네일" class="w-full h-[150px] object-cover rounded-xl" />
        </a>

        <div class="p-2 text-sm font-bold truncate">{{ item.title }}</div>
        <div class="px-2 pb-2 text-xs text-gray-dark">
          <span>좋아요 {{ formatNumber(getLikes(item)) }} ・</span>
          <span>댓글 {{ formatNumber(getComments(item)) }} ・</span>
          <span>{{ formatDate(getTimestamp(item)) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
