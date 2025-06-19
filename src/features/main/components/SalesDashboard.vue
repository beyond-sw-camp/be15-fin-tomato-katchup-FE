<script setup>
import { onMounted, ref, computed } from 'vue';
import {
  getContractList,
  getListUpList,
  getProposalList,
  getQuotationList
} from '@/features/campaign/api.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const page = ref(1);
const size = ref(10);

const clientCompanyList = ref([]);
const eventList = ref([]);
const proposalList = ref([]);
const listupList = ref([]);
const contractList = ref([]);
const quotationList = ref([]);
const isLoading = ref(true);
const isError = ref(false);

const searchFilters = ref({
  category: '',
  keyword: '',
  manager: null,
  filter: '',
  sort: 'date',
  sortOrder: 'asc',
});

const statusClassMap = {
  '승인완료': 'bg-complete text-white',
  '승인요청': 'bg-request text-white',
  '보류/대기': 'bg-onhold text-white',
  '승인거절': 'bg-reject text-white',
};

/* 실제 api 연결시에는 로그인한 user의 id 값으로 불러와야 함!!*/
const fetchClientCompany = async () => {
  const res = await fetch('/api/v1/popup/client-company');
  const data = await res.json();
  clientCompanyList.value = data.data;
};

const fetchListupList = async () => {
  try {
    const res = await getListUpList(page.value, size.value, searchFilters.value);
    listupList.value = res.data.data;
  } catch (e) {
    console.error(e);
  }
};

const fetchProposalList = async () => {
  try {
    const res = await getProposalList(page.value, size.value, searchFilters.value);
    proposalList.value = res.data.data;
  } catch (e) {
    console.error(e);
  }
};

const fetchQuotationList = async () => {
  try {
    const res = await getQuotationList(page.value, size.value, searchFilters.value);
    quotationList.value = res.data.data;
  } catch (e) {
    console.error(e);
  }
};

const fetchContractList = async () => {
  try {
    const res = await getContractList(page.value, size.value, searchFilters.value);
    contractList.value = res.data.data;
  } catch (e) {
    console.error(e);
  }
};

const fetchEvent = async () => {
  const date = new Date().toISOString().split('T')[0];
  const res = await fetch(`/api/v1/calendar/${date}`);
  const data = await res.json();
  eventList.value = data.data;
};

const fetchAllData = async () => {
  isLoading.value = true
  isError.value = false
  try {
    await Promise.all([
      fetchClientCompany(),
      fetchListupList(),
      fetchProposalList(),
      fetchContractList(),
      fetchQuotationList(),
      fetchEvent()
    ])
  } catch (err) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
};

onMounted(fetchAllData)

const limitedCompanyList = computed(() => clientCompanyList.value.slice(0, 10));

const formatPrice = (value) => {
  if (typeof value === 'number') return value.toLocaleString('ko-KR');
  const num = parseFloat(value);
  return isNaN(num) ? value : num.toLocaleString('ko-KR');
};

const goToDetail = (type, id) => {
  router.push(`/${type}/${id}`);
};

const goToList = (type) => {
  router.push(`/${type}`);
}

const goToCalendar = () => {
  router.push(`/calendar`);
};
</script>

