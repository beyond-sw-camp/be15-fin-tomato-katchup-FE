<script setup>
const props = defineProps({
  platform: String,
  items: Array
})

const formatNumber = (num) => {
  return num >= 10000 ? `${(num / 10000).toFixed(1)}만` : num.toString()
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('ko-KR');
}

const getThumbnail = (item) => {
  return props.platform === 'instagram' ? item.thumbnail : item.thumbnail;
}

const getUrl = (item) => {
  return props.platform === 'instagram' ? item.permalink : item.shortsUrl;
}

const getViews = (item) => {
  return props.platform === 'instagram' ? item.plays : item.viewCount;
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
</script>

<template>
  <div class="dashboard-section">
    <p class="dashboard-title">{{ platform === 'instagram' ? '인기 Reels' : '인기 Shorts' }}</p>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="item in items"
        :key="platform === 'instagram' ? item.id : item.videoId"
        class="overflow-hidden hover:shadow-lg rounded-xl transition cursor-pointer"
      >
        <a :href="getUrl(item)" target="_blank">
          <img :src="getThumbnail(item)" alt="썸네일" class="w-full h-[150px] object-cover rounded-xl" />
        </a>

        <div class="p-2 text-sm font-bold truncate">{{ item.title }}</div>
        <div class="px-2 pb-2 text-xs text-gray-dark">
          <span>조회수 {{ formatNumber(getViews(item)) }} ・</span>
          <span>좋아요 {{ formatNumber(getLikes(item)) }} ・</span>
          <span>댓글 {{ formatNumber(getComments(item)) }} ・</span>
          <span>{{ formatDate(getTimestamp(item)) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
