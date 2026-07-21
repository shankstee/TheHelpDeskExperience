import { Button } from "@fluentui/react-components";
import {
  AddRegular,
  PeopleTeamFilled,
  PeopleTeamRegular,
  TicketDiagonalFilled,
  TicketDiagonalRegular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router";
import type { Session } from "../lib/types";

interface SideNavProps {
  view: "my" | "all";
  session: Session;
  onNewTicket: () => void;
}

export default function SideNav({ view, session, onNewTicket }: SideNavProps) {
  const navigate = useNavigate();

  return (
    <nav className="side-nav" aria-label="Main">
      <Button
        className="new-ticket-btn"
        appearance="primary"
        icon={<AddRegular />}
        onClick={onNewTicket}
      >
        New ticket
      </Button>

      <button
        className={`nav-item${view === "my" ? " active" : ""}`}
        onClick={() => navigate("/tickets")}
      >
        {view === "my" ? <TicketDiagonalFilled fontSize={20} /> : <TicketDiagonalRegular fontSize={20} />}
        My tickets
      </button>

      {session.role === "team" && (
        <button
          className={`nav-item${view === "all" ? " active" : ""}`}
          onClick={() => navigate("/tickets/all")}
        >
          {view === "all" ? <PeopleTeamFilled fontSize={20} /> : <PeopleTeamRegular fontSize={20} />}
          All tickets
        </button>
      )}
    </nav>
  );
}
