"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";

type Status = "idle" | "sending" | "success" | "error";

export default function ComplianceRequestModal() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const PRODUCT_OPTIONS = [
    { key: "seeds", label: t("complianceModal.productSeeds") },
    { key: "spices", label: t("complianceModal.productSpices") },
    { key: "coldPressOils", label: t("complianceModal.productColdPressOils") },
    { key: "oleoresins", label: t("complianceModal.productOleoresins") },
    { key: "specialityFlours", label: t("complianceModal.productSpecialityFlours") },
    { key: "thickeners", label: t("complianceModal.productThickeners") },
  ];

  function toggleProduct(label: string) {
    setSelectedProducts((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  }

  function closeModal() {
    setOpen(false);
    setStatus("idle");
    setErrorMsg("");
    setSelectedProducts([]);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.productInterest = selectedProducts.join(", ");

    try {
      const res = await fetch("/api/compliance-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
      form.reset();
      setSelectedProducts([]);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-btn bg-primary-green px-7 py-3.5 text-[16px] font-medium text-white shadow-btn transition-colors hover:bg-hover-green"
      >
        {t("certifications.ctaButton")} <span aria-hidden>→</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={closeModal}
            aria-hidden
            className="absolute inset-0 bg-black/50"
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-[640px] overflow-y-auto rounded-card bg-white p-6 shadow-card-hover sm:p-10">
            <button
              type="button"
              onClick={closeModal}
              aria-label={t("complianceModal.close")}
              className="absolute right-5 top-5 text-2xl leading-none text-text-gray hover:text-primary-green"
            >
              &times;
            </button>

            <div className="mb-6 text-left">
              <span className="eyebrow">{t("complianceModal.eyebrow")}</span>
              <h2 className="mt-2 font-heading text-h4 text-[#404C3E]">
                {t("complianceModal.title")}
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  required
                  name="fullName"
                  placeholder={t("complianceModal.fullName")}
                  className="h-[52px] rounded-input border border-border-gray bg-white px-4 text-[15px] text-[#404C3E] placeholder:text-text-gray focus:border-primary-green"
                />
                <input
                  name="companyName"
                  placeholder={t("complianceModal.companyName")}
                  className="h-[52px] rounded-input border border-border-gray bg-white px-4 text-[15px] text-[#404C3E] placeholder:text-text-gray focus:border-primary-green"
                />
                <input
                  required
                  type="email"
                  name="businessEmail"
                  placeholder={t("complianceModal.businessEmail")}
                  className="h-[52px] rounded-input border border-border-gray bg-white px-4 text-[15px] text-[#404C3E] placeholder:text-text-gray focus:border-primary-green"
                />
                <input
                  name="country"
                  placeholder={t("complianceModal.country")}
                  className="h-[52px] rounded-input border border-border-gray bg-white px-4 text-[15px] text-[#404C3E] placeholder:text-text-gray focus:border-primary-green"
                />
                <input
                  name="role"
                  placeholder={t("complianceModal.role")}
                  className="h-[52px] rounded-input border border-border-gray bg-white px-4 text-[15px] text-[#404C3E] placeholder:text-text-gray focus:border-primary-green sm:col-span-2"
                />
              </div>

              <div className="mt-4">
                <p className="text-[13px] font-medium uppercase tracking-wide text-text-gray">
                  {t("complianceModal.productInterest")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PRODUCT_OPTIONS.map((opt) => {
                    const active = selectedProducts.includes(opt.label);
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => toggleProduct(opt.label)}
                        className={`rounded-pill border px-4 py-2 text-[13px] font-medium transition-colors ${
                          active
                            ? "border-primary-green bg-primary-green text-white"
                            : "border-border-gray bg-white text-text-gray hover:border-primary-green"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-btn bg-primary-green px-6 py-3.5 text-[16px] font-medium text-white shadow-btn transition-colors hover:bg-hover-green disabled:opacity-60"
              >
                {status === "sending" ? t("complianceModal.sending") : t("complianceModal.submit")}{" "}
                <span aria-hidden>→</span>
              </button>

              {status === "success" && (
                <p className="mt-4 text-center text-[14px] font-medium text-primary-green">
                  {t("complianceModal.success")}
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-center text-[14px] font-medium text-red-600">
                  {errorMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
