"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Globe2, Heart, LockKeyhole, MessageCircle, MoreHorizontal, Send, Trash2, Pencil, X } from "lucide-react";
import { api, urls } from "@/lib/api";
import { cleanHttpUrl, timeAgo } from "@/lib/format";
import Avatar from "./Avatar";
import Notice from "./Notice";
import { useAuth } from "@/context/AuthContext";

export default function PostCard({ post: originalPost, onDeleted, onUpdated, detail = false }) {
  const { user } = useAuth();
  const [post, setPost] = useState(originalPost);
  const [liked, setLiked] = useState(originalPost.is_liked);
  const [likes, setLikes] = useState(originalPost.likes_count || 0);
  const [commentsOpen, setCommentsOpen] = useState(detail);
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsMore, setCommentsMore] = useState(false);
  const [commentCount, setCommentCount] = useState(originalPost.comments_count || 0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(originalPost.content);
  const [menu, setMenu] = useState(false);
  const own = user?.user_id === post.user_id;
  const author = post.author || {};
  const media = cleanHttpUrl(post.media_url);

  useEffect(() => {
    if (!detail) return;
    let active = true;
    api(`/api/posts/${originalPost.id}/comments?page=1&limit=15`)
      .then((data) => {
        if (!active) return;
        setComments(data.comments || []);
        setCommentsPage(1);
        setCommentsMore((data.comments || []).length === 15);
        setCommentsLoaded(true);
      })
      .catch((err) => { if (active) setError(err.message); });
    return () => { active = false; };
  }, [detail, originalPost.id]);

  async function toggleLike() {
    if (busy) return;
    setBusy(true);setError("");
    try { await api(`/api/posts/${post.id}/like`, { method:liked ? "DELETE" : "POST" }); setLiked(!liked); setLikes(v=>Math.max(0,v+(liked?-1:1))); }
    catch(err){setError(err.message)} finally{setBusy(false)}
  }
  async function loadComments(page = 1) {
    try { const data = await api(`/api/posts/${post.id}/comments?page=${page}&limit=15`); setComments(v=>page===1 ? data.comments : [...v,...data.comments]);setCommentsLoaded(true); setCommentsPage(page);setCommentsMore(data.comments.length===15); }
    catch(err){setError(err.message)}
  }
  function toggleComments() { if (!commentsOpen && !commentsLoaded) loadComments();setCommentsOpen(v=>!v); }
  async function sendComment(e) {
    e.preventDefault(); if(!commentText.trim())return;
    setBusy(true);setError("");
    try { const d=await api(`/api/posts/${post.id}/comments`, {method:"POST",body:{content:commentText.trim()}});setComments(v=>[...v,d.comment]);setCommentCount(v=>v+1);setCommentText("");setCommentsLoaded(true); }
    catch(err){setError(err.message)}finally{setBusy(false)}
  }
  async function removeComment(comment) {
    setBusy(true);try{await api(`/api/posts/${post.id}/comments/${comment.id || comment.comment_id}`,{method:"DELETE"});setComments(v=>v.filter(c=>(c.id||c.comment_id)!==(comment.id||comment.comment_id)));setCommentCount(v=>Math.max(0,v-1))}catch(err){setError(err.message)}finally{setBusy(false)}
  }
  async function saveEdit(e) {
    e.preventDefault();setBusy(true);setError("");
    try{const d=await api(`/api/posts/${post.id}`,{method:"PATCH",body:{content:draft}});setPost(d.post);setEditing(false);onUpdated?.(d.post)}catch(err){setError(err.message)}finally{setBusy(false)}
  }
  async function deletePost() {
    setMenu(false);if (!window.confirm("Delete this post? This can't be undone."))return;
    setBusy(true);try{await api(`/api/posts/${post.id}`,{method:"DELETE"});onDeleted?.(post.id)}catch(err){setError(err.message);setBusy(false)}
  }
  return <article className="panel post-card"><div className="post-header"><Link href={urls.profile(author.username)}><Avatar user={author} size="lg"/></Link><div className="post-author"><Link href={urls.profile(author.username)} className="post-name">{author.full_name || author.username || "Member"}</Link><p>{author.headline || `@${author.username || "member"}`}</p><div className="post-meta"><time>{timeAgo(post.created_at)}</time><span>·</span>{post.visibility==="connections"?<LockKeyhole size={12}/>:<Globe2 size={12}/>}</div></div>
    {own && <div className="post-menu-wrap"><button type="button" className="icon-button" onClick={()=>setMenu(v=>!v)} aria-label="Post options" aria-expanded={menu}><MoreHorizontal size={21}/></button>{menu && <div className="post-menu"><button onClick={()=>{setEditing(true);setMenu(false)}}><Pencil size={15}/> Edit post</button><button className="danger" onClick={deletePost}><Trash2 size={15}/> Delete post</button></div>}</div>}
  </div>
  {editing ? <form className="post-edit" onSubmit={saveEdit}><textarea rows={4} maxLength={5000} value={draft} onChange={e=>setDraft(e.target.value)}/><div className="row-between"><button type="button" className="btn btn-quiet btn-sm" onClick={()=>setEditing(false)}>Cancel</button><button type="submit" className="btn btn-primary btn-sm" disabled={busy || (!draft.trim() && !media)}>Save changes</button></div></form> : <div className="post-body">{post.content && <p className="post-copy">{post.content}</p>}{media && <div className="post-media"><img src={media} alt="Media attached to post" loading="lazy" onError={e=>{e.currentTarget.style.display="none"}}/></div>}</div>}
  <div className="post-stats"><span><span className="stats-heart"><Heart size={11} fill="currentColor"/></span> {likes} {likes===1?"like":"likes"}</span><button onClick={toggleComments}>{commentCount} {commentCount===1?"comment":"comments"}</button></div>
  <div className="post-actions"><button type="button" onClick={toggleLike} disabled={busy} className={liked ? "is-liked" : ""}><Heart size={19} fill={liked?"currentColor":"none"}/> {liked?"Liked":"Like"}</button><button type="button" onClick={toggleComments}><MessageCircle size={19}/> Comment</button><Link href={`/post/${post.id}`}><ArrowUpRight size={18}/> View post</Link></div>
  <Notice message={error}/>
  {commentsOpen && <div className="comments"><form onSubmit={sendComment} className="comment-form"><Avatar user={user} size="sm"/><input value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder="Add a thoughtful comment…" maxLength={2000} aria-label="Write a comment"/><button type="submit" className="comment-submit" disabled={busy || !commentText.trim()} aria-label="Post comment"><Send size={18}/></button></form>
      {commentsLoaded ? comments.length ? <div className="comment-list">{comments.map(c=><div className="comment-row" key={c.id||c.comment_id}><Avatar user={c} size="sm"/><div className="comment-content"><div className="comment-head"><Link href={urls.profile(c.username)}>{c.full_name||c.username}</Link><small>{timeAgo(c.created_at)}</small>{(c.user_id===user?.user_id||own)&&<button aria-label="Delete comment" disabled={busy} onClick={()=>removeComment(c)}><X size={14}/></button>}</div><p>{c.content}</p></div></div>)}{commentsMore && <button className="btn btn-quiet btn-sm" onClick={()=>loadComments(commentsPage+1)}>Load older comments</button>}</div> : <p className="muted small" style={{paddingTop:12}}>Be the first to comment.</p> : <p className="muted small" style={{paddingTop:12}}>Loading comments…</p>}
    </div>}
  </article>;
}
