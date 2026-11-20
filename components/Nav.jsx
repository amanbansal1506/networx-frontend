"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, BriefcaseBusiness, ChevronDown, Home, LogOut, MessageSquare, Search, UserRound, Users } from "lucide-react";
import Logo from "./Logo";
import Avatar from "./Avatar";
import { useAuth } from "@/context/AuthContext";
import { urls } from "@/lib/api";

export const navigation = [
  { href:"/home", label:"Home", icon:Home },
  { href:"/mynetwork", label:"Network", icon:Users },
  { href:"/jobs", label:"Jobs", icon:BriefcaseBusiness },
  { href:"/messages", label:"Messaging", icon:MessageSquare },
  { href:"/notifications", label:"Notifications", icon:Bell }
];
export function TopNav() {
  const {user, logout}=useAuth();
  const pathname=usePathname();
  const router=useRouter();
  const [search,setSearch]=useState("");
  const [menu,setMenu]=useState(false);
  const [busy,setBusy]=useState(false);
  function submit(e) {e.preventDefault(); if(search.trim().length>=2)router.push(`/search?q=${encodeURIComponent(search.trim())}`)}
  async function signOut() {setBusy(true);try {await logout();router.replace("/sign-in")}catch{setBusy(false)}}
  return <header className="site-header classic-site-header">
    <div className="header-inner">
      <div className="header-start"><Logo href="/home"/><form className="header-search" onSubmit={submit} role="search"><Search size={18}/><input aria-label="Search people" placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)}/></form></div>
      <nav className="header-links" aria-label="Main navigation">{navigation.map(({href,label,icon:Icon}) => <Link key={href} className={pathname===href?"active":""} href={href}><Icon size={23}/><span>{label}</span></Link>)}</nav>
      <div className="header-actions"><button className="menu-trigger" type="button" onClick={()=>setMenu(m=>!m)} aria-label="Account menu" aria-expanded={menu}><Avatar user={user} size="sm"/><ChevronDown size={14}/></button>
      {menu && <div className="account-menu"><Link href={urls.profile(user?.username)} onClick={()=>setMenu(false)}><UserRound size={17}/> View profile</Link><button disabled={busy} onClick={signOut}><LogOut size={17}/> Sign out</button></div>}</div>
    </div>
  </header>;
}
export function Sidebar() {
  const {user}=useAuth();
  return <aside className="left-sidebar classic-left-sidebar"><div className="side-user"><div className="side-cover"/><div className="side-user-body"><Link href={urls.profile(user?.username)}><Avatar user={user} size="xl"/></Link><Link href={urls.profile(user?.username)} className="side-name">{user?.full_name||"Member"}</Link><p>{user?.headline||"Add a headline to your profile"}</p><Link className="side-profile-link" href={urls.profile(user?.username)}>View Profile</Link></div></div></aside>;
}
export function MobileNav() {
  const pathname=usePathname();
  const {user}=useAuth();
  const links=[navigation[0],navigation[1],navigation[4],{href:urls.profile(user?.username),label:"Profile",icon:UserRound}];
  return <nav className="mobile-bottom-nav" aria-label="Mobile navigation">{links.map(({href,label,icon:Icon})=><Link className={pathname===href?"active":""} key={label} href={href}><Icon size={20}/><span>{label}</span></Link>)}</nav>;
}
