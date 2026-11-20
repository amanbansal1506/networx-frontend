"use client";
import { Suspense,useEffect,useState } from "react";
import { useSearchParams,useRouter } from "next/navigation";
import {Search, Users} from "lucide-react";
import {api} from "@/lib/api";
import UserCard from "@/components/UserCard";
import EmptyState from "@/components/EmptyState";
import Notice from "@/components/Notice";
function SearchResults(){
  const qs=useSearchParams();const router=useRouter();const q=(qs.get("q")||"").trim();const [value,setValue]=useState(q);const [items,setItems]=useState([]);const [loading,setLoading]=useState(false);const [error,setError]=useState("");
  useEffect(()=>{setValue(q);if(q.length<2){setItems([]);return}let live=true;setLoading(true);setError("");api(`/api/users/search?q=${encodeURIComponent(q)}&limit=30`).then(d=>{if(live)setItems(d.users||[])}).catch(err=>{if(live)setError(err.message)}).finally(()=>{if(live)setLoading(false)});return()=>{live=false}},[q]);
  function submit(e){e.preventDefault();if(value.trim().length>=2)router.push(`/search?q=${encodeURIComponent(value.trim())}`)}
  return <div className="content-stack"><div className="page-heading"><div className="eyebrow"><Search size={15}/> FIND YOUR PEOPLE</div><h1>Discover members</h1><p>Find people by name, username, or what they do.</p></div><form onSubmit={submit} className="panel search-page-form"><Search size={20}/><input aria-label="Search members" value={value} onChange={e=>setValue(e.target.value)} placeholder="Try a name, skill, or industry…"/><button className="btn btn-primary" type="submit">Search</button></form><div className="panel results-panel"><h2>{q.length>=2?`Results for “${q}”` : "Find someone new"}</h2><Notice message={error}/>{loading&&<p className="muted">Searching…</p>}{!loading&&q.length>=2&&(items.length?items.map(u=><UserCard key={u.user_id} user={u}/>):<EmptyState icon={Users} title="No members found" description="Try a different name or keyword."/>)}{q.length<2&&<EmptyState icon={Search} title="Who are you looking for?" description="Search for at least two characters to discover people on NetworX."/>}</div></div>;
}
export default function SearchPage(){return <Suspense fallback={<p className="muted">Loading search…</p>}><SearchResults/></Suspense>}
