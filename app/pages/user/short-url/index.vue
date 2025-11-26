<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { useClipboard } from '@vueuse/core'
import type { header } from '#build/ui'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()
const { copy } = useClipboard()

const value = ref('')
const domains = ['.com', '.dev', '.org']
const domain = ref(domains[0])

type Payment = {
  tanggal: string   
  LUrl: string
  SUrl: string
  keterangan: string
}

const data = ref<Payment[]>([
  {
    tanggal: '2024-03-11T15:30:00',
    LUrl: 'https://urlasli',
    SUrl: 'url.modifikasi',
    keterangan: 'Lorem Ipsum is simply dummy text'
  },

  {
    tanggal: '2024-03-11T10:10:00',
    LUrl: 'https://urlasli2',
    SUrl: 'url.modifikasi.com',
    keterangan: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  }
])

const columns: TableColumn<Payment>[] = [

{
  accessorKey: 'tanggal',
  header: 'Tanggal',
  cell: ({ row }) => {
    const raw = row.getValue('tanggal')
    const date = new Date(raw)

    const datePart = date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const timePart = `${hours}.${minutes}`

    const finalOutput = `${datePart}, ${timePart}`

    return h(
      'div',
      { class: 'whitespace-normal break-words max-w-[200px] text-black dark:text-white' },
      finalOutput
    )
  }
},

{
  accessorKey: 'LUrl',
  header: 'Url Asli',
  cell: ({ row }) =>
    h('div', {
      class: 'whitespace-normal break-words max-w-[400px] text-black dark:text-white'
    }, row.getValue('LUrl'))
},

{
  accessorKey: 'SUrl',
  header: 'Url Modifikasi',
  cell: ({ row }) =>
    h('div', {
      class: 'whitespace-normal break-words max-w-[400px] text-black dark:text-white'
    }, row.getValue('SUrl'))
},
{
  accessorKey: 'keterangan',
  header: 'Keterangan',
  cell: ({ row }) =>
    h('div', {
      class: 'whitespace-normal break-words max-w-[400px] text-black dark:text-white'
    }, row.getValue('keterangan'))
},

  {
    header: "Aksi",
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end'
            },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown'
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown'
            })
        )
      )
    }
  }
]

function getRowItems(row: Row<Payment>) {
  return [
    {
      label: 'Salin Url Modifikasi',
      onSelect() {
        copy(row.original.SUrl)

        toast.add({
          title: 'Url Berhasil Di Salin!',
          color: 'success',
          icon: 'i-lucide-circle-check'
        })
      }
    },
    {
      label: 'Salin Url Asli',
      onSelect() {
        copy(row.original.LUrl)

        toast.add({
          title: 'Url Berhasil Di Salin!',
          color: 'success',
          icon: 'i-lucide-circle-check'
        })
      }
    },
    {
      label: 'Hapus',
      onSelect() {
        copy(row.original.SUrl)

        toast.add({
          title: 'Url Berhasil Di Salin!',
          color: 'success',
          icon: 'i-lucide-circle-check'
        })
      }
    }
  ]
}
</script> 

<template>
  <div class="flex flex-wrap justify-between mb-3">
    <Heading variant="heading5m">Short Url</Heading>
    <UDashboardSearchButton size="lg" class="w-[300px]"/>
  </div>

<UDrawer
  placement="center"
  transition="modal"
  :ui="{
    content: 'max-w-[380px]'
  }"
>

  <UButton trailing-icon="i-lucide-plus" size="md" color="primary" variant="solid" class="mb-3">Tambahkan URL</UButton>

    <template #body>
      <Placeholder class="h-48" />
        <UFieldGroup label="ini label" class="flex flex-col items-center">
          <div class="mb-5">
            <p>Masukan Url Asli Anda</p>
            <UInput
              v-model="value"
              placeholder="nuxt"
              :ui="{
                base: 'pl-14.5',
                leading: 'pointer-events-none',
              }"
            >
              <template #leading>
                <p class="text-sm text-muted">
                  https://
                </p>
              </template>
            </UInput>
          <USelectMenu v-model="domain" :items="domains" />
        </div>
        <div class="mb-5">
            <p>Masukan Modifikasi</p>
            <UInput
              v-model="value"
              placeholder="nuxt"
              :ui="{
                base: 'pl-14.5',
                leading: 'pointer-events-none',
              }"
            >
              <template #leading>
                <p class="text-sm text-muted">
                  https://
                </p>
              </template>
            </UInput>
          <USelectMenu v-model="domain" :items="domains" />
        </div>
        <div class="mb-5">
            <p>Keterangan</p>
            <UInput
              v-model="value"
              placeholder="nuxt"
              :ui="{
                base: 'pl-14.5',
                leading: 'pointer-events-none',
              }"
            >
              <template #leading>
                <p class="text-sm text-muted">
                  https://
                </p>
              </template>
            </UInput>
          <USelectMenu v-model="domain" :items="domains" />
        </div>
        </UFieldGroup>
        <div class="justify-center flex">
          <UButton label="Kirim" variant="solid" color="primary" size="lg" class="mr-3"/>
          <UButton label="Edit" variant="solid" color="success" size="lg"/>
        </div>
    </template>
  </UDrawer>
  <UTable :data="data" :columns="columns" class="flex-1 border border-gray-300 rounded-2xl" />

</template>
