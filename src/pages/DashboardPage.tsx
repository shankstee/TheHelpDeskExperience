import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Caption1,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Dropdown,
  Option,
  SearchBox,
  Skeleton,
  SkeletonItem,
  Tab,
  TabList,
  Text,
  Title2,
  Toast,
  ToastTitle,
  Toaster,
  useId,
  useToastController,
  type ToastIntent,
} from "@fluentui/react-components";
import { AddRegular, TicketDiagonalRegular } from "@fluentui/react-icons";
import TopBar from "../components/TopBar";
import SideNav from "../components/SideNav";
import TicketCard from "../components/TicketCard";
import TicketFormDrawer from "../components/TicketFormDrawer";
import {
  createTicket,
  deleteTicket,
  listTickets,
  resetDemoData,
  updateTicket,
} from "../lib/ticketStore";
import type { Session, Ticket, TicketCategory, TicketInput, TicketStatus } from "../lib/types";
import { CATEGORIES } from "../lib/types";

interface DashboardPageProps {
  view: "my" | "all";
  session: Session;
  onSignOut: () => void;
}

type StatusFilter = "All" | TicketStatus;
type CategoryFilter = "All categories" | TicketCategory;

export default function DashboardPage({ view, session, onSignOut }: DashboardPageProps) {
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All categories");
  const [drawer, setDrawer] = useState<{ open: boolean; ticket: Ticket | null }>({
    open: false,
    ticket: null,
  });
  const [deleteTarget, setDeleteTarget] = useState<Ticket | null>(null);

  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const notify = (title: string, intent: ToastIntent = "success") =>
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
      </Toast>,
      { intent, timeout: 2500 },
    );

  useEffect(() => {
    let cancelled = false;
    void listTickets().then((data) => {
      if (!cancelled) setTickets(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Reset filters when switching between My/All so nothing looks mysteriously hidden.
  useEffect(() => {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All categories");
  }, [view]);

  const scoped = useMemo(() => {
    if (tickets === null) return [];
    return view === "my" ? tickets.filter((t) => t.requesterId === session.userId) : tickets;
  }, [tickets, view, session.userId]);

  const statusCounts = useMemo(() => {
    const counts: Record<StatusFilter, number> = {
      All: scoped.length,
      New: 0,
      "In Progress": 0,
      Resolved: 0,
    };
    for (const t of scoped) counts[t.status] += 1;
    return counts;
  }, [scoped]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return scoped.filter((t) => {
      if (statusFilter !== "All" && t.status !== statusFilter) return false;
      if (categoryFilter !== "All categories" && t.category !== categoryFilter) return false;
      if (!q) return true;
      return [t.subject, t.comment, t.requesterName, t.department]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [scoped, search, statusFilter, categoryFilter]);

  const filtersActive =
    search.trim() !== "" || statusFilter !== "All" || categoryFilter !== "All categories";

  const handleSubmit = async (input: TicketInput) => {
    if (drawer.ticket) {
      setTickets(await updateTicket(drawer.ticket.id, input));
      notify("Ticket updated");
    } else {
      setTickets(await createTicket(input, session));
      notify("Ticket created");
    }
    setDrawer({ open: false, ticket: null });
  };

  const handleStatusChange = async (ticket: Ticket, status: TicketStatus) => {
    if (ticket.status === status) return;
    setTickets(await updateTicket(ticket.id, { status }));
    notify(`Marked "${ticket.subject}" as ${status}`);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const subject = deleteTarget.subject;
    setDeleteTarget(null);
    setTickets(await deleteTicket(deleteTarget.id));
    notify(`Deleted "${subject}"`, "info");
  };

  const handleReset = async () => {
    resetDemoData();
    setTickets(null);
    setTickets(await listTickets());
    notify("Demo data reset");
  };

  const loading = tickets === null;
  const title = view === "my" ? "My tickets" : "All tickets";
  const subtitle =
    view === "my" ? "Requests you've submitted" : "Every request across the organization";

  return (
    <div className="app-shell">
      <TopBar session={session} onSignOut={onSignOut} onResetData={() => void handleReset()} />

      <div className="app-body">
        <SideNav
          view={view}
          session={session}
          onNewTicket={() => setDrawer({ open: true, ticket: null })}
        />

        <main className="content">
          <div className="content-header">
            <div>
              <Title2 as="h1" block>
                {title}
              </Title2>
              <Caption1 block style={{ color: "var(--colorNeutralForeground3)" }}>
                {subtitle}
              </Caption1>
            </div>
          </div>

          <div className="filters">
            <SearchBox
              placeholder="Search tickets"
              value={search}
              onChange={(_, data) => setSearch(data.value)}
              style={{ minWidth: 220 }}
            />
            <Dropdown
              value={categoryFilter}
              selectedOptions={[categoryFilter]}
              onOptionSelect={(_, data) =>
                setCategoryFilter((data.optionValue as CategoryFilter) ?? "All categories")
              }
              style={{ minWidth: 160 }}
            >
              {["All categories", ...CATEGORIES].map((c) => (
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
            </Dropdown>
            <TabList
              selectedValue={statusFilter}
              onTabSelect={(_, data) => setStatusFilter(data.value as StatusFilter)}
            >
              {(["All", "New", "In Progress", "Resolved"] as const).map((s) => (
                <Tab key={s} value={s}>
                  {s} ({statusCounts[s]})
                </Tab>
              ))}
            </TabList>
          </div>

          {loading ? (
            <div className="ticket-grid" aria-label="Loading tickets">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} aria-hidden>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      padding: 16,
                      borderRadius: 8,
                      background: "var(--colorNeutralBackground1)",
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <SkeletonItem shape="circle" size={40} />
                      <SkeletonItem style={{ width: "50%" }} />
                    </div>
                    <SkeletonItem size={16} />
                    <SkeletonItem size={16} style={{ width: "80%" }} />
                    <SkeletonItem size={16} style={{ width: "60%" }} />
                  </div>
                </Skeleton>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="empty-state rise">
              <TicketDiagonalRegular fontSize={44} />
              <Text size={500} weight="semibold">
                {filtersActive ? "No tickets match" : "No tickets yet"}
              </Text>
              <Text size={300}>
                {filtersActive
                  ? "Try clearing your search or filters."
                  : "When something breaks, this is where it gets fixed."}
              </Text>
              {filtersActive ? (
                <Button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setCategoryFilter("All categories");
                  }}
                >
                  Clear filters
                </Button>
              ) : (
                <Button
                  appearance="primary"
                  icon={<AddRegular />}
                  onClick={() => setDrawer({ open: true, ticket: null })}
                >
                  Create your first ticket
                </Button>
              )}
            </div>
          ) : (
            <div className="ticket-grid">
              {visible.map((ticket, i) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  session={session}
                  index={i}
                  onEdit={(t) => setDrawer({ open: true, ticket: t })}
                  onDelete={setDeleteTarget}
                  onStatusChange={(t, s) => void handleStatusChange(t, s)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {drawer.open && (
        <TicketFormDrawer
          key={drawer.ticket?.id ?? "new"}
          open={drawer.open}
          ticket={drawer.ticket}
          onClose={() => setDrawer({ open: false, ticket: null })}
          onSubmit={handleSubmit}
        />
      )}

      <Dialog open={deleteTarget !== null} onOpenChange={(_, data) => !data.open && setDeleteTarget(null)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Delete this ticket?</DialogTitle>
            <DialogContent>
              "{deleteTarget?.subject}" from {deleteTarget?.requesterName} will be permanently
              removed.
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button className="danger-btn" onClick={() => void handleDelete()}>
                Delete
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <Toaster toasterId={toasterId} position="bottom-end" />
    </div>
  );
}
