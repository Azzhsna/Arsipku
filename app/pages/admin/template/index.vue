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
  Download,
  Pencil,
  Trash2,
  X,
} from "lucide-vue-next";
import Heading from "~/components/Heading.vue";

// --- STATE ---
const search = ref("");
const sortBy = ref("from");
const sortDir = ref("asc");
const editModal = ref(false);
const editData = ref({});

// --- DATA ---
const emails = ref([
  { id: 1, from: "PER - PERATURAN DIREKSI", fileName: "peraturan_1.pdf" },
  { id: 2, from: "KEP - KEPUTUSAN DIREKSI", fileName: "keputusan.pdf" },
  { id: 3, from: "INS - INSTRUKSI", fileName: "instruksi_1.docx" },
  { id: 4, from: "SPR - SURAT PERINTAH", fileName: "spr_01.pdf" },
  { id: 5, from: "SOP - OPERASIONAL", fileName: "sop_lengkap.pdf" },
  { id: 6, from: "PER - PERATURAN DIREKSI", fileName: "peraturan_2.pdf" },
  { id: 7, from: "PER - PERATURAN DIREKSI", fileName: "peraturan_1.pdf" },
  { id: 8, from: "KEP - KEPUTUSAN DIREKSI", fileName: "keputusan.pdf" },
  { id: 9, from: "INS - INSTRUKSI", fileName: "instruksi_1.docx" },
  { id: 10, from: "SPR - SURAT PERINTAH", fileName: "spr_01.pdf" },
  { id: 11, from: "SOP - OPERASIONAL", fileName: "sop_lengkap.pdf" },
  { id: 12, from: "PER - PERATURAN DIREKSI", fileName: "peraturan_2.pdf" },
]);

// --- FILTER ---
const filteredEmails = computed(() => {
  const s = search.value.toLowerCase();
  return emails.value.filter((mail) => mail.from.toLowerCase().includes(s));
});

// --- SORTING ---
const sortedEmails = computed(() => {
  return [...filteredEmails.value].sort((a, b) => {
    const colA = a[sortBy.value].toLowerCase();
    const colB = b[sortBy.value].toLowerCase();

    if (colA < colB) return sortDir.value === "asc" ? -1 : 1;
    if (colA > colB) return sortDir.value === "asc" ? 1 : -1;
    return 0;
  });
});

const toggleSort = (column) => {
  if (sortBy.value === column) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = column;
    sortDir.value = "asc";
  }
};

// --- PAGINATION ---
const currentPage = ref(1);
const rowsPerPage = ref(10);
const rowsChoices = [5, 10, 15, 25, 50];

const totalItems = computed(() => sortedEmails.value.length);

const totalPages = computed(() =>
  Math.ceil(totalItems.value / rowsPerPage.value)
);

const paginatedEmails = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return sortedEmails.value.slice(start, end);
});

watch(rowsPerPage, () => (currentPage.value = 1));

// --- EDIT MODAL ---
const openEdit = (mail) => {
  editData.value = { ...mail };
  editModal.value = true;
};

const saveEdit = () => {
  const idx = emails.value.findIndex((m) => m.id === editData.value.id);
  if (idx !== -1) emails.value[idx] = { ...editData.value };

  editModal.value = false;
};
</script>

