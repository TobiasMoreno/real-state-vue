// src/composables/useSidebarService.ts
import { reactive, computed } from "vue";

const state = reactive({ open: false });

export function useSidebarService() {
  const open = computed(() => state.open);

  function toggle() {
    state.open = !state.open;
  }
  function close() {
    state.open = false;
  }

  return { open, toggle, close };
}
