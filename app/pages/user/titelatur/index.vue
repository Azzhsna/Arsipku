<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import {
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
import Pagination from "~/components/Pagination.vue";

// --- CLICK OUTSIDE HANDLER ---
const closeAll = () => {
  openDropdown.value = null;
};

const handleClickOutside = (e) => {
  const dropdown = document.querySelector(".custom-dropdown-content");
  const trigger = document.querySelector(".custom-dropdown-trigger");

  if (
    dropdown &&
    !dropdown.contains(e.target) &&
    trigger &&
    !trigger.contains(e.target)
  ) {
    closeAll();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// --- STATE ---
const activeTab = ref("ALL");
const search = ref("");
const selected = ref(null);

// --- DROPDOWN STATE ---
const openDropdown = ref(null);
const filterMode = ref("Semua ");
const filterOptions = [" Jabatan", " Lokasi"];

// --- DATA ---
const items = ref([
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
  {
    id: 12,
    from: "Direktur Teknik",
    subject: "Director of Engineering",
    maintain: "Maintain",
    kontak: "Kontak SDM",
  },
]);

// --- FILTER ---
const filteredItems = computed(() => {
  const s = search.value.toLowerCase();
  return items.value.filter((it) => {
    // Note: Pastikan properti category ada di data jika ingin filter ini aktif
    // const tabPass = activeTab.value === "ALL" || it.category === activeTab.value;
    const tabPass = true;
    const searchPass =
      (it.from || "").toLowerCase().includes(s) ||
      (it.subject || "").toLowerCase().includes(s);
    return tabPass && searchPass;
  });
});

const sortedItems = computed(() => filteredItems.value);

// --- PAGINATION STATE ---
const currentPage = ref(1);
const rowsPerPage = ref(5); // Default ke 5 agar pagination terlihat bekerja

// Watcher: Reset ke halaman 1 jika search/filter/jumlah baris berubah
watch([search, activeTab, rowsPerPage], () => {
  currentPage.value = 1;
  selected.value = null;
});
// Pastikan rowsOptions menghasilkan array objek { label: '...', value: ... }
const rowsOptions = computed(() => {
  const total = filteredItems.value.length;
  // Opsi dasar
  const base = [5, 10, 20, 50];

  if (total > 0 && !base.includes(total)) {
    base.push(total);
  }

  return base
    .sort((a, b) => a - b)
    .map((n) => ({
      label: String(n), // Label harus string agar aman ditampilkan
      value: n, // Value tetap number
    }));
});

// Hitung data yang ditampilkan berdasarkan halaman saat ini
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return sortedItems.value.slice(start, end);
});

// Hitung total halaman
const totalPages = computed(() => {
  if (rowsPerPage.value <= 0) return 1;
  return Math.ceil(sortedItems.value.length / rowsPerPage.value);
});

// --- ACTIONS ---
const selectItem = (it) => {
  it.isRead = true;
  selected.value = it;
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
  <div
    class="w-full min-w-0 min-h-screen sm:items-center text-gray-800 dark:text-gray-100 overflow-visible"
  >
    <div class="mb-5">
      <Heading variant="heading6b" class="text-mobile-md"
        >Titelatur Inggris</Heading
      >
      <Heading variant="heading10m" class="text-mobile-base sm:text-sm">
        Panduan tata nama dan nomenklatur dalam Bahasa Inggris
      </Heading>
    </div>

    <div
      class="flex flex-col w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
    >
      <div
        class="px-2 py-2 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:flex-wrap md:flex-row items-start md:items-center justify-between gap-3"
      >
        <div class="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <div class="relative">
            <button
              @click.stop="toggleDropdown('filter')"
              class="custom-dropdown-trigger flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              :class="{
                'ring-2 ring-sky-100 border-sky-300': openDropdown === 'filter',
              }"
            >
              <Filter class="w-3.5 h-3.5" />
              <span class="text-xs font-medium truncate max-w-[100px]">{{
                filterMode
              }}</span>
              <ChevronRight class="w-3 h-3 rotate-90 opacity-50" />
            </button>

            <div
              v-if="openDropdown === 'filter'"
              class="custom-dropdown-content absolute left-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-50"
            >
              <button
                v-for="opt in filterOptions"
                :key="opt"
                @click="setFilter(opt)"
                class="w-full text-left px-4 py-2 text-xs hover:bg-sky-50 dark:hover:bg-gray-700 flex justify-between items-center"
                :class="
                  filterMode === opt
                    ? 'text-sky-600 font-bold'
                    : 'text-gray-700 dark:text-gray-300'
                "
              >
                {{ opt }}
                <FileCheck v-if="filterMode === opt" class="w-3 h-3" />
              </button>
            </div>
          </div>

          <div
            class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1 hidden md:block"
          ></div>

          <button
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500"
          >
            <ArrowUpDown class="w-4 h-4" />
          </button>
          <button
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500"
          >
            <RotateCcw class="w-4 h-4" />
          </button>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto">
          <div class="relative flex-1 w-full md:w-56 group">
            <Search
              class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              v-model="search"
              placeholder="Cari surat..."
              class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs pl-9 pr-3 py-1.5 rounded-lg focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
          <div class="flex items-center gap-1 text-gray-500">
            <button
              class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>
            <button
              class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <ChevronRightIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col flex-1 bg-white dark:bg-gray-900">
        <div class="flex-1 overflow-y-auto">
          <table class="min-w-full text-left text-sm">
            <thead
              class="bg-primary-700 text-primary-50 dark:bg-gray-400 sticky top-0 z-10"
            >
              <tr>
                <th
                  class="px-4 py-4 font-bold dark:text-gray-300 text-mobile-base"
                >
                  Unit
                </th>
                <th
                  class="px-4 py-4 font-bold dark:text-gray-300 text-mobile-base"
                >
                  Titelatur
                </th>
                <th
                  class="px-4 py-4 font-bold dark:text-gray-300 text-mobile-base"
                >
                  Maintain
                </th>
                <th
                  class="px-4 py-4 font-bold dark:text-gray-300 text-mobile-base"
                >
                  Kontak
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="it in paginatedItems"
                :key="it.id"
                @click="selectItem(it)"
                class="border-b border-gray-100 dark:border-gray-800 hover:bg-primary-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <td class="px-4 py-4 text-mobile-base">{{ it.from }}</td>
                <td class="px-4 py-4 text-mobile-base">{{ it.subject }}</td>
                <td class="px-4 py-4 text-mobile-base">{{ it.maintain }}</td>
                <td class="px-4 py-4 text-mobile-base">{{ it.kontak }}</td>
              </tr>
              <tr v-if="paginatedItems.length === 0">
                <td colspan="4" class="px-4 py-8 text-center text-gray-500">
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="border-t border-gray-200 dark:border-gray-800 p-3 pb-5 z-100"
        >
          <Pagination
            :current-page="currentPage"
            :rows-per-page="rowsPerPage"
            :total-items="sortedItems.length"
            :total-pages="totalPages"
            :rows-options="rowsOptions"
            @update:page="currentPage = $event"
            @update:rowsPerPage="rowsPerPage = $event"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
    font-size: 20px !important;
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
