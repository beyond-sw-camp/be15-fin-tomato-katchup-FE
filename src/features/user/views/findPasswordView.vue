<script setup>

import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import MainLogo from '@/features/user/components/MainLogo.vue'

const toast = useToast();
const router = useRouter();

const emp_number = ref('');
const email = ref('');

const isLoading = ref(false);

</script>

<template>
    <div class = "findPassword-layout">
        <MainLogo />

        <div class = "card-style">
            <div class="title text-center mb-8">
                <h1 class="text-[40px] font-semibold mb-2">비밀번호 찾기</h1>
            </div>

            <form class="login-form flex flex-col" @submit.prevent="handleFindPassword">
                <label class="input-box-label text-click text-md pt-5 pb-1">사원코드</label>
                <input v-model="emp_number" type="text" class="border border-[#D9D9D9] rounded-[10px] px-6 py-6" />
                <label class="input-box-label text-click text-md pt-5 pb-1">이메일</label>
                <input v-model="email" type="email" class="border border-[#D9D9D9] rounded-[10px] px-6 py-6 pb-6" />
                <button class = "mt-12 bg-[#A8C1DA] text-white w-full py-4 text-md rounded">
                    비밀번호 찾기
                </button>
            </form>
        </div>
    </div>

</template>

<style scoped>
.findPassword-layout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
