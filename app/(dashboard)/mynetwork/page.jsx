"use client";
import { useCallback, useEffect, useState } from "react";
import { Check, ContactRound, UserCheck, UserPlus, Users, X } from "lucide-react";
import { api } from "@/lib/api";
import UserCard from "@/components/UserCard";
import Notice from "@/components/Notice";
import EmptyState from "@/components/EmptyState";

export default function NetworkPage() {
  const [tab,setTab]=useState("discover");
  const [suggestions,setSuggestions]=useState([]);
  const [incoming,setIncoming]=useState([]);
  const [outgoing,setOutgoing]=useState([]);
  const [connections,setConnections]=useState([]);
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState("");
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const fetchAll=useCallback(async()=>{
    setLoading(true);setError("");
    const results=await Promise.allSettled([
      api("/api/users/suggestions?limit=30"),api("/api/connections/pending?direction=incoming&limit=30"),api("/api/connections/pending?direction=outgoing&limit=30"),api("/api/connections?limit=30")
    ]);
    if(results[0].status==="fulfilled")setSuggestions(results[0].value.users||[]);
    if(results[1].status==="fulfilled")setIncoming(results[1].value.requests||[]);
    if(results[2].status==="fulfilled")setOutgoing(results[2].value.requests||[]);
    if(results[3].status==="fulfilled")setConnections(results[3].value.connections||[]);
    const failed=results.find(r=>r.status==="rejected");if(failed)setError(failed.reason?.message||"Some network data couldn't be loaded.");
    setLoading(false);
  },[]);
  useEffect(()=>{fetchAll()},[fetchAll]);
  async function act(action,id,body){setBusy(id);setError("");setMessage("");try{await api(action,{method:body?"POST":action.endsWith("/accept")||action.endsWith("/reject")?"PATCH":"DELETE",...(body?{body}:{})});setMessage("Your network has been updated.");await fetchAll()}catch(err){setError(err.message)}finally{setBusy("")}}
  const tabs=[{id:"discover",label:"Discover",count:suggestions.length},{id:"requests",label:"Requests",count:incoming.length},{id:"connections",label:"Connections",count:connections.length}];
  return <div className="content-stack"><div className="page-heading"><div className="eyebrow"><Users size={15}/> PEOPLE & POSSIBILITIES</div><h1>My Network</h1><p>Meet people who can make your next chapter even better.</p></div>
    <div className="panel network-panel"><div className="tabs" role="tablist" aria-label="Network sections">{tabs.map(t=><button key={t.id} className={tab===t.id?"selected":""} onClick={()=>setTab(t.id)} role="tab" aria-selected={tab===t.id}>{t.label}<span>{t.count}</span></button>)}</div><Notice message={error}/><Notice message={message} success/>
      <div className="network-list">{loading&&<p className="muted">Loading your network…</p>}
      {!loading&&tab==="discover"&&(suggestions.length?suggestions.map(u=><UserCard key={u.user_id} user={u} busy={busy===u.user_id} action={(m)=>act("/api/connections/request",m.user_id,{recipient_id:m.user_id})}/>):<EmptyState icon={UserPlus} title="You've explored everyone for now" description="Come back later to discover new members."/>)}
      {!loading&&tab==="requests"&&<><h3 className="subsection-title">Invitations received ({incoming.length})</h3>{incoming.length?incoming.map(r=><div className="network-request" key={r.connection_id}><UserCard user={r.user}/><div className="request-actions"><button className="btn btn-primary btn-sm" disabled={!!busy} onClick={()=>act(`/api/connections/${r.connection_id}/accept`,r.connection_id)}><Check size={15}/> Accept</button><button className="btn btn-outline btn-sm" disabled={!!busy} onClick={()=>act(`/api/connections/${r.connection_id}/reject`,r.connection_id)}><X size={15}/> Decline</button></div></div>):<p className="muted">No invitations waiting right now.</p>}
      <h3 className="subsection-title">Requests sent ({outgoing.length})</h3>{outgoing.length?outgoing.map(r=><div className="network-request" key={r.connection_id}><UserCard user={r.user}/><button className="btn btn-outline btn-sm" disabled={!!busy} onClick={()=>act(`/api/connections/${r.connection_id}`,r.connection_id)}>Cancel request</button></div>):<p className="muted">You haven&apos;t sent any pending requests.</p>}</>}
      {!loading&&tab==="connections"&&(connections.length?connections.map(c=><div className="network-request" key={c.connection_id}><UserCard user={c.user}/><button className="btn btn-outline btn-sm" disabled={!!busy} onClick={()=>act(`/api/connections/${c.connection_id}`,c.connection_id)}>Remove</button></div>):<EmptyState icon={UserCheck} title="Your circle is just beginning" description="Discover new people and send your first connection request."/>)}
      </div></div>
  </div>;
}
