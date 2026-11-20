"use client";
import { useState } from "react";
import { initials, cleanHttpUrl } from "@/lib/format";
export default function Avatar({ user, size = "md", className = "" }) {
  const [failed, setFailed] = useState(false);
  const name = user?.full_name || user?.username || "Member";
  const url = cleanHttpUrl(user?.profile_picture || user?.author_profile_picture);
  return <span aria-label={name} className={`avatar avatar-${size} ${className}`}>
    {url && !failed ? <img src={url} alt="" onError={() => setFailed(true)} /> : <span>{initials(name)}</span>}
  </span>;
}
