<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  const sections = document.querySelectorAll(".slide-section");
  sections.forEach((section) => observer.observe(section));
});
</script>

<template>
  <div class="flex w-full flex-col font-mono">
    <div class="flex flex-col w-full h-screen bg-sky-50">
      <AppHeader />
      <div class="flex flex-row h-full">
        <div
          class="flex flex-grow-[1] flex-col w-full h-full justify-center items-center"
        >
          <div class="text-[100px]">OpenTeens</div>
          <div class="text-[20px]">Empower Teenagers Through Open Source.</div>
        </div>
        <div
          class="flex flex-grow-[1] w-full h-full justify-center items-center"
        ></div>
      </div>
    </div>
    <div class="flex w-full bg-white justify-center items-center mt-16">
      <div class="flex flex-col px-48 justify-center items-center">
        <div class="text-[30px]">About Us</div>
        <div class="mt-10">
          <section class="slide-section slide-left mb-8 border rounded-lg p-5">
            <h2 class="text-3xl font-semibold text-blue-300 mb-4">
              What is OpenTeens?
            </h2>
            <p class="text-lg leading-relaxed">
              OpenTeens is an open-source community tailored for teenagers,
              offering a platform to share creativity, technology, and
              knowledge. Through collaboration and learning, we inspire young
              minds to explore and grow. Join us and unleash your potential!
            </p>
          </section>

          <section class="slide-section slide-right mb-8 border rounded-lg p-5">
            <h2 class="text-3xl font-semibold text-blue-300 mb-4">
              What We Offer
            </h2>
            <ul class="list-disc list-inside space-y-3 text-lg">
              <li>
                <strong>Projects:</strong> Contribute to exciting open-source
                projects, from coding to design, documentation, and
                testing—there's something for everyone.
              </li>
              <li>
                <strong>Learning:</strong> Access educational resources,
                tutorials, and workshops to enhance your skills and broaden your
                knowledge.
              </li>
              <li>
                <strong>Community:</strong> Connect with like-minded teenagers
                worldwide in a friendly and inclusive environment.
              </li>
              <li>
                <strong>Mentorship:</strong> Receive guidance from experienced
                professionals in the tech industry and learn from their
                insights.
              </li>
              <li>
                <strong>Events:</strong> Participate in monthly Teens Camp
                activities where we create projects and learn together.
              </li>
            </ul>
          </section>

          <section class="slide-section slide-left mb-8 border rounded-lg p-5">
            <h2 class="text-3xl font-semibold text-blue-300 mb-4">
              Why Open Source?
            </h2>
            <p class="text-lg leading-relaxed">
              Open source is not just about code—it's about collaboration,
              creativity, and contributing to a larger purpose. By joining
              OpenTeens, you'll not only enhance your skills but also make a
              positive impact on the world around you.
            </p>
          </section>

          <section class="slide-section slide-right mb-8 border rounded-lg p-5">
            <h2 class="text-3xl font-semibold text-blue-300 mb-4">Join Us</h2>
            <p class="text-lg leading-relaxed">
              Ready to embark on this exciting journey of exploration and
              innovation? Join OpenTeens today and become a part of a community
              that's redefining how teenagers interact with technology.
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-section {
  opacity: 0;
  transition: all 1s ease;
}

.slide-left {
  transform: translateX(-100px);
}

.slide-right {
  transform: translateX(100px);
}

.slide-section.show {
  opacity: 1;
  transform: translateX(0);
}
</style>
