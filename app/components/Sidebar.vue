<template>
	<!-- BACKDROP MOBILE -->
	<div v-if="isMobileOpen" class="fixed inset-0 bg-black/50 z-30 md:hidden" @click="closeMobile"></div>

	<!-- SIDEBAR -->
	<aside :class="[
		collapsed ? 'w-20' : 'w-64',
		isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
		'fixed left-0 top-0 h-screen z-50',  /* Pastikan z-50 agar di atas konten */
		'bg-white dark:bg-gray-900 shadow border-r border-gray-200 dark:border-gray-800',
		'transition-all duration-300 flex flex-col'
	]">
		<!-- HEADER -->
		<div class="relative h-20 flex items-center border-b border-gray-200 dark:border-gray-800"
			:class="collapsed ? 'justify-center' : 'justify-start px-4'">
			<!-- LOGO + TITLE -->
			<div class="flex items-center gap-2">
				<!-- LOGO TETAP UKURAN SAMA -->
				<img src="/logo.png" class="h-8 w-auto object-contain" />

				<!-- TITLE HANYA TAMPIL SAAT EXPANDED -->
				<h1 v-if="!collapsed" class="font-bold text-lg whitespace-nowrap">ArsipKu</h1>
			</div>

			<!-- MOBILE HAMBURGER -->
			<button @click="isMobileOpen = !isMobileOpen" class="md:hidden absolute right-4 z-20">
				<UIcon :name="isMobileOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-7 h-7" />
			</button>
		</div>

		<!-- COLLAPSE / MINIMIZE BUTTON -->
		<button @click="$emit('update:collapsed', !collapsed)" class="hidden md:flex absolute top-6 -right-4 z-50 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-md
         border border-gray-300 dark:border-gray-700
         items-center justify-center">
			<UIcon name="i-heroicons-chevron-left"
				:class="['w-4 h-4 transition-transform', collapsed && 'rotate-180']" />
		</button>

		<!-- MENU -->
		<div class="flex-1 space-y-1 mt-4 px-2">
			<SidebarItem v-for="item in menus" :key="item.to" v-bind="item" :collapsed="collapsed"
				:active="route.path === item.to" />
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
	{ label: "Dashboard", to: "/admin/dashboard", icon: "i-heroicons-squares-plus" },
	{ label: "Kotak Masuk", to: "/admin/inbox", icon: "i-heroicons-inbox" },
	{ label: "Terkirim", to: "/", icon: "i-heroicons-paper-airplane" },
	{ label: "Draft", to: "/", icon: "i-heroicons-document-text" },
	{ label: "Short URL", to: "/shorturl", icon: "i-heroicons-link" },
	{ label: "Tugas", to: "/", icon: "i-heroicons-document-plus" },
	{ label: "Template", to: "/", icon: "i-heroicons-document-duplicate" },
	{ label: "Titelatur Inggris", to: "/", icon: "i-heroicons-book-open" },
];
</script>
