"use client";
import Link from "next/link";
import { ArrowUpRight, UserPlus } from "lucide-react";
import Avatar from "./Avatar";
import { urls } from "@/lib/api";
export default function UserCard({ user, action, busy = false, label = "Connect", compact = false }) {
  return <div className={`member-card ${compact ? "member-card-compact" : ""}`}>
    <Link href={urls.profile(user.username)}><Avatar user={user} size="lg" /></Link>
    <div className="member-info"><Link href={urls.profile(user.username)} className="member-name">{user.full_name || user.username}</Link>
      <span className="member-handle">@{user.username}</span><p>{user.headline || "NetworX member"}</p>
    </div>
    {action ? <button type="button" className="btn btn-outline btn-sm" onClick={() => action(user)} disabled={busy}><UserPlus size={15}/>{busy ? "Working…" : label}</button> :
      <Link href={urls.profile(user.username)} className="icon-button" aria-label={`View ${user.full_name || user.username}`}><ArrowUpRight size={18}/></Link>}
  </div>;
}
