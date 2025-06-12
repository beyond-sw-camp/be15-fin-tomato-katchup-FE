<template>
  <div class="card">
    <div class="dropdown-wrapper">
      <button class="menu-btn" @click="toggleDropdown">
        <span class="dot" v-for="i in 3" :key="i"></span>
      </button>
      <div v-if="showDropdown" class="dropdown-menu">
        <div class="dropdown-item" @mouseover="hovered='edit'" @mouseleave="hovered=''" :class="{ hovered: hovered==='edit' }">수정하기</div>
        <div class="dropdown-item" @mouseover="hovered='delete'" @mouseleave="hovered=''" :class="{ hovered: hovered==='delete' }">삭제하기</div>
      </div>
    </div>
    <div class="profile-section">
      <img :src="thumbnail || defaultThumbnail" alt="thumbnail" class="thumbnail" />
      <div class="info-section">
        <div class="line">
          <img :src="youtubeIcon" class="icon" />
          <span class="name">{{ name }}</span>
        </div>
        <div class="line">
          <span class="subscribers">{{ subscribers }}</span>
        </div>
        <div class="line">
          <img :src="instagramIcon" class="icon" />
          <span class="instagram">@{{ instagram }}</span>
        </div>
        <div class="line">
          <span class="insta-followers">{{ instaFollowers }}</span>
        </div>

        <p class="tag-line">
          <span v-for="(tag, index) in tags" :key="index">
            #{{ tag }}<span v-if="index < tags.length - 1">, </span>
          </span>
        </p>
      </div>
    </div>
    <div class="card-footer">
      <div class="owner-inline">
        <img :src="userIcon" class="user-icon" />
        <span class="owner-name">{{ ownerName }}</span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import youtubeIcon from '@/assets/icons/youtube.png'
import instagramIcon from '@/assets/icons/instagram.jpg'
import userIcon from '@/assets/icons/user.svg'
import defaultThumbnail from '@/assets/icons/logo.png'

defineProps({
  name: String,
  subscribers: String,
  instagram: String,
  instaFollowers: String,
  tags: Array,
  ownerName: String,
  thumbnail: String
})

const showDropdown = ref(false)
const hovered = ref('')
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}
</script>

<style scoped>
.card {
  width: 405px;
  height: 240px;
  padding: 16px;
  border: 1px solid var(--tmt-color-gray-light);
  border-radius: 12px;
  background: white;
  position: relative;
  font-family: var(--tmt-font-family-default);
  display: flex;
  flex-direction: column;
}


.dropdown-wrapper {
  position: absolute;
  top: 12px;
  right: 12px;
}
.menu-btn {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;
}
.dot {
  width: 4px;
  height: 4px;
  background: black;
  border-radius: 50%;
}
.dropdown-menu {
  position: absolute;
  top: 0;
  right: 28px;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.dropdown-item {
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  text-align: center;
  background-color: #d0d0d0;
}
.dropdown-item.hovered {
  background-color: #e1ecf7 !important;
}

.profile-section {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 12px;
}
.thumbnail {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #eee;
}
.info-section {
  flex-grow: 1;
}
.line {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--tmt-font-size-md);
  font-weight: var(--tmt-font-weight-medium);
  margin-bottom: 4px;
  flex-wrap: wrap;
}
.name {
  font-weight: var(--tmt-font-weight-bold);
}
.subscribers,
.insta-followers {
  font-size: var(--tmt-font-size-sm);
  color: var(--tmt-color-gray-dark);
}
.icon {
  width: 18px;
  height: 18px;
}
.instagram {
  font-weight: var(--tmt-font-weight-bold);
}

.owner-inline {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--tmt-font-size-sm);
  color: var(--tmt-color-gray-dark);
  white-space: nowrap;
  flex-shrink: 0;
}

.user-icon {
  width: 20px;
  height: 20px;
}
.tag-line {
  font-size: var(--tmt-font-size-sm);
  line-height: 1.5;
  white-space: normal;
  word-break: break-word;
  margin-top: 4px;
}
.card-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--tmt-font-size-sm);
  color: var(--tmt-color-gray-dark);
  position: absolute;
  bottom: 16px;
  left: 16px;
}


</style>
