<template>
  <div v-if="isMobileOpen" class="fixed inset-0 bg-black/50 z-30 md:hidden" @click="closeMobile"></div>

  <aside :class="[
    collapsed ? 'w-20' : 'w-64',
    isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
    'fixed left-0 top-0 h-screen z-50',
    'bg-white dark:bg-gray-900 shadow border-r border-gray-200 dark:border-gray-800',
    'transition-all duration-300 flex flex-col'
  ]">
    <div class="relative h-20 flex items-center dark:border-gray-800 flex-shrink-0"
      :class="collapsed ? 'justify-center' : 'justify-start px-4'">

      <div class="flex items-center gap-2">
        <img src="/logo.png" class="h-8 w-auto object-contain" />
        <h1 v-if="!collapsed" class="font-bold text-lg whitespace-nowrap dark:text-white">ArsipKu</h1>
      </div>

      <button @click="isMobileOpen = !isMobileOpen" :class="[
        'md:hidden absolute top-4.5 -right-4 z-50 w-7 h-7 rounded-full',
        'bg-white dark:bg-gray-800 shadow-md border border-gray-300 dark:border-gray-700',
        'flex items-center justify-center text-gray-500 hover:text-primary-500 transition-colors',
        !isMobileOpen && 'hidden'
      ]">
        <UIcon name="i-heroicons-chevron-left" class="w-4 h-4 transition-transform" />
      </button>


    </div>

    <button @click="$emit('update:collapsed', !collapsed)" class="hidden md:flex absolute top-6 -right-4 z-50 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-md
      border border-gray-300 dark:border-gray-700
      items-center justify-center text-gray-500 hover:text-primary-500 transition-colors">
      <UIcon name="i-heroicons-chevron-left" :class="['w-4 h-4 transition-transform', collapsed && 'rotate-180']" />
    </button>

    <div class="flex-1 space-y-1 mt-0 px-2 overflow-y-auto custom-scrollbar">
      <SidebarItem v-for="item in menus" :key="item.to" v-bind="item" :collapsed="collapsed"
        :active="route.path === item.to" />
    </div>

    <div class="p-4 border-t border-gray-200 dark:border-gray-800 mt-auto">

      <div class="relative group">
        <button @click="toggleMenu"
          class="flex items-center w-full gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left">

          <img src="https://i.pravatar.cc/150?img=33" alt="User"
            class="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700 flex-shrink-0" />

          <div v-if="!collapsed" class="flex-1 min-w-0 overflow-hidden">
            <p class="text-sm font-bold text-gray-900 dark:text-white truncate">Ivan Dwi Santoso</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">Administrator</p>
          </div>

          <UIcon v-if="!collapsed" name="i-heroicons-ellipsis-vertical" class="w-5 h-5 text-gray-400" />
        </button>

        <!-- DESKTOP: open saat hover -->
        <!-- MOBILE: open saat click -->
        <div :class="[
          'absolute bottom-full left-0 mb-2 w-56 transition-all duration-200 ease-out z-50',
          open
            ? 'visible opacity-100 translate-y-0'
            : 'invisible opacity-0 translate-y-2',
          'group-hover:visible group-hover:opacity-100 group-hover:translate-y-0'
        ]">
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-1">

            <a href="/settings"
              class="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Setting Notif Email
            </a>

            <a href="/settings"
              class="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Visualisasi Digsig (Visible)
            </a>

            <a href="/settings"
              class="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Staff Administrasi
            </a>

            <div class="h-px bg-gray-100 dark:bg-gray-700 my-1 mx-2"></div>

            <button
              class="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-left">
              Logout
            </button>
          </div>

          <div class="absolute top-full left-0 w-full h-3 bg-transparent"></div>
        </div>
      </div>

    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue";
import { LayoutDashboard, Inbox, Send, FileText, Link, Copy, BookOpen } from "lucide-vue-next";


defineProps({
  collapsed: Boolean,
});
defineEmits(["update:collapsed"]);

const route = useRoute();
const isMobileOpen = ref(false);
const open = ref(false);

function toggleMenu() {
  open.value = !open.value;
}

const closeMobile = () => (isMobileOpen.value = false);

defineExpose({
  openMobile: () => (isMobileOpen.value = true),
  closeMobile,
});

const menus = [
  { label: "Dashboard", to: "/user/dashboard", icon: LayoutDashboard },
  { label: "Kotak Masuk", to: "/user/kotak-masuk", icon: Inbox },
  { label: "Terkirim", to: "/user/terkirim", icon: Send },
  { label: "Draft", to: "/user/draft", icon: FileText },
  { label: "Short URL", to: "/user/short-url", icon: Link },
  { label: "Template", to: "/user/template", icon: Copy },
  { label: "Titelatur Inggris", to: "/user/titelatur", icon: BookOpen },
];

</script>

<style scoped>
/* Scrollbar tipis agar rapi */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 20px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #374151;
}
</style>