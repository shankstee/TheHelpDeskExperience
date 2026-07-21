import type { Session, Ticket, TicketCategory, TicketStatus } from "./types";

// One-click demo identities. Avery has seeded tickets so "My tickets"
// is populated the moment a visitor drops in.
export const DEMO_USER: Session = {
  userId: "demo-user",
  name: "Avery Quinn",
  email: "avery.quinn@contoso.com",
  role: "user",
};

export const DEMO_TEAM: Session = {
  userId: "demo-team",
  name: "Morgan Reyes",
  email: "morgan.reyes@contoso.com",
  role: "team",
};

const at = (daysAgo: number, hour: number, minute: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

interface SeedRow {
  subject: string;
  department: string;
  category: TicketCategory;
  status: TicketStatus;
  comment: string;
  requesterId: string;
  requesterName: string;
  createdAt: string;
}

// Timestamps are relative to "now" so the board never looks stale.
const rows: SeedRow[] = [
  {
    subject: "New hire needs a helpdesk login",
    department: "People Ops",
    category: "User Auth",
    status: "New",
    comment: "Ben starts Monday and needs helpdesk and badge access before orientation.",
    requesterId: "seed-devon",
    requesterName: "Devon Park",
    createdAt: at(0, 8, 42),
  },
  {
    subject: "Unable to log in after password reset",
    department: "Design",
    category: "User Auth",
    status: "In Progress",
    comment: "Reset my password this morning and now SSO bounces me back to the sign-in screen every time.",
    requesterId: DEMO_USER.userId,
    requesterName: DEMO_USER.name,
    createdAt: at(1, 9, 15),
  },
  {
    subject: "Office install keys for the front desk",
    department: "Front Desk",
    category: "Software",
    status: "New",
    comment: "Two new front-desk workstations need install keys for the Office suite.",
    requesterId: "seed-grace",
    requesterName: "Grace Ho",
    createdAt: at(1, 14, 5),
  },
  {
    subject: "VPN drops every ten minutes",
    department: "Engineering",
    category: "Networking",
    status: "In Progress",
    comment: "Connection is fine on office Wi-Fi, but the VPN keeps disconnecting roughly every ten minutes from home.",
    requesterId: "seed-priya",
    requesterName: "Priya Patel",
    createdAt: at(2, 11, 30),
  },
  {
    subject: "Second monitor not detected",
    department: "Design",
    category: "Hardware",
    status: "New",
    comment: "Dock firmware updated overnight and my second display stopped showing up entirely.",
    requesterId: DEMO_USER.userId,
    requesterName: DEMO_USER.name,
    createdAt: at(3, 10, 20),
  },
  {
    subject: "Wi-Fi crawling in the east wing",
    department: "Customer Success",
    category: "Networking",
    status: "In Progress",
    comment: "Whole east wing is seeing painfully slow speeds since Tuesday. Calls keep dropping mid-demo.",
    requesterId: "seed-yuna",
    requesterName: "Yuna Ishii",
    createdAt: at(4, 13, 48),
  },
  {
    subject: "Signed out immediately after signing in",
    department: "Web",
    category: "User Auth",
    status: "In Progress",
    comment: "I can log in, but the session expires and kicks me back out within a few seconds.",
    requesterId: "seed-cam",
    requesterName: "Cam Brooks",
    createdAt: at(5, 9, 55),
  },
  {
    subject: "Team inbox locked out",
    department: "Front Desk",
    category: "Software",
    status: "Resolved",
    comment: "Shared support inbox locked us out after too many sign-in attempts.",
    requesterId: "seed-ivy",
    requesterName: "Ivy Volkov",
    createdAt: at(6, 15, 10),
  },
  {
    subject: "Word rollout reminder for workstations",
    department: "IT",
    category: "Software",
    status: "New",
    comment: "Reminder to push the latest version of Word to all shared workstations before the doc-template switch.",
    requesterId: "seed-paul",
    requesterName: "Paul Lang",
    createdAt: at(7, 8, 25),
  },
  {
    subject: "HDMI adapter replacement",
    department: "Facilities",
    category: "Hardware",
    status: "Resolved",
    comment: "The big conference room's HDMI converter finally gave out. Need a replacement before Thursday's all-hands.",
    requesterId: "seed-mikael",
    requesterName: "Mikael King",
    createdAt: at(8, 12, 40),
  },
  {
    subject: "Figma license request",
    department: "Design",
    category: "Software",
    status: "Resolved",
    comment: "Requesting a full Figma seat — currently on a view-only license and can't hand off specs.",
    requesterId: DEMO_USER.userId,
    requesterName: DEMO_USER.name,
    createdAt: at(12, 16, 5),
  },
  {
    subject: "Laptop battery swelling",
    department: "Backend",
    category: "Hardware",
    status: "Resolved",
    comment: "Trackpad started lifting and the case doesn't close flat — pretty sure the battery is swelling.",
    requesterId: "seed-wim",
    requesterName: "Wim Lund",
    createdAt: at(10, 9, 5),
  },
];

export function buildSeedTickets(): Ticket[] {
  return rows.map((row, i) => ({
    id: `seed-${i + 1}`,
    ...row,
    updatedAt: row.createdAt,
  }));
}
