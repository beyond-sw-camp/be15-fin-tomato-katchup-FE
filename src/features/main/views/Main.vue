<script setup>
import { ref } from 'vue'
import ChatFloatingButton from '@/components/common/ChatFloatingButton.vue'
import ChatListModal from '@/features/chat/components/ChatListModal.vue'
import ChatRoom from '@/features/chat/components/ChatRoom.vue'
import SalesDashboard from '@/features/main/components/SalesDashboard.vue';

const isChatListVisible = ref(false)
const selectedRoom = ref(null)

const openChatRoom = (room) => {
  selectedRoom.value = room
  isChatListVisible.value = false
}
</script>

<template>
  <div class="flex min-h-screen relative">
    <SalesDashboard />

    <ChatFloatingButton @toggle="isChatListVisible = !isChatListVisible" />

    <ChatListModal
      v-if="isChatListVisible"
      @close="isChatListVisible = false"
      @open-room="openChatRoom"
    />

    <ChatRoom
      v-if="selectedRoom"
      :room="selectedRoom"
      @close="selectedRoom = null"
    />
  </div>
</template>
