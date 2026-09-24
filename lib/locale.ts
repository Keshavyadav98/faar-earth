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

export type LocalizedStringList = Partial<Record<Locale, string[]>>;

export function localizeList(list: LocalizedStringList | undefined, locale: string): string[] {
  if (!list) return [];
  return (
    list[locale as Locale] ||
    list.en ||
    Object.values(list).find((v): v is string[] => !!v && v.length > 0) ||
    []
  );
}

export function parseLocalizedListField(raw: FormDataEntryValue | null): LocalizedStringList {
  if (typeof raw !== "string" || !raw.trim()) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== "object") return {};
  const result: LocalizedStringList = {};
  for (const locale of LOCALES) {
    const value = (parsed as Record<string, unknown>)[locale];
    if (Array.isArray(value)) {
      const cleaned = value.filter((v) => typeof v === "string" && v.trim()).map((v) => v.trim());
      if (cleaned.length) result[locale] = cleaned;
    }
  }
  return result;
}

export type FaqItem = {
  question: string;
  answer: string;
};

export type LocalizedFaqs = Partial<Record<Locale, FaqItem[]>>;

export function localizeFaqs(faqs: LocalizedFaqs | undefined, locale: string): FaqItem[] {
  if (!faqs) return [];
  return (
    faqs[locale as Locale] ||
    faqs.en ||
    Object.values(faqs).find((v): v is FaqItem[] => !!v && v.length > 0) ||
    []
  );
}

export function parseLocalizedFaqsField(raw: FormDataEntryValue | null): LocalizedFaqs {
  if (typeof raw !== "string" || !raw.trim()) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== "object") return {};
  const result: LocalizedFaqs = {};
  for (const locale of LOCALES) {
    const value = (parsed as Record<string, unknown>)[locale];
    if (Array.isArray(value)) {
      const cleaned = value
        .filter(
          (f): f is FaqItem =>
            !!f &&
            typeof f.question === "string" &&
            typeof f.answer === "string" &&
            f.question.trim() !== "" &&
            f.answer.trim() !== ""
        )
        .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }));
      if (cleaned.length) result[locale] = cleaned;
    }
  }
  return result;
}
