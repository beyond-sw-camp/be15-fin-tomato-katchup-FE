<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import YoutubeAnalyticsChart from '@/features/dashboard/components/chart/YoutubeAnalyticsChart.vue'
import AnalyticsFilters from '@/features/dashboard/components/AnalyticsFilters.vue'
import TrafficSourcesChart from '@/features/dashboard/components/chart/TrafficSourcesChart.vue'
import RevenueSummary from '@/features/dashboard/components/chart/RevenueSummary.vue'
import CampaignVideoSummary from '@/features/dashboard/components/chart/CampaignVideoSummary.vue'
import CampaignHeaderCard from '@/features/dashboard/components/CampaignHeaderCard.vue'

const route = useRoute()

const activeMetric = ref('조회수')
const activePeriod = ref('일간')
const rows = ref([])
const meta = ref(null)
const isLoading = ref(true)
const isError = ref(false)
const campaignId = route.query.id || '1'

const campaign = ref(null)
const influencer = ref(null)

const periodKeyMap = {
    '일간': 'daily',
    '주간': 'weekly',
    '월간': 'monthly'
}

const fetchCampaign = async () => {
    const res = await fetch(`/api/v1/campaign/${campaignId}`)
    const resData = await res.json()
    campaign.value = resData.data

    await fetchInfluencer(resData.data.influencerId)
}

const fetchInfluencer = async (influencerId) => {
    const res = await fetch(`/api/v1/influencer/${influencerId}`)
    const resData = await res.json()
    influencer.value = resData.data
}

const fetchAnalytics = async () => {
    const res = await fetch(`/api/v1/youtube/analytics?campaignId=${campaignId}&groupType=${periodKeyMap[activePeriod.value]}`)
    const resData = await res.json()
    rows.value = resData.rows
}

const fetchMeta = async () => {
    const res = await fetch(`/api/v1/youtube/video?campaignId=${campaignId}`)
    const resData = await res.json()
    meta.value = resData
}

const fetchAllData = async () => {
    isLoading.value = true
    isError.value = false
    try {
        await Promise.all([
            fetchCampaign(),
            fetchAnalytics(),
            fetchMeta()
        ])
    } catch (err) {
        isError.value = true
    } finally {
        isLoading.value = false
    }
}

onMounted(fetchAllData)

const onPeriodChange = async (val) => {
    activePeriod.value = val
    await fetchAnalytics()
}

const summary = computed(() => {
    if (!campaign.value) return {}

    const revenue = campaign.value.expectedRevenue || 0
    const unitPrice = campaign.value.productPrice || 0
    const sales = unitPrice ? Math.round(revenue / unitPrice) : 0

    return {
        totalRevenue: revenue,
        avgPrice: unitPrice,
        totalSales: sales,
        paymentDate: campaign.value.endDate
    }
})
</script>

<template>
    <div class="w-full min-h-screen flex flex-col">

        <CampaignHeaderCard :campaign="campaign" :influencer="influencer" />

        <CampaignVideoSummary :meta="meta" />

        <div class="dashboard-section">
            <div class="mb-4">
                <AnalyticsFilters
                    :activeMetric="activeMetric"
                    :activePeriod="activePeriod"
                    @update:metric="activeMetric = $event"
                    @update:period="onPeriodChange"
                />
            </div>
            <div>
                <div v-if="isLoading" class="flex justify-center items-center w-full h-full">Loading...</div>
                <div v-else-if="isError" class="flex justify-center items-center w-full h-full">데이터를 불러오지 못했습니다.</div>
                <div v-else class="w-full">
                    <YoutubeAnalyticsChart :rows="rows" :activeMetric="activeMetric" />
                </div>
            </div>
        </div>

        <div class="flex gap-8">
            <div class="w-[65%]">
                <TrafficSourcesChart />
            </div>
            <div class="w-[35%]">
                <RevenueSummary :summary="summary" />
            </div>
        </div>

    </div>
</template>
