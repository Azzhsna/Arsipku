<script setup>
const props = defineProps({
  to: String,
  icon: String,
  label: String,
  collapsed: Boolean
})

const route = useRoute()

// aktif jika URL persis sama ATAU URL anak
const active = computed(() =>
  route.path === props.to || route.path.startsWith(props.to + '/')
)
</script>

<template>
  <UTooltip :text="label" :prevent="!collapsed" :content="{ side: 'right' }" :ui="{
    // background: 'bg-slate-900 dark:bg-white',
    // color: 'text-white dark:text-slate-900',
    // padding: 'px-3 py-2',
    // rounded: 'rounded-md',
    // font: 'font-semibold text-xs',
    // arrow: {
    //   background: 'before:bg-slate-900 dark:before:bg-white',
    //   ring: 'before:ring-0'
    // }
  }">

    <NuxtLink :to="to" :class="[
      'flex items-center transition rounded-full h-10 font-medium text-sm',
      collapsed
        ? 'justify-center px-0 w-10 mx-auto'
        : 'gap-3 px-4 justify-start w-full',
      active
        ? 'bg-blue-100 dark:bg-white/20 text-sky-800 dark:text-white'
        : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-white/10'
    ]">
      <UIcon :name="icon" class="w-5 h-5 flex-shrink-0"
        :class="active ? 'text-sky-800 dark:text-white' : 'text-gray-600 dark:text-gray-300'" />

      <span v-if="!collapsed" class="whitespace-nowrap truncate">{{ label }}</span>
    </NuxtLink>

  </UTooltip>
</template>