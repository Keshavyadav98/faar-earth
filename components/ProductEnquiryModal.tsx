"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";

type Status = "idle" | "sending" | "success" | "error";

export default function ProductEnquiryModal({ productName }: { productName: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function closeModal() {
    setOpen(false);
    setStatus("idle");
    setErrorMsg("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
      form.reset();
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
        {t("enquiry.enquireAboutProduct")} <span aria-hidden>→</span>
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
              aria-label="Close"
              className="absolute right-5 top-5 text-2xl leading-none text-text-gray hover:text-primary-green"
            >
              &times;
            </button>

            <div className="mb-6 text-left">
              <span className="eyebrow">{t("enquiry.eyebrow")}</span>
              <h2 className="mt-2 font-heading text-h4 text-[#404C3E]">
                {t("enquiry.title")}
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  required
                  name="fullName"
                  placeholder={t("enquiry.fullName")}
                  className="h-[52px] rounded-input border border-border-gray bg-white px-4 text-[15px] text-[#404C3E] placeholder:text-text-gray focus:border-primary-green"
                />
                <input
                  name="companyName"
                  placeholder={t("enquiry.companyName")}
                  className="h-[52px] rounded-input border border-border-gray bg-white px-4 text-[15px] text-[#404C3E] placeholder:text-text-gray focus:border-primary-green"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder={t("enquiry.email")}
                  className="h-[52px] rounded-input border border-border-gray bg-white px-4 text-[15px] text-[#404C3E] placeholder:text-text-gray focus:border-primary-green"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={t("enquiry.phone")}
                  className="h-[52px] rounded-input border border-border-gray bg-white px-4 text-[15px] text-[#404C3E] placeholder:text-text-gray focus:border-primary-green"
                />
                <input
                  required
                  name="productInterest"
                  defaultValue={productName}
                  placeholder={t("enquiry.productInterest")}
                  className="h-[52px] rounded-input border border-border-gray bg-white px-4 text-[15px] text-[#404C3E] placeholder:text-text-gray focus:border-primary-green sm:col-span-2"
                />
                <textarea
                  name="requirement"
                  placeholder={t("enquiry.requirement")}
                  rows={3}
                  className="rounded-input border border-border-gray bg-white px-4 py-3 text-[15px] text-[#404C3E] placeholder:text-text-gray focus:border-primary-green sm:col-span-2"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-btn bg-primary-green px-6 py-3.5 text-[16px] font-medium text-white shadow-btn transition-colors hover:bg-hover-green disabled:opacity-60"
              >
                {status === "sending" ? t("enquiry.sending") : t("enquiry.sendButton")} <span aria-hidden>→</span>
              </button>

              {status === "success" && (
                <p className="mt-4 text-center text-[14px] font-medium text-primary-green">
                  {t("enquiry.success")}
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
