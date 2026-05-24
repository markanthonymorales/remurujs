let activeEffect: (() => void) | null = null;

export interface Signal<T> {
  value: T;
  toString: () => string;
}

export function createSignal<T>(initialValue: T): Signal<T> {
  let val = initialValue;
  const subscribers = new Set<() => void>();

  return {
    get value() {
      if (activeEffect) {
        subscribers.add(activeEffect);
      }
      return val;
    },
    set value(newValue: T) {
      if (val !== newValue) {
        val = newValue;
        subscribers.forEach((sub) => sub());
      }
    },
    toString() {
      return String(this.value);
    }
  };
}

export function createEffect(fn: () => void) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

export class RemuruContext {
  private store = new Map<string, any>();

  provide(key: string, value: any) {
    this.store.set(key, value);
  }

  inject(key: string): any {
    return this.store.get(key);
  }
}