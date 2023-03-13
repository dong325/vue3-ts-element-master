<template></template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
router.replace(router.currentRoute.value.query.fullPath as string);
</script>
