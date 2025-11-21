<template>
  <div class="flex h-screen text-gray-900 dark:text-white">
    <Sidebar ref="sidebar" v-model:collapsed="collapsed" />

    <div class="flex-1 flex flex-col min-h-screen transition-all duration-300 bg-gray-50 dark:bg-[#051321]"
      :class="collapsed ? 'md:ml-20' : 'md:ml-64'">

      <nav
        class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 px-4 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">

        <div class="flex items-center gap-3">
          <button
            class="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            @click="sidebar.openMobile?.()">
            <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
          </button>
          <h1 class="font-bold text-xl tracking-tight text-gray-900 dark:text-white md:hidden">
            ArsipKu
          </h1>
        </div>

        <div class="flex items-center gap-3 md:gap-5">

          <div
            class="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
            <button v-for="locale in locales" :key="locale.code" @click="setLocale(locale.code)"
              class="px-3 py-2 text-xs font-bold rounded-full transition-all duration-200 ease-out" :class="[
                currentLocale === locale.code
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm scale-105'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              ]">
              {{ locale.name }}
            </button>
          </div>

          <div class="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
          <div
            class="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">

            <button @click="isDark = false"
              class="p-1.5 rounded-full transition-all duration-200 ease-out flex items-center justify-center"
              :class="!isDark ? 'bg-white text-orange-500 shadow-sm scale-105' : 'text-gray-400 hover:text-gray-600'">
              <UIcon name="i-heroicons-sun" class="w-5 h-5" />
            </button>

            <button @click="isDark = true"
              class="p-1.5 rounded-full transition-all duration-200 ease-out flex items-center justify-center"
              :class="isDark ? 'bg-gray-700 text-yellow-300 shadow-sm scale-105' : 'text-gray-400 hover:text-gray-600'">
              <UIcon name="i-heroicons-moon" class="w-5 h-5" />
            </button>

          </div>

        </div>
      </nav>

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
// const sidebar = ref(null)
const isDark = useDark()

// State Dark Mode (Contoh logika sederhana)
// const isDark = ref(false) // Ganti dengan useColorMode() jika pakai Nuxt

// State Bahasa
// Disarankan menggunakan kode singkat untuk UI kapsul (ID/EN)
const currentLocale = ref('id')
const locales = [
  { code: 'id', name: 'ID' },
  { code: 'en', name: 'EN' }
]

const setLocale = (code) => {
  currentLocale.value = code
  // Tambahkan logika i18n di sini
}

// Mock Sidebar prop (sesuaikan dengan inject/props asli Anda)
const sidebar = {
  openMobile: () => console.log('Open Sidebar')
}
</script>