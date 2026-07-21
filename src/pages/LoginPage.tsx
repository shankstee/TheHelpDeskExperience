import { useState } from "react";
import {
  Button,
  Caption1,
  Divider,
  Field,
  Input,
  Link,
  Spinner,
  Switch,
  Tab,
  TabList,
  Text,
  Title3,
} from "@fluentui/react-components";
import {
  HeadsetRegular,
  PersonRegular,
  PeopleTeamRegular,
  MailRegular,
  LockClosedRegular,
} from "@fluentui/react-icons";
import { demoSignIn, signIn, signUp } from "../lib/auth";
import type { Role, Session } from "../lib/types";

interface LoginPageProps {
  onSignIn: (session: Session) => void;
}

type Mode = "signin" | "signup";

const fakeLatency = () => new Promise((resolve) => setTimeout(resolve, 450));

export default function LoginPage({ onSignIn }: LoginPageProps) {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teamRole, setTeamRole] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const next: typeof errors = {};
    if (mode === "signup" && !name.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Please enter a valid email.";
    if (!password) next.password = "Please enter a password.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setBusy(true);
    await fakeLatency();
    const role: Role = teamRole ? "team" : "user";
    onSignIn(mode === "signup" ? signUp(name, email, role) : signIn(email));
  };

  const demo = async (role: Role) => {
    setBusy(true);
    await fakeLatency();
    onSignIn(demoSignIn(role));
  };

  return (
    <div className="login-shell">
      <aside className="brand-panel">
        <div className="brand-logo-row rise">
          <div className="logo-mark" aria-hidden="true">
            <HeadsetRegular />
          </div>
          The Helpdesk Experience
        </div>

        <div className="brand-hero rise" style={{ animationDelay: "80ms" }}>
          <h1>
            Log it. Track it.
            <br />
            Fix it.
          </h1>
          <p>
            A support ticketing desk for teams — submit requests, follow their progress, and keep
            the whole queue moving.
          </p>
        </div>

        <div className="provenance rise" style={{ animationDelay: "160ms" }}>
          Originally built in 2019 as a take-home project for a Microsoft interview — a working
          React + Office UI Fabric app with a C#/ASP.NET backend. Rebuilt in 2026 on Fluent UI v9,
          React 19, and Vite.{" "}
          <Link href="https://github.com/shankstee/TheHelpDeskExperience" target="_blank" inline>
            See the code
          </Link>
        </div>
      </aside>

      <main className="auth-panel">
        <div className="auth-card rise" style={{ animationDelay: "120ms" }}>
          <Title3>{mode === "signin" ? "Welcome back" : "Create your account"}</Title3>

          <TabList
            selectedValue={mode}
            onTabSelect={(_, data) => {
              setMode(data.value as Mode);
              setErrors({});
            }}
          >
            <Tab value="signin">Sign in</Tab>
            <Tab value="signup">Create account</Tab>
          </TabList>

          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}
          >
            {mode === "signup" && (
              <Field label="Full name" validationMessage={errors.name}>
                <Input
                  contentBefore={<PersonRegular />}
                  value={name}
                  onChange={(_, data) => setName(data.value)}
                  placeholder="Ada Lovelace"
                />
              </Field>
            )}
            <Field label="Email" validationMessage={errors.email}>
              <Input
                type="email"
                contentBefore={<MailRegular />}
                value={email}
                onChange={(_, data) => setEmail(data.value)}
                placeholder="you@company.com"
              />
            </Field>
            <Field label="Password" validationMessage={errors.password} hint="Demo only — any password works.">
              <Input
                type="password"
                contentBefore={<LockClosedRegular />}
                value={password}
                onChange={(_, data) => setPassword(data.value)}
                placeholder="••••••••"
              />
            </Field>
            {mode === "signup" && (
              <Switch
                checked={teamRole}
                onChange={(_, data) => setTeamRole(data.checked)}
                label={teamRole ? "Helpdesk Team Member" : "Helpdesk User"}
              />
            )}
            <Button type="submit" appearance="primary" disabled={busy} size="large">
              {busy ? <Spinner size="tiny" /> : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <Divider>just exploring?</Divider>

          <div className="demo-buttons">
            <Button icon={<PersonRegular />} disabled={busy} onClick={() => void demo("user")}>
              Demo as User
            </Button>
            <Button icon={<PeopleTeamRegular />} disabled={busy} onClick={() => void demo("team")}>
              Demo as Team
            </Button>
          </div>

          <Caption1 align="center" style={{ color: "var(--colorNeutralForeground3)" }}>
            <Text size={200}>
              Demo app — accounts and tickets live only in your browser's local storage.
            </Text>
          </Caption1>
        </div>
      </main>
    </div>
  );
}
