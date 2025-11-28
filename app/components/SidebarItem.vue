<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  item: { type: Object, required: true },
  collapsed: Boolean,
})

const route = useRoute()
const isOpen = ref(false)     // State Accordion
const isHovered = ref(false)  // State Flyout
const flyoutTop = ref(0)      // Posisi Flyout

// --- 1. DETEKSI APAKAH PUNYA ANAK ---
const hasChildren = computed(() => {
  return props.item.children && props.item.children.length > 0
})

// --- 2. LOGIC ACTIVE STATE ---
const isActive = computed(() => {
  if (props.item.to) {
    return route.path === props.item.to || route.path.startsWith(props.item.to + '/')
  }
  if (hasChildren.value) {
    return props.item.children.some(child => isChildActive(child))
  }
  return false
})

const isChildActive = (child) => {
  if (child.to && route.path.startsWith(child.to)) return true
  if (child.children && child.children.length > 0) return child.children.some(c => isChildActive(c))
  return false
}

// Auto open accordion
if (isActive.value && hasChildren.value) isOpen.value = true
watch(() => route.path, () => {
  if (isActive.value && hasChildren.value) isOpen.value = true
})

const toggle = () => {
  if (props.collapsed) return
  isOpen.value = !isOpen.value
}

// --- 3. LOGIC HOVER FLYOUT ---
const onMouseEnter = (e) => {
  if (props.collapsed) {
    const rect = e.currentTarget.getBoundingClientRect()
    flyoutTop.value = rect.top 
    isHovered.value = true
  }
}

const onMouseLeave = () => {
  isHovered.value = false
}

// --- STYLE SHARED CLASS (Button Sidebar Utama) ---
const itemClasses = computed(() => [
  'group flex items-center transition-all duration-200 font-medium text-sm relative w-full focus:outline-none',
  'rounded-full',
  props.collapsed 
    ? 'justify-center px-0 h-10 w-10 mx-auto' 
    : 'px-4 py-2.5 gap-3',
  'mb-1',
  isActive.value
    ? 'bg-primary-50 text-primary-500 dark:bg-primary-900/30 dark:text-primary-400 font-semibold'
    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
])
</script>

<template>
  <div 
    class="w-full relative select-none"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    
    <button v-if="hasChildren" @click="toggle" :class="itemClasses">
      <UIcon 
        v-if="item.icon" :name="item.icon" class="flex-shrink-0 transition-colors"
        :class="[isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-700', collapsed ? 'w-6 h-6' : 'w-5 h-5']" 
      />
      <template v-if="!collapsed">
        <span class="truncate flex-1 text-left">{{ item.label }}</span>
        <span v-if="item.badge" class="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.2rem] text-center ml-2">{{ item.badge }}</span>
        <UIcon name="i-heroicons-chevron-down" :class="['w-4 h-4 text-gray-400 transition-transform duration-300', isOpen && 'rotate-180']" />
      </template>
    </button>

    <NuxtLink v-else :to="item.to" :class="itemClasses">
      <UIcon 
        v-if="item.icon" :name="item.icon" class="flex-shrink-0 transition-colors"
        :class="[isActive ? 'text-primary-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-700', collapsed ? 'w-6 h-6' : 'w-5 h-5']" 
      />
      <template v-if="!collapsed">
        <span class="truncate flex-1 text-left">{{ item.label }}</span>
        <span v-if="item.badge" class="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.2rem] text-center ml-2">{{ item.badge }}</span>
      </template>
    </NuxtLink>


    <div 
      v-if="hasChildren && isOpen && !collapsed" 
      class="flex flex-col ml-[1.5rem] pl-2 border-l-2 border-gray-200 dark:border-gray-700 space-y-1 transition-all duration-300"
    >
      <SidebarItem v-for="(child, i) in item.children" :key="i" :item="child" :collapsed="collapsed" />
    </div>


    <div 
      v-if="collapsed && isHovered"
      class="fixed z-[9999] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl p-2 animate-fade-in"
      :class="hasChildren ? 'w-56' : 'w-auto min-w-[140px] max-w-[200px]'"
      :style="{ top: `${flyoutTop}px`, left: '5.5rem' }"
    >
      <div class="absolute top-0 -left-6 w-6 h-full bg-transparent"></div>

      <template v-if="hasChildren">
        <div class="px-3 pb-2 mb-1 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
          {{ item.label }}
        </div>
        <div class="flex flex-col space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <NuxtLink 
            v-for="(child, i) in item.children" 
            :key="i"
            :to="child.to"
            class="flex items-center px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            active-class="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-medium"
          >
            {{ child.label }}
          </NuxtLink>
        </div>
      </template>

      <template v-else>
        <NuxtLink 
          :to="item.to"
          class="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          active-class="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
        >
          {{ item.label }}
        </NuxtLink>
      </template>

    </div>

  </div>
</template>

<style scoped>
.animate-fade-in { animation: fadeIn 0.15s ease-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-5px); }
  to { opacity: 1; transform: translateX(0); }
}
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 10px; }
</style>