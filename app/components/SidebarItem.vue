<template>
  <div class="relative group">
    <NuxtLink :to="to" :class="[
      'flex items-center transition rounded-full h-10 font-medium text-sm',
      collapsed
        ? 'justify-center px-0'
        : 'gap-3 px-4 justify-start',
      active
        ? 'bg-blue-100 dark:bg-white/20 text-sky-800 dark:text-white'
        : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-white/10'
    ]">
      <UIcon :name="icon" class="w-5 h-5"
        :class="active ? 'text-sky-800 dark:text-white' : 'text-gray-600 dark:text-gray-300'" />
      <span v-if="!collapsed" class="whitespace-nowrap">{{ label }}</span>
    </NuxtLink>

    <!-- TOOLTIP -->
    <div v-if="collapsed" class="absolute left-full top-1/2 -translate-y-1/2 ml-2
             bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100
             pointer-events-none transition-opacity whitespace-nowrap z-50">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  to: String,
  icon: String,
  label: String,
  collapsed: Boolean,
  active: Boolean
})
</script>
