import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Employee, Pagination } from '../stores/employee.types';
import { fetchEmployees } from '../services/employee.service';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 500;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useEmployeeStore = defineStore('employee', () => {
  const data = ref<Employee[]>([]);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function getEmployees(search = '', page = 1): Promise<void> {
    loading.value = true;
    error.value = null;

    let attempt = 0;

    while (attempt < MAX_RETRIES) {
      try {
        const result = await fetchEmployees({ search, page, per_page: 10 });
        data.value = result.data;
        pagination.value = result.pagination;
        return;
      } catch (err) {
        attempt++;
        if (attempt >= MAX_RETRIES) {
          error.value = 'Failed to load employees. Please try again.';
          return;
        }
        await delay(RETRY_DELAY_MS * attempt);
      }
    }
  }

  return { data, pagination, loading, error, getEmployees };
});


