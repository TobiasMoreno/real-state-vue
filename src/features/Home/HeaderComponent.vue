<template>
  <header class="header" id="home">
    <div class="header__container">
      <div class="header__logo">
        <button class="header__menu-btn" @click.stop="toggleMenu">
          <i class="fas fa-bars"></i>
        </button>
        <h1 class="header__title">LOGO</h1>
      </div>

      <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }" @click.stop>
        <a class="header__nav-link" href="#home" @click.prevent="navigateTo('home')">Inicio</a>
        <a class="header__nav-link" href="#about" @click.prevent="navigateTo('about')">Nosotros</a>
        <a class="header__nav-link" href="#properties" @click.prevent="navigateTo('properties')">Propiedades</a>
        <a v-if="isLogedIn" class="header__nav-link" href="/dashboard/panel">Dashboard</a>
      </nav>

      <button class="header__login-btn" @click="isLogedIn ? logout() : openLoginModal()">
        {{ isLogedIn ? "Salir" : "Iniciar sesión" }}
      </button>
    </div>
  </header>

  <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>

  <div v-if="isLoginModalOpen" class="modal-overlay" @click.self="closeLoginModal">
    <LoginView
      v-if="!isRegistering"
      @switch="switchToRegister"
      @success="handleLoginSuccess"
    />
    <RegisterView
      v-else
      @switch="switchToLogin"
      @success="handleLoginSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import LoginView from "@/features/auth/views/LoginView.vue";
import RegisterView from "@/features/auth/views/RegisterView.vue";

const isMenuOpen = ref(false);
const isLoginModalOpen = ref(false);
const isRegistering = ref(false);
const isLogedIn = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const openLoginModal = () => {
  isLoginModalOpen.value = true;
  isRegistering.value = false;
};

const closeLoginModal = () => {
  isLoginModalOpen.value = false;
};

const switchToRegister = () => {
  isRegistering.value = true;
};

const switchToLogin = () => {
  isRegistering.value = false;
};

const logout = () => {
  localStorage.removeItem("userLogedIn");
  isLogedIn.value = false;
};

const handleLoginSuccess = () => {
  localStorage.setItem("userLogedIn", "true");
  isLogedIn.value = true;
  closeLoginModal();
};

const navigateTo = (anchor: string) => {
  closeMenu();
  const el = document.getElementById(anchor);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(() => {
  isLogedIn.value = !!localStorage.getItem("userLogedIn");

  watch([isMenuOpen, isLoginModalOpen], ([menuOpen, modalOpen]) => {
    document.body.style.overflow = menuOpen || modalOpen ? "hidden" : "";
  });
});
</script>

<style scoped src="./Header.scss"></style>
