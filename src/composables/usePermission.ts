import { ref } from 'vue';

const permissions = ref<string[]>([]);
let initialized = false;

export function usePermission() {
  async function init(userPermissions: string[]) {
    if (initialized) return;
    permissions.value = userPermissions;
    initialized = true;
  }

  function can(permission: string): boolean {
    return permissions.value.includes(permission);
  }

  function canAny(list: string[]): boolean {
    return list.some((p) => permissions.value.includes(p));
  }

  function canAll(list: string[]): boolean {
    return list.every((p) => permissions.value.includes(p));
  }

  return { permissions, init, can, canAny, canAll };
}

// Usage in any component:
const { can } = usePermission();
