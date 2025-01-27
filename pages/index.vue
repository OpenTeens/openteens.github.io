<script setup lang="ts">
import {useUserStore} from "~/stores/user";
const store = useUserStore()
</script>

<template>
  <div>
    <h1>欢迎来到社区</h1>
    <button>示例按钮</button>
    <a> {{store.username}} </a>
  </div>
</template>

<style scoped>

</style>