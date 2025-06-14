<template>
  <div class="w-full min-h-screen bg-[#f4f8fc] px-12 py-10 font-sans">
    <div class="flex gap-6">
      <CommonFiltering class="w-[260px] shrink-0" />

      <div class="flex-1 bg-white rounded-xl p-6 shadow-sm">
        <div class="flex gap-2 mb-6">
          <SelectedYoutubeBtn v-if="activeTab === 'youtube'" @click="activeTab = 'youtube'" />
          <UnselectedYoutubeBtn v-else @click="activeTab = 'youtube'" />
          <SelectedInstagramBtn v-if="activeTab === 'instagram'" @click="activeTab = 'instagram'" />
          <UnselectedInstagram v-else @click="activeTab = 'instagram'" />
        </div>
        <table class="w-full text-sm text-center border-t border-gray-200">
          <thead class="bg-gray-100 text-sm font-semibold border-b border-gray-300">
          <tr>
            <th class="py-2">번호</th>
            <th>작성일</th>
            <th>계약금액</th>
            <th>담당자</th>
            <th>광고주</th>
            <th>보기</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="item in paginatedContracts"
            :key="item.id"
            class="border-b"
          >
            <td class="py-2">{{ item.id }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.amount.toLocaleString() }}</td>
            <td>{{ item.manager }}</td>
            <td>{{ item.advertiser }}</td>
            <td>
              <a
                href="#"
                class="text-blue-500 hover:underline cursor-pointer"
                @click.prevent="openPasswordModal(item.id)"
              >
                보기
              </a>
            </td>
          </tr>
          </tbody>
        </table>

        <PagingBar
          class="mt-6"
          :total-pages="Math.ceil(contractList.length / 10)"
          :current-page="currentPage"
          @update:currentPage="handlePageChange"
        />
      </div>
    </div>

    <PasswordModal
      v-if="showModal"
      @submit="handlePasswordSubmit"
      @close="showModal = false"
    />

    <PdfViewerModal
      v-if="showPdf"
      :contract-id="selectedContractId"
      @close="showPdf = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'

import CommonFiltering from '@/components/layout/CommonFiltering.vue'
import SelectedYoutubeBtn from '@/components/layout/SelectedYoutubeBtn.vue'
import UnselectedYoutubeBtn from '@/components/layout/UnselectedYoutubeBtn.vue'
import SelectedInstagramBtn from '@/components/layout/SelectedInstagramBtn.vue'
import UnselectedInstagram from '@/components/layout/UnselectedInstagram.vue'
import PasswordModal from '@/features/contract/components/PasswordModal.vue'
import PdfViewerModal from '@/features/contract/components/PdfViewerModal.vue'
import PagingBar from '@/components/common/PagingBar.vue'

const activeTab = ref('youtube')
const currentPage = ref(1)
const showModal = ref(false)
const showPdf = ref(false)
const selectedContractId = ref(null)
const contractList = ref([])

const fetchContracts = async () => {
  const url =
    activeTab.value === 'youtube'
      ? '/api/v1/contracts/youtube'
      : '/api/v1/contracts/instagram'
  const res = await axios.get(url)
  contractList.value = res.data.data
}

onMounted(fetchContracts)
watch(activeTab, fetchContracts)

const paginatedContracts = computed(() => {
  const start = (currentPage.value - 1) * 10
  return contractList.value.slice(start, start + 10)
})

const handlePageChange = (page) => {
  currentPage.value = page
}

const openPasswordModal = (id) => {
  selectedContractId.value = id
  showModal.value = true
}

const handlePasswordSubmit = (password) => {
  if (password === '0000') {
    showModal.value = false
    showPdf.value = true
  } else {
    alert('비밀번호가 올바르지 않습니다.')
  }
}
</script>
