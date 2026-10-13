import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "anthos_admin";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}

export function createAdminSession() {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET não configurada");
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = String(expiresAt);
  const signature = createHmac("sha256", secret).update(payload).digest("hex");
  return { cookieName: COOKIE_NAME, value: `${payload}.${signature}`, maxAge: SESSION_DURATION_SECONDS };
}

export function isAdminSessionValid(value?: string) {
  const secret = getSecret();
  if (!secret || !value) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature || !/^\d+$/.test(payload)) return false;
  if (Number(payload) <= Math.floor(Date.now() / 1000)) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const receivedBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

export function isAdminRequest(request: Request & { cookies?: { get: (name: string) => { value: string } | undefined } }) {
  return isAdminSessionValid(request.cookies?.get(COOKIE_NAME)?.value);
}

export { COOKIE_NAME };
