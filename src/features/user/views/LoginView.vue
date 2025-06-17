<script setup>

import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import MainLogo from '@/features/user/components/MainLogo.vue'
import { ref } from 'vue'

const router = useRouter();
const toast = useToast();

const emp_number = ref('');
const password = ref('');

const handleLogin = () => {
    if (!emp_number.value || !password.value) {
        toast.error('사원코드와 비밀번호를 입력해주세요.');
        return;
    }

    toast.success('로그인 되었습니다.');
    router.push('/');
};

</script>

<template>
  <div class = "login-layout bg-[#f5f7fa]">
    <MainLogo />

    <div class = "card-style">
      <div class="title text-center mb-8">
        <h1 class="text-[40px] font-semibold mb-4">로그인</h1>
      </div>

      <form class="login-form flex flex-col" @submit.prevent="handleLogin">
        <label class="input-box-label text-click text-md py-1">사원코드</label>
        <input v-model="emp_number" type="text" class="border border-[#D9D9D9] rounded-[10px] px-6 py-4" />


        <label class="input-box-label text-click text-md pt-6 pb-1">비밀번호</label>
        <input v-model="password" type="password" class="border border-[#D9D9D9] rounded-[10px] px-6 py-4" />


        <div class="flex justify-between mt-2 text-[1rem] pt-10 pb-1 text-gray-medium">
          <RouterLink to="findPassword">비밀번호 찾기</RouterLink>
        </div>
              <button type = "submit" class="bg-[#A8C1DA] text-white px-60 py-4 text-md rounded ">
                  로그인
              </button>
      </form>

    </div>
  </div>
</template>

<style scoped>
.login-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    height: 100vh;
}
</style>
