import { DEMO_TEAM, DEMO_USER } from "./seed";
import type { Role, Session } from "./types";

// Demo auth: any credentials work, nothing leaves the browser, and
// passwords are never stored anywhere.
const SESSION_KEY = "hde.session.v1";
const ACCOUNTS_KEY = "hde.accounts.v1";

interface StoredAccount {
  name: string;
  role: Role;
}

function readAccounts(): Record<string, StoredAccount> {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "{}") as Record<string, StoredAccount>;
  } catch {
    return {};
  }
}

function saveSession(session: Session): Session {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function signOut(): void {
  localStorage.removeItem(SESSION_KEY);
}

function nameFromEmail(email: string): string {
  const prefix = email.split("@")[0] ?? "there";
  return prefix
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

export function signIn(email: string): Session {
  const normalized = email.trim().toLowerCase();
  const account = readAccounts()[normalized];
  return saveSession({
    userId: `acct:${normalized}`,
    name: account?.name ?? nameFromEmail(normalized),
    email: normalized,
    role: account?.role ?? "user",
  });
}

export function signUp(name: string, email: string, role: Role): Session {
  const normalized = email.trim().toLowerCase();
  const accounts = readAccounts();
  accounts[normalized] = { name: name.trim(), role };
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  return saveSession({
    userId: `acct:${normalized}`,
    name: name.trim(),
    email: normalized,
    role,
  });
}

export function demoSignIn(role: Role): Session {
  return saveSession(role === "team" ? DEMO_TEAM : DEMO_USER);
}
