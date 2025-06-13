<script setup>
import { onMounted, ref } from 'vue'
import InfluencerCard from '@/components/common/InfluencerCard.vue'
import { getMockInfluencers } from '@/features/user/api.js'

const influencers = ref([])
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
}

onMounted(async () => {
  const { data } = await getMockInfluencers()
  influencers.value = data
})
</script>

<template>
  <div class="p-6">
    <h2 class="text-lg font-semibold mb-5">인플루언서 - 관리</h2>
    <div class="flex flex-wrap gap-5 items-stretch">
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
      <div class="w-[405px] min-h-[240px] flex items-center justify-center border border-gray-200 rounded-xl bg-white text-[32px] text-gray-400 cursor-pointer">
        +
      </div>
    </div>
  </div>
</template>

<style>
/*.tag-line {
  @apply text-sm leading-[1.5] whitespace-normal break-words mt-1;
  color: #000;
}*/
</style>
