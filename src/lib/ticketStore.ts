import { buildSeedTickets } from "./seed";
import type { Session, Ticket, TicketInput, TicketStatus } from "./types";

// The 2019 original talked to a C#/ASP.NET + MSSQL API. This demo store
// keeps the same async CRUD surface but persists to localStorage, so every
// visitor gets their own seeded, durable copy of the data.
const KEY = "hde.tickets.v1";
const LATENCY_MS = 300;

const delay = <T,>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));

function readAll(): Ticket[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Ticket[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // fall through to reseed
  }
  const seeded = buildSeedTickets();
  writeAll(seeded);
  return seeded;
}

function writeAll(tickets: Ticket[]): void {
  localStorage.setItem(KEY, JSON.stringify(tickets));
}

const sorted = (tickets: Ticket[]): Ticket[] =>
  [...tickets].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export function listTickets(): Promise<Ticket[]> {
  return delay(sorted(readAll()));
}

export function createTicket(input: TicketInput, session: Session): Promise<Ticket[]> {
  const now = new Date().toISOString();
  const ticket: Ticket = {
    id: crypto.randomUUID(),
    ...input,
    status: "New",
    requesterId: session.userId,
    requesterName: session.name,
    createdAt: now,
    updatedAt: now,
  };
  const next = [ticket, ...readAll()];
  writeAll(next);
  return delay(sorted(next));
}

export function updateTicket(
  id: string,
  patch: Partial<TicketInput> & { status?: TicketStatus },
): Promise<Ticket[]> {
  const next = readAll().map((t) =>
    t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t,
  );
  writeAll(next);
  return delay(sorted(next));
}

export function deleteTicket(id: string): Promise<Ticket[]> {
  const next = readAll().filter((t) => t.id !== id);
  writeAll(next);
  return delay(sorted(next));
}

export function resetDemoData(): void {
  localStorage.removeItem(KEY);
}
