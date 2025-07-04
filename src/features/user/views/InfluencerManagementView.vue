<script setup>
import { computed, onMounted, ref } from 'vue';
import InfluencerFormModal from '../components/InfluencerFormModal.vue';
import CommonFiltering from '@/components/layout/CommonFiltering.vue';
import { getMockInfluencers } from '@/features/user/api.js';
import InfluencerManagementCard from '@/components/common/InfluencerManagementCard.vue';
import PagingBar from '@/components/common/PagingBar.vue';

const influencers = ref([]);
const isModalOpen = ref(false);
const selectedInfluencer = ref(null); // 등록/수정 구분용

// 페이지네이션
const currentPage = ref(1);
const pageSize = 6;

const openModal = () => {
  selectedInfluencer.value = null; // 등록 모드
  isModalOpen.value = true;
};

const openModalWithData = (influencer) => {
  selectedInfluencer.value = influencer; // 수정 모드
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedInfluencer.value = null;
};

const deleteInfluencer = (id) => {
  const index = influencers.value.findIndex((i) => i.id === id);
  if (index !== -1) {
    influencers.value.splice(index, 1);
  }
};

const totalCount = computed(() => influencers.value.length);
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize));

onMounted(async () => {
  const { data } = await getMockInfluencers();
  influencers.value = data.data;
});

const saveInfluencer = (updated) => {
  const index = influencers.value.findIndex((i) => i.id === updated.id);
  if (index !== -1) {
    // 수정
    influencers.value[index] = updated;
  } else {
    // 신규 추가
    influencers.value.push(updated);
  }
};
</script>

<template>
  <div class="w-full min-h-screen bg-background flex font-sans">
    <CommonFiltering />

    <div class="container">
      <!-- 헤더 -->
      <div class="page-header">
        <div class="page-title">
          인플루언서 관리
          <span class="cnt-search"> (검색결과: {{ totalCount }}건) </span>
        </div>
        <button class="btn-create" @click="openModal">등록</button>
      </div>

      <div class="blue-line"></div>

      <!-- 카드 리스트 -->
      <div class="px-10">
        <div class="grid grid-cols-2 gap-8">
          <InfluencerManagementCard
            v-for="card in influencers"
            :key="card.id"
            :id="card.id"
            :name="card.name"
            :realName="card.realName"
            :subscribers="card.subscribers"
            :instagram="card.instagram"
            :instaFollowers="card.instaFollowers"
            :tags="card.tags"
            :ownerName="card.ownerName"
            :thumbnail="card.thumbnail"
            @edit="openModalWithData"
            @delete="deleteInfluencer"
          />
        </div>
      </div>

      <!-- 등록/수정 모달 -->
      <InfluencerFormModal
        v-if="isModalOpen"
        :initialData="selectedInfluencer"
        @close="closeModal"
        @save="saveInfluencer"
      />

      <!-- 페이지네이션 -->
      <div class="flex justify-center mt-8">
        <PagingBar
          :totalPages="totalPages"
          :currentPage="currentPage"
          @update:currentPage="(val) => (currentPage = val)"
        />
      </div>
    </div>
  </div>
</template>
