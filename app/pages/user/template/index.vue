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
  Download  
} from "lucide-vue-next";
import Heading from "~/components/Heading.vue";

// --- STATE ---
const activeTab = ref("ALL");
const search = ref("");
const selected = ref(null);

// --- DATA ---
const emails = ref([
  {
    id: 1,
    from: "PER - PERATURAN DIREKSI",
    maintain: "Download",
  },
  {
    id: 2,
    from: "PER - PERATURAN DIREKSI",
    maintain: "Download",
  },
  {
    id: 3,
    from: "PER - PERATURAN DIREKSI",
    maintain: "Download",
  },
  {
    id: 4,
    from: "PER - PERATURAN DIREKSI",
    maintain: "Download",
  },
  {
    id: 5,
    from: "PER - PERATURAN DIREKSI",
    maintain: "Download",
  },
  {
    id: 6,
    from: "PER - PERATURAN DIREKSI",
    maintain: "Download",
  },
  {
    id: 7,
    from: "PER - PERATURAN DIREKSI",
    maintain: "Download",
  },
  {
    id: 8,
    from: "PER - PERATURAN DIREKSI",
    maintain: "Download",
  },
  {
    id: 9,
    from: "PER - PERATURAN DIREKSI",
    maintain: "Download",
  },
  {
    id: 10,
    from: "PER - PERATURAN DIREKSI",
    maintain: "Download",
  },
  {
    id: 11,
    from: "PER - PERATURAN DIREKSI",
    maintain: "Download",
  },
]);

// --- FILTER ---
const filteredEmails = computed(() => {
  const s = search.value.toLowerCase();
  return emails.value.filter((mail) => {
    const tabPass =
      activeTab.value === "ALL" || mail.category === activeTab.value;
    const searchPass =
      mail.from.toLowerCase().includes(s);
    return tabPass && searchPass;
  });
});
</script>

<template>
  <div
    class="w-full min-h-screen min-w-0 flex flex-col text-gray-800 dark:text-gray-100"
  >
    <div>
      <Heading variant="heading6b" class="text-mobile-md">Template</Heading>
      <Heading variant="heading10m"
        >Panduan tata nama dan nomenklatur dalam Bahasa Inggris
      </Heading>
      <br></br>
    </div>
    <div
      class="flex flex-col w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
    >

      <!-- ========== HEADER ========== -->
      <div class="px-2 py-2 ml-5 mr-5 mt-2 mb-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- SEARCH -->
        <div class="flex items-center gap-3 w-full md:w-auto">
          <div class="relative flex-1 md:w-56 group">
            <Search
              class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              v-model="search"
              placeholder="Cari surat..."
              class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs pl-9 pr-3 py-1.5 rounded-lg focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
        </div>
      </div>

      <!-- ========== LIST ========== -->
      <div class="flex w-full flex-1 bg-white dark:bg-gray-900 overflow-hidden">
  <div class="flex flex-col flex-1 overflow-y-auto px-4 pb-6 scroll-smooth">
          <!-- NO DATA -->
          <div
            v-if="filteredEmails.length === 0"
            class="p-10 flex flex-col items-center justify-center text-gray-400"
          >
            <Inbox class="w-10 h-10 mb-2 opacity-20" />
            <span class="text-sm">Tidak ada surat ditemukan</span>
          </div>

        <!-- LIST CARD MODERN -->
     <div
    v-for="mail in filteredEmails"
    :key="mail.id"
    @click="selectMail(mail)"
    class="group relative rounded-xl bg-gray-50 hover:bg-primary-50 
dark:bg-gray-800 shadow-sm hover:shadow-md transition-all 
p-5 mb-5 cursor-pointer flex-1 min-w-[240px] max-w-[10hv]">


       <div class="flex gap-4 items-center min-w-0">
      <!-- TEXT -->
       <div class="flex-1 min-w-0">
      <Heading
        variant="heading10sb"
        class="block text-gray-800 dark:text-gray-200 truncate"
       >
        {{ mail.from }}
        </Heading>
      </div>

    <!-- DOWNLOAD BUTTON -->
    <div class="flex items-center gap-2 shrink-0 text-right">
      <button
        class="flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline text-sm font-semibold"
      >
        <Download class="w-4 h-4" />
        {{ mail.maintain }}
      </button>
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
