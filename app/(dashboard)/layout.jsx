"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MobileNav, Sidebar, TopNav } from "@/components/Nav";
import RightRail from "@/components/RightRail";
import Loading from "@/components/Loading";

export default function DashboardLayout({children}) {
  const { user, loading, error } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading && !user && !error) router.replace("/sign-in"); }, [loading,user,error,router]);
  if (loading) return <Loading />;
  if (!user && error) return <div className="error-screen"><h2>Could not connect to NetworX</h2><p>{error}</p><button className="btn btn-primary" onClick={()=>location.reload()}>Try again</button></div>;
  if (!user) return <Loading label="Redirecting to sign in…" />;
  return <><TopNav/><div className="app-shell"><Sidebar/><main className="main-content">{children}</main><RightRail/></div><MobileNav/></>;
}
