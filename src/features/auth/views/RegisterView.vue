<template>
    <form class="auth-form" @submit.prevent="onSubmit" novalidate>
        <h2 class="auth-form__title">Crear Cuenta</h2>

        <!-- Email Input -->
        <input class="auth-form__input" v-model="email" type="email" placeholder="Email" required />
        <!-- Password Input -->
        <input class="auth-form__input" v-model="password" type="password" placeholder="Contraseña" required
            minlength="6" />

        <!-- Error message -->
        <div v-if="errorMessage" class="auth-form__error">
            {{ errorMessage }}
        </div>

        <button class="auth-form__button" type="submit">Registrarme</button>

        <div class="auth-form__divider">o</div>

        <button type="button" @click="onGoogleLogin" class="auth-form__google-button">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
            Continuar con Google
        </button>

        <p class="auth-form__switch">
            ¿Ya tenés cuenta?
            <button class="auth-form__link-button" type="button" @click="$emit('switch')">
                Iniciar Sesión
            </button>
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
const errorMessage = ref<string | null>(null); // Variable para almacenar el mensaje de error

// Manejo del registro de usuario
async function onSubmit() {
    errorMessage.value = null; // Resetear cualquier mensaje de error antes de intentar el registro
    try {
        await auth.register(email.value, password.value);
        emit('success'); // Emitir evento de éxito si el registro es exitoso
    } catch (error) {
        // Manejo de error en caso de fallo
        errorMessage.value = 'Hubo un problema al crear tu cuenta. Intenta nuevamente.';
    }
}

// Manejo del login con Google
async function onGoogleLogin() {
    errorMessage.value = null; // Resetear el mensaje de error antes de intentar el login con Google
    try {
        await auth.loginWithGoogle();
        emit('success');
    } catch (error) {
        errorMessage.value = 'Hubo un problema al iniciar sesión con Google. Intenta nuevamente.';
    }
}
</script>

<style src="../styles/AuthForm.scss" scoped />