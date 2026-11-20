"use client";
import Link from "next/link";
export default function RightRail() {
  return <aside className="right-rail"><section className="panel classic-news"><h3>NetworX</h3><p>Your professional network in one place.</p><ul><li>Share your updates</li><li>Connect with people</li><li>Build your profile</li></ul><Link href="/mynetwork" className="inline-link">Explore people</Link></section><div className="classic-footer">NetworX © 2026</div></aside>;
}
