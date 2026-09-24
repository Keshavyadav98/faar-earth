const SHEET_TAB = process.env.GOOGLE_SHEETS_TAB_NAME || "Sheet1";

export async function appendEnquiryRow(row: (string | undefined)[]) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "Google Sheets not configured (missing GOOGLE_SHEETS_WEBHOOK_URL) — skipping sheet append."
    );
    return;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tab: SHEET_TAB,
        row: row.map((v) => v ?? ""),
      }),
      redirect: "follow",
    });

    if (!res.ok) {
      console.error("Google Sheets webhook responded with an error:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Failed to append row to Google Sheet:", err);
  }
}
