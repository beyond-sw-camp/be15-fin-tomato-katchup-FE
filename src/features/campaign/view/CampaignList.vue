<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugin/axios.js'

const campaigns = ref([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await api.get(`/campaign`, {
      params: { page: 1, size: 10 }
    })
    campaigns.value = response.data.data
  } catch (error) {
    console.error('API 호출 실패:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <h2>Campaign List</h2>
    <div v-if="isLoading">Loading...</div>
    <ul v-else>
      <li v-for="campaign in campaigns" :key="campaign.id">
        {{ campaign.title }} ({{ campaign.clientCompany }})
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
