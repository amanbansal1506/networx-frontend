"use client";
import {useParams, useRouter} from "next/navigation";
import {useEffect,useState} from "react";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {api} from "@/lib/api";
import PostCard from "@/components/PostCard";
import Notice from "@/components/Notice";
export default function PostDetailPage(){const {id}=useParams();const router=useRouter();const [post,setPost]=useState(null);const [error,setError]=useState("");const [loading,setLoading]=useState(true);useEffect(()=>{let active=true;api(`/api/posts/${encodeURIComponent(id)}`).then(d=>{if(active)setPost(d.post)}).catch(err=>{if(active)setError(err.message)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[id]);return <div className="content-stack"><Link className="back-link" href="/home"><ArrowLeft size={17}/> Back to feed</Link><div className="page-heading"><h1>Conversation</h1><p>Good ideas deserve a great discussion.</p></div><Notice message={error}/>{loading&&<p className="muted">Loading post…</p>}{post&&<PostCard post={post} detail onDeleted={()=>router.replace("/home")}/>}</div>}
