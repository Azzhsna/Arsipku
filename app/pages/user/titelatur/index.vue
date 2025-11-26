<script setup>
import { ref, computed, watch } from "vue";
import {
  Inbox,
  Filter,
  FileCheck,
  ChevronRight,
  Search,
  ArrowUpDown,
  RotateCcw,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-vue-next";
import Heading from "~/components/Heading.vue";

// --- STATE ---
const activeTab = ref("ALL");
const search = ref("");
const selected = ref(null);

watch(activeTab, () => {
  selected.value = null;
});

// --- DROPDOWN ---
const openDropdown = ref(null);
const filterMode = ref("Semua ");
const filterOptions = [" Jabatan", " Lokasi"];

// --- DATA ---
const emails = ref([
  {
    id: 1,
    from: "Kepala Divisi Teknologi Informasi",
    subject: "SVP Information Technology",
    maintain: "Maintain",
    kontak: "Kontak SDM",
  },
  {
    id: 2,
    from: "Direktur Keselamatan, Keamanan dan Standarisasi",
    subject: "Director of Safety, Security and Standarization",
    maintain: "Maintain",
    kontak: "Kontak SDM",
  },
  {
    id: 3,
    from: "Direktur Teknik",
    subject: "Director of Engineering",
    maintain: "Maintain",
    kontak: "Kontak SDM",
  },
  {
    id: 4,
    from: "Kepala Divisi Teknologi Informasi",
    subject: "SVP Information Technology",
    maintain: "Maintain",
    kontak: "Kontak SDM",
  },
  {
    id: 5,
    from: "Direktur Keselamatan, Keamanan dan Standarisasi",
    subject: "Director of Safety, Security and Standarization",
    maintain: "Maintain",
    kontak: "Kontak SDM",
  },
  {
    id: 6,
    from: "Direktur Teknik",
    subject: "Director of Engineering",
    maintain: "Maintain",
    kontak: "Kontak SDM",
  },
  {
    id: 7,
    from: "Direktur Teknik",
    subject: "Director of Engineering",
    maintain: "Maintain",
    kontak: "Kontak SDM",
  },
  {
    id: 8,
    from: "Kepala Divisi Teknologi Informasi",
    subject: "SVP Information Technology",
    maintain: "Maintain",
    kontak: "Kontak SDM",
  },
  {
    id: 9,
    from: "Direktur Keselamatan, Keamanan dan Standarisasi",
    subject: "Director of Safety, Security and Standarization",
    maintain: "Maintain",
    kontak: "Kontak SDM",
  },
  {
    id: 10,
    from: "Direktur Teknik",
    subject: "Director of Engineering",
    maintain: "Maintain",
    kontak: "Kontak SDM",
  },
  {
    id: 11,
    from: "Direktur Teknik",
    subject: "Director of Engineering",
    maintain: "Maintain",
    kontak: "Kontak SDM",
  },
]);

// --- FILTER ---
const filteredEmails = computed(() => {
  const s = search.value.toLowerCase();
  return emails.value.filter((mail) => {
    const tabPass =
      activeTab.value === "ALL" || mail.category === activeTab.value;
    const searchPass =
      mail.subject.toLowerCase().includes(s) ||
      mail.from.toLowerCase().includes(s);
    return tabPass && searchPass;
  });
});

// --- ACTIONS ---
const selectMail = (mail) => {
  mail.isRead = true;
  openDropdown.value = null;
};

const toggleDropdown = (name) => {
  openDropdown.value = openDropdown.value === name ? null : name;
};

const setFilter = (mode) => {
  filterMode.value = mode;
  openDropdown.value = null;
};
</script>

<template>
  <!-- FULL PAGE WRAPPER -->
  <div
    class="w-full min-h-screen flex flex-col sm:flex-row sm:items-center text-gray-800 dark:text-gray-100 overflow-hidden">
    <div class="pb-2">
      <Heading variant="heading6b" class="text-mobile-md sm:text-lg">
        Titelatur Inggris
      </Heading>

      <Heading variant="heading10m" class="text-mobile-base sm:text-sm">
        Panduan tata nama dan nomenklatur dalam Bahasa Inggris
      </Heading>

      <br />
    </div>

    <!-- CARD FULL HEIGHT -->
    <div
      class="flex flex-col w-full flex-1 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <!-- HEADER -->
      <div
        class="px-2 py-2 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:flex-wrap md:flex-row items-start md:items-center justify-between gap-3">
        <div class="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <!-- FILTER -->
          <div class="relative">
            <button @click.stop="toggleDropdown('filter')"
              class="custom-dropdown-trigger flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              :class="{
                'ring-2 ring-sky-100 border-sky-300': openDropdown === 'filter',
              }">
              <Filter class="w-3.5 h-3.5" />
              <span class="text-xs font-medium truncate max-w-[100px]">{{
                filterMode
              }}</span>
              <ChevronRight class="w-3 h-3 rotate-90 opacity-50" />
            </button>

            <!-- DROPDOWN -->
            <div v-if="openDropdown === 'filter'"
              class="custom-dropdown-content absolute left-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-50">
              <button v-for="opt in filterOptions" :key="opt" @click="setFilter(opt)"
                class="w-full text-left px-4 py-2 text-xs hover:bg-sky-50 dark:hover:bg-gray-700 flex justify-between items-center"
                :class="filterMode === opt
                    ? 'text-sky-600 font-bold'
                    : 'text-gray-700 dark:text-gray-300'
                  ">
                {{ opt }}
                <FileCheck v-if="filterMode === opt" class="w-3 h-3" />
              </button>
            </div>
          </div>

          <!-- SORT + REFRESH -->
          <div class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1 hidden md:block"></div>

          <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500">
            <ArrowUpDown class="w-4 h-4" />
          </button>
          <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500">
            <RotateCcw class="w-4 h-4" />
          </button>
        </div>

        <!-- SEARCH -->
        <div class="flex items-center gap-3 w-full md:w-auto">
          <div class="relative flex-1 w-full md:w-56 group">
            <Search class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input v-model="search" placeholder="Cari surat..."
              class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs pl-9 pr-3 py-1.5 rounded-lg focus:ring-sky-500 focus:border-sky-500 outline-none" />
          </div>

          <div class="flex items-center gap-1 text-gray-500">
            <button class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <ChevronLeft class="w-4 h-4" />
            </button>
            <button class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <ChevronRightIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- LIST (FULL HEIGHT SCROLL) -->
      <div class="flex flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        <div class="flex flex-col scroll-smooth w-full">
          <div v-if="filteredEmails.length === 0" class="p-10 flex flex-col items-center justify-center text-gray-400">
            <Inbox class="w-10 h-10 mb-2 opacity-20" />
            <span class="text-sm">Tidak ada surat ditemukan</span>
          </div>

          <div v-for="mail in filteredEmails" :key="mail.id" @click="selectMail(mail)"
            class="group relative border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
            <div class="p-3 pl-4 flex gap-4 items-center min-w-0">
              <div class="flex-1 min-w-0">
                <Heading variant="heading10b"
                  class="block text-gray-800 dark:text-gray-200 truncate text-mobile-md sm:text-base">
                  {{ mail.from }}
                </Heading>

                <Heading variant="body2m"
                  class="block text-gray-700 dark:text-gray-300 truncate text-mobile-base sm:text-sm">
                  {{ mail.subject }}
                </Heading>
              </div>

              <div class="shrink-0 text-right">
                <Heading variant="body2sb" class="block text-gray-600 dark:text-gray-400 text-mobile-base sm:text-xs">
                  {{ mail.maintain }}
                </Heading>

                <Heading variant="body3" class="block text-gray-400 text-mobile-xs sm:text-[11px]">
                  {{ mail.kontak }}
                </Heading>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Responsive Typography */
@media (max-width: 640px) {
  .text-mobile-xs {
    font-size: 10px !important;
  }

  .text-mobile-sm {
    font-size: 11px !important;
  }

  .text-mobile-base {
    font-size: 12px !important;
  }

  .text-mobile-md {
    font-size: 13px !important;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-5px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.custom-dropdown-content {
  animation: fadeIn 0.15s ease-out forwards;
}
</style>
