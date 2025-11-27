<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue";

const props = defineProps({
  collapsed: Boolean,
});
const emit = defineEmits(["update:collapsed"]);

const route = useRoute();
const isMobileOpen = ref(false);
const isHovering = ref(false); // State untuk deteksi hover mouse
const showMore = ref(false);   // State untuk toggle menu "Lainnya"

const closeMobile = () => (isMobileOpen.value = false);

defineExpose({
  openMobile: () => (isMobileOpen.value = true),
  closeMobile,
});

// --- LOGIKA HOVER EXPAND ---
// Sidebar dianggap collapsed jika:
// 1. Props collapsed = true
// 2. DAN mouse TIDAK sedang hover di sidebar (kecuali di mobile)
const realCollapsed = computed(() => {
  if (isMobileOpen.value) return false; // Mobile selalu full
  return props.collapsed && !isHovering.value;
});

// Handler Hover
const onMouseEnter = () => {
  if (props.collapsed && window.innerWidth >= 768) {
    isHovering.value = true;
  }
};
const onMouseLeave = () => {
  isHovering.value = false;
};

// --- DATA MENU ---

const userMenus = [
  { label: "Dashboard", to: "/user/dashboard", icon: "i-lucide-layout-dashboard" },
  { label: "Kotak Masuk", to: "/user/kotak-masuk", icon: "i-lucide-inbox" },
  { label: "Terkirim", to: "/user/terkirim", icon: "i-lucide-send" },
];

// MENU ADMIN UTAMA
const adminMainMenus = [
  { label: "Dashboard", to: "/admin/dashboard", icon: "i-lucide-layout-dashboard" },
  {
    label: "Tulis",
    to: "/admin/korespondensi/tulis",
    icon: "i-lucide-edit",
    children: [
      { label: "Nota Dinas", to: "/admin/korespondensi/tulis/nota-dinas" },
      { label: "Disposisi", to: "/admin/korespondensi/tulis/disposisi" },
      { label: "Surat Dinas Eksternal", to: "/admin/korespondensi/tulis/sd-eksternal" },
      { label: "Surat Dinas Internal", to: "/admin/korespondensi/tulis/sd-internal" },
      { label: "Registrasi", to: "/admin/korespondensi/tulis/registrasi" },
    ]
  },
  { label: "Kotak Masuk", to: "/admin/korespondensi/kotak-masuk", icon: "i-lucide-inbox", badge: 2 },
  { label: "Terkirim", to: "/admin/korespondensi/terkirim", icon: "i-lucide-send" },
  { label: "Draft", to: "/admin/korespondensi/draft", icon: "i-lucide-file-text", badge: 1 },
  {
    label: "Digsig",
    to: "/admin/digsig",
    icon: "i-lucide-signature",
    children: [ { label: "Info Digsig", to: "/admin/digsig/info" } ]
  },
  { label: "Short URL", to: "/admin/short-url", icon: "i-lucide-link" },
];

// MENU TAMBAHAN (LAINNYA) - Dikeluarkan dari children, diberi icon sendiri
const adminMoreMenus = [
  { label: "Tugas", to: "/admin/tugas", icon: "i-lucide-clipboard-check" },
  { label: "Berkas", to: "/admin/berkas", icon: "i-lucide-folder" },
  { label: "Template", to: "/admin/template", icon: "i-lucide-copy" },
  { label: "Delegasi", to: "/admin/delegasi", icon: "i-lucide-users" },
  { label: "Titelatur Inggris", to: "/admin/titelatur", icon: "i-lucide-languages" },
  {
    label: "Penomoran",
    icon: "i-lucide-hash",
    children: [
      { label: "Nomor Keluar", to: "/admin/penomoran/keluar" },
      { label: "Nomor SK", to: "/admin/penomoran/sk" }
    ]
  },
  { label: "Naskah Dinas", to: "/admin/naskah-dinas", icon: "i-lucide-file-text" },
  {
    label: "Master Data",
    icon: "i-lucide-database",
    children: [
      { label: "Pegawai", to: "/admin/master/pegawai" },
      { label: "Unit Kerja", to: "/admin/master/unit-kerja" }
    ]
  },
  {
    label: "Laporan",
    icon: "i-lucide-bar-chart-3",
    children: [
      { label: "Harian", to: "/admin/laporan/harian" },
      { label: "Bulanan", to: "/admin/laporan/bulanan" }
    ]
  },
];

