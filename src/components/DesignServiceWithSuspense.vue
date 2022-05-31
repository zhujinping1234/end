<template>
    <Suspense>
        <template #default>
            <design-service />
        </template>
        
        <!-- loading state via #fallback slot -->
    <template #fallback>
        Loading...
    </template>
    </Suspense>
</template>
<script setup lang="ts">
import DesignService from './DesignService.vue';
</script>
