<template>
    <form class="auth-form" @submit.prevent="onSubmit" novalidate>
        <h2 class="auth-form__title">Crear Cuenta</h2>

        <input class="auth-form__input" v-model="email" type="email" placeholder="Email" required />
        <input class="auth-form__input" v-model="password" type="password" placeholder="Contraseña" required
            minlength="6" />

        <p v-if="errorMessage" class="auth-form__error">{{ errorMessage }}</p>

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
const errorMessage = ref<string | null>(null);

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
        await auth.register(email.value, password.value);
        emit('success');
    } catch (error: any) {
        errorMessage.value = error.message || 'Hubo un problema al crear tu cuenta. Intenta nuevamente.';
    }
}

async function onGoogleLogin() {
    errorMessage.value = null;
    try {
        await auth.loginWithGoogle();
        emit('success');
    } catch (error) {
        errorMessage.value = 'Hubo un problema al iniciar sesión con Google. Intenta nuevamente.';
    }
}

function isValidEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

</script>

<style src="../styles/auth-form.scss" scoped />