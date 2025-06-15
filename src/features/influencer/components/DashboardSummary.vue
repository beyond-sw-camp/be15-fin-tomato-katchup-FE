<script setup>
import SummaryItem from '@/features/influencer/components/chart/SummaryItem.vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({ reels: 0, views: '0만', comments: '0개', likes: '0만' })
  }
})
</script>

<template>
  <div class="dashboard-section">
    <div class="grid grid-cols-4 gap-10 text-center">
      <SummaryItem title="릴스 수" :value="data.reels" icon="ph:play-circle-bold" />
      <SummaryItem title="평균 조회 수" :value="data.views" icon="mdi:eye-outline" />
      <SummaryItem title="평균 댓글 수" :value="data.comments" icon="mdi:comment-outline" />
      <SummaryItem title="평균 좋아요 수" :value="data.likes" icon="mdi:heart-outline" />
    </div>
  </div>
</template>
