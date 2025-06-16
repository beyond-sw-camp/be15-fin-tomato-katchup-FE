<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

import AverageChart from '@/features/influencer/components/chart/AverageChart.vue';
import AlgorithmChart from '@/features/influencer/components/chart/AlgorithmChart.vue';
import ReachChart from '@/features/influencer/components/chart/ReachChart.vue';
import AgeChart from '@/features/influencer/components/chart/AgeChart.vue';
import GenderChart from '@/features/influencer/components/chart/GenderChart.vue';
import FollowerChart from '@/features/influencer/components/chart/FollowerChart.vue';
import DashboardSummary from '@/features/influencer/components/DashboardSummary.vue';

const props = defineProps({
    platform: String,
    data: Object,
    satisfaction: Number,
});

const emit = defineEmits(['switch'])

const summaryData = computed(() => {
    if (!props.data) {
        return { shorts: 0, views: '0만', comments: '0개', likes: '0만' };
    }

    if (props.platform === 'instagram') {
        const s = props.data?.reelsSummary ?? {
            count: 0,
            avgViews: 0,
            avgComments: 0,
            avgLikes: 0,
        };
        const p = props.data?.popularPosts?.length ?? 0;

        return {
            shorts: s.count + p,
            views: `${(s.avgViews / 10000).toFixed(1)}만`,
            comments: `${s.avgComments}개`,
            likes: `${(s.avgLikes / 10000).toFixed(1)}만`,
        };
    } else {
        const s = props.data?.shortsSummary ?? {
            count: 0,
            averageViewCount: 0,
            commentCount: 0,
            likeCount: 0,
        };
        const v = props.data?.videosSummary ?? {
            videoCount: 0,
            averageViewCount: 0,
            commentCount: 0,
            likeCount: 0,
        };

        return {
            shorts: s.count + v.videoCount,
            views: `${((s.averageViewCount + v.averageViewCount) / 10000).toFixed(1)}만`,
            comments: `${s.commentCount + v.commentCount}개`,
            likes: `${((s.likeCount + v.likeCount) / 10000).toFixed(1)}만`,
        };
    }
});

const satisfactionIcon = computed(() => {
    if (props.satisfaction <= 50) {
        return 'ph:smiley-sad';
    } else if (props.satisfaction <= 80) {
        return 'ph:smiley-meh';
    } else {
        return 'ph:smiley';
    }
});

const satisfactionColorClass = computed(() => {
  if (props.satisfaction <= 50) {
    return 'text-red-500';
  } else if (props.satisfaction <= 80) {
    return 'text-yellow-400';
  } else {
    return 'text-green-500';
  }
})
</script>

<template>
    <div class="flex flex-col">
        <div class="flex gap-3 mb-4 self-start">
            <button
                @click="emit('switch', 'youtube')"
                :class="[
                    'w-28 h-10 rounded-xl text-white font-semibold text-sm shadow-md transition',
                    platform === 'youtube' ? 'bg-[#CC3333]' : 'bg-[#FFCCCC]',
                ]"
            >
                유튜브
            </button>

            <button
                @click="emit('switch', 'instagram')"
                :class="[
                    'w-28 h-10 rounded-xl text-white font-semibold text-sm shadow-md transition',
                    platform === 'instagram'
                        ? 'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4]'
                        : 'bg-gradient-to-r from-[#FFDABF] via-[#F5B5D4] to-[#B0B6F0]',
                ]"
            >
                인스타그램
            </button>
        </div>

        <DashboardSummary :platform="platform" :data="summaryData" />

        <div class="flex gap-8">
            <AverageChart
                :platform="platform"
                :daily="data.dailyAverageViews"
                :monthly="data.monthlyAverageViews"
                class="w-1/3"
            />
            <AlgorithmChart :platform="platform" :data="data" class="w-1/3" />
            <div class="dashboard-section w-1/3">
                <div class="flex items-center gap-1">
                    <h3 class="font-bold text-gray-dark">평균 만족도</h3>
                    <div class="relative group">
                        <Icon
                            icon="material-symbols:info-outline-rounded"
                            class="w-5 h-5 text-gray-dark cursor-pointer"
                        />
                        <div
                            class="absolute left-1/2 -translate-x-1/2 top-8 w-max bg-black text-white text-xs rounded px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-10"
                        >
                            고객들의 평균 만족도를 계산한 값
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center mt-10 gap-5">
                  <Icon :icon="satisfactionIcon" :class="`w-36 h-36 ${satisfactionColorClass}`" />
                  <p class="text-5xl font-extrabold">{{ satisfaction }}</p>
                </div>
            </div>
        </div>

        <div class="flex gap-8">
            <AgeChart :platform="platform" :data="data.demographics.ageGender" class="w-2/3" />
            <GenderChart :platform="platform" :data="data.demographics.ageGender" class="w-1/3" />
        </div>

        <div class="flex gap-8">
            <FollowerChart
                :platform="platform"
                :data="platform === 'instagram' ? data.followersTrend : data.subscribersTrend"
                class="w-2/3"
            />
          <ReachChart
            :platform="platform"
            :reach="data.reach"
            :followerRate="platform === 'instagram' ? data.followerReachRate : data.subscriberRate"
            :nonFollowerRate="platform === 'instagram' ? data.nonFollowerReachRate : data.nonSubscriberRate"
            class="w-1/3"
          />
        </div>
    </div>
</template>
