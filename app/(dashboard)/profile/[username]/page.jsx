"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Globe2, MapPin, Pencil, UserCheck, UserPlus, X } from "lucide-react";
import { api } from "@/lib/api";
import { cleanHttpUrl } from "@/lib/format";
import { useAuth } from "@/context/AuthContext";
import Avatar from "@/components/Avatar";
import Notice from "@/components/Notice";
import PostList from "@/components/PostList";
import ProfileEditor from "@/components/ProfileEditor";
import ProfileSection from "@/components/ProfileSection";

export default function ProfilePage() {
  const params = useParams(); const identifier = decodeURIComponent(params.username);
  const {user:current,refresh}=useAuth();
  const target = identifier === "me" ? current?.username : identifier;
  const [profile,setProfile]=useState(null); const [connection,setConnection]=useState(null);const [count,setCount]=useState(0);const [loading,setLoading]=useState(true);const [error,setError]=useState("");const [success,setSuccess]=useState("");const [editing,setEditing]=useState(false);const [busy,setBusy]=useState(false);
  const getProfile=useCallback(async()=>{if(!target)return;setLoading(true);try{const d=await api(`/api/users/${encodeURIComponent(target)}`);setProfile(d.user);setConnection(d.connection);setCount(d.connections_count||0);setError("")}catch(err){setError(err.message)}finally{setLoading(false)}},[target]);
  useEffect(()=>{getProfile()},[getProfile]);
  const own=profile?.user_id===current?.user_id;
  const incoming=connection?.status==="pending"&&connection.recipient_id===current?.user_id;
  const outgoing=connection?.status==="pending"&&!incoming;
  async function connect(method,path,body){setBusy(true);setError("");setSuccess("");try{await api(path,{method,...(body?{body}:{})});setSuccess("Connection updated.");await getProfile()}catch(err){setError(err.message)}finally{setBusy(false)}}
  const cover=cleanHttpUrl(profile?.cover_pic);
  return <div className="content-stack profile-page"><Link href="/home" className="back-link"><ArrowLeft size={17}/> Back to feed</Link><Notice message={error}/><Notice message={success} success/>{loading&&!profile&&<p className="muted">Loading profile…</p>}
    {profile&&<><section className="panel profile-hero"><div className="profile-cover" style={cover?{backgroundImage:`linear-gradient(0deg,rgba(26,34,72,.3),rgba(26,34,72,.04)),url("${cover.replaceAll('"', '%22')}")`}:undefined}><span className="cover-tag">NETWORX MEMBER</span></div><div className="profile-hero-inner"><Avatar user={profile} size="2xl" className="profile-portrait"/><div className="profile-mainline"><div><h1>{profile.full_name}</h1><p className="profile-handle">@{profile.username}</p><p className="profile-headline">{profile.headline||"Connecting, creating and growing."}</p><div className="profile-facts">{profile.location&&<span><MapPin size={15}/>{profile.location}</span>}{profile.website&&cleanHttpUrl(profile.website)&&<a href={cleanHttpUrl(profile.website)} target="_blank" rel="noopener noreferrer"><Globe2 size={15}/> Website <ArrowUpRight size={13}/></a>}<span><UserCheck size={15}/>{count} connections</span></div></div>
    <div className="profile-buttons">{own ? <button className="btn btn-primary" onClick={()=>setEditing(true)}><Pencil size={17}/> Edit profile</button> : !connection ? <button className="btn btn-primary" disabled={busy} onClick={()=>connect("POST","/api/connections/request",{recipient_id:profile.user_id})}><UserPlus size={17}/> Connect</button> : connection.status==="accepted" ? <button className="btn btn-outline" disabled={busy} onClick={()=>connect("DELETE",`/api/connections/${connection.connection_id}`)}><UserCheck size={16}/> Connected · Remove</button> : incoming ? <><button className="btn btn-primary" disabled={busy} onClick={()=>connect("PATCH",`/api/connections/${connection.connection_id}/accept`)}><Check size={16}/> Accept</button><button className="btn btn-outline" disabled={busy} onClick={()=>connect("PATCH",`/api/connections/${connection.connection_id}/reject`)}><X size={16}/> Decline</button></> : outgoing ? <button className="btn btn-outline" disabled={busy} onClick={()=>connect("DELETE",`/api/connections/${connection.connection_id}`)}>Request sent · Cancel</button> : <button className="btn btn-primary" disabled={busy} onClick={()=>connect("POST","/api/connections/request",{recipient_id:profile.user_id})}><UserPlus size={16}/> Connect</button>}</div></div></div></section>
    <section className="panel profile-section"><div className="section-card-header"><div><h2>About</h2></div></div><p className="about-copy">{profile.about || (own ? "Tell people a little about yourself. Use Edit profile to share what you're passionate about." : "This member hasn't added a bio yet.")}</p>{profile.skills?.length>0&&<><h3 className="skills-heading">Top skills</h3><div className="skill-list">{profile.skills.map((s,i)=><span key={i}>{s}</span>)}</div></>}</section>
    <ProfileSection key={`experience-${profile.user_id}`} kind="experience" userId={profile.user_id} editable={own}/>
    <ProfileSection key={`education-${profile.user_id}`} kind="education" userId={profile.user_id} editable={own}/>
    <div className="profile-posts-header"><h2>Activity</h2><span>Posts and updates</span></div><PostList key={`posts-${profile.user_id}`} endpoint={own?"/api/posts/me":`/api/users/${encodeURIComponent(profile.username)}/posts`} emptyTitle="No posts yet" emptyDescription={own?"Your first post is waiting to be written on the home feed.":"This member hasn't shared anything yet."}/>
    {editing&&<ProfileEditor user={profile} onClose={()=>setEditing(false)} onSaved={async updated=>{setProfile(updated);setEditing(false);await refresh()}}/>}
    </>}
  </div>;
}
