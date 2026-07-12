import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, companyName, email, phone, productInterest, requirement } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email and phone are required." },
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
      secure: SMTP_SECURE === "true", // true for port 465, false for 587/25
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const subject = `New Enquiry from ${fullName}${companyName ? " (" + companyName + ")" : ""}`;

    const html = `
      <div style="font-family: sans-serif; color:#333;">
        <h2 style="color:#4C5A44;">New Website Enquiry — Faar Earth Collective</h2>
        <table cellpadding="8" style="border-collapse:collapse;">
          <tr><td><strong>Full Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
          <tr><td><strong>Company</strong></td><td>${escapeHtml(companyName || "-")}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
          <tr><td><strong>Product Interest</strong></td><td>${escapeHtml(productInterest || "-")}</td></tr>
          <tr><td><strong>Requirement</strong></td><td>${escapeHtml(requirement || "-")}</td></tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"Faar Earth Website" <${SMTP_USER}>`,
      to: ENQUIRY_TO_EMAIL,
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Enquiry send failed:", err);
    return NextResponse.json(
      { error: "Failed to send enquiry. Please try again later." },
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
