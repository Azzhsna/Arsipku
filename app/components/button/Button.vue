<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <component
      v-if="iconLeft"
      :is="iconLeft"
      :class="iconClasses"
    />
    <slot />
    <component
      v-if="iconRight"
      :is="iconRight"
      :class="iconClasses"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
  size?: 'giant' | 'large' | 'medium' | 'small' | 'tiny'
  variant?: 'filled' | 'outlined' | 'ghost'
  disabled?: boolean
  iconLeft?: any
  iconRight?: any
  iconOnly?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'medium',
  variant: 'filled',
  disabled: false,
  iconOnly: false,
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const classes = [
    'inline-flex items-center justify-center gap-2 font-medium transition-all rounded-lg',
    'disabled:cursor-not-allowed',
    'focus:outline-none focus-visible:ring-4'
  ]

  // Size classes
  const sizeClasses = {
    giant: props.iconOnly ? 'w-14 h-14 text-base' : 'px-6 py-4 text-base',
    large: props.iconOnly ? 'w-12 h-12 text-base' : 'px-5 py-3 text-base',
    medium: props.iconOnly ? 'w-10 h-10 text-sm' : 'px-4 py-2.5 text-sm',
    small: props.iconOnly ? 'w-8 h-8 text-sm' : 'px-3 py-2 text-sm',
    tiny: props.iconOnly ? 'w-6 h-6 text-xs' : 'px-2 py-1 text-xs'
  }
  classes.push(sizeClasses[props.size])

  // Variant classes
  if (props.variant === 'filled') {
    classes.push(
      'bg-primary-50 text-white',
      'hover:bg-primary-60',
      'active:bg-primary-70 active:shadow-inner',
      'focus-visible:ring-primary-20',
      'disabled:bg-neutral-20 disabled:text-neutral-40'
    )
  } else if (props.variant === 'outlined') {
    classes.push(
      'border-2 border-primary-50 text-primary-50',
      'hover:border-primary-60 hover:text-primary-60 hover:bg-primary-10',
      'active:border-primary-70 active:text-primary-70 active:bg-primary-10',
      'focus-visible:ring-primary-20',
      'disabled:border-neutral-20 disabled:text-neutral-40 disabled:bg-transparent'
    )
  } else if (props.variant === 'ghost') {
    classes.push(
      'text-primary-50',
      'hover:text-primary-60 hover:bg-primary-10',
      'active:text-primary-70 active:bg-primary-10',
      'focus-visible:ring-primary-20',
      'disabled:text-neutral-40 disabled:bg-transparent'
    )
  }

  return classes.join(' ')
})

const iconClasses = computed(() => {
  const iconSizes = {
    giant: 'w-5 h-5',
    large: 'w-5 h-5',
    medium: 'w-4 h-4',
    small: 'w-4 h-4',
    tiny: 'w-3 h-3'
  }
  return iconSizes[props.size]
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>