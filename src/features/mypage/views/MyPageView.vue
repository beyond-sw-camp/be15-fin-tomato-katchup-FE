<script setup>
</script>

<template>
  <div class="min-h-screen bg-[--color-background] font-sans p-10">
    <div class="bg-white rounded-[24px] shadow-[0_0_12px_rgba(0,0,0,0.1)] w-full max-w-[1400px] min-h-[700px] mx-auto">
      <!-- 내부 여백 설정 -->
      <div class="pt-[40px] px-[160px]">

        <!-- 제목 + 가로선 -->
        <div class="mb-4">
          <h2 class="text-[26px] font-medium mb-2">마이페이지</h2>
          <hr class="border-t-2 border-[#D9D9D9]" />
        </div>

        <!-- 좌우 레이아웃 -->
        <div class="flex">
          <!-- 왼쪽: 계정 및 프로필 정보 -->
          <div class="w-1/2 pr-12 space-y-6">
            <div class="border border-[#D9D9D9] rounded-[12px] px-6 py-4">
              <h3 class="text-sm font-medium mb-4">로그인 정보</h3>

              <!-- 사원코드 -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-[#BFBFBF]">사원코드</span>
                <span class="text-base font-medium text-black">113456</span>
              </div>
              <hr class="border-t border-[#EAEAEA] my-2" />

              <!-- 전화번호 -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-[#BFBFBF]">전화번호</span>
                <div class="flex items-center gap-1">
                  <span class="text-base font-medium text-black">010-1234-5678</span>
                  <button class="text-[#828282]"><img src="/src/assets/icons/editpencil.svg" alt="edit" class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <hr class="border-t border-[#EAEAEA] my-2" />

              <!-- 메일 -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-[#BFBFBF]">메일</span>
                <div class="flex items-center gap-1">
                  <span class="text-base font-medium text-black">lsj9057@daum.net</span>
                  <button class="text-[#828282]"><img src="/src/assets/icons/editpencil.svg" alt="edit" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- 프로필 정보 -->
            <div class="border border-[#D9D9D9] rounded-[12px] px-6 py-4">
              <h3 class="text-sm font-medium mb-4">프로필 정보</h3>

              <!-- 프로필 사진 -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-[#BFBFBF]">프로필 사진</span>
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-[#EAEAEA] rounded-full flex items-center justify-center text-[#BFBFBF] text-2xl">
                    👤
                  </div>
                  <button class="text-[#828282]"><img src="/src/assets/icons/editpencil.svg" alt="edit" class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <hr class="border-t border-[#EAEAEA] my-2" />

              <!-- 이름 -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-[#BFBFBF]">이름</span>
                <div class="flex items-center gap-1">
                  <span class="text-base font-medium text-black">이승재</span>
                  <button class="text-[#828282]"><img src="/src/assets/icons/editpencil.svg" alt="edit" class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <hr class="border-t border-[#EAEAEA] my-2" />

              <!-- 생년월일 -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-[#BFBFBF]">생년월일</span>
                <div class="flex items-center gap-1">
                  <span class="text-base font-medium text-black">2000.00.00</span>
                  <button class="text-[#828282]"><img src="/src/assets/icons/editpencil.svg" alt="edit" class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <hr class="border-t border-[#EAEAEA] my-2" />

              <!-- 성별 -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-[#BFBFBF]">성별</span>
                <div class="flex items-center gap-1">
                  <span class="text-base font-medium text-black">남성</span>
                  <button class="text-[#828282]"><img src="/src/assets/icons/editpencil.svg" alt="edit" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <button class="bg-[#A8C1DA] text-white px-2 py-2 text-sm rounded">비밀번호 변경</button>
          </div>

          <!-- 가운데 세로선 -->
          <div class="h-auto border-l-2 border-[#D9D9D9]"></div>

          <!-- 오른쪽: 비워둔 영역 -->
          <div class="w-1/2 pl-12">
            <!-- 추후 인플루언서 카드 등 들어갈 곳 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
:root {
  font-family: var(--font-display);
}
</style>
