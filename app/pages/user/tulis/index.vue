<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

const senders = [
  { label: "Direksi Perum LPPNPI", value: "direksi" },
  { label: "Para Executive Vice President", value: "evp" },
  { label: "Azizatun Azhimah", value: "azizah" },
  { label: "Setio Anggoro", value: "setio" },
];

const senders_selected = ref("");
const selectedSender = computed(() =>
  senders.find((s) => s.value === senders_selected.value)
);

const date = ref(new Date());

const items = ref([
  { type: "label", label: "Grup Tertuju" },
  { label: "Direksi Perum LPPNPI", value: "direksi" },
  { label: "Para Executive Vice President", value: "evp" },
  { type: "separator" },
  { type: "label", label: "Tertuju" },
  { label: "PT / PH - Ketua Dewan Pengawas", value: "ketua" },
  { label: "Avirianto Suratno", value: "avirianto" },
  { label: "Azizatun Azhimah", value: "azizah" },
  { label: "Setio Anggoro", value: "setio" },
]);

const selected = ref([]);

function isItemSelected(item: any) {
  return selected.value.some((s) => s.value === item.value);
}

function removeItem(item: any, event: Event) {
  event.stopPropagation();
  selected.value = selected.value.filter((i) => i.value !== item.value);
}

const editor = useEditor({
  content: "<p>Mulai menulis dokumen anda disini...</p>",
  extensions: [
    StarterKit,
    Underline,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
  ],
  editorProps: {
    attributes: {
      class:
        "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[500px]",
    },
  },
});

onBeforeUnmount(() => editor.value?.destroy());

// Modal
const isTemplateModalOpen = ref(false);

const templates = [
  {
    id: 1,
    name: "Default",
    content: `
      <ol>
        <li>Lorem ipsum dolor sit amet...</li>
        <li>Lorem ipsum dolor sit amet...</li>
        <li>Lorem ipsum dolor sit amet...</li>
      </ol>
    `,
  },
  {
    id: 2,
    name: "Numbering With Child",
    content: `
      <ol>
        <li>Lorem ipsum dolor sit amet.
          <ol type="a">
            <li>Satu</li>
            <li>Dua</li>
            <li>Tiga</li>
          </ol>
        </li>
      </ol>
    `,
  },
];

const applyTemplate = (template: any) => {
  editor.value?.commands.setContent(template.content);
  isTemplateModalOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen w-full flex flex-col bg-white">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b">
      <h1 class="text-xl font-semibold">Tulis Konsep</h1>
      <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" />
    </div>

    <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      <!-- Pesan -->
      <div class="flex items-center border-b py-2">
        <span class="w-30 text-sm text-gray-500 font-medium">Pesan</span>
        <input
          class="flex-1 outline-none text-sm bg-transparent"
          placeholder="Ketik pesan"
        />
      </div>

      <!-- Pengirim -->
      <div class="flex items-start border-b py-2">
        <span class="w-30 text-sm mt-1.5 text-gray-500 font-medium"
          >Pengirim</span
        >

        <USelectMenu
          v-model="senders_selected"
          :items="senders"
          value-key="value"
          class="w-full"
          variant="none"
        />
      </div>

      <!-- Tanggal -->
      <div class="flex items-start border-b py-2">
        <span class="w-30 text-sm mt-1.5 text-gray-500">Tanggal Surat</span>
        <input
          type="date"
          v-model="date"
          class="w-full h-8 bg-transparent text-sm outline-none"
        />
      </div>

      <!-- Pilih Template -->
      <div class="flex justify-end">
        <UButton
          label="Pilih Template"
          color="primary"
          icon="i-heroicons-adjustments-horizontal"
          @click="isTemplateModalOpen = true"
        />
      </div>

      <!-- Editor -->
      <EditorContent :editor="editor" class="border rounded-lg" />
    </div>

    <!-- TEMPLATE MODAL -->
    <UModal v-model="isTemplateModalOpen">
      <div class="p-5 space-y-3">
        <h2 class="text-lg font-semibold">Pilih Template</h2>

        <UCard
          v-for="template in templates"
          :key="template.id"
          class="cursor-pointer hover:bg-gray-50"
          @click="applyTemplate(template)"
        >
          <h3 class="font-bold">{{ template.name }}</h3>
          <p class="text-sm text-gray-500 line-clamp-3">
            {{ template.content.replace(/<[^>]*>?/gm, "") }}
          </p>
        </UCard>
      </div>
    </UModal>
  </div>
</template>

<style scoped>
/* Simulasi highlight text seperti di gambar saat di-select */
.selection-highlight {
  position: relative;
}

/* Kustomisasi Scrollbar agar tidak merusak estetika fullscreen */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f3f4f6;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Style Prose (Konten Editor) agar mirip Docs */
.ProseMirror p {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  line-height: 1.6;
}

.ProseMirror:focus {
  outline: none;
}
</style>
