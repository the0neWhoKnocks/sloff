import { STORAGE_KEY } from '../../constants';

export function getStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

export function setStorage(data) {
  const currData = getStorage();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...currData,
    ...data,
  }));
}
