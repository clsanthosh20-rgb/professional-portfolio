// Robust LocalStorage & SessionStorage Handler with schema corruption protection

const STORAGE_KEYS = {
  PORTFOLIO: 'santhosh_portfolio_data_v1',
  PROJECTS: 'santhosh_projects_data_v1',
  SKILLS: 'santhosh_skills_data_v1',
  TEAM: 'santhosh_team_data_v1',
  AI_LAB: 'santhosh_ailab_data_v1',
  AUTH: 'santhosh_owner_session_v1',
};

/**
 * Safely load from localStorage with fallback on error or corruption
 */
export function safeGetStorage(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallbackValue;
    const parsed = JSON.parse(raw);
    if (parsed === null || typeof parsed !== 'object') {
      return fallbackValue;
    }
    return parsed;
  } catch (error) {
    console.warn(`[Storage] Failed to read or parse '${key}'. Using fallback.`, error);
    return fallbackValue;
  }
}

/**
 * Safely save to localStorage
 */
export function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[Storage] Failed to write '${key}' to localStorage:`, error);
    return false;
  }
}

/**
 * Reset specific storage key or all
 */
export function clearStorageKey(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
}

// Session storage helpers for Owner Authentication
export function safeGetSession(key, fallbackValue) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return fallbackValue;
    return JSON.parse(raw);
  } catch (error) {
    return fallbackValue;
  }
}

export function safeSetSession(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

export function clearSessionKey(key) {
  try {
    sessionStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
}

export { STORAGE_KEYS };
