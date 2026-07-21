import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { getSession, signOut } from "./lib/auth";
import type { Session } from "./lib/types";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [session, setSession] = useState<Session | null>(() => getSession());

  const handleSignOut = () => {
    signOut();
    setSession(null);
  };

  const home = session?.role === "team" ? "/tickets/all" : "/tickets";

  return (
    <Routes>
      <Route
        path="/"
        element={session ? <Navigate to={home} replace /> : <LoginPage onSignIn={setSession} />}
      />
      <Route
        path="/tickets"
        element={
          session ? (
            <DashboardPage view="my" session={session} onSignOut={handleSignOut} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/tickets/all"
        element={
          session?.role === "team" ? (
            <DashboardPage view="all" session={session} onSignOut={handleSignOut} />
          ) : (
            <Navigate to={session ? "/tickets" : "/"} replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
