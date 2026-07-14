"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";

type Status = "idle" | "sending" | "success" | "error";

export default function Enquiry() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
    <section id="enquiry" className="relative overflow-hidden">
      <img
        src="/Images/Contactus.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="container-xl relative z-10 flex justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[700px] rounded-card bg-transparent p-6 shadow-none sm:p-10"
        >
          <div className="mb-6 text-center">
            <span className="eyebrow">{t("enquiry.eyebrow")}</span>
            <h2 className="mt-2 font-heading text-h4 md:text-h3 text-[#404C3E]">
              {t("enquiry.title")}
            </h2>
          </div>

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
              required
              type="tel"
              name="phone"
              placeholder={t("enquiry.phone")}
              className="h-[52px] rounded-input border border-border-gray bg-white px-4 text-[15px] text-[#404C3E] placeholder:text-text-gray focus:border-primary-green"
            />
            <input
              name="productInterest"
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
    </section>
  );
}
