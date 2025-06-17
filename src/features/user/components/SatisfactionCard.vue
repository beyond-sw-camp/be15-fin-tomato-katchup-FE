<template>
    <div
        class="w-full border border-gray-medium rounded-xl bg-white shadow-sm p-5 hover:bg-gray-100 transition-colors duration-200"
    >
        <div class="flex justify-between items-start mb-5">
            <div class="flex flex-col justify-between min-h-[80px]">
                <h3 class="text-lg font-bold text-black">평균 만족도</h3>
            </div>
        </div>
      <div class="flex items-center gap-15">
        <h1 class="text-5xl font-bold text-black">{{ satisfaction }}%</h1>
        <Icon
          :icon="satisfactionIcon"
          :class="satisfactionColorClass"
          width=150px
          height=150px
        />
      </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue'

const satisfaction = ref(92.6);

const satisfactionIcon = computed(() => {
  if ( satisfaction.value  <= 50) {
    return 'ph:smiley-sad';
  } else if (satisfaction.value <= 80) {
    return 'ph:smiley-meh';
  } else {
    return 'ph:smiley';
  }
});

const satisfactionColorClass = computed(() => {
  if (satisfaction.value <= 50) {
    return 'text-red-500';
  } else if (satisfaction.value <= 80) {
    return 'text-yellow-400';
  } else {
    return 'text-green-500';
  }
})

</script>
