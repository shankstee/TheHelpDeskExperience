export type Role = "user" | "team";

export const CATEGORIES = ["Hardware", "Networking", "Software", "User Auth", "Other"] as const;
export type TicketCategory = (typeof CATEGORIES)[number];

export const STATUSES = ["New", "In Progress", "Resolved"] as const;
export type TicketStatus = (typeof STATUSES)[number];

export interface Ticket {
  id: string;
  subject: string;
  department: string;
  category: TicketCategory;
  status: TicketStatus;
  comment: string;
  requesterId: string;
  requesterName: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketInput {
  subject: string;
  department: string;
  category: TicketCategory;
  comment: string;
}

export interface Session {
  userId: string;
  name: string;
  email: string;
  role: Role;
}
