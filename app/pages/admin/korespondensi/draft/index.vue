<template>
  <div class="space-y-6">
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
    >
      <!-- Left Section - Title & Breadcrumb -->
      <div class="w-full">
        <PageHeader title="Dashboard" :items="items" />
      </div>

      <div class="w-full mt-4">
        <PageHeader title="Draft" :items="items" />
      </div>

      <!-- <PageHeader title="Dashboard" :items="items" />
      <PageHeader title="Draft" :items="items" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Components",
    to: "/docs/components",
  },
  {
    label: "Breadcrumb",
    to: "/docs/components/breadcrumb",
  },
  {
    label: "Dashboard",
    to: "/admin/dashboard",
  },
  {
    label: "Draft",
    to: "/admin/korespondensi/draft",
  },
] satisfies BreadcrumbItem[];
</script>
