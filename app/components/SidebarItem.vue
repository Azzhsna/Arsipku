<template>
  <div ref="itemRef" class="relative group" @mouseenter="onMouseEnter" @mouseleave="isHovered = false">
    <NuxtLink :to="to" :class="[
      'flex items-center transition rounded-full h-10 font-medium text-sm',
      collapsed
        ? 'justify-center w-10 px-0 mx-auto'
        : 'gap-3 px-3 w-full justify-start',

      active
        ? 'bg-blue-50 text-blue-800 dark:bg-blue-300/20 dark:text-white'
        : 'text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
    ]">
      <component :is="icon" class="w-5 h-5 flex-shrink-0 transition-colors"
        :class="active ? 'text-blue-800 dark:text-white' : 'text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-white'" />

      <span v-if="!collapsed" class="whitespace-nowrap truncate">
        {{ label }}
      </span>
    </NuxtLink>

    <Teleport to="body">
      <div v-if="collapsed && isHovered" :style="tooltipStyle" class="fixed z-[9999] ml-2 px-2 py-1.5
               bg-neutral-800 text-white dark:bg-neutral-700 dark:text-white
               text-xs rounded-md border border-neutral-700 dark:border-neutral-800
               pointer-events-none transition-opacity duration-200
               whitespace-nowrap flex items-center -translate-y-1/2">
        <div
          class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-800 dark:bg-neutral-700 rotate-45 border-l border-b border-neutral-700 dark:border-neutral-800">
        </div>

        <span class="relative z-10 font-medium">{{ label }}</span>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  to: String,
  icon: Object,
  label: String,
  collapsed: Boolean,
  active: Boolean
});

// State untuk logika posisi
const itemRef = ref(null);
const isHovered = ref(false);
const tooltipPosition = ref({ top: 0, left: 0 });

// Hitung posisi saat mouse masuk
const onMouseEnter = () => {
  if (!props.collapsed || !itemRef.value) return;

  // Ambil koordinat elemen menu di layar
  const rect = itemRef.value.getBoundingClientRect();

  tooltipPosition.value = {
    top: rect.top + (rect.height / 2), // Posisi tengah vertikal icon
    left: rect.right // Posisi tepat di sebelah kanan icon
  };

  isHovered.value = true;
};

// Style dinamis untuk tooltip fixed
const tooltipStyle = computed(() => ({
  top: `${tooltipPosition.value.top}px`,
  left: `${tooltipPosition.value.left}px`
}));
</script>