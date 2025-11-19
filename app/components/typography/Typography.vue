<template>
  <component
    :is="tag"
    :class="typographyClasses"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'body1',
    validator: (value) => {
      return [
        'display1',
        'display2',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'h7',
        'h8',
        'body1',
        'body2',
        'body3',
        'caption1',
        'caption2'
      ].includes(value)
    }
  },
  tag: {
    type: String,
    default: null
  },
  weight: {
    type: String,
    default: null,
    validator: (value) => {
      return !value || ['normal', 'medium', 'semibold', 'bold'].includes(value)
    }
  },
  color: {
    type: String,
    default: null
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center', 'right', 'justify'].includes(value)
  }
})

const defaultTagMap = {
  display1: 'h1',
  display2: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  h7: 'p',
  h8: 'p',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  caption1: 'span',
  caption2: 'span'
}

const variantClasses = {
  display1: 'text-6xl font-bold',
  display2: 'text-4xl font-bold',
  h1: 'text-3xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-semibold',
  h6: 'text-base font-semibold',
  h7: 'text-sm font-medium',
  h8: 'text-xs font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  body3: 'text-xs',
  caption1: 'text-xs',
  caption2: 'text-xs'
}

const variantColors = {
  display1: 'text-gray-900 dark:text-white',
  display2: 'text-gray-900 dark:text-white',
  h1: 'text-gray-900 dark:text-white',
  h2: 'text-gray-900 dark:text-white',
  h3: 'text-gray-900 dark:text-white',
  h4: 'text-gray-900 dark:text-white',
  h5: 'text-gray-900 dark:text-white',
  h6: 'text-gray-900 dark:text-white',
  h7: 'text-gray-700 dark:text-gray-300',
  h8: 'text-gray-600 dark:text-gray-400',
  body1: 'text-gray-700 dark:text-gray-300',
  body2: 'text-gray-700 dark:text-gray-300',
  body3: 'text-gray-600 dark:text-gray-400',
  caption1: 'text-gray-500 dark:text-gray-500',
  caption2: 'text-gray-400 dark:text-gray-600'
}

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify'
}

const tag = computed(() => {
  return props.tag || defaultTagMap[props.variant]
})

const typographyClasses = computed(() => {
  const classes = [variantClasses[props.variant]]
  
  if (props.color) {
    classes.push(props.color)
  } else {
    classes.push(variantColors[props.variant])
  }

  if (props.weight) {
    classes[0] = classes[0].replace(/font-(normal|medium|semibold|bold)/, '').trim()
    classes.push(weightClasses[props.weight])
  }

  classes.push(alignClasses[props.align])
  
  return classes.join(' ')
})
</script>