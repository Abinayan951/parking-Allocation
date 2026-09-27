import { initialSpaces } from '../data/initialSpaces';

const SPACES_KEY = 'smartpark_spaces_v1';
const HISTORY_KEY = 'smartpark_history_v1';

export function getStoredSpaces() {
  try {
    const data = localStorage.getItem(SPACES_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read spaces from localStorage", err);
  }
  return initialSpaces;
}

export function saveStoredSpaces(spaces) {
  try {
    localStorage.setItem(SPACES_KEY, JSON.stringify(spaces));
  } catch (err) {
    console.error("Failed to save spaces to localStorage", err);
  }
}

export function getStoredHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read history from localStorage", err);
  }
  return [];
}

export function addAllocationToHistory(allocationRecord) {
  try {
    const history = getStoredHistory();
    const updated = [allocationRecord, ...history];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to add allocation to history", err);
    return [];
  }
}

export function clearStoredHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (err) {
    console.error("Failed to clear history", err);
  }
}

export function resetLocalStorageToDefault() {
  try {
    localStorage.removeItem(SPACES_KEY);
    localStorage.removeItem(HISTORY_KEY);
  } catch (err) {
    console.error("Failed to reset localStorage", err);
  }
  return initialSpaces;
}
