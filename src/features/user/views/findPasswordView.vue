<script setup>

import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import MainLogo from '@/features/user/components/MainLogo.vue'

const toast = useToast();
const router = useRouter();

const emp_number = ref('');
const email = ref('');

const handleFindPassword = () => {
    if (!emp_number.value || !email.value) {
        toast.error('사원코드와 이메일을 입력해주세요.')
        return
    }
    toast.success('입력하신 이메일 주소로 비밀번호가 발송되었습니다.')
    router.push('/login')
    const domain = email.value.split('@')[1]
    window.open(`https://${domain}`, '_blank')
}
</script>

<template>
    <div class = "findPassword-layout bg-[#f5f7fa]">
        <MainLogo />

      <div class = "card-style">
        <div class="title text-center mb-8">
          <h1 class="text-[36px] font-bold mb-3">비밀번호 찾기</h1>
        </div>

            <form class="findPassword-form flex flex-col" @submit.prevent="handleFindPassword">
                <label class="input-box-label text-click text-md py-1">사원코드</label>
                <input v-model="emp_number" type="text" class="border border-[#D9D9D9] rounded-[10px] px-5 py-3 w-full" />
                <label class="input-box-label text-click text-md pt-5.5 pb-1">이메일</label>
                <input v-model="email" type="email" class="border border-[#D9D9D9] rounded-[10px] px-5 py-3 w-full" />

              <div class="flex justify-between mt-2 text-[1rem] pt-0.5 pb-5.5 text-gray-medium">
                <RouterLink
                  to="login"
                  class="ml-94.5 pb-1 text-[0.9rem] text-gray-400 whitespace-nowrap hover:underline"
                >
                  뒤로
                </RouterLink>
              </div>
                <button class="bg-[#A8C1DA] text-white px-5 py-3 mb-5 text-md rounded w-full">
                    비밀번호 찾기
                </button>
            </form>
            <div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.findPassword-layout {
    display: flex;
    flex-direction: column;
    justify-content: center;
     align-items: center;
    height: 100vh;
}
</style>
