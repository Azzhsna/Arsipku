<template>
  <div class="overflow-auto max-h-[700px]">
    <div class="p-4">
      <div class="mb-4 flex items-center gap-6">
        <input
          v-model="searchQuery"
          placeholder="Cari Titelatur..."
          class="border p-2 rounded-lg w-full max-w-sm"
        />
      </div>

      <table class="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead class="bg-gray-100 text-gray-600 font-semibold">
          <tr>
            <th
              class="px-4 py-2 text-left cursor-pointer"
              @click="toggleSort('from')"
            >
              Dari / Instansi
            </th>
            <th
              class="px-4 py-2 text-left cursor-pointer"
              @click="toggleSort('subject')"
            >
              Perihal
            </th>
            <th class="px-4 py-2">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="it in paginatedItems"
            :key="it.id"
            class="border-b hover:bg-gray-50 transition-colors"
          >
            <td class="px-4 py-4">{{ it.from }}</td>
            <td class="px-4 py-2">{{ it.subject }}</td>
            <td class="px-4 py-2">
              <button class="text-primary underline" @click="openEdit(it)">
                Maintain
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- ⛔ DIPINDAH KE SINI — di luar <tr> supaya valid -->
      <Modal
        v-model="showModal"
        variant="modal2"
        open="Maintain"
        title="Edit Titelatur"
        class="mt-3 mr-2"
        :descriptions="['Edit Titelatur', 'Edit Titelatur']"
        :inputs="[
          { placeholder: 'Masukkan Titelatur' },
          { placeholder: 'Masukkan Titelatur' },
        ]"
        primary-button="Simpan"
        secondary-button="Batal"
        primary-color="primary"
        secondary-color="secondary"
        open-color="primary"
        @primary="handleSave"
        @cancel="handleCancel"
      />

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <p class="text-gray-500">Total: {{ filteredItems.length }} Titelatur</p>

        <div class="flex items-center gap-3">
          <button
            class="px-3 py-1 border rounded disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            Prev
          </button>

          <span>Page {{ currentPage }} / {{ totalPages }}</span>

          <button
            class="px-3 py-1 border rounded disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Modal from "~/components/Modal.vue";

// Data dummy tabel
const items = ref([
  { id: 1, from: "Direktorat Operasi", subject: "Undangan Rapat" },
  { id: 2, from: "Direktorat Teknik", subject: "Permohonan Data" },
]);

const searchQuery = ref("");
const sortKey = ref(null);
const sortDirection = ref("asc");

// Filter
const filteredItems = computed(() => {
  return items.value.filter(
    (it) =>
      it.from.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      it.subject.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// ⛔ HANYA satu sortedItems → duplicate dihapus
const sortedItems = computed(() => {
  let arr = [...filteredItems.value];
  if (sortKey.value) {
    arr.sort((a, b) => {
      const valA = a[sortKey.value].toLowerCase();
      const valB = b[sortKey.value].toLowerCase();
      return sortDirection.value === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }
  return arr;
});

// Sorting
function toggleSort(key) {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortDirection.value = "asc";
  }
}

// Pagination
const currentPage = ref(1);
const rowsPerPage = 5;

const totalPages = computed(() =>
  Math.max(1, Math.ceil(sortedItems.value.length / rowsPerPage))
);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  return sortedItems.value.slice(start, start + rowsPerPage);
});

function changePage(page) {
  currentPage.value = page;
}

// Modal maintain
const showModal = ref(false);
const editingItem = ref(null);

function openEdit(item) {
  editingItem.value = item;
  showModal.value = true;
}

function handleSave() {
  showModal.value = false;
}

function handleCancel() {
  showModal.value = false;
}
</script>

<style scoped>
/* Tidak diubah */
</style>
