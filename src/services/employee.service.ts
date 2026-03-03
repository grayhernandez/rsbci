// services/employee.service.ts
import http from '@/lib/http';
import type { EmployeeListResponse } from '../types/employee.types';

export function fetchEmployees(params: {
  search: string;
  page: number;
  per_page: number;
}): Promise<EmployeeListResponse> {
  return http.get('/api/employees', { params }).then((r) => r.data);
}