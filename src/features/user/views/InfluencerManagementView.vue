<script setup>
import { onMounted, ref } from 'vue'
import InfluencerCard from '@/components/common/InfluencerCard.vue'
import InfluencerFormModal from '../components/InfluencerFormModal.vue'
import CommonFiltering from "@/components/layout/CommonFiltering.vue";
import { getMockInfluencers } from '@/features/user/api.js'

const influencers = ref([])
const isModalOpen = ref(false)
const selectedInfluencer = ref(null) // 등록/수정 구분용

const openModal = () => {
  selectedInfluencer.value = null // 등록 모드
  isModalOpen.value = true
}

const openModalWithData = (influencer) => {
  selectedInfluencer.value = influencer // 수정 모드
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedInfluencer.value = null
}

const deleteInfluencer = (id) => {
  const index = influencers.value.findIndex(i => i.id === id)
  if (index !== -1) {
    influencers.value.splice(index, 1)
  }
}

onMounted(async () => {
  const { data } = await getMockInfluencers()
  influencers.value = data.data
})

const saveInfluencer = (updated) => {
  const index = influencers.value.findIndex((i) => i.id === updated.id)

  if (index !== -1) {
    // 수정
    influencers.value[index] = updated
  } else {
    // 신규 추가
    influencers.value.push(updated)
  }
}

</script>

<template>
  <div class="w-full min-h-screen bg-background flex font-sans">
      <CommonFiltering class="sticky top-0 w-[304px] h-screen bg-white shadow-md z-10" />

      <div class="container">
        <h2 class="text-lg font-semibold mb-5">인플루언서 - 관리</h2>
        <div class="flex flex-wrap gap-5 items-stretch">
          <InfluencerCard
            v-for="card in influencers"
            :key="card.id"
            :id="card.id"
            :name="card.name"
            :subscribers="card.subscribers"
            :instagram="card.instagram"
            :instaFollowers="card.instaFollowers"
            :tags="card.tags"
            :ownerName="card.ownerName"
            :thumbnail="card.thumbnail"
            @edit="openModalWithData"
            @delete="deleteInfluencer"
          />

        <div
          class="w-[405px] min-h-[240px] flex items-center justify-center border border-gray-200 rounded-xl bg-white text-[32px] text-gray-400 cursor-pointer"
          @click="openModal"
        >
          +
        </div>
      </div>

      <InfluencerFormModal
        v-if="isModalOpen"
        :initialData="selectedInfluencer"
        @close="closeModal"
        @save="saveInfluencer"
      />
    </div>
  </div>
</template>
