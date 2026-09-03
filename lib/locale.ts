export const LOCALES = ["en", "de", "es", "fr", "it", "nl"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  de: "German",
  es: "Spanish",
  fr: "French",
  it: "Italian",
  nl: "Dutch",
};

export type LocalizedText = Partial<Record<Locale, string>>;

export function localize(text: LocalizedText | undefined, locale: string): string {
  if (!text) return "";
  return text[locale as Locale] || text.en || Object.values(text).find(Boolean) || "";
}

export function parseLocalizedField(raw: FormDataEntryValue | null): LocalizedText {
  if (typeof raw !== "string" || !raw.trim()) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== "object") return {};
  const result: LocalizedText = {};
  for (const locale of LOCALES) {
    const value = (parsed as Record<string, unknown>)[locale];
    if (typeof value === "string" && value.trim()) {
      result[locale] = value.trim();
    }
  }
  return result;
}
