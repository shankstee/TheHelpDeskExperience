import {
  Avatar,
  Badge,
  Body1,
  Button,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
  Menu,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Subtitle2,
  Text,
} from "@fluentui/react-components";
import { ChevronDownRegular, DeleteRegular, EditRegular } from "@fluentui/react-icons";
import { relativeTime } from "../lib/format";
import type { Session, Ticket, TicketStatus } from "../lib/types";
import { STATUSES } from "../lib/types";

const statusColor: Record<TicketStatus, "brand" | "warning" | "success"> = {
  New: "brand",
  "In Progress": "warning",
  Resolved: "success",
};

interface TicketCardProps {
  ticket: Ticket;
  session: Session;
  index: number;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
  onStatusChange: (ticket: Ticket, status: TicketStatus) => void;
}

export default function TicketCard({
  ticket,
  session,
  index,
  onEdit,
  onDelete,
  onStatusChange,
}: TicketCardProps) {
  const isTeam = session.role === "team";
  const isOwner = ticket.requesterId === session.userId;

  return (
    <Card
      className="rise"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
      role="article"
    >
      <CardHeader
        image={<Avatar name={ticket.requesterName} color="colorful" />}
        header={<Text weight="semibold">{ticket.requesterName}</Text>}
        description={
          <Caption1 style={{ color: "var(--colorNeutralForeground3)" }}>
            {ticket.department} · {relativeTime(ticket.createdAt)}
          </Caption1>
        }
      />

      <div className="card-badges">
        <Badge appearance="filled" color={statusColor[ticket.status]}>
          {ticket.status}
        </Badge>
        <Badge appearance="outline" color="informative">
          {ticket.category}
        </Badge>
      </div>

      <div>
        <Subtitle2 as="h3" block style={{ margin: "0 0 4px" }}>
          {ticket.subject}
        </Subtitle2>
        <Body1 block className="clamp-2" style={{ color: "var(--colorNeutralForeground2)" }}>
          {ticket.comment}
        </Body1>
      </div>

      {(isTeam || isOwner) && (
        <CardFooter>
          <Button appearance="secondary" icon={<EditRegular />} onClick={() => onEdit(ticket)}>
            Edit
          </Button>
          {isTeam && (
            <>
              <Menu
                checkedValues={{ status: [ticket.status] }}
                onCheckedValueChange={(_, data) =>
                  onStatusChange(ticket, data.checkedItems[0] as TicketStatus)
                }
              >
                <MenuTrigger disableButtonEnhancement>
                  <Button appearance="subtle" icon={<ChevronDownRegular />} iconPosition="after">
                    Status
                  </Button>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    {STATUSES.map((status) => (
                      <MenuItemRadio key={status} name="status" value={status}>
                        {status}
                      </MenuItemRadio>
                    ))}
                  </MenuList>
                </MenuPopover>
              </Menu>
              <Button
                appearance="subtle"
                icon={<DeleteRegular />}
                aria-label={`Delete ticket: ${ticket.subject}`}
                onClick={() => onDelete(ticket)}
              />
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
