<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import {
  Inbox, FileText, ClipboardList, Building2, Search, Archive, Trash2, ArrowLeft, X, Reply, ChevronLeft, ChevronRight, FileCheck, Calendar, Filter, Mail, Clock, ArrowUpDown, RotateCcw, Bookmark, Star, Lock, Folder, Tag, FileSignature, Send, Building, FilePen
} from 'lucide-vue-next';

// --- DATA & STATE ---
const tabs = [
  { label: "All", value: "ALL", count: 5, icon: Inbox },
  { label: "Nota Dinas", value: "NOTA DINAS", count: 2, icon: FileSignature },
  { label: "Disposisi", value: "DISPOSISI", count: 12, icon: Send },
  { label: "Surat Dinas Internal", value: "INTERNAL", count: 0, icon: Building },
  { label: "Surat Dinas External", value: "EXTERNAL", count: 1, icon: Building2 },
  { label: "Konsep", value: "KONSEP", count: 1, icon: FilePen },
];

const activeTab = ref("ALL");
const search = ref("");
const selected = ref(null);

// Auto close preview saat pindah tab
watch(activeTab, () => {
  selected.value = null;
});

// --- DROPDOWN STATE ---
const openDropdown = ref(null);
const filterMode = ref("Semua");
const dateRange = ref({ start: '', end: '' });

const dateRangeText = computed(() => {
  if (dateRange.value.start && dateRange.value.end) {
    return `${dateRange.value.start} - ${dateRange.value.end}`;
  }
  return "Semua Waktu";
});

// Data dummy
const emails = ref([
  {
    id: 1,
    type: "DI",
    code: "MSGG.3138",
    from: "AVP OF GENERAL AFFAIRS",
    subject: "Disposisi MSGG-konsep undangan pembahasan pembayaran dan accrue akhir tahun",
    body: "Mohon tindak lanjut segera terkait undangan pembahasan pembayaran vendor bulan November.",
    category: "DISPOSISI",
    date: "18 Nov",
    time: "14:36",
    initial: "AG",
    color: "bg-purple-100 text-purple-600",
    isLocked: true,
    hasAttachment: true,
    isRead: false
  },
  {
    id: 2,
    type: "DI",
    code: "MSGG.3109",
    from: "AVP OF GENERAL AFFAIRS",
    subject: "Pelatihan Officer Development Program Batch XII",
    body: "Berikut kami sampaikan daftar peserta yang lolos seleksi administrasi tahap akhir.",
    category: "NOTA DINAS",
    date: "17 Nov",
    time: "11:00",
    initial: "HR",
    color: "bg-sky-100 text-sky-600",
    isLocked: true,
    hasAttachment: true,
    isRead: true
  },
  {
    id: 3,
    type: "DI",
    code: "MSGG.3066",
    from: "IT DEPARTMENT",
    subject: "Permintaan Nomor Surat Penunjukan",
    body: "Akan dilakukan maintenance rutin pada server database utama pukul 23:00 - 04:00 WIB.",
    category: "INTERNAL",
    date: "13 Nov",
    time: "10:30",
    initial: "IT",
    color: "bg-emerald-100 text-emerald-600",
    isLocked: true,
    hasAttachment: false,
    isRead: true
  },
  {
    id: 4,
    type: "KO",
    code: "FIN.2024.001",
    from: "FINANCE DEPT",
    subject: "Permintaan Approval Anggaran Q4",
    body: "Mohon review draft anggaran Q4 yang telah kami revisi sesuai arahan rapat sebelumnya.",
    category: "KONSEP",
    date: "10 Nov",
    time: "09:15",
    initial: "FN",
    color: "bg-orange-100 text-orange-600",
    isLocked: false,
    hasAttachment: true,
    isRead: false
  },
]);

// --- LOGIC ---
const filteredEmails = computed(() => {
  const s = search.value.toLowerCase();
  return emails.value.filter((mail) => {
    const tabPass = activeTab.value === "ALL" || mail.category === activeTab.value;
    const searchPass =
      mail.subject.toLowerCase().includes(s) ||
      mail.from.toLowerCase().includes(s) ||
      mail.code.toLowerCase().includes(s);
    return tabPass && searchPass;
  });
});

