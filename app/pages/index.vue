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
        class="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[300px] font-bold text-white opacity-100"
      >
        13
      </p>

      <!-- Tulisan ArsipKu -->
      <h1
        :class="textClass"
        class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-[220px] text-[170px] font-bold text-[#457FB6] opacity-0 transition-all duration-1000"
      >
        Arsipku
      </h1>

      <!-- Tulisan pojok kanan -->
      <h2
        :class="airnavClass"
        class="absolute top-5 right-5 text-xl font-bold opacity-0 text-[#457FB6] transition-opacity duration-1000"
      >
        Airnav Indonesia
      </h2>

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
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-0 transition-opacity duration-1000 animate-fadeIn"
      >
        <p class="text-xl font-semibold text-[#457FB6] mb-10">
          Your Central Hub for Managing Internal Documents at AirNav Indonesia
        </p>
        <Ubutton
          class="px-8 py-4 bg-[#457FB6] text-white font-bold rounded-lg hover:bg-[#35629B] transition-colors"
        >
          Login
        </Ubutton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const logoClass = ref("opacity-0");
const logoStyle = ref({
  top: "10%",
  left: "50%",
  transform: "translate(-50%, 0)",
  width: "600px",
  height: "auto",
});

const textClass = ref("");
const airnavClass = ref("");

const showPlane = ref(false);
const planeFast = ref(false);
const showText = ref(false);

onMounted(() => {
  setTimeout(() => {
    logoClass.value = "opacity-100";
  }, 1000);

  // 4 detik: logo pindah kiri & kecil, ArsipKu muncul, Airnav Indonesia muncul
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
  }, 4000);

  // 3 detik kemudian muncul pesawat dari bawah
  setTimeout(() => {
    showPlane.value = true;
    logoClass.value = "opacity-100";
    // 2 detik lagi pesawat sampai tengah, lalu percepat ke atas
    setTimeout(() => {
      planeFast.value = true;
      // 2 detik setelah pesawat ke atas, munculkan tulisan dan button
      setTimeout(() => {
        showText.value = true;
      }, 4000);
    }, 2000);
  }, 7000);
});
</script>

<style scoped>
.bg-base {
  background: #fafafaa3;
}

.bg-leftGlow {
  background: radial-gradient(
    circle,
    rgba(0, 120, 255, 0.3) 80%,
    rgba(0, 120, 255, 0) 30%
  );
  filter: blur(90px);
  animation: moveGlow 40s linear infinite;
}

.bg-middleGlow {
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.5) 80%,
    rgba(255, 255, 255, 0) 90%
  );
  filter: blur(30px);
  border-left: 10px solid #a2bfdb;
  border-right: 10px solid #a2bfdb;
}

.bg-rightGlow {
  background: radial-gradient(
    circle,
    rgba(0, 120, 255, 0.3) 80%,
    rgba(0, 120, 255, 0) 90%
  );
  filter: blur(60px);
  animation: moveGlow 40s linear infinite;
}
@keyframes moveGlow {
  0% {
    transform: translateX(-20%);
  }
  50% {
    transform: translateX(90%);
  }
  100% {
    transform: translateX(-90%);
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
