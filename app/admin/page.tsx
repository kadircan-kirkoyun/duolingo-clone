"use client";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { useAuth } from "@/lib/auth-context";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) redirect("/");

  return (
    <div>
      <App />
    </div>
  );
};

export default AdminPage;
