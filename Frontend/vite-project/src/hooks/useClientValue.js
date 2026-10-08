import { useSyncExternalStore } from 'react';

const subscribe = (onChange) => {
  window.addEventListener('storage', onChange);
  return () => window.removeEventListener('storage', onChange);
};

// Reads browser-only state (localStorage, sessionStorage) without breaking hydration:
// the pre-rendered HTML and the first client render both use `serverValue`, then React
// re-renders with the real value. The getter must return a primitive.
const useClientValue = (getValue, serverValue) =>
  useSyncExternalStore(subscribe, getValue, () => serverValue);

export default useClientValue;
