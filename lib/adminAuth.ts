import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "fe_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function timingSafeStringEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Add it to .env.local.`);
  }
  return value;
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUsername = requireEnv("ADMIN_USERNAME");
  const expectedPassword = requireEnv("ADMIN_PASSWORD");
  return (
    timingSafeStringEqual(username, expectedUsername) &&
    timingSafeStringEqual(password, expectedPassword)
  );
}

export function createSessionToken(): string {
  const secret = requireEnv("ADMIN_SESSION_SECRET");
  return crypto.createHmac("sha256", secret).update("fe-admin-session").digest("hex");
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  try {
    return timingSafeStringEqual(token, createSessionToken());
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return isValidSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export function isAdminRequestAuthenticated(req: Request): boolean {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  const token = match ? decodeURIComponent(match.slice(ADMIN_SESSION_COOKIE.length + 1)) : null;
  return isValidSessionToken(token);
}

export const ADMIN_SESSION_MAX_AGE = SESSION_MAX_AGE;
