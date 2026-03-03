<template>
  <div v-for="emp in employees" :key="emp.id">
    {{ emp.full_name }}
  </div>
  <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const search = ref('');
const employees = ref<{ id: number; full_name: string }[]>([]);
const errorMessage = ref('');

let abortController: AbortController | null = null;
let debounceTimer: ReturnType<typeof setTimeout>;

watch(search, (val: string) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => fetchEmployees(val), 400);
});

async function fetchEmployees(query: string) {
  abortController?.abort();
  abortController = new AbortController();
  errorMessage.value = '';
  try {
    const res = await fetch(`/api/employees?search=${query}`, {
      signal: abortController.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();  // ✅ was res.data
    employees.value = json.data;
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') return;
    errorMessage.value = 'Failed to load employees.';
  }
}
</script>
