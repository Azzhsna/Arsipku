<template>
	<div v-if="isMobileOpen" class="fixed inset-0 bg-black/50 z-30 md:hidden" @click="closeMobile"></div>

	<aside :class="[
		collapsed ? 'w-20' : 'w-64',
		isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
		'fixed left-0 top-0 h-screen z-50',
		'bg-white dark:bg-gray-900 shadow border-r border-gray-200 dark:border-gray-800',
		'transition-all duration-300 flex flex-col'
	]">
		<div class="relative h-20 flex items-center border-b border-gray-200 dark:border-gray-800 flex-shrink-0"
			:class="collapsed ? 'justify-center' : 'justify-start px-4'">

			<div class="flex items-center gap-2">
				<img src="/logo.png" class="h-8 w-auto object-contain" />
				<h1 v-if="!collapsed" class="font-bold text-lg whitespace-nowrap dark:text-white">ArsipKu</h1>
			</div>

			<button @click="isMobileOpen = !isMobileOpen" class="md:hidden absolute right-4 z-20">
				<UIcon :name="isMobileOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-7 h-7" />
			</button>
		</div>

		<button @click="$emit('update:collapsed', !collapsed)" class="hidden md:flex absolute top-6 -right-4 z-50 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-md
      border border-gray-300 dark:border-gray-700
      items-center justify-center text-gray-500 hover:text-primary-500 transition-colors">
			<UIcon name="i-heroicons-chevron-left"
				:class="['w-4 h-4 transition-transform', collapsed && 'rotate-180']" />
		</button>

		<div class="flex-1 space-y-1 mt-4 px-2 overflow-y-auto custom-scrollbar">
			<SidebarItem v-for="item in menus" :key="item.to" v-bind="item" :collapsed="collapsed"
				:active="route.path === item.to" />
		</div>

		<div class="p-4 border-t border-gray-200 dark:border-gray-800 mt-auto">

			<div class="relative group">
				<button
					class="flex items-center w-full gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left">
					<img src="https://i.pravatar.cc/150?img=33" alt="User"
						class="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700 flex-shrink-0" />

					<div v-if="!collapsed" class="flex-1 min-w-0 overflow-hidden">
						<p class="text-sm font-bold text-gray-900 dark:text-white truncate">Ivan Dwi Santoso</p>
						<p class="text-xs text-gray-500 dark:text-gray-400 truncate">Administrator</p>
					</div>

					<UIcon v-if="!collapsed" name="i-heroicons-ellipsis-vertical" class="w-5 h-5 text-gray-400" />
				</button>

				<div
					class="absolute bottom-full left-0 mb-2 w-56 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">

					<div
						class="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-1">
						<a href="/settings"
							class="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
							<!-- <UIcon name="i-heroicons-cog-6-tooth" class="w-5 h-5 text-gray-400" /> -->
							Setting Notif Email
						</a>
						<a href="/settings"
							class="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
							<!-- <UIcon name="i-heroicons-cog-6-tooth" class="w-5 h-5 text-gray-400" /> -->
							Visualisasi Digsig (Visible)
						</a>
						<a href="/settings"
							class="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
							<!-- <UIcon name="i-heroicons-cog-6-tooth" class="w-5 h-5 text-gray-400" /> -->
							Staff Administrasi
						</a>

						<div class="h-px bg-gray-100 dark:bg-gray-700 my-1 mx-2"></div>

						<button
							class="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-left">
							<!-- <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5" /> -->
							Logout
						</button>
					</div>

					<div class="absolute top-full left-0 w-full h-3 bg-transparent"></div>
				</div>
			</div>

		</div>
	</aside>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue";

defineProps({
	collapsed: Boolean,
});
defineEmits(["update:collapsed"]);

const route = useRoute();
const isMobileOpen = ref(false);

const closeMobile = () => (isMobileOpen.value = false);

defineExpose({
	openMobile: () => (isMobileOpen.value = true),
	closeMobile,
});

const menus = [
	{ label: "Dashboard", to: "/", icon: "i-heroicons-squares-plus" },
	{ label: "Kotak Masuk", to: "/inbox", icon: "i-heroicons-inbox" },
	{ label: "Terkirim", to: "/", icon: "i-heroicons-paper-airplane" },
	{ label: "Draft", to: "/", icon: "i-heroicons-document-text" },
	{ label: "Short URL", to: "/", icon: "i-heroicons-link" },
	{ label: "Tugas", to: "/", icon: "i-heroicons-document-plus" },
	{ label: "Template", to: "/", icon: "i-heroicons-document-duplicate" },
	{ label: "Titelatur Inggris", to: "/", icon: "i-heroicons-book-open" },
];
</script>

<style scoped>
/* Scrollbar tipis agar rapi */
.custom-scrollbar::-webkit-scrollbar {
	width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
	background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background-color: #e5e7eb;
	border-radius: 20px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
	background-color: #374151;
}
</style>