<template>
  <div>
    <div id="star-container"/>
    <NuxtPage />
    <NuxtRouteAnnouncer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  createStars();
});

function createStars() {
  const screenW = Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight);
  const screenH = screenW;
  for (let i = 0; i < 200; i++) {
    const span = document.createElement('span');
    span.classList.add("star-img");
    document.getElementById('star-container').appendChild(span);
    const x = parseInt(Math.random() * screenW);
    const y = parseInt(Math.random() * screenH);
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    const scale = Math.random();
    span.style.transform = `scale(${scale}, ${scale})`;
    const rate = Math.random() * 3;
    span.style.animationDelay = `${rate}s`;
  }
}
</script>

<style>
body {
  background-color: black;
  margin: 0;
}

#star-container {
  position: fixed;  /* 使用 fixed 而不是 relative */
  width: 100%;
  height: 100vh;
  animation: rotate-sky 300s infinite linear;
  overflow: hidden;
  z-index: -1;  /* 将 z-index 设置为 -1 */
  pointer-events: none;  /* 确保不会阻挡交互 */
}

span.star-img {
  position: absolute;
  width: 20px;
  height: 20px;
  z-index: 0;
  background: url("@/assets/img/star.png") no-repeat center center;
  background-size: contain;
  animation: flash 3s infinite;
}

@keyframes rotate-sky {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes flash {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
