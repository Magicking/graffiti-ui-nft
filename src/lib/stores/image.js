import { writable } from 'svelte/store';

export const CanvasStore = writable(new Array(maxX)
.fill(null)
.map(() => new Array(maxY).fill(false));