<template>
  <div
    class="w-full min-h-screen flex flex-col text-gray-800 dark:text-gray-100"
  >
    <div>
      <Heading variant="heading6b" class="text-mobile-md">Template</Heading>
      <Heading variant="heading10m">Panduan Template Dokumen</Heading>
      <br />
    </div>

    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm w-full">
      <!-- HEADER -->
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-4 p-5"
      >
        <!-- ROWS -->
        <div class="flex items-center gap-2">
          <span class="text-xs">Tampilkan</span>
          <select
            v-model="rowsPerPage"
            class="border text-xs border-gray-300 bg-white rounded-md px-2 py-1"
          >
            <option v-for="n in rowsChoices" :key="n" :value="n">
              {{ n }}
            </option>
          </select>
        </div>

        <!-- SEARCH -->
        <div class="relative w-full md:w-56">
          <Search
            class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="search"
            placeholder="Cari template..."
            class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 text-xs pl-9 pr-3 py-1.5 rounded-lg"
          />
        </div>
      </div>

      <!-- TABLE -->
      <div class="overflow-x-auto">
        <table class="w-full text-xs border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th
                class="text-left text-[14px] p-4 border-b border-gray-300 cursor-pointer"
                @click="toggleSort('from')"
              >
                Nama Template
                <ArrowUpDown class="inline w-3 h-3 ml-2" />
              </th>

              <th
                class="text-left p-3 text-[14px] border-b border-gray-300 cursor-pointer"
                @click="toggleSort('fileName')"
              >
                Dokumen File
                <ArrowUpDown class="inline w-3 h-3 ml-2" />
              </th>

              <th
                class="text-left p-3 text-[14px] border-b border-gray-300 w-28"
              >
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="mail in paginatedEmails"
              :key="mail.id"
              class="border-b border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td class="p-4">{{ mail.from }}</td>
              <td class="p-4 text-primary-400 font-medium">
                {{ mail.fileName }}
              </td>

              <td class="p-4 flex items-center gap-3">
                <button class="text-sky-600 hover:text-sky-800">
                  <Download class="w-4 h-4" />
                </button>

                <button
                  class="text-yellow-500 hover:text-yellow-700"
                  @click="openEdit(mail)"
                >
                  <Pencil class="w-4 h-4" />
                </button>

                <button class="text-red-500 hover:text-red-700">
                  <Trash2 class="w-4 h-4" />
                </button>
              </td>
            </tr>

            <tr v-if="paginatedEmails.length === 0">
              <td colspan="3" class="text-center py-10 text-gray-400">
                <Inbox class="w-10 h-10 mx-auto mb-2 opacity-20" />
                Tidak ada data ditemukan
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- FOOTER PAGINATION -->
      <div class="flex items-center justify-between ml-5 mr-5 mt-5 mb-5">
        <div class="text-xs">
          Menampilkan {{ paginatedEmails.length }} dari {{ totalItems }} data
        </div>

        <div class="flex items-center gap-1">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 text-xs rounded-md hover:bg-gray-100 disabled:opacity-30"
          >
            &lt;
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-1 text-xs rounded-md',
              currentPage === page
                ? 'bg-primary text-white'
                : 'hover:bg-gray-200',
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 text-xs rounded-md hover:bg-gray-100 disabled:opacity-30"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>

    <!-- EDIT MODAL -->
    <div
      v-if="editModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-900 rounded-xl w-120 shadow-lg">
        <div class="flex justify-between mb-4 border-b border-gray-300">
          <heading
            variant="heading9b"
            class="font-semibold text-sm mb-3 mt-5 ml-5"
            >Edit Template</heading
          >
          <button @click="editModal = false">
            <X class="w-4 h-4 mr-5" />
          </button>
        </div>

        <div class="flex flex-col gap-5 ml-5 mr-5">
          <div>
            <heading variant="body2m" class="mb-1">Nama Template</heading>
            <input
              v-model="editData.from"
              class="w-full px-3 py-3 mt-1 text-xs rounded bg-gray-100"
            />
          </div>

          <div>
            <heading variant="body2m" class="text-xs mb-1">Nama File</heading>
            <input
              v-model="editData.fileName"
              class="w-full px-3 py-3 mt-1 text-xs rounded bg-gray-100"
            />
          </div>
        </div>

        <div class="flex justify-end border-t border-gray-300 mt-7 mb-5 gap-3">
          <button
            @click="editModal = false"
            class="px-5 py-2 mt-2 text-xs border border-primary-500 hover:bg-primary-100 text-primary rounded-md"
          >
            Batal
          </button>
          <button
            @click="saveEdit"
            class="px-5 py-2 mr-5 mt-2 text-xs bg-primary hover:bg-primary-800 text-white rounded-md"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .text-mobile-md {
    font-size: 20px !important;
  }
}
</style>
