<template>
  <UDashboardGroup>
    <UDashboardSidebar>
        <UDashboardSearch
            v-model:open:search-term="searchTerm"
            :groups="groups"
            :fuse="{ resultLimit: 42 }"
        />
    </UDashboardSidebar>

    <UDashboardSearch />

    <slot />
  </UDashboardGroup>
</template>


