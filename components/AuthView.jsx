"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, Sparkles, Users } from "lucide-react";
import Logo from "./Logo";
import Notice from "./Notice";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

export default function AuthView({ mode = "login" }) {
  const signup = mode === "signup";
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ username:"", full_name:"", email:"", password:"", type:"person" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  function onChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }
  async function submit(e) {
    e.preventDefault(); setError(""); setSuccess(""); setLoading(true);
    try {
      if (signup) {
        await api("/api/auth/signup", { method: "POST", body: form });
        setSuccess("Your account is ready! Taking you to your feed…");
        await login(form.username, form.password);
      } else await login(form.username, form.password);
      router.replace("/home");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  return <div className="auth-layout"><section className="auth-main"><div className="auth-main-inner"><div className="auth-top"><Logo/><Link href="/" className="back-link"><ArrowLeft size={16}/> Back to home</Link></div><div className="auth-body"><span className="auth-eyebrow">{signup ? "REGISTER" : "SIGN IN"}</span><h1>{signup ? <>Join NetworX</> : <>Welcome Back</>}</h1><p className="auth-description">{signup ? "Create your account to connect with professionals." : "Sign in to continue to your NetworX account."}</p>
    <form onSubmit={submit} className="auth-form">
      {signup && <><div className="field"><label htmlFor="full_name">Full name</label><input id="full_name" name="full_name" value={form.full_name} onChange={onChange} placeholder="Your full name" maxLength={120} required autoComplete="name"/></div>
        <div className="field"><label htmlFor="email">Email address</label><input type="email" id="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" maxLength={254} required autoComplete="email"/></div></>}
      <div className="field"><label htmlFor="username">{signup ? "Choose a username" : "Username or email"}</label><input id="username" name="username" value={form.username} onChange={onChange} placeholder={signup ? "e.g. alexmorgan" : "Enter your username or email"} minLength={signup ? 3 : undefined} maxLength={254} required autoComplete={signup ? "username" : "username"}/></div>
      <div className="field"><label htmlFor="password">Password</label><div className="input-icon-wrap"><input id="password" name="password" type={show ? "text" : "password"} value={form.password} onChange={onChange} placeholder={signup ? "At least 8 characters" : "Enter your password"} minLength={signup ? 8 : undefined} required autoComplete={signup ? "new-password" : "current-password"}/><button type="button" onClick={()=>setShow(v=>!v)} className="password-toggle" aria-label={show ? "Hide password" : "Show password"}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></div>
      {signup && <div className="field"><label htmlFor="type">I&apos;m joining as</label><select name="type" id="type" value={form.type} onChange={onChange}><option value="person">An individual</option><option value="company">A company</option></select></div>}
      <Notice message={error}/><Notice message={success} success/>
      <button className="btn btn-primary btn-lg auth-submit" type="submit" disabled={loading}>{loading ? "Please wait…" : signup ? "Create account" : "Sign in"}<ArrowRight size={18}/></button>
      <p className="auth-toggle">{signup ? "Already part of NetworX?" : "New to NetworX?"} <Link href={signup ? "/sign-in" : "/sign-up"}>{signup ? "Sign in" : "Create an account"}</Link></p>
    </form></div><div className="auth-bottom"><ShieldCheck size={16}/> Your connection is protected with secure authentication.</div></div></section>
    <section className="auth-visual"><div className="auth-visual-content"><span className="visual-tag"><Sparkles size={15}/> Made for curious minds</span><h2>Good connections make <em>great things</em> happen.</h2><p>Where ambition meets community and every new conversation is a fresh opportunity.</p><div className="visual-network"><div className="visual-line vl1"/><div className="visual-line vl2"/><div className="visual-line vl3"/><span className="visual-node n1">A</span><span className="visual-node n2">M</span><span className="visual-node n3"><Users size={24}/></span><span className="visual-node n4">J</span><span className="visual-node n5">S</span></div><div className="visual-caption"><LockKeyhole size={16}/> A community built on real connections</div></div></section>
  </div>;
}
