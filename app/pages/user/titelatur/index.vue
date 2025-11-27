<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import {
  Filter,
  FileCheck,
  ChevronRight,
  Search,
  ArrowUpDown,
  RotateCcw,
} from "lucide-vue-next";
import Heading from "~/components/Heading.vue";
// import EditModal from "~/components/Modal.vue";

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

// DROPDOWN STATE
const openDropdown = ref(null);
const filterMode = ref("Semua ");
const filterOptions = [" Jabatan", " Lokasi"];
// DROPDOWN HANDLER
const toggleDropdown = (name) => {
  openDropdown.value = openDropdown.value === name ? null : name;
};

const setFilter = (opt) => {
  filterMode.value = opt;
  openDropdown.value = null;
};

// DATA
const items = ref([
  {
    id: 1,
    from: "Kepala Divisi Teknologi Informasi",
    subject: "SVP Information Technology",
    maintain: "Maintain",
  },
  {
    id: 2,
    from: "Direktur Keselamatan, Keamanan dan Standarisasi",
    subject: "Director of Safety, Security and Standarization",
    maintain: "Maintain",
  },
  {
    id: 3,
    from: "Direktur Teknik",
    subject: "Director of Engineering",
    maintain: "Maintain",
  },
  {
    id: 4,
    from: "Kepala Divisi Teknologi Informasi",
    subject: "SVP Information Technology",
    maintain: "Maintain",
  },
  {
    id: 5,
    from: "Direktur Keselamatan, Keamanan dan Standarisasi",
    subject: "Director of Safety, Security and Standarization",
    maintain: "Maintain",
  },
  {
    id: 6,
    from: "Direktur Teknik",
    subject: "Director of Engineering",
    maintain: "Maintain",
  },
  {
    id: 7,
    from: "Direktur Teknik",
    subject: "Director of Engineering",
    maintain: "Maintain",
  },
  {
    id: 8,
    from: "Kepala Divisi Teknologi Informasi",
    subject: "SVP Information Technology",
    maintain: "Maintain",
  },
  {
    id: 9,
    from: "Direktur Keselamatan, Keamanan dan Standarisasi",
    subject: "Director of Safety, Security and Standarization",
    maintain: "Maintain",
  },
  {
    id: 10,
    from: "Direktur Teknik",
    subject: "Director of Engineering",
    maintain: "Maintain",
  },
  {
    id: 11,
    from: "Direktur Teknik",
    subject: "Director of Engineering",
    maintain: "Maintain",
  },
  {
    id: 12,
    from: "Direktur Teknik",
    subject: "Director of Engineering",
    maintain: "Maintain",
  },
]);

// FILTER
const filteredItems = computed(() => {
  const s = search.value.toLowerCase();
  return items.value.filter((it) => {
    const searchPass =
      it.from.toLowerCase().includes(s) || it.subject.toLowerCase().includes(s);
    return searchPass;
  });
});

const sortedItems = computed(() => filteredItems.value);

//      MODAL EDIT
const showModal = ref(false);
const toast = useToast();
const selectedItem = ref(null);

const openEdit = (item) => {
  selectedItem.value = item;
  showModal.value = true;
};

// ketika tombol "Simpan" di modal ditekan

const handleSave = () => {
  toast.add({
    title: "Data berhasil disimpan!",
    color: "success",
    icon: "i-lucide-circle-check",
    position: "top-right",
  });
};

const handleCancel = () => {
  console.log("dibatalkan");
};
</script>

<template>
  <div class="w-full min-w-0 min-h-screen text-gray-800 dark:text-gray-100">
    <!-- Title -->
    <div class="mb-5">
      <Heading variant="heading6b" class="text-mobile-md">
        Titelatur Inggris
      </Heading>
      <Heading variant="heading10m" class="text-mobile-base sm:text-sm">
        Panduan tata nama dan nomenklatur dalam Bahasa Inggris
      </Heading>
    </div>

    <!-- Card Wrapper -->
    <div
      class="flex flex-col w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
    >
      <!-- Toolbar -->
      <div
        class="px-2 py-2 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start md:items-center justify-between gap-3"
      >
        <!-- Filter dropdown -->
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
                class="w-full text-left px-4 py-2 text-xs hover:bg-sky-50 dark:hover:bg-gray-700"
                :class="
                  filterMode === opt
                    ? 'text-sky-600 font-bold'
                    : 'text-gray-700 dark:text-gray-300'
                "
              >
                {{ opt }}
                <FileCheck
                  v-if="filterMode === opt"
                  class="w-3 h-3 float-right"
                />
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

        <!-- Search -->
        <div class="relative flex-1 w-full md:w-56">
          <Search
            class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="search"
            placeholder="Cari..."
            class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs pl-9 pr-3 py-1.5 rounded-lg focus:ring-sky-500"
          />
        </div>
      </div>

      <!-- TABLE -->
      <div class="flex flex-col">
        <div class="flex-1 overflow-y-auto">
          <table class="min-w-full text-left text-sm">
            <thead
              class="bg-primary-700 text-primary-50 dark:bg-gray-400 sticky top-0 z-10"
            >
              <tr>
                <th class="px-4 py-4 font-bold">Unit</th>
                <th class="px-4 py-4 font-bold">Titelatur</th>
                <th class="px-4 py-4 font-bold"></th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="it in sortedItems"
                :key="it.id"
                class="border-b border-gray-100 dark:border-gray-800 hover:bg-primary-50 dark:hover:bg-gray-800"
              >
                <td class="px-4 py-4">{{ it.from }}</td>

                <td class="px-4 py-2">{{ it.subject }}</td>

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
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODAL EDIT -->

    <!-- <Modal
      :model-value="showModal"
      @update:model-value="showModal = $event"
      title="Edit Titelatur"
      :inputs="[
        { label: 'Unit', model: selectedItem?.from || '' },
        { label: 'Titelatur', model: selectedItem?.subject || '' },
      ]"
      primaryButton="Simpan"
      secondaryButton="Batal"
      variant="modal2"
      @primary="handleSave"
    /> -->

    <!-- <EditModal
      :model-value="showEditModal"
      @update:model-value="showEditModal = $event"
      :title="'Edit Titelatur'"
      :descriptions="[
        'Unit: ' + (selectedItem?.from || ''),
        'Titelatur: ' + (selectedItem?.subject || ''),
      ]"
      :inputs="[{ placeholder: 'Edit titelatur...' }]"
      primaryButton="Simpan"
      secondaryButton="Batal"
      variant="modal2"
      @primary="handleSave"
    /> -->
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
