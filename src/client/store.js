import { writable } from 'svelte/store';
import { APP__TITLE } from '../constants';

export let title = writable(APP__TITLE);
export let titleSuffix = writable('');
export let comments = writable(new Map());
export let currUser = writable({});
