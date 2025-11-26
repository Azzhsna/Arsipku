<template>
  <UModal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :ui="{
      content: `${ui.modal.base.content} ${ui.modal.variants[variant]?.content ?? ''}`
    }"
  >
    <template #header>
      <div class="ml-10">
          <div :class="variant === 'modal2' ? 'text-start' : 'text-center'">
            <Heading variant="heading7sb" class="text-center">{{ title }}</Heading>
            <div v-for="(desc, i) in descriptions" :key="i" class="mt-1">
              <Paragraph variant="body2">{{ desc }}</Paragraph>
              <UInput
                v-if="variant === 'modal2' && inputs[i]"
                :placeholder="inputs[i].placeholder"
                class="w-full mt-2"
              />
            </div>
          </div>
          <div class="flex justify-center gap-3 mt-3">
            <UButton :color="primaryColor" @click="emit('primary')" class="px-10 py-3">
              {{ primaryButton}}
            </UButton>

            <UButton
              :color="secondaryColor"
              variant="outline"
              @click="emit('update:modelValue', false)"
              class="px-10 py-3"
            >
              {{ secondaryButton }}
            </UButton>
          </div>
      </div>  
    </template>
    <UButton 
      :color="openColor"
      @click="emit('update:modelValue', true)"
      :trailing-icon="computedIcon"
    >
      {{ open }}
    </UButton>
  </UModal>
</template>

<script setup lang="ts">
const { ui } = useAppConfig()
const props = defineProps({
  modelValue: Boolean,
  title: String,
  variant: String,
  descriptions: { type: Array, default: () => [] },
  inputs: { type: Array, default: () => [] },
  primaryButton: String,
  secondaryButton: String,
  open: String,
  icon: String,
  primaryColor: { type: String, default: "primary" },
  secondaryColor: { type: String, default: "primary" },
  openColor: { type: String, default: "primary" },
})

const computedIcon = computed(() =>
  props.icon ? `i-lucide-${props.icon}` : undefined
)

const emit = defineEmits(["update:modelValue", "primary", "secondary"])
const show = ref(false)
</script>