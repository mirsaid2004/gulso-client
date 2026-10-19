type Listener = (payload: unknown) => void;

const listeners = new Set<Listener>();

export const notificationBus = {
  emit(payload: unknown) {
    listeners.forEach((fn) => fn(payload));
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
