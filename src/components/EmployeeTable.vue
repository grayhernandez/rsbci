<template>
  <div class="employee-table">
    <input v-model="searchInput" placeholder="Search employees..." class="search-input" />
    
    <div v-if="loading" class="skeleton-container">
      <div v-for="n in 5" :key="n" class="skeleton-row" ></div>
    </div>

    <table v-else>
      <thead>
        <tr><th>Name</th><th>Email</th><th>Department</th></tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <td>{{ emp.full_name }}</td>
          <td>{{ emp.email }}</td>
          <td>{{ emp.department }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination" v-if="pagination">
      <button :disabled="pagination.current_page <= 1" @click="emit('changePage', pagination.current_page - 1)">Prev</button>
      <span>{{ pagination.current_page }} / {{ pagination.last_page }}</span>
      <button :disabled="pagination.current_page >= pagination.last_page" @click="emit('changePage', pagination.current_page + 1)">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ employees: any[]; loading: boolean; pagination: any }>();
const emit = defineEmits(['changePage', 'search']);
const searchInput = ref('');
let debounceTimer: any;

watch(searchInput, (val) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => emit('search', val), 400);
});
</script>