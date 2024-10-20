import { writable } from 'svelte/store';


export const CanvasStore = writable(new Array(128)
.fill(null)
.map(() => new Array(128).fill(false)));
