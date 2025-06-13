<template>
  <div class="sticky top-10 w-[304px] h-[630px] bg-white rounded-2xl shadow-md p-6">
    <p class="text text-md font-semibold mb-4 mt-5">검색조건</p>

    <select class="appearance-none leading-tight focus:outline-none w-full border border-gray-medium rounded-md p-2 mb-3">
      <option>전체</option>
      <option>캠페인명</option>
      <option>광고업체명</option>
      <option>광고담당자명</option>
    </select>

    <input type="text" placeholder="검색어" class="w-full border border-gray-medium rounded-md p-2 mb-3" />

    <div class="flex gap-2 mb-3">
      <input type="text" placeholder="담당자" class="flex-1 min-w-0 border border-gray-medium rounded-md p-2" />
      <button class="w-[40px] h-[40px] bg-background border border-gray-medium rounded-md flex items-center justify-center">
        <img src="@/assets/icons/add.svg" alt="sort" class="w-5 select-none" />
      </button>
    </div>

    <button class="w-full bg-btn-gray text-white font-semibold py-2 rounded-md mb-5">검색</button>

    <p class="text text-md font-semibold mb-4 mt-5">필터/정렬</p>

    <select class="appearance-none leading-tight focus:outline-none w-full border border-gray-medium rounded-md p-2 mb-3">
      <option>필터</option>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        ▼
      </div>
    </select>

    <div class="flex gap-2 mb-3">
      <select class="flex-1 border border-gray-medium rounded-md p-2">
        <option>등록일</option>
      </select>
      <button class="w-[40px] h-[40px] bg-btn-gray border border-gray-medium rounded-md flex items-center justify-center">
        <img src="@/assets/icons/sort.svg" alt="sort" class="w-5 select-none" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
