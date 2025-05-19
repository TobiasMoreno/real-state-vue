<template>
    <div class="info-card">
      <div class="info-card__text">
        <h5 class="info-card__title">{{ title }}</h5>
        <span class="info-card__value">
          {{ isNumber ? formattedValue : props.value }}
        </span>
      </div>
      <div class="info-card__action">
        <img class="info-card__action-icon" :src="actionIcon" :alt="actionAlt" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, computed } from 'vue'
  
  interface Props {
    title: string
    value: number | string
    actionIcon: string
    actionAlt: string
  }
  
  const props = defineProps<Props>()
  
  const isNumber = computed(() => typeof props.value === 'number')
  
  const animatedValue = ref(0)
  
  const formattedValue = computed(() =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(animatedValue.value)
  )
  
  function easeOutQuad(t: number): number {
    return t * (2 - t)
  }
  
  function animateValue(start: number, end: number, duration: number) {
    const startTime = performance.now()
  
    function step(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuad(progress)
      animatedValue.value = Math.round(start + (end - start) * eased)
  
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        animatedValue.value = end
      }
    }
  
    requestAnimationFrame(step)
  }
  
  onMounted(() => {
    if (isNumber.value) {
      animateValue(0, Number(props.value), 3000)
    }
  })
  </script>
  
  <style scoped lang="scss">
  @use './card.scss';
  </style>
  