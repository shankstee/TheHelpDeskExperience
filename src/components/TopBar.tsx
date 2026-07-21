import {
  Avatar,
  Badge,
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Persona,
  Text,
  Tooltip,
} from "@fluentui/react-components";
import {
  ArrowCounterclockwiseRegular,
  HeadsetRegular,
  SignOutRegular,
  WeatherMoonRegular,
  WeatherSunnyRegular,
} from "@fluentui/react-icons";
import { useAppTheme } from "../theme";
import type { Session } from "../lib/types";
import AboutDialog from "./AboutDialog";

interface TopBarProps {
  session: Session;
  onSignOut: () => void;
  onResetData: () => void;
}

export default function TopBar({ session, onSignOut, onResetData }: TopBarProps) {
  const { dark, toggle } = useAppTheme();
  const roleLabel = session.role === "team" ? "Helpdesk Team Member" : "Helpdesk User";

  return (
    <header className="top-bar">
      <div className="top-bar-side">
        <div className="logo-mark" aria-hidden="true">
          <HeadsetRegular />
        </div>
        <Text weight="semibold" size={400}>
          The Helpdesk Experience
        </Text>
        <Tooltip content="All data lives in your browser — nothing is sent to a server." relationship="description">
          <Badge appearance="outline" color="brand">
            Demo
          </Badge>
        </Tooltip>
      </div>

      <div className="top-bar-side">
        <Tooltip content={dark ? "Switch to light mode" : "Switch to dark mode"} relationship="label">
          <Button
            appearance="subtle"
            icon={dark ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
            onClick={toggle}
            aria-label="Toggle theme"
          />
        </Tooltip>
        <AboutDialog />
        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            <button
              style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer" }}
              aria-label="Account menu"
            >
              <Avatar name={session.name} color="colorful" size={32} />
            </button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <div style={{ padding: "8px 12px" }}>
                <Persona
                  name={session.name}
                  secondaryText={session.email}
                  tertiaryText={roleLabel}
                  avatar={{ color: "colorful" }}
                />
              </div>
              <MenuDivider />
              <MenuItem icon={<ArrowCounterclockwiseRegular />} onClick={onResetData}>
                Reset demo data
              </MenuItem>
              <MenuItem icon={<SignOutRegular />} onClick={onSignOut}>
                Sign out
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </header>
  );
}
