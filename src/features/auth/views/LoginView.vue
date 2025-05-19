<template>
    <form @submit.prevent="onSubmit" class="auth-form" novalidate>
        <h2 class="auth-form__title">Iniciar Sesión</h2>

        <input v-model="email" type="email" placeholder="Email" required class="auth-form__input" />
        <input v-model="password" type="password" placeholder="Contraseña" required minlength="6"
            class="auth-form__input" />

        <p v-if="errorMessage" class="auth-form__error">{{ errorMessage }}</p>
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
const errorMessage = ref('');

async function onSubmit() {
    errorMessage.value = '';

    if (!email.value || !password.value) {
        errorMessage.value = 'Completá todos los campos.';
        return;
    }
    if (!isValidEmail(email.value)) {
        errorMessage.value = 'Ingresá un email válido.';
        return;
    }

    if (password.value.length < 6) {
        errorMessage.value = 'La contraseña debe tener al menos 6 caracteres.';
        return;
    }

    try {
        await auth.login(email.value, password.value);
        emit('success');
    } catch (error: any) {
        errorMessage.value = error.message || 'Error al iniciar sesión.';
    }
}
async function onGoogleLogin() {
    errorMessage.value = '';
    try {
        await auth.loginWithGoogle();
        emit('success');
    } catch (error: any) {
        errorMessage.value = error.message || 'Error con Google.';
    }
}

function isValidEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

</script>

<style src="../styles/auth-form.scss" scoped />
