"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { api } from "@/lib/api";
import Notice from "./Notice";
const fields = [
  {name:"full_name",label:"Full name",placeholder:"Your full name",maxLength:120,required:true},
  {name:"headline",label:"Headline",placeholder:"e.g. Software Engineer | Building for the web",maxLength:200},
  {name:"location",label:"Location",placeholder:"City, Country",maxLength:160},
  {name:"website",label:"Website",placeholder:"https://yourwebsite.com",maxLength:1000},
  {name:"profile_picture",label:"Profile photo URL",placeholder:"https://...",maxLength:2000},
  {name:"cover_pic",label:"Cover image URL",placeholder:"https://...",maxLength:2000},
];
export default function ProfileEditor({user,onClose,onSaved}){
  const [form,setForm]=useState(()=>({
    full_name:user.full_name||"",headline:user.headline||"",location:user.location||"",about:user.about||"", website:user.website||"",profile_picture:user.profile_picture||"",cover_pic:user.cover_pic||"",skills:(user.skills||[]).join(", ")
  }));
  const [busy,setBusy]=useState(false);const [error,setError]=useState("");
  async function save(e){e.preventDefault();setBusy(true);setError("");try{const body={...form,skills:form.skills.split(",").map(x=>x.trim()).filter(Boolean)};if(body.skills.length>30)throw Error("Use up to 30 skills.");const d=await api("/api/users/me",{method:"PATCH",body});onSaved(d.user)}catch(err){setError(err.message)}finally{setBusy(false)}}
  return <div className="modal-overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className="modal-card" role="dialog" aria-modal="true" aria-label="Edit profile"><header className="modal-header"><div><h2>Edit your profile</h2><p>Help your network get to know you.</p></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close"><X size={20}/></button></header>
    <form onSubmit={save} className="modal-form"><div className="form-grid">{fields.map(f=><div className={`field ${f.name==="headline"?"full-span":""}`} key={f.name}><label htmlFor={`profile-${f.name}`}>{f.label}</label><input id={`profile-${f.name}`} type={f.name==="website"||f.name.endsWith("pic")||f.name==="profile_picture"?"url":"text"} name={f.name} placeholder={f.placeholder} maxLength={f.maxLength} required={f.required} value={form[f.name]} onChange={e=>setForm(v=>({...v,[f.name]:e.target.value}))}/></div>)}</div>
      <div className="field"><label htmlFor="profile-about">About me</label><textarea id="profile-about" rows={4} maxLength={5000} placeholder="Share your story, interests and goals…" value={form.about} onChange={e=>setForm(v=>({...v,about:e.target.value}))}/></div>
      <div className="field"><label htmlFor="profile-skills">Skills</label><input id="profile-skills" placeholder="React, Node.js, SQL (comma-separated)" value={form.skills} onChange={e=>setForm(v=>({...v,skills:e.target.value}))}/><small>Separate skills with commas. Up to 30 skills.</small></div>
      <Notice message={error}/><footer className="modal-footer"><button className="btn btn-outline" type="button" onClick={onClose}>Cancel</button><button className="btn btn-primary" type="submit" disabled={busy}>{busy?"Saving…":"Save profile"}</button></footer></form>
  </section></div>;
}