const selectMail = (mail) => {
  selected.value = mail;
  mail.isRead = true;
  openDropdown.value = null;
};

const closeDetail = () => {
  selected.value = null;
};

const toggleDropdown = (name) => {
  openDropdown.value = openDropdown.value === name ? null : name;
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.custom-dropdown-trigger') && !event.target.closest('.custom-dropdown-content')) {
    openDropdown.value = null;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const setFilter = (mode) => { filterMode.value = mode; openDropdown.value = null; };

const filterOptions = [
  "Semua", "Favorite", "Sudah Tindak Lanjut", "Belum Tindak Lanjut",
  "Lock", "Note", "Arsip", "Sudah Dibaca", "Belum Dibaca"
];
</script>

<template>
  <div
    class="w-full h-full min-w-0 flex flex-col font-sans antialiased text-gray-800 dark:text-gray-100 overflow-hidden">

    <div class="flex flex-col pb-4 shrink-0 z-10">
      <div class="w-full overflow-x-hidden">
        <div
          class="flex gap-1 p-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 w-full">
          <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap relative z-10"
            :class="activeTab === tab.value
              ? 'bg-sky-800 text-white shadow-sm dark:bg-sky-700'
              : 'text-sky-800 hover:text-sky-800 hover:bg-blue-50 dark:text-white dark:hover:text-sky-300 dark:hover:bg-gray-700'">
            <component :is="tab.icon" class="w-3.5 h-3.5" />
            {{ tab.label }}
            <span v-if="tab.count > 0" class="ml-1 text-[9px] px-1.5 py-0.5 rounded-full" :class="activeTab === tab.value
              ? 'bg-white text-sky-800 dark:bg-gray-700 dark:text-sky-300'
              : 'bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300'">
              {{ tab.count }}
            </span>
          </button>
        </div>
      </div>
    </div>



    <div class="flex flex-1 overflow-hidden relative min-w-0">
      <div
        class="flex flex-col w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">

        <div
          class="px-2 py-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col md:flex-row md:items-center justify-between gap-2 shrink-0 z-20">

          <div class="flex items-center gap-1 flex-wrap">
            <div class="relative">
              <button @click.stop="toggleDropdown('filter')"
                class="custom-dropdown-trigger flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                :class="{ 'ring-2 ring-sky-100 border-sky-300': openDropdown === 'filter' }">
                <Filter class="w-3.5 h-3.5" />
                <span class="text-xs font-medium truncate max-w-[100px]">{{ filterMode }}</span>
                <ChevronRight class="w-3 h-3 rotate-90 opacity-50" />
              </button>
              <div v-if="openDropdown === 'filter'"
                class="custom-dropdown-content absolute left-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-50">
                <button v-for="opt in filterOptions" :key="opt" @click="setFilter(opt)"
                  class="w-full text-left px-4 py-2 text-xs hover:bg-sky-50 dark:hover:bg-gray-700 flex justify-between items-center"
                  :class="filterMode === opt ? 'text-sky-600 font-bold' : 'text-gray-700 dark:text-gray-300'">
                  {{ opt }}
                  <FileCheck v-if="filterMode === opt" class="w-3 h-3" />
                </button>
              </div>
            </div>

            <div class="relative">
              <button @click.stop="toggleDropdown('history')"
                class="custom-dropdown-trigger flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                :class="{ 'ring-2 ring-sky-100 border-sky-300': openDropdown === 'history' }">
                <Calendar class="w-3.5 h-3.5" />
                <span class="text-xs font-medium truncate max-w-[120px]">{{ dateRangeText }}</span>
                <ChevronRight class="w-3 h-3 rotate-90 opacity-50" />
              </button>
              <div v-if="openDropdown === 'history'"
                class="custom-dropdown-content absolute left-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 p-3 z-50">
                <div class="flex flex-col gap-2">
                  <div
                    class="flex items-center gap-2 border border-gray-300 rounded px-2 py-1 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                    <span class="text-[10px] text-gray-500 dark:text-gray-400 w-12">Dari</span>
                    <input type="date" v-model="dateRange.start"
                      class="text-xs bg-transparent outline-none w-full dark:text-white" />
                  </div>

                  <div
                    class="flex items-center gap-2 border border-gray-300 rounded px-2 py-1 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                    <span class="text-[10px] text-gray-500 dark:text-gray-400 w-12">Sampai</span>
                    <input type="date" v-model="dateRange.end"
                      class="text-xs bg-transparent outline-none w-full dark:text-white" />
                  </div>
                  <button @click="openDropdown = null"
                    class="mt-1 w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-1.5 rounded transition">Terapkan</button>
                </div>
              </div>
            </div>
            <div class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1 hidden md:block"></div>
            <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-500">
              <ArrowUpDown class="w-4 h-4" />
            </button>
            <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-500">
              <RotateCcw class="w-4 h-4" />
            </button>
          </div>

          <div class="flex items-center gap-3 w-full md:w-auto">
            <div class="relative flex-1 md:w-56 group">
              <Search
                class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500" />
              <input v-model="search" placeholder="Cari surat..."
                class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs pl-9 pr-3 py-1.5 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all outline-none" />
            </div>
            <div class="flex items-center gap-1 text-gray-500 shrink-0">
              <button class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <ChevronLeft class="w-4 h-4" />
              </button>
              <button class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-1 overflow-hidden relative">

          <div
            class="flex flex-col overflow-y-auto overflow-x-hidden scroll-smooth bg-white dark:bg-gray-900 transition-all duration-300"
            :class="selected ? 'hidden md:flex md:w-[380px] lg:w-[420px] border-r border-gray-200 dark:border-gray-800' : 'w-full'">

            <div v-if="filteredEmails.length === 0"
              class="p-10 flex flex-col items-center justify-center text-gray-400">
              <Inbox class="w-10 h-10 mb-2 opacity-20" />
              <span class="text-sm">Tidak ada surat ditemukan</span>
            </div>

            <div v-for="mail in filteredEmails" :key="mail.id" @click="selectMail(mail)"
              class="group relative border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-150"
              :class="{
                'bg-sky-50/60 dark:bg-sky-900/20': selected?.id === mail.id,
                'bg-white dark:bg-gray-900': selected?.id !== mail.id
              }">

              <div v-if="selected?.id === mail.id" class="absolute left-0 top-0 bottom-0 w-[3px] bg-sky-600 z-10">
              </div>

              <div class="relative p-3 pl-4 flex gap-4 min-w-0"
                :class="selected ? 'flex-col items-start gap-2' : 'flex-row items-center'">

                <div class="flex items-center gap-3 min-w-0" :class="selected ? 'w-full' : 'w-full md:w-3/12 shrink-0'">

                  <div
                    :class="`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${mail.color}`">
                    {{ mail.initial }}
                  </div>

                  <div class="flex flex-col min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <span class="truncate text-xs font-bold text-gray-800 dark:text-gray-200">
                        {{ mail.from }}
                      </span>
                    </div>
                    <div class="flex gap-2">
                      <span :class="[
                        'text-[10px] font-semibold px-1.5 rounded w-fit mt-0.5 truncate max-w-full',
                        {
                          // light mode
                          'bg-gray-900 text-white': mail.type === 'DI',
                          'bg-sky-900 text-white': mail.type === 'KO  ',
                          'bg-amber-900 text-white': mail.type === 'DS',

                          // dark mode (lebih terang agar kontras)
                          'dark:bg-gray-700 dark:text-gray-100': mail.type === 'DI',
                          'dark:bg-sky-700 dark:text-white': mail.type === 'KO  ',
                          'dark:bg-amber-700 dark:text-white': mail.type === 'DS',
                        }
                      ]">
                        {{ mail.type }}
                      </span>
                      <span
                        class="text-[10px] font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 rounded w-fit mt-0.5 truncate max-w-full">
                        {{ mail.code }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="min-w-0 flex-1 flex flex-col pr-2" :class="selected ? 'w-full' : ''">
                  <div class="flex items-center gap-2">
                    <p class="text-xs text-gray-800 dark:text-gray-200 leading-snug truncate"
                      :class="{ 'font-bold': !mail.isRead }">
                      {{ mail.subject }}
                    </p>
                  </div>
                  <p class="text-[11px] text-gray-400 truncate mt-0.5"
                    :class="selected ? 'line-clamp-2 whitespace-normal' : ''">
                    {{ mail.body }}
                  </p>
                </div>

                <div class="shrink-0 flex flex-col items-end"
                  :class="selected ? 'absolute top-3 right-3' : 'min-w-[70px]'">

                  <div class="flex flex-col items-end group-hover:hidden">
                    <span class="text-[10px] font-bold text-gray-600 dark:text-gray-400"
                      :class="{ 'text-sky-600': !mail.isRead }">{{ mail.date }}</span>
                    <span v-if="!selected" class="text-[10px] text-gray-400">{{ mail.time }}</span>
                  </div>

                  <div
                    class="hidden group-hover:flex items-center justify-end gap-1 bg-white dark:bg-gray-900 shadow-sm -mr-2 px-1 rounded-md animate-in fade-in duration-200"
                    :class="selected ? 'bg-opacity-90 backdrop-blur-sm' : ''">
                    <UTooltip v-if="!selected" text="Tindak Lanjut" :delay-duration="0">
                      <button class="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500">
                        <Tag class="w-4 h-4 transform rotate-135" />
                      </button>
                    </UTooltip>

                    <UTooltip v-if="!selected" text="Favorite" :delay-duration="0">
                      <button class="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500">
                        <Star class="w-4 h-4" />
                      </button>
                    </UTooltip>

                    <UTooltip v-if="!selected" text="Kunci" :delay-duration="0">
                      <button class="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500">
                        <Lock class="w-4 h-4" />
                      </button>
                    </UTooltip>

                    <UTooltip v-if="!selected" text="Catatan" :delay-duration="0">
                      <button class="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500">
                        <FileText class="w-4 h-4" />
                      </button>
                    </UTooltip>

                    <UTooltip v-if="!selected" text="Arsip" :delay-duration="0">
                      <button class="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500">
                        <Folder class="w-4 h-4" />
                      </button>
                    </UTooltip>

                  </div>
                </div>

              </div>
            </div>
          </div>

          <div v-if="selected"
            class="flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden animate-in fade-in duration-300 absolute inset-0 md:static z-30 md:z-0 border-l border-gray-200 dark:border-gray-800">

            <div
              class="px-6 py-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 sticky top-0 z-10">
              <div class="flex items-center gap-3">
                <button class="md:hidden p-1.5 hover:bg-gray-100 rounded-full -ml-2" @click="closeDetail">
                  <ArrowLeft class="w-5 h-5 text-gray-600" />
                </button>
                <div class="flex gap-1 text-gray-500">
                  <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <Archive class="w-4 h-4" />
                  </button>
                  <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs text-gray-400">Detail Surat</span>
                <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500"
                  @click="closeDetail">
                  <X class="w-5 h-5" />
                </button>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto p-6 md:p-8">
              <div class="flex justify-between items-start gap-4 mb-6">
                <h1 class="text-xl font-bold text-gray-900 dark:text-white leading-snug">{{ selected.subject }}</h1>
                <span
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold uppercase rounded border">
                  {{ selected.category }}
                </span>
              </div>

              <div class="flex items-start justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    :class="selected.color">{{ selected.initial }}</div>
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="text-sm font-bold text-gray-900 dark:text-white">{{ selected.from }}</p>
                      <span class="text-[10px] text-gray-400">&lt;{{ selected.code }}&gt;</span>
                    </div>
                    <p class="text-xs text-gray-500 mt-0.5">ke <span class="font-medium">Saya</span></p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xs font-bold">{{ selected.date }}, {{ selected.time }}</p>
                </div>
              </div>

              <div class="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>{{ selected.body }}</p>
                <div v-if="selected.hasAttachment" class="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div class="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer max-w-sm">
                    <div class="w-10 h-10 rounded bg-red-100 flex items-center justify-center text-red-600">
                      <FileText class="w-5 h-5" />
                    </div>
                    <div>
                      <p class="text-sm font-bold">Dokumen.pdf</p>
                      <p class="text-xs text-gray-500">2.4 MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animasi Dropdown */
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