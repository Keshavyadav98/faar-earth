import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, companyName, businessEmail, country, productInterest, role } = body;

    if (!fullName || !businessEmail) {
      return NextResponse.json(
        { error: "Full name and business email are required." },
        { status: 400 }
      );
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_SECURE,
      ENQUIRY_TO_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !ENQUIRY_TO_EMAIL) {
      return NextResponse.json(
        { error: "Mail server is not configured. Check your .env values." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === "true",
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const subject = `Compliance Documentation Request from ${fullName}${companyName ? " (" + companyName + ")" : ""}`;

    const html = `
      <div style="font-family: sans-serif; color:#333;">
        <h2 style="color:#4C5A44;">Compliance Documentation Request — Faar Earth Collective</h2>
        <table cellpadding="8" style="border-collapse:collapse;">
          <tr><td><strong>Full Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
          <tr><td><strong>Company</strong></td><td>${escapeHtml(companyName || "-")}</td></tr>
          <tr><td><strong>Business Email</strong></td><td>${escapeHtml(businessEmail)}</td></tr>
          <tr><td><strong>Country / Destination</strong></td><td>${escapeHtml(country || "-")}</td></tr>
          <tr><td><strong>Product(s) of Interest</strong></td><td>${escapeHtml(productInterest || "-")}</td></tr>
          <tr><td><strong>Company Role / Function</strong></td><td>${escapeHtml(role || "-")}</td></tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"Faar Earth Website" <${SMTP_USER}>`,
      to: ENQUIRY_TO_EMAIL,
      replyTo: businessEmail,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Compliance request send failed:", err);
    return NextResponse.json(
      { error: "Failed to send request. Please try again later." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
