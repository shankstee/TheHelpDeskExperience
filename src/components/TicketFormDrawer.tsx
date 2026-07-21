import { useState } from "react";
import {
  Button,
  Dropdown,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  Input,
  Option,
  OverlayDrawer,
  Spinner,
  Textarea,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import type { Ticket, TicketCategory, TicketInput } from "../lib/types";
import { CATEGORIES } from "../lib/types";

interface TicketFormDrawerProps {
  open: boolean;
  ticket: Ticket | null;
  onClose: () => void;
  onSubmit: (input: TicketInput) => Promise<void>;
}

export default function TicketFormDrawer({ open, ticket, onClose, onSubmit }: TicketFormDrawerProps) {
  const [subject, setSubject] = useState(ticket?.subject ?? "");
  const [department, setDepartment] = useState(ticket?.department ?? "");
  const [category, setCategory] = useState<TicketCategory | "">(ticket?.category ?? "");
  const [comment, setComment] = useState(ticket?.comment ?? "");
  const [errors, setErrors] = useState<Partial<Record<"subject" | "department" | "category" | "comment", string>>>({});
  const [busy, setBusy] = useState(false);

  const editing = ticket !== null;

  const submit = async () => {
    const next: typeof errors = {};
    if (!subject.trim()) next.subject = "Give the ticket a short subject.";
    if (!department.trim()) next.department = "Which department is this for?";
    if (!category) next.category = "Pick the closest category.";
    if (!comment.trim()) next.comment = "Describe what's going on.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setBusy(true);
    try {
      await onSubmit({
        subject: subject.trim(),
        department: department.trim(),
        category: category as TicketCategory,
        comment: comment.trim(),
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <OverlayDrawer position="end" size="medium" open={open} onOpenChange={(_, data) => !data.open && onClose()}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button appearance="subtle" aria-label="Close" icon={<DismissRegular />} onClick={onClose} />
          }
        >
          {editing ? "Edit ticket" : "New support ticket"}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <form
          style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 8 }}
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <Field label="Subject" required validationMessage={errors.subject}>
            <Input
              value={subject}
              onChange={(_, data) => setSubject(data.value)}
              placeholder="Short summary of the issue"
            />
          </Field>
          <Field label="Department" required validationMessage={errors.department}>
            <Input
              value={department}
              onChange={(_, data) => setDepartment(data.value)}
              placeholder="e.g. Design, Engineering, Front Desk"
            />
          </Field>
          <Field label="Category" required validationMessage={errors.category}>
            <Dropdown
              placeholder="Select a category"
              value={category}
              selectedOptions={category ? [category] : []}
              onOptionSelect={(_, data) => setCategory((data.optionValue as TicketCategory) ?? "")}
            >
              {CATEGORIES.map((c) => (
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
            </Dropdown>
          </Field>
          <Field label="Description" required validationMessage={errors.comment}>
            <Textarea
              value={comment}
              onChange={(_, data) => setComment(data.value)}
              rows={6}
              resize="vertical"
              placeholder="What happened? What did you expect? Anything you've already tried?"
            />
          </Field>
        </form>
      </DrawerBody>

      <DrawerFooter>
        <Button appearance="primary" disabled={busy} onClick={() => void submit()}>
          {busy ? <Spinner size="tiny" /> : editing ? "Save changes" : "Create ticket"}
        </Button>
        <Button appearance="secondary" disabled={busy} onClick={onClose}>
          Cancel
        </Button>
      </DrawerFooter>
    </OverlayDrawer>
  );
}
