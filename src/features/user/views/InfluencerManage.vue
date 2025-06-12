<script setup>
import { onMounted, ref } from 'vue'
import InfluencerCard from '@/components/common/InfluencerCard.vue'
import { getMockInfluencers } from '@/features/user/api.js'

const influencers = ref([])

onMounted(async () => {
  const { data } = await getMockInfluencers()
  influencers.value = data
})
</script>

<template>
  <div class="wrapper">
    <h2 class="title">인플루언서 - 관리</h2>
    <div class="card-list">
      <InfluencerCard
        v-for="card in influencers"
        :key="card.id"
        :name="card.name"
        :subscribers="card.subscriberCount"
        :instagram="card.instagram"
        :instaFollowers="card.instaFollowers"
        :tags="card.tags"
        :ownerName="card.ownerName"
        :thumbnail="card.thumbnail"
      />
      <div class="add-card">+</div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 24px;
}

.title {
  font-size: var(--tmt-font-size-lg);
  font-weight: var(--tmt-font-weight-bold);
  margin-bottom: 20px;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: stretch;
}

.add-card {
  width: 405px;
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--tmt-color-gray-light);
  border-radius: 12px;
  background-color: white;
  font-size: 32px;
  color: var(--tmt-color-gray-medium);
  cursor: pointer;
}

.tag-line {
  font-size: var(--tmt-font-size-sm);
  line-height: 1.5;
  white-space: normal;
  word-break: break-word;
  margin-top: 4px;
}
</style>
