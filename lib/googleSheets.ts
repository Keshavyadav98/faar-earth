import { google } from "googleapis";

const SHEET_TAB = process.env.GOOGLE_SHEETS_TAB_NAME || "Sheet1";

function getClient() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    return null;
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

export async function appendEnquiryRow(row: (string | undefined)[]) {
  const client = getClient();
  if (!client) {
    console.warn(
      "Google Sheets not configured (missing GOOGLE_SHEETS_CLIENT_EMAIL / GOOGLE_SHEETS_PRIVATE_KEY / GOOGLE_SHEETS_SPREADSHEET_ID) — skipping sheet append."
    );
    return;
  }

  try {
    await client.sheets.spreadsheets.values.append({
      spreadsheetId: client.spreadsheetId,
      range: `${SHEET_TAB}!A:Z`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row.map((v) => v ?? "")],
      },
    });
  } catch (err) {
    console.error("Failed to append row to Google Sheet:", err);
  }
}
