<template>
  <div class="flex h-screen text-gray-900 dark:text-white">
    <Sidebar ref="sidebar" v-model:collapsed="collapsed" />

    <div class="flex-1 flex flex-col min-h-screen transition-all duration-300 bg-gray-50 dark:bg-[#051321]"
      :class="collapsed ? 'md:ml-20' : 'md:ml-64'">

      <UNavbar
        class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 px-4 flex items-center justify-between sticky top-0 z-30">
        <div class="flex items-center gap-2">
          <button class="md:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="sidebar.openMobile?.()">
            <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
          </button>
          <h1 class="font-bold text-lg md:hidden">ArsipKu</h1>
        </div>

        <div class="flex items-center gap-4">
          <USwitch v-model="isDark" size="md">
            <template #icon>
              <UIcon :name="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'" />
            </template>
          </USwitch>
        </div>
      </UNavbar>

      <main class="flex-1 p-5 overflow-auto">
        <NuxtPage />
      </main>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
import Sidebar from '~/components/Sidebar.vue' // Sesuaikan path

const collapsed = ref(false)
const sidebar = ref(null)
const isDark = useDark()
</script>