<template>
  <header class="header" id="home">
    <div class="header__container">
      <div class="header__logo">
        <button class="header__menu-btn" @click.stop="toggleMenu">
          <i class="fas fa-bars"></i>
        </button>
        <img src="https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747320410/logo-dark_aoaq01.png" alt="logo"
          class="header__logo-img">
      </div>

      <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }" @click.stop>
        <a class="header__nav-link" href="#home" @click.prevent="navigateTo('home')">Inicio</a>
        <a class="header__nav-link" href="#about" @click.prevent="navigateTo('about')">Nosotros</a>
        <a class="header__nav-link" href="#properties" @click.prevent="navigateTo('properties')">Propiedades</a>
        <a v-if="isLogedIn" class="header__nav-link" href="/dashboard">Dashboard</a>
      </nav>

      <button class="header__login-btn" @click="isLogedIn ? logout() : openLoginModal()">
        {{ isLogedIn ? "Salir" : "Iniciar sesión" }}
      </button>
    </div>
  </header>

  <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>

  <div v-if="isLoginModalOpen" class="modal-overlay" @click.self="closeLoginModal">
    <LoginView v-if="!isRegistering" @switch="switchToRegister" @success="handleLoginSuccess" />
    <RegisterView v-else @switch="switchToLogin" @success="handleLoginSuccess" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import LoginView from "@/features/auth/views/LoginView.vue";
import RegisterView from "@/features/auth/views/RegisterView.vue";
import { useAuthStore } from "@/features/auth/store/authStore";

const authStore = useAuthStore();
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
  authStore.logout();
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

<style lang="scss">
.header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding-top: 58px;
    width: 100%;
  
    &__container {
      max-width: 1500px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      width: 100%;
    }
    &__title {
      font-size: 24px;
      font-weight: 600;
      white-space: nowrap;
    }
    &__menu-btn {
      display: none;
      background: none;
      border: none;
      color: var(--color-white);
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
    }
    &__nav {
      display: flex;
      gap: 16px;
      margin-left: auto;
      margin-right: 32px;
    }
    &__nav-link {
      text-decoration: none;
      transition: color 0.3s ease;
      padding: 8px 16px;
      font-size: 14px;
      white-space: nowrap;
      color: var(--color-white);
      cursor: pointer;
  
      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
    &__login-btn {
      background: none;
      border: 1.5px solid var(--color-white);
      border-radius: var(--border-radius-lg);
      transition: all 0.3s ease;
      cursor: pointer;
      padding: 10px 30px;
      color: var(--color-white);
      font-size: 14px;
      white-space: nowrap;
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
    &__logo-img{
      width: 80px;
      height: 80px;
    }
  }
  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .header {
      padding-top: 40px;
  
      &__logo {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &__title {
        margin: 4px 0;
        font-size: 20px;
      }
  
      &__menu-btn {
        display: block;
      }
  
      &__nav {
        position: fixed;
        top: 0;
        right: -100%;
        width: 250px;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
        transition: right 0.3s ease;
        padding: 80px 0;
        z-index: 1000;
  
        &--open {
          right: 0;
        }
      }
  
      &__nav-link {
        font-size: 16px;
        padding: 12px 24px;
      }
  
      &__login-btn {
        padding: 8px 20px;
        font-size: 13px;
        margin-left: auto;
      }
      &__logo-img{
        display: none;
      }
    }
  }
  
  @media (max-width: 480px) {
    .header {
      padding-top: 32px;
  
      &__container {
        padding: 0 8px;
      }
  
      &__title {
        font-size: 18px;
      }
  
      &__nav {
        width: 100%;
      }
  
      &__login-btn {
        padding: 6px 16px;
        font-size: 12px;
      }
      &__logo-img{
        display: none;
      }
    }
  }
</style>
