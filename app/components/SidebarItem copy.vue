<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  item: { type: Object, required: true },
  collapsed: Boolean, // Menerima realCollapsed dari Parent
})

const route = useRoute()
const isOpen = ref(false)

const isActive = computed(() => {
  if (props.item.to) {
    return route.path === props.item.to || route.path.startsWith(props.item.to + '/')
  }
  if (props.item.children) {
    return props.item.children.some(child => isChildActive(child))
  }
  return false
})

const isChildActive = (child) => {
  if (child.to && (route.path === child.to || route.path.startsWith(child.to + '/'))) return true
  if (child.children) return child.children.some(c => isChildActive(c))
  return false
}

// Auto open
if (isActive.value && props.item.children) {
  isOpen.value = true
}
watch(() => route.path, () => {
  if (isActive.value && props.item.children) isOpen.value = true
})

const toggle = () => {
  if (props.collapsed) return
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="w-full relative select-none">
    
    <UTooltip 
      :text="item.label" 
      :prevent="!collapsed" 
      :content="{ side: 'right' }"
    >
      <component
        :is="item.children ? 'button' : 'NuxtLink'"
        :to="item.children ? undefined : item.to"
        @click="item.children ? toggle() : null"
        :class="[
          'group flex items-center transition-all duration-200 font-medium text-sm relative w-full focus:outline-none',
          'rounded-full',
          
          // Layout padding responsive
          collapsed 
            ? 'justify-center px-0 h-10 w-10 mx-auto' 
            : 'px-4 py-2.5 gap-3',

          'mb-1',
          
          isActive
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-semibold'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
        ]"
      >
        <UIcon 
          v-if="item.icon" 
          :name="item.icon" 
          class="flex-shrink-0 transition-colors"
          :class="[
            isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-700',
            collapsed ? 'w-6 h-6' : 'w-5 h-5'
          ]" 
        />

        <template v-if="!collapsed">
          <span class="truncate flex-1 text-left animate-fade-in">{{ item.label }}</span>
          
          <span v-if="item.badge" class="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.2rem] text-center ml-2">
            {{ item.badge }}
          </span>

          <UIcon 
            v-if="item.children" 
            name="i-heroicons-chevron-down" 
            :class="['w-4 h-4 text-gray-400 transition-transform duration-300', isOpen && 'rotate-180']" 
          />
        </template>
      </component>
    </UTooltip>

    <div 
      v-if="item.children && isOpen && !collapsed" 
      class="flex flex-col ml-[1.5rem] pl-2 border-l-2 border-gray-200 dark:border-gray-700 space-y-1 transition-all duration-300"
    >
      <SidebarItem 
        v-for="(child, i) in item.children" 
        :key="i" 
        :item="child" 
        :collapsed="collapsed" 
      />
    </div>

  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>