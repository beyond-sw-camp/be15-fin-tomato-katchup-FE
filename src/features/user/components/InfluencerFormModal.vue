<template>
  <div class="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
    <div class="bg-white rounded-xl p-6 w-[554px] max-h-[800vh] overflow-y-auto">
      <h2 class="text-lg font-semibold mb-4">인플루언서 등록</h2>

      <!-- 유튜브 / 인스타 연동 -->
      <div class="flex justify-between items-center mb-4">
        <div class="flex flex-col w-[48%]">
          <label class="text-sm font-medium mb-1">유튜브명</label>
          <input type="text" placeholder="유튜브 계정을 연동하세요." class="border px-3 py-2 rounded text-sm" />
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="text-sm font-medium mb-1">인스타그램 아이디</label>
          <input type="text" placeholder="인스타그램 계정을 연동하세요." class="border px-3 py-2 rounded text-sm" />
        </div>
      </div>

      <!-- 드롭다운 영역 -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <select class="border px-3 py-2 rounded text-sm">
          <option disabled selected>성별을 선택하세요.</option>
          <option>남성</option>
          <option>여성</option>
        </select>

        <select class="border px-3 py-2 rounded text-sm">
          <option disabled selected>담당자를 선택하세요.</option>
          <option>오유경</option>
          <option>이승재</option>
        </select>

        <select class="border px-3 py-2 rounded text-sm">
          <option disabled selected>주요 지역</option>
          <option>국내</option>
          <option>해외</option>
        </select>

        <input type="text" placeholder="광고 단가를 입력하세요." class="border px-3 py-2 rounded text-sm" />
      </div>

      <!-- 분류 입력 -->
      <textarea placeholder="분류" rows="3" class="w-full border px-3 py-2 rounded text-sm mb-4"></textarea>

      <!-- 분류 기준 -->
      <div class="border px-3 py-2 rounded">
        <div class="flex flex-wrap gap-2">
          <span class="text-sm px-2 py-1 rounded-full bg-red-200 text-black"># Entertainment</span>
          <span class="text-sm px-2 py-1 rounded-full bg-yellow-200 text-black"># LifeStyle</span>
          <span class="text-sm px-2 py-1 rounded-full bg-purple-200 text-black"># Fashion & Beauty</span>
          <span class="text-sm px-2 py-1 rounded-full bg-amber-200 text-black"># Food</span>
          <span class="text-sm px-2 py-1 rounded-full bg-blue-200 text-black"># Family & Kids</span>
          <span class="text-sm px-2 py-1 rounded-full bg-gray-400 text-white"># Professional</span>
          <span class="text-sm px-2 py-1 rounded-full bg-pink-200 text-black"># Animation</span>
          <span class="text-sm px-2 py-1 rounded-full bg-green-200 text-black"># Pet</span>
          <span class="text-sm px-2 py-1 rounded-full bg-lime-200 text-black"># Gaming</span>
        </div>
      </div>

      <!-- 버튼 -->
      <div class="flex justify-end gap-2 mt-6">
        <button @click="$emit('close')" class="bg-[color:var(--color-btn-gray)] text-white px-4 py-2 rounded">취소</button>
        <button class="bg-[color:var(--color-btn-blue)] text-white px-4 py-2 rounded">저장</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 이 모달은 부모가 v-if로 띄우며, @close 이벤트를 emit합니다.
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css");
@import "tailwindcss";
</style>
