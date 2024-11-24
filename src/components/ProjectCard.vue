<script setup lang="ts">
interface Project {
  name: string;
  description: string;
  owner: string;
  githubLink: string;
  logoUrl?: string;
  additionHtml?: string;
}

const props = defineProps<Project>();
</script>

<template>
  <div class="border rounded-lg p-5 h-full w-full fade-in">
    <div class="flex flex-row h-full w-full">
      <div class="flex flex-grow-[1] flex-col">
        <img :src="props.logoUrl" class="w-12 h-12" v-if="props.logoUrl" />
        <div class="flex flex-col">
          <div class="flex flex-grow-[3]">
            <div class="text-[20px]">{{ props.name }}</div>
          </div>
          <a
            class="text-sky-300 hover:text-sky-500"
            :href="props.githubLink"
            target="_blank"
            >{{ props.githubLink }}</a
          >
          <div class="text-[15px] mt-5">{{ props.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
