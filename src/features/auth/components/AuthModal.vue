<template>
    <Teleport to="body">
        <div v-if="visible" class="auth-modal-overlay" @click.self="close">
            <div class="auth-modal">
                <button class="close-btn" @click="close">×</button>

                <component :is="mode === 'login' ? LoginView : RegisterView" @switch="toggleMode"
                    @success="onSuccess" />
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { Teleport, ref, computed } from 'vue';
import LoginView from '@/features/auth/views/LoginView.vue';
import RegisterView from '@/features/auth/views/RegisterView.vue'
const props = defineProps({
    modelValue: { type: Boolean, default: false }
});
const emit = defineEmits<{
    (e: 'update:modelValue', v: boolean): void;
    (e: 'logged-in'): void;
}>();

const visible = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v),
});

const mode = ref<'login' | 'register'>('login');

function close() {
    visible.value = false;
    mode.value = 'login';
}

function toggleMode() {
    mode.value = mode.value === 'login' ? 'register' : 'login';
}

function onSuccess() {
    emit('logged-in');
    close();
}
</script>

<style scoped>
.auth-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.auth-modal {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    width: 90%;
    max-width: 400px;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>