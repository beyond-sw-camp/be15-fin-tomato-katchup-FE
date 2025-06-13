<template>
  <div class="relative w-[405px] min-h-[240px] p-4 border border-[color:var(--color-gray-dark)] rounded-xl bg-white font-sans flex flex-col">
    <!-- 점 3개 버튼 -->
    <div class="absolute top-3 right-3">
      <button class="flex flex-col gap-[2px]" @click="toggleDropdown">
        <span
          class="w-1 h-1 bg-black rounded-full"
          v-for="i in 3"
          :key="i"
        ></span>
      </button>

      <div
        v-if="showDropdown"
        class="absolute top-0 right-7 flex flex-col bg-white border border-[color:var(--color-gray-medium)] rounded shadow-md z-10"
      >
        <!-- 수정하기 -->
        <div
          class="w-[100px] px-3 py-2 text-sm text-center whitespace-nowrap bg-[color:var(--color-gray-medium)] hover:bg-[color:var(--color-dropdown)] cursor-pointer"
          @click="handleEdit"
        >
          수정하기
        </div>
        <!-- 삭제하기 -->
        <div
          class="w-[100px] px-3 py-2 text-sm text-center whitespace-nowrap bg-[color:var(--color-gray-medium)] hover:bg-[color:var(--color-dropdown)] cursor-pointer"
          @click="handleDelete"
        >
          삭제하기
        </div>
      </div>
    </div>

    <!-- 프로필 섹션 -->
    <div class="flex gap-3 items-start mb-3">
      <img
        :src="thumbnail || defaultThumbnail"
        alt="thumbnail"
        class="w-[100px] h-[100px] rounded-full object-cover border border-[color:var(--color-gray-light)]"
      />
      <div class="flex-1">
        <div class="flex items-center gap-1 text-base font-medium mb-1">
          <img :src="youtubeIcon" class="w-[18px] h-[18px]" alt="youtube" />
          <span class="font-bold text-[color:var(--color-click)]">{{ name }}</span>
        </div>
        <div class="text-sm text-[color:var(--color-gray-dark)] mb-1">
          {{ subscribers }}
        </div>
        <div class="flex items-center gap-1 text-base font-medium mb-1">
          <img :src="instagramIcon" class="w-[18px] h-[18px]" alt="instagram" />
          <span class="font-bold">{{ instagram }}</span>
        </div>
        <div class="text-sm text-[color:var(--color-gray-dark)] mb-2">
          {{ instaFollowers }}
        </div>

        <p class="text-sm leading-snug text-black break-words whitespace-normal">
          <span v-for="(tag, index) in tags" :key="index">
            #{{ tag }}<span v-if="index < tags.length - 1">, </span>
          </span>
        </p>
      </div>
    </div>

    <!-- 작성자 정보 -->
    <div class="flex items-center gap-1 text-sm text-[color:var(--color-gray-dark)] mt-auto pl-[2px]">
      <img :src="userIcon" class="w-5 h-5" alt="owner icon" />
      <span>{{ ownerName }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import youtubeIcon from '@/assets/icons/youtube.png'
import instagramIcon from '@/assets/icons/instagram.jpg'
import userIcon from '@/assets/icons/user.svg'
import defaultThumbnail from '@/assets/icons/logo.png'

// Props
const props = defineProps({
  id: Number,
  name: String,
  subscribers: String,
  instagram: String,
  instaFollowers: String,
  tags: Array,
  ownerName: String,
  thumbnail: String
})

// Dropdown toggle 상태
const showDropdown = ref(false)
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Emit
const emit = defineEmits(['edit', 'delete'])

const handleEdit = () => {
  emit('edit', {
    id: props.id,
    name: props.name,
    subscribers: props.subscribers,
    instagram: props.instagram,
    instaFollowers: props.instaFollowers,
    tags: props.tags,
    ownerName: props.ownerName,
    thumbnail: props.thumbnail
  })
}

const handleDelete = () => {
  emit('delete', props.id)
}
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css");
</style>
