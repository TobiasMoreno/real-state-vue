<template>
  <div class="select-filter">
    <select :id="label" class="select-filter__select" v-model="selected" @change="emitChange">
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
    <i class="fas fa-chevron-down"></i>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true },
  selectedOption: { type: String, required: true }
})

const emit = defineEmits(['selectionChange'])

const selected = ref(props.selectedOption)

watch(() => props.selectedOption, (newVal) => {
  selected.value = newVal
})

const emitChange = () => {
  emit("selectionChange", selected.value);
};

const placeholder = `${props.label}`;
</script>

<style scoped src="./Select.scss"></style>
