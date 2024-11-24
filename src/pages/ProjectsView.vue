<script setup lang="ts">
import ProjectCard from "../components/ProjectCard.vue";
import AppHeader from "../components/AppHeader.vue";
</script>

<template>
  <div class="flex w-full flex-col font-mono">
    <AppHeader />
    <div
      class="flex flex-col w-full bg-white justify-center items-center mt-16"
    >
      <div class="flex flex-col px-48 justify-center items-center">
        <div class="text-[30px]">Projects</div>
        <div class="text-[15px]">
          There are some projects that we are working on.
        </div>
      </div>
      <div class="flex mt-16 px-48">
        <ProjectCard
          name="GestureX"
          description="gestureX is a python project that use your gesture to control everything. The current functions that can be hand-controlled include virtual mouse, keyboard, drawboard and stable-diffusion (which will convert the image drawn with stable diffusion based on your script) plugins."
          owner="OpenTeens"
          githubLink="https://github.com/OpenTeens/gestureX"
          class="h-30 px-48"
        />
      </div>
    </div>
  </div>
</template>
