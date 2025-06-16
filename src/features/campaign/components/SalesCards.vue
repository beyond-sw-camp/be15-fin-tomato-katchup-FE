<template>
    <div
        class="p-4 rounded-lg border border-gray-200 shadow hover:shadow-md cursor-pointer transition relative"
        @click="$emit('click')"
    >
        <!-- 상단: 제목 / 상태 -->
        <div class="flex justify-between items-center mb-2">
            <div class="text-base font-semibold truncate max-w-[70%]">
                {{ proposal.title }}
            </div>

            <div class="flex items-center gap-2">
                <div
                    :class="['px-2 py-1 rounded text-white text-sm', statusColor(proposal.status)]"
                >
                    {{ proposal.status }}
                </div>

                <!-- ⋮ 버튼 -->
                <div class="relative">
                    <button
                        @click.stop="$emit('menuToggle', proposal.id)"
                        class="p-1 hover:bg-gray-100 rounded"
                    >
                        <Icon icon="mdi:dots-vertical" width="20" height="20" />
                    </button>

                    <!-- 삭제 메뉴 -->
                    <div
                        v-if="openMenuId === proposal.id"
                        class="absolute right-0 mt-2 bg-white border border-gray-medium rounded shadow-lg w-24 text-sm z-10"
                    >
                        <button
                            @click.stop="$emit('delete', proposal.id)"
                            class="block w-full text-left px-4 py-2 hover:bg-gray-medium"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 부모 캠페인 명 -->
        <div class="text-gray-dark text-sm mb-8 truncate max-w-full">
            {{ proposal.campaignTitle }}
        </div>

        <!-- 상세 정보 -->
        <div class="flex justify-between text-sm text-gray-dark mb-3">
            <div class="flex items-center gap-1 max-w-[40%]">
                <div class="shrink-0">
                    <Icon icon="tabler:building" width="24" height="24" class="mr-2" />
                </div>
                <div class="truncate">
                    <span>{{ proposal.clientCompany }}</span>
                </div>
            </div>

            <div class="flex gap-4 items-center truncate max-w-[50%]">
                <div class="flex items-center gap-1 truncate">
                    <Icon icon="mdi:person-tie" width="24" height="24" class="mr-2" />
                    <span>{{ proposal.userName }}</span>
                </div>
                <div class="flex items-center gap-1 truncate">
                    <Icon icon="mdi:account-check" width="24" height="24" class="mr-2" />
                    <span>{{ proposal.clientManagerName }}</span>
                </div>
            </div>
        </div>

        <!-- 요청일 / 발표일 -->
        <div class="flex justify-start gap-4 text-sm text-gray-dark border-t pt-2 px-2">
            <div>요청일 ({{ formatDate(proposal.requestDate) }})</div>
            <div>발표일 ({{ formatDate(proposal.presentDate) }})</div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
    proposal: { type: Object, required: true },
    openMenuId: { type: Number, default: null },
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
};

const statusColor = (status) => {
    switch (status) {
        case '승인완료':
            return 'bg-complete';
        case '승인요청':
            return 'bg-request';
        case '보류/대기':
            return 'bg-onhold';
        case '승인거절':
            return 'bg-reject';
        default:
            return 'bg-gray-300';
    }
};
</script>
