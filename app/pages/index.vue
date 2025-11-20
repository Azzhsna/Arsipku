<template>
  <div class="relative w-full h-screen overflow-hidden bg-base">
    <!-- Glow kiri -->
    <div class="absolute top-0 left-0 w-1/3 h-full bg-leftGlow"></div>

    <!-- Glow tengah -->
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-full bg-middleGlow"
    ></div>

    <!-- Glow kanan -->
    <div class="absolute top-0 right-0 w-1/3 h-full bg-rightGlow"></div>

    <!-- Konten -->
    <div class="relative z-10 w-full h-full">
      <!-- Logo -->
      <img
        src="/logoAirnav.png"
        :class="logoClass"
        :style="logoStyle"
        class="absolute transition-all duration-1000"
      />

      <!-- Angka 13 tetap -->
      <p
        class="absolute top-150 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[350px] font-bold text-[#e3f1ff] opacity-100"
      >
        13
      </p>

      <!-- Tulisan ArsipKu -->
      <h1
        :class="textClass"
        class="absolute top-70 left-1/2 transform -translate-x-1/2 -translate-y-[220px] text-[170px] font-bold opacity-0 transition-all duration-1000 bg-clip-text text-transparent"
        style="background-image: linear-gradient(to right, #457fb6, #f5faff)"
      >
        {{$t('Arsipku')}}
      </h1>

      <!-- Tulisan pojok kanan -->
<div
  :class="airnavClass"
  class="absolute top-5 right-5 flex flex-col items-end opacity-0 transition-opacity duration-1000"
>
  <h2 class="text-xl font-bold text-[#457FB6]">
    Airnav Indonesia
  </h2>

  <div class="flex gap-2 mt-2">
    <button
      v-for="locale in locales"
      :key="locale.code"
      @click="setLocale(locale.code)"
      class="px-3 py-1 text-sm font-semibold bg-white/70 hover:bg-white text-[#457FB6] rounded-md"
    >
      {{ locale.name }}
    </button>
  </div>
</div>

      <!-- Pesawat muncul -->
      <img
        v-if="showPlane"
        src="/Pesawat.png"
        class="absolute left-1/2 transform -translate-x-1/2 plane"
        :class="{ 'plane-fast': planeFast }"
      />

      <!-- Tulisan dan tombol muncul setelah pesawat -->
      <div
        v-if="showText"
        class="absolute top-93 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-0 transition-opacity duration-1000 animate-fadeIn"
      >
        <p class="text-xl font-medium text-[#676767] mb-5">
          {{$t('title')}}
        </p>
        <UButton
          class="px-15 py-3 bg-[#457FB6] text-[20px] text-white font-medium rounded-lg hover:bg-[#35629B] transition-colors"
          :label="$t('Masuk')"
          trailing-icon="i-heroicons-arrow-right"
        />
      </div>
      <!-- Onboarding -->
      <div
        class="relative inline-block group top-120 left-15"
        v-if="showOnboarding"
        :class="OnboardingClass"
        :style="OnboardingStyle"
      >
        <!-- Gambar onboarding -->
        <img
          src="/onboarding.png"
          class="w-[370px] rounded-2xl transition-all duration-400 group-hover:scale-115"
        />

        <!-- Overlay gelap -->
        <div
          class="absolute inset-0 bg-black/30 rounded-2xl pointer-events-none transition-all duration-400 group-hover:scale-115 group-hover:bg-black/40"
        ></div>

        <!-- Ikon message di dalam gambar -->
        <img
          src="/message.png"
          class="absolute top-4 left-4 w-[55px] transition-all duration-100 group-hover:scale-115"
        />

        <!-- Teks di dalam gambar -->
        <div
          class="absolute top-22 left-5 right-4 text-white text-base font-semibold drop-shadow-lg transition-all duration-700 group-hover:scale-110"
        >
          {{ $t('card-teks') }}
        </div>
      </div>
      <div
        class="relative inline-block group top-110 left-210"
        v-if="showOnboarding"
        :class="OnboardingClass"
        :style="OnboardingStyle"
      >
        <!-- gambar icon pesawat -->
        <img src="/plane.png" class="w-[70px]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const { locales, setLocale } = useI18n()

const logoClass = ref("opacity-0");
const logoStyle = ref({
  top: "10%",
  left: "50%",
  transform: "translate(-50%, 0)",
  width: "700px",
  height: "auto",
});

const textClass = ref("");
const airnavClass = ref("");

const showPlane = ref(false);
const planeFast = ref(false);
const showText = ref(false);
const showOnboarding = ref(false);

onMounted(() => {
  setTimeout(() => {
    logoClass.value = "opacity-100";
  }, 500);

  // 3 detik: logo pindah kiri & kecil, ArsipKu muncul, Airnav Indonesia muncul
  setTimeout(() => {
    logoStyle.value = {
      top: "1.25rem",
      left: "1rem",
      width: "200px",
      height: "auto",
      transform: "none",
    };
    textClass.value = "opacity-100";
    airnavClass.value = "opacity-100";
    OnboardingClass.value = "opacity-100";
  }, 3000);

  // 5 detik kemudian muncul pesawat dari bawah
  setTimeout(() => {
    showPlane.value = true;
    logoClass.value = "opacity-100";
    // 2 detik lagi pesawat sampai tengah, lalu percepat ke atas
    setTimeout(() => {
      planeFast.value = true;
      // 1 detik setelah pesawat ke atas, munculkan tulisan dan button
      setTimeout(() => {
        showText.value = true;
        showOnboarding.value = true;
      }, 2000);
    }, 1000);
  }, 5000);
});
</script>

<style scoped>
.bg-base {
  background: #dfeefc;
}

.bg-leftGlow {
  background: radial-gradient(
    circle,
    rgba(0, 120, 255, 0.3) 40%,
    rgba(0, 120, 255, 0) 60%
  );
  filter: blur(50px);
  animation: moveGlow 15s linear infinite;
}

.bg-middleGlow {
  background: radial-gradient(circle, #e7f2ff4d 10%, rgba(0, 120, 255, 0) 20%);
  filter: blur(10px);
  border-left: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
}

.bg-rightGlow {
  background: radial-gradient(
    circle,
    rgba(0, 120, 255, 0.3) 40%,
    rgba(0, 120, 255, 0) 90%
  );
  filter: blur(50px);
  animation: moveGlow 15s linear infinite;
}
/* Glow bulat bergerak */
.bg-leftGlow::before,
.bg-middleGlow::before,
.bg-rightGlow::before {
  content: "";
  position: absolute;
  width: 350px;
  height: 350px;
  background: radial-gradient(
    circle,
    rgba(250, 250, 250, 0.8) 0%,
    rgba(250, 250, 250, 0) 70%
  );
  border-radius: 50%;
  filter: blur(80px);
  animation: moveGlow 5s ease-in-out infinite alternate;
  pointer-events: none;
}

/* Animasi glow bergerak */
@keyframes moveGlow {
  0% {
    transform: translate(-30%, -80%);
  }
  25% {
    transform: translate(20%, -10%);
  }
  50% {
    transform: translate(70%, 30%);
  }
  75% {
    transform: translate(-20%, 60%);
  }
  100% {
    transform: translate(-30%, -20%);
  }
}

/* Animasi pesawat */
.plane {
  bottom: -500px;
  width: 700px;
  transition: all 2s ease-in-out;
}
.plane-fast {
  bottom: 100%;
  transition: all 2s ease-in;
}

/* Fade in untuk teks dan tombol */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 1s forwards;
}
</style>