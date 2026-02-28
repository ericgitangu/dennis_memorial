/**
 * In-memory stores for OTP sessions and committee sessions.
 * These persist across API requests within the same server process.
 * For a single-instance fly.io deployment this is sufficient.
 */

export interface CommitteeMember {
  phone: string;
  name: string;
  role: "family" | "organizer";
}

interface OtpEntry {
  otpHash: string;
  expiresAt: number;
  verified: boolean;
}

interface SessionEntry {
  phone: string;
  name: string;
  role: string;
  expiresAt: number;
}

// Phone → OTP data
export const otpStore = new Map<string, OtpEntry>();

// Session token → session data
export const sessionStore = new Map<string, SessionEntry>();

// Cleanup expired entries periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(
    () => {
      const now = Date.now();
      for (const [key, entry] of otpStore.entries()) {
        if (entry.expiresAt < now) otpStore.delete(key);
      }
      for (const [key, entry] of sessionStore.entries()) {
        if (entry.expiresAt < now) sessionStore.delete(key);
      }
    },
    5 * 60 * 1000,
  );
}
