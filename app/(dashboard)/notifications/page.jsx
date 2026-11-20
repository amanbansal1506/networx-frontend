"use client";
import { useCallback,useEffect,useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck, Heart, MessageCircle, UserCheck, UserPlus } from "lucide-react";
import { api,urls } from "@/lib/api";
import {timeAgo} from "@/lib/format";
import Avatar from "@/components/Avatar";
import Notice from "@/components/Notice";
import EmptyState from "@/components/EmptyState";

const notificationIcons={connection_request:UserPlus,connection_accepted:UserCheck,post_like:Heart,post_comment:MessageCircle};
export default function NotificationsPage(){
  const [items,setItems]=useState([]);const [unread,setUnread]=useState(0);const [loading,setLoading]=useState(true);const [error,setError]=useState("");const [busy,setBusy]=useState(false);const [page,setPage]=useState(1);const [more,setMore]=useState(false);
  const load=useCallback(async(p=1)=>{setLoading(true);setError("");try{const d=await api(`/api/notifications?page=${p}&limit=20`);setItems(v=>p===1?d.notifications:[...v,...d.notifications]);setUnread(d.unread_count);setMore(d.notifications.length===20);setPage(p)}catch(err){setError(err.message)}finally{setLoading(false)}},[]);
  useEffect(()=>{load()},[load]);
  async function markAll(){setBusy(true);try{await api("/api/notifications/read-all",{method:"PATCH"});setItems(v=>v.map(n=>({...n,is_read:true})));setUnread(0)}catch(err){setError(err.message)}finally{setBusy(false)}}
  async function markOne(n){if(n.is_read)return;try{await api(`/api/notifications/${n.notification_id}/read`,{method:"PATCH"});setItems(v=>v.map(x=>x.notification_id===n.notification_id?{...x,is_read:true}:x));setUnread(v=>Math.max(0,v-1))}catch(err){setError(err.message)}}
  return <div className="content-stack"><div className="page-heading"><div className="eyebrow"><Bell size={15}/> STAY IN THE LOOP</div><h1>Notifications</h1><p>All the little moments that keep your network moving.</p></div><div className="panel notifications-panel"><div className="panel-toolbar"><div><h2>Activity</h2><span>{unread} unread</span></div><button className="btn btn-outline btn-sm" onClick={markAll} disabled={busy||unread===0}><CheckCheck size={16}/> Mark all as read</button></div><Notice message={error}/>
    {!loading&&!items.length&&<EmptyState icon={Bell} title="It's quiet here" description="When someone connects with you, comments, or likes your posts, you'll see it here."/>}
    {items.map(n=>{const Icon=notificationIcons[n.type]||Bell;const person={full_name:n.actor_full_name,username:n.actor_username,profile_picture:n.actor_profile_picture};const href=n.type?.startsWith("connection")?"/mynetwork":n.entity_id?`/post/${n.entity_id}`:"/home";return <div className={`notification-item ${n.is_read?"":"notification-unread"}`} key={n.notification_id}><Avatar user={person} size="md"/><span className="notification-icon"><Icon size={15}/></span><div className="notification-text"><Link href={href} onClick={()=>markOne(n)}><strong>{n.actor_full_name||"Someone"}</strong> · {n.message}</Link><time>{timeAgo(n.created_at)}</time></div>{!n.is_read&&<button title="Mark as read" aria-label="Mark notification as read" className="unread-dot" onClick={()=>markOne(n)}/>}</div>})}
    {loading&&<p className="feed-loading">Loading activity…</p>}{!loading&&more&&<button className="btn btn-outline load-more" onClick={()=>load(page+1)}>Older notifications</button>}
  </div></div>;
}
