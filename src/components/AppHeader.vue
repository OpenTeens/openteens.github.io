<template>
  <div class="w-full h-12 bg-sky-50 sticky top-0 left-0">
    <div class="relative flex flex-row p-3 justify-center items-center w-full">
      <div class="flex flex-grow-[5]">www</div>
      <div class="flex flex-grow-[2] select-none justify-center gap-8">
        <div class="flex items-center">
          <span class="hover:text-sky-300 cursor-pointer">
            <RouterLink to="/">HOME</RouterLink>
          </span>
        </div>
        <div class="flex items-center">
          <span class="hover:text-sky-300 cursor-pointer">
            <RouterLink to="/blog">BLOG</RouterLink>
          </span>
        </div>
        <div class="flex items-center">
          <span class="hover:text-sky-300 cursor-pointer">
            <RouterLink to="/projects">PROJECTS</RouterLink>
          </span>
        </div>
        <div class="flex items-center">
          <span class="hover:text-sky-300 cursor-pointer">
            <RouterLink to="/members">MEMBERS</RouterLink>
          </span>
        </div>
        <div class="flex items-center">
          <span class="hover:text-sky-300 cursor-pointer">
            <RouterLink to="/contact">CONTACT</RouterLink>
          </span>
        </div>
        <div class="flex items-center">
          <i-mdi-github class="hover:text-sky-300 cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
