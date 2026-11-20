"use client";
import { useState } from "react";
import { ArrowRight, Globe2, ImagePlus, LockKeyhole, Send, X } from "lucide-react";
import { api } from "@/lib/api";
import { cleanHttpUrl } from "@/lib/format";
import Avatar from "./Avatar";
import Notice from "./Notice";

export default function PostComposer({ user, onCreated }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");
  const [showMedia, setShowMedia] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function publish(e) {
    e.preventDefault(); setError("");
    if (!content.trim() && !media.trim()) { setError("Write something or add an image URL."); return; }
    if (media.trim() && !cleanHttpUrl(media.trim())) { setError("Please enter a valid http(s) image URL."); return; }
    setBusy(true);
    try {
      const data = await api("/api/posts", { method:"POST", body:{ content:content.trim(),media_url:media.trim() || null, visibility } });
      setContent(""); setMedia(""); setShowMedia(false); setOpen(false); setVisibility("public");
      onCreated?.(data.post);
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <section className="panel composer"><div className="composer-top"><Avatar user={user} size="lg"/><button className="composer-start" onClick={()=>setOpen(true)}>Share an update, {user?.full_name?.split(" ")[0] || "friend"}… <span><ArrowRight size={18}/></span></button></div>
    {!open ? <div className="composer-actions"><button onClick={()=>{setOpen(true);setShowMedia(true)}}><ImagePlus size={19}/> Photo by URL</button><button onClick={()=>setOpen(true)}><Send size={18}/> Write a post</button><span>Let your ideas travel.</span></div> : <form className="composer-form" onSubmit={publish}>
      <div className="composer-form-head"><strong>Create a post</strong><button type="button" className="icon-button" onClick={()=>setOpen(false)} aria-label="Close composer"><X size={18}/></button></div>
      <textarea autoFocus value={content} onChange={e=>setContent(e.target.value)} maxLength={5000} rows={5} placeholder="What have you been working on? Share a lesson, idea or milestone…" />
      {showMedia && <div className="field"><label htmlFor="media-url">Image URL</label><input id="media-url" type="url" value={media} onChange={e=>setMedia(e.target.value)} placeholder="https://example.com/photo.jpg"/><small>Paste a publicly accessible image URL. File uploads aren't supported by the current backend.</small></div>}
      <Notice message={error}/><div className="composer-form-footer"><div className="composer-options"><button className="icon-button" type="button" title="Add image URL" onClick={()=>setShowMedia(x=>!x)}><ImagePlus size={20}/></button><label className="visibility-picker">{visibility === "public" ? <Globe2 size={16}/> : <LockKeyhole size={16}/>}<select aria-label="Who can see this post" value={visibility} onChange={e=>setVisibility(e.target.value)}><option value="public">Anyone</option><option value="connections">Connections only</option></select></label></div><div className="composer-publish"><span>{content.length}/5000</span><button className="btn btn-primary" type="submit" disabled={busy || (!content.trim() && !media.trim())}>{busy ? "Publishing…" : "Publish post"} <ArrowRight size={16}/></button></div></div>
    </form>}
  </section>;
}
