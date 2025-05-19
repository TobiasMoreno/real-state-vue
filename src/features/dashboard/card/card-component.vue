<template>
    <div class="info-card">
        <div class="info-card__text">
            <h5 class="info-card__title">{{ title }}</h5>
            <span class="info-card__value">
                <template v-if="isNumber">
                    {{ formattedValue }}
                </template>
                <template v-else>
                    {{ displayValue }}
                </template>
            </span>
        </div>
        <div class="info-card__action">
            <img class="info-card__action-icon" :src="actionIcon" :alt="actionAlt" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

/** Props */
interface Props {
    title: string
    value: number | string
    actionIcon: string
    actionAlt: string
}

const props = defineProps<Props>()

/** Estado interno */
const displayValue = ref<number | string>(0)
const isNumber = computed(() => {
    // consideramos numérico si al parsear no es NaN
    return typeof props.value === 'number'
        ? true
        : !isNaN(Number(props.value))
})

/** Función para formatear como USD */
const formattedValue = computed(() => {
    if (!isNumber.value) return String(displayValue.value)
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(Number(displayValue.value))
})

function easeOutQuad(t: number): number {
    return t * (2 - t)
}

/** Animación del valor */
function animateValue(start: number, end: number, duration: number) {
    const startTime = performance.now()

    function step(now: number) {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeOutQuad(progress)
        displayValue.value = Math.round(start + (end - start) * eased)

        if (progress < 1) {
            requestAnimationFrame(step)
        } else {
            displayValue.value = end
        }
    }

    requestAnimationFrame(step)
}

onMounted(() => {
    if (isNumber.value) {
        const raw = typeof props.value === 'number' ? props.value : Number(props.value)
        animateValue(0, raw, 3000)
    } else {
        displayValue.value = props.value
    }
})
</script>

<style scoped lang="scss">
@use './card.scss';
</style>