// Computed untuk memilih menu aktif
const currentMainMenus = computed(() => {
  if (route.path.startsWith("/admin")) return adminMainMenus;
  return userMenus;
});

// Computed untuk menu tambahan (hanya ada di admin)
const currentMoreMenus = computed(() => {
  if (route.path.startsWith("/admin")) return adminMoreMenus;
  return [];
});
</script>

<template>
  <div v-if="isMobileOpen" class="fixed inset-0 bg-black/50 z-30 md:hidden" @click="closeMobile"></div>

  <aside 
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    :class="[
      // Lebar menggunakan realCollapsed (responsif hover)
      realCollapsed ? 'w-20' : 'w-64',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      'fixed left-0 top-0 h-screen z-50',
      'bg-white dark:bg-gray-900 shadow border-r border-gray-200 dark:border-gray-800',
      'transition-all duration-300 flex flex-col',
    ]"
  >
    <div class="relative h-20 flex items-center border-b border-gray-200 dark:border-gray-800 flex-shrink-0"
      :class="realCollapsed ? 'justify-center' : 'justify-start px-4'">
      
      <div class="flex items-center gap-2 overflow-hidden">
        <img src="/logo.png" class="h-8 w-auto object-contain flex-shrink-0" />
        <h1 v-if="!realCollapsed" class="font-bold text-lg whitespace-nowrap dark:text-white transition-opacity duration-300">
          ArsipKu
        </h1>
      </div>

      <button @click="isMobileOpen = !isMobileOpen" class="md:hidden absolute right-4 z-20">
        <UIcon :name="isMobileOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-7 h-7" />
      </button>
    </div>

    <button @click="$emit('update:collapsed', !collapsed)"
      class="hidden md:flex absolute top-6 -right-4 z-50 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-300 dark:border-gray-700 items-center justify-center text-gray-500 hover:text-primary-500 transition-colors">
      <UIcon name="i-heroicons-chevron-left" :class="['w-4 h-4 transition-transform', collapsed && 'rotate-180']" />
    </button>

    <div class="flex-1 space-y-1 py-4 px-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
      
      <SidebarItem 
        v-for="(item, index) in currentMainMenus" 
        :key="'main-'+index" 
        :item="item" 
        :collapsed="realCollapsed" 
      />

      <div v-if="currentMoreMenus.length > 0">
        <div v-if="realCollapsed" class="flex justify-center py-2">
           <UIcon name="i-heroicons-ellipsis-horizontal" class="w-5 h-5 text-gray-400" />
        </div>

        <div v-else class="mt-2 mb-1">
          <button 
            @click="showMore = !showMore"
            class="flex items-center w-full px-4 py-2 gap-3 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <UIcon :name="showMore ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="w-5 h-5" />
            <span>{{ showMore ? 'Sembunyikan' : 'Lainnya' }}</span>
          </button>
        </div>

        <template v-if="!realCollapsed && showMore">
          <SidebarItem 
            v-for="(item, index) in currentMoreMenus" 
            :key="'more-'+index" 
            :item="item" 
            :collapsed="realCollapsed" 
          />
        </template>
        
        </div>

    </div>

    <div class="p-4 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div class="relative group">
        <button
          class="flex items-center w-full gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left overflow-hidden">
          <img src="https://i.pravatar.cc/150?img=33" alt="User"
            class="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700 flex-shrink-0" />

          <div v-if="!realCollapsed" class="flex-1 min-w-0 overflow-hidden transition-opacity duration-300">
            <p class="text-sm font-bold text-gray-900 dark:text-white truncate">Ivan Dwi Santoso</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">Administrator</p>
          </div>
          <UIcon v-if="!realCollapsed" name="i-heroicons-ellipsis-vertical" class="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* Scrollbar Styles */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 20px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #374151; }
</style>