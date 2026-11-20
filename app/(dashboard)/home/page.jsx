"use client";
import { useState } from "react";
import PostComposer from "@/components/PostComposer";
import PostList from "@/components/PostList";
import { useAuth } from "@/context/AuthContext";
export default function HomePage() {
  const {user}=useAuth();
  const [newPost,setNewPost]=useState(null);
  return <div className="content-stack classic-home">
    <PostComposer user={user} onCreated={setNewPost}/>
    <div className="classic-sort-label">Recent posts</div>
    <PostList endpoint="/api/feed" newPost={newPost}/>
  </div>;
}
