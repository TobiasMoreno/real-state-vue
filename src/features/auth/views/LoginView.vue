<template>
    <form @submit.prevent="onSubmit" class="auth-form" novalidate>
        <h2 class="auth-form__title">Iniciar Sesión</h2>

        <input v-model="email" type="email" placeholder="Email" required class="auth-form__input" />
        <input v-model="password" type="password" placeholder="Contraseña" required minlength="6"
            class="auth-form__input" />

        <button type="submit" class="auth-form__button">Entrar</button>

        <div class="auth-form__divider">o</div>

        <button type="button" @click="onGoogleLogin" class="auth-form__google-button">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
            Continuar con Google
        </button>

        <p class="auth-form__switch">
            ¿No tenés cuenta?
            <button type="button" @click="$emit('switch')" class="auth-form__link-button">Registrate</button>
        </p>
    </form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'switch'): void;
    (e: 'success'): void;
}>();

import { ref } from 'vue';
import { useAuthStore } from '@/features/auth/store/authStore';

const auth = useAuthStore();
const email = ref('');
const password = ref('');

async function onSubmit() {
    await auth.login(email.value, password.value);
    emit('success');
}

async function onGoogleLogin() {
    await auth.loginWithGoogle();
    emit('success');
}
</script>

<style src="../styles/AuthForm.scss" scoped />
