import { verifyToken } from "@/lib/jwt";

/** True when the request carries a valid admin token (Bearer header or "token" cookie). */
export function isAdminRequest(req: Request): boolean {
  let token: string | null = null;
  const auth = req.headers.get("authorization");
  if (auth && auth.startsWith("Bearer ")) token = auth.slice(7);
  if (!token) {
    const match = (req.headers.get("cookie") || "").match(/(^|;)\s*token=([^;\s]+)/);
    if (match) token = match[2];
  }
  return Boolean(token && verifyToken(token));
}