<template>
    <div class="flex flex-col w-full min-h-full">
        <div class="flex gap-5">
            <!-- 신규 영업 활동 -->
            <div class="dashboard-section w-2/3 px-10">
                <h2 class="text-xl font-bold">신규 영업 활동</h2>
                <div class="h-[1px] bg-gray-light mt-1 mb-5 w-full"></div>
                <div class="flex space-x-7 my-9 h-[70%]">
                    <div
                        class="flex-1 text-center border border-gray-light rounded-2xl py-3"
                        @click="goToList('management/client')"
                    >
                        <div class="text-lg font-bold bg-btn-sky rounded-md py-1.5 mx-4 text-white">
                          고객사
                        </div>
                        <div class="text-5xl font-semibold pt-10">12</div>
                    </div>
                    <div
                        class="flex-1 text-center border border-gray-light rounded-2xl py-3"
                        @click="goToList('influencer/list')"
                    >
                        <div class="text-lg font-bold bg-btn-sky rounded-md py-1.5 mx-4 text-white">
                          인플루언서
                        </div>
                        <div class="text-5xl font-semibold pt-10">12</div>
                    </div>
                    <div
                        class="flex-1 text-center border border-gray-light rounded-2xl py-3"
                        @click="goToList('sales/contract')"
                    >
                        <div class="text-lg font-bold bg-btn-sky rounded-md py-1.5 mx-4 text-white">
                          계약
                        </div>
                        <div class="text-5xl font-semibold pt-10">12</div>
                    </div>
                    <div
                        class="flex-1 text-center border border-gray-light rounded-2xl py-3"
                        @click="goToList('campaign')"
                    >
                        <div class="text-lg font-bold bg-btn-sky rounded-md py-1.5 mx-4 text-white">
                          파이프라인
                        </div>
                        <div class="text-5xl font-semibold pt-10">12</div>
                    </div>
                </div>
            </div>
            <!-- 일정 정보 -->
            <div class="dashboard-section w-1/3">
                <h2 class="text-xl font-bold">일정</h2>
                <div class="h-[1px] bg-gray-light mt-1 mb-3 w-full max-h-[200px] overflow-y-auto"></div>
                    <ul>
                        <li
                            v-for="(event, index) in eventList"
                            :key="index"
                            class="flex items-center gap-2 py-0.5 border border-gray-medium rounded p-3 mb-2 cursor-pointer hover:bg-btn-gray/20 transition-colors"
                            @click="goToCalendar"
                        >
                            <div class="w-2 h-5 rounded-sm" :style="{ backgroundColor: event.hexCode || event.hexCode }"></div>
                            <span class="text-gray-medium">{{ event.startTime.slice(0, 5) }} ~</span>
                            <span class="text-gray-medium">{{ event.endTime.slice(0, 5) }}</span>
                            <span>{{ event.title }}</span>
                        </li>
                      </ul>
                </div>
        </div>

        <div class="flex gap-5">
            <!-- 리스트업 -->
            <div class="dashboard-section w-2/3">
            <h2 class="text-xl font-bold mb-2">리스트업</h2>
            <div class="h-[1px] bg-gray-light mt-1 mb-3 w-full"></div>
            <ul class="flex flex-col w-full p-0 m-0 list-none max-h-[200px] overflow-y-auto">
                <li
                    v-for="(listup, index) in listupList"
                    :key="index"
                    class="grid w-full grid-cols-12 items-center gap-2 px-5 py-2 cursor-pointer hover:bg-btn-gray/20 transition-colors"
                    @click="goToDetail('influencer/recommendation', listup.id)"
                >
                    <span class="font-bold truncate col-span-2 text-left">{{ listup.clientCompany }}</span>
                    <span class="text-center col-span-4">{{ listup.campaignTitle }}</span>
                    <span class="text-center col-span-4">{{ listup.title }}</span>
                    <span class="text-center col-span-1">{{ listup.clientManagerName }}</span>
                    <span class="text-right col-span-1">{{ listup.clientManagerPosition }}</span>
                </li>
            </ul>
            </div>
                <!-- 고객사 -->
                <div class="dashboard-section w-1/3">
                    <h2 class="text-xl font-bold">고객사</h2>
                    <div class="h-[1px] bg-gray-light mt-1 mb-3 w-full"></div>
                        <ul class="max-h-[200px] overflow-y-auto">
                            <li
                                v-for="(company, index) in limitedCompanyList"
                                :key="index"
                                class="grid w-full grid-cols-3 items-center gap-2 px-5 py-2 cursor-pointer hover:bg-btn-gray/20 transition-colors"
                                @click="goToDetail('management/client', company.id)"
                            >
                                <span class="col-span-1">{{ company.name }}</span>
                                <span class="col-span-1">{{ company.telephone }}</span>
                                <span class="col-span-1 text-gray-medium">{{ company.createdAt }}</span>
                            </li>
                        </ul>
                </div>
          </div>

        <!-- 제안 -->
        <div class="dashboard-section w-full max-h-[320px] overflow-y-auto">
            <h2 class="text-xl font-bold mb-2">제안</h2>
            <div class="h-[1px] bg-gray-light mt-1 mb-3 w-full"></div>
            <ul class="flex flex-col w-full p-0 m-0 list-none max-h-[200px] overflow-y-auto">
                <li
                    v-for="(proposal, index) in proposalList"
                    :key="index"
                    class="grid w-full grid-cols-16 items-center gap-2 px-5 py-2 cursor-pointer hover:bg-btn-gray/20 transition-colors"
                    @click="goToDetail('sales/proposal', proposal.id)"
                >
                    <span class="font-bold truncate col-span-2 text-left">{{ proposal.clientCompany }}</span>
                    <span class="col-span-4">{{ proposal.campaignTitle }}</span>
                    <span class="col-span-3">{{ proposal.title }}</span>
                    <span class="col-span-2">{{ proposal.clientManagerName }}</span>
                    <span class="col-span-2">{{ proposal.clientManagerPosition }}</span>
                    <span
                        class="text-white text-center px-1 py-0.5 rounded-lg text-sm col-span-1"
                        :class="statusClassMap[proposal.status] || 'bg-gray-medium'"
                    >
                        {{ proposal.status }}
                    </span>
                    <span class="text-right text-gray-medium text-sm col-span-2">{{ proposal.presentDate }}</span>
                </li>
            </ul>
        </div>

        <div class="flex gap-5">
            <!-- 견적 -->
            <div class="dashboard-section w-1/2">
                <h2 class="text-xl font-bold mb-2">견적</h2>
                <div class="h-[1px] bg-gray-light mt-1 mb-3 w-full"></div>
                <ul class="flex flex-col w-full p-0 m-0 list-none max-h-[200px] overflow-y-auto">
                    <li
                      v-for="(quotation, index) in quotationList"
                      :key="index"
                      class="grid w-full grid-cols-11 items-center gap-2 px-5 py-2 cursor-pointer hover:bg-btn-gray/20 transition-colors"
                      @click="goToDetail('sales/quotation', quotation.id)"
                    >
                        <span class="font-bold truncate col-span-2 text-left">{{ quotation.clientCompany }}</span>
                        <span class="text-center col-span-5">{{ quotation.campaignTitle }}</span>
                        <span class="text-center col-span-2">{{ formatPrice(quotation.adPrice) }}</span>
                        <span class="text-center col-span-2 text-gray-medium">{{ quotation.presentDate }}</span>
                    </li>
                </ul>
            </div>
            <!-- 계약 -->
            <div class="dashboard-section w-1/2">
                <h2 class="text-xl font-bold mb-2">계약</h2>
                <div class="h-[1px] bg-gray-light mt-1 mb-3 w-full"></div>
                <ul class="flex flex-col w-full p-0 m-0 list-none max-h-[200px] overflow-y-auto">
                    <li
                        v-for="(contract, index) in contractList"
                        :key="index"
                        class="grid w-full grid-cols-14 items-center gap-2 px-5 py-2 cursor-pointer hover:bg-btn-gray/20 transition-colors"
                        @click="goToDetail('sales/contract', contract.id)"
                    >
                        <span class="font-bold truncate col-span-3 text-left">{{ contract.clientCompany }}</span>
                        <span class="text-center col-span-6">{{ contract.campaignTitle }}</span>
                        <span
                        class="text-white text-center px-1 py-0.5 rounded-lg text-sm col-span-2"
                        :class="statusClassMap[contract.status] || 'bg-gray-medium'"
                        >
                            {{ contract.status }}
                        </span>
                        <span class="text-center col-span-3 text-gray-medium">{{ contract.presentDate }}</span>
                    </li>
                </ul>
              </div>
        </div>
  </div>
</template>

