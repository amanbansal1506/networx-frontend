"use client";
import { useCallback, useEffect, useState } from "react";
import { LoaderCircle, NotebookPen } from "lucide-react";
import { api } from "@/lib/api";
import PostCard from "./PostCard";
import EmptyState from "./EmptyState";
import Notice from "./Notice";

export default function PostList({ endpoint="/api/feed", newPost=null, emptyTitle="Your feed is just getting started", emptyDescription="Follow people and share an update to get the conversation going." }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async (nextPage=1) => {
    setBusy(true);setError("");
    try {const join=endpoint.includes("?")?"&":"?";const d=await api(`${endpoint}${join}page=${nextPage}&limit=10`);setPosts(prev=>nextPage===1?d.posts:[...prev,...d.posts]);setPage(nextPage);setHasMore(d.posts.length===10)}catch(err){setError(err.message)}finally{setBusy(false)}
  },[endpoint]);
  useEffect(()=>{load(1)},[load]);
  useEffect(()=>{if(newPost?.id) setPosts(prev=>[newPost,...prev.filter(p=>p.id!==newPost.id)])},[newPost]);
  return <div className="feed-list"><Notice message={error}/>{posts.map(post=><PostCard key={post.id} post={post} onDeleted={id=>setPosts(v=>v.filter(p=>p.id!==id))} onUpdated={updated=>setPosts(v=>v.map(p=>p.id===updated.id?updated:p))}/>)}
    {busy&&<div className="feed-loading"><LoaderCircle size={19} className="spin"/> Loading posts…</div>}
    {!busy&&!error&&!posts.length&&<div className="panel"><EmptyState icon={NotebookPen} title={emptyTitle} description={emptyDescription}/></div>}
    {!busy&&!error&&hasMore&&<button type="button" className="btn btn-outline load-more" onClick={()=>load(page+1)}>Load more posts</button>}
  </div>;
}
