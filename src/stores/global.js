import { readable, writable } from "svelte/store";

export const time = readable(new Date(), function start(set) {
  // implementation goes here
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return function stop() {
    clearInterval(interval);
    console.log("interval cleared!");
  };
});

function createCounter() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: (value) => () => set(value || 0),
  };
}

export const counter = createCounter();
