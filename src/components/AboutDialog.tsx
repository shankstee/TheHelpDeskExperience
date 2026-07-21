import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Link,
  Tooltip,
} from "@fluentui/react-components";
import { InfoRegular } from "@fluentui/react-icons";

export default function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Tooltip content="About this project" relationship="label">
          <Button appearance="subtle" icon={<InfoRegular />} aria-label="About this project" />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>About this project</DialogTitle>
          <DialogContent>
            <p>
              The Helpdesk Experience started life in October 2019 as a take-home project for a
              Microsoft interview — a working support-ticket app built on React 16, Office UI
              Fabric, and a C#/ASP.NET + SQL Server backend.
            </p>
            <p>
              This is that same app, rebuilt in 2026 on the modern version of the same stack:
              React 19, TypeScript 5, Vite, and Fluent UI v9 — the design system Office UI Fabric
              grew up to become.
            </p>
            <p>
              The backend has been swapped for an in-browser demo store: everything you create,
              edit, or delete is saved to your browser's local storage. Real functionality, no
              server, nobody's data but your own.
            </p>
            <p>
              <Link href="https://github.com/shankstee/TheHelpDeskExperience" target="_blank">
                View the original 2019 code on GitHub
              </Link>
            </p>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
