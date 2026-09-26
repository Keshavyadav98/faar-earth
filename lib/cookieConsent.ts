export type ConsentCategory = "functional" | "analytics" | "marketing";

export type ConsentState = {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookieConsent";
export const CONSENT_CHANGED_EVENT = "cookieConsentChanged";
export const OPEN_COOKIE_PREFERENCES_EVENT = "openCookiePreferences";

// Strictly necessary cookies (e.g. the admin session cookie) are always set —
// they aren't part of this consent state at all, since GDPR/ePrivacy doesn't
// require consent for them.

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.functional === "boolean" &&
      typeof parsed?.analytics === "boolean" &&
      typeof parsed?.marketing === "boolean"
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function setConsent(state: ConsentState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore (e.g. private browsing)
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: state }));
}

export function hasConsent(category: ConsentCategory): boolean {
  const consent = getConsent();
  return consent ? consent[category] : false;
}

export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
}
