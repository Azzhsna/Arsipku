<template>
    <div class="space-y-6">

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Ringkasan aktivitas persuratan Anda hari ini.
                </p>
            </div>
            <div class="flex gap-3">
                <UButton icon="i-heroicons-document-plus" color="primary" variant="solid"
                    :ui="{ rounded: 'rounded-lg' }">
                    Catat Surat
                </UButton>
                <UButton icon="i-heroicons-funnel" color="white" variant="solid" :ui="{ rounded: 'rounded-lg' }">
                    Filter
                </UButton>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <UCard v-for="(stat, idx) in stats" :key="idx" :ui="cardUI">
                <div class="flex items-center gap-4">
                    <div
                        :class="`w-12 h-12 flex items-center justify-center rounded-lg shadow-sm text-white ${stat.bgSolid}`">
                        <UIcon :name="stat.icon" class="w-6 h-6" />
                    </div>

                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">{{ stat.label }}</p>
                        <div class="flex items-end gap-2">
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white leading-none mt-1">{{ stat.value
                                }}</h3>
                            <span
                                :class="`text-xs font-bold mb-0.5 ${stat.trendUp ? 'text-green-600' : 'text-red-500'}`">
                                {{ stat.trend }}%
                            </span>
                        </div>
                    </div>
                </div>
            </UCard>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div class="lg:col-span-2">
                <UCard :ui="cardUI" class="h-full">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3 class="font-semibold text-gray-900 dark:text-white">Surat Masuk Terbaru</h3>
                            <UButton to="/inbox" size="xs" color="gray" variant="ghost"
                                trailing-icon="i-heroicons-arrow-right">
                                Lihat Semua
                            </UButton>
                        </div>
                    </template>

                    <div class="divide-y divide-gray-100 dark:divide-gray-800">
                        <div v-for="mail in recentMails" :key="mail.id"
                            class="py-3 first:pt-0 last:pb-0 flex items-center gap-4 group hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-4 px-4 transition-colors cursor-pointer">

                            <div :class="`w-1 h-10 rounded-full ${mail.accentColor}`"></div>

                            <div class="flex-1 min-w-0">
                                <div class="flex justify-between mb-0.5">
                                    <p class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ mail.sender
                                        }}</p>
                                    <span class="text-xs text-gray-400 font-medium">{{ mail.date }}</span>
                                </div>
                                <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{{ mail.subject }}</p>
                            </div>

                            <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                                <UButton icon="i-heroicons-eye" color="gray" variant="ghost" size="xs" />
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>

            <div class="space-y-6">

                <UCard :ui="cardUI">
                    <template #header>
                        <h3 class="font-semibold text-gray-900 dark:text-white">Status Disposisi</h3>
                    </template>

                    <div class="space-y-4">
                        <div v-for="(item, i) in summaryData" :key="i" class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <span :class="`w-3 h-3 rounded-full ${item.color}`"></span>
                                <span class="text-sm text-gray-600 dark:text-gray-300">{{ item.label }}</span>
                            </div>
                            <span class="font-bold text-gray-900 dark:text-white">{{ item.count }}</span>
                        </div>
                    </div>

                    <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <UButton block color="gray" variant="solid" size="sm">
                            Cek Disposisi Pending
                        </UButton>
                    </div>
                </UCard>

                <UCard :ui="cardUI">
                    <div class="flex items-start gap-4">
                        <div
                            class="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                            <UIcon name="i-heroicons-server-stack" class="w-6 h-6" />
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-900 dark:text-white">Penyimpanan Cloud</p>
                            <p class="text-xs text-gray-500 mb-3">75% terpakai dari 20 GB</p>
                            <UProgress :value="75" color="indigo" size="sm" />
                        </div>
                    </div>
                </UCard>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// --- CONFIGURATION ---
// 1. Mendefinisikan Style Card Satu Kali agar KONSISTEN di semua tempat
// ring-1 ring-gray-200/50 memberikan outline super tipis agar rapi tapi tidak kasar (tegas)
const cardUI = {
    base: '',
    background: 'bg-white dark:bg-gray-900',
    divide: 'divide-y divide-gray-200 dark:divide-gray-800',
    ring: 'ring-1 ring-gray-200/50 dark:ring-gray-800',
    rounded: 'rounded-xl',
    shadow: 'shadow-sm',
    body: {
        padding: 'p-5 sm:p-6',
    },
    header: {
        padding: 'px-5 py-4 sm:px-6',
    },
}

// --- DATA DUMMY ---

const stats = [
    { label: 'Surat Masuk', value: '1,240', icon: 'i-heroicons-inbox-arrow-down', trend: 12, trendUp: true, bgSolid: 'bg-blue-600' },
    { label: 'Surat Keluar', value: '843', icon: 'i-heroicons-paper-airplane', trend: 5, trendUp: true, bgSolid: 'bg-emerald-600' },
    { label: 'Perlu Disposisi', value: '18', icon: 'i-heroicons-clock', trend: 2, trendUp: false, bgSolid: 'bg-orange-500' },
    { label: 'Arsip Digital', value: '12K', icon: 'i-heroicons-archive-box', trend: 8, trendUp: true, bgSolid: 'bg-indigo-600' },
]

const recentMails = [
    { id: 1, sender: 'Kementerian Dalam Negeri', subject: 'Undangan Rapat Koordinasi Nasional Smart City', date: '10:42', accentColor: 'bg-orange-500' },
    { id: 2, sender: 'PT Telkom Indonesia', subject: 'Penawaran Kerjasama Layanan Internet Dedicated', date: '09:15', accentColor: 'bg-blue-500' },
    { id: 3, sender: 'Dinas Kesehatan', subject: 'Laporan Bulanan Kesehatan Pegawai', date: 'Kemarin', accentColor: 'bg-green-500' },
    { id: 4, sender: 'CV Maju Mundur', subject: 'Invoice Pengadaan ATK Bulan November', date: 'Kemarin', accentColor: 'bg-gray-400' },
    { id: 5, sender: 'Walikota Depok', subject: 'Himbauan Peringatan Hari Pahlawan', date: '17 Nov', accentColor: 'bg-blue-500' },
]

const summaryData = [
    { label: 'Selesai', count: 85, color: 'bg-green-500' },
    { label: 'Dalam Proses', count: 24, color: 'bg-blue-500' },
    { label: 'Menunggu', count: 12, color: 'bg-orange-500' },
    { label: 'Ditolak', count: 3, color: 'bg-red-500' },
]
</script>