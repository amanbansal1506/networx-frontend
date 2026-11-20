import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Rocket, Users } from "lucide-react";
import Logo from "@/components/Logo";

export default function Landing() {
  return <div className="classic-landing">
    <header className="classic-public-header">
      <Logo />
      <nav aria-label="Landing navigation">
        <Link href="/home"><Rocket size={21}/> <span>Top Content</span></Link>
        <Link href="/mynetwork"><Users size={21}/> <span>People</span></Link>
        <Link href="/jobs"><BriefcaseBusiness size={21}/> <span>Jobs</span></Link>
      </nav>
      <div className="classic-public-actions"><Link className="btn btn-outline" href="/sign-in">Sign in</Link><Link className="btn btn-primary" href="/sign-up">Register Now</Link></div>
    </header>
    <main className="classic-hero">
      <div className="classic-hero-copy">
        <h1>Find Jobs, Connections, and Insights to Grow Your Career</h1>
        <p>Join a community of professionals. Discover opportunities, share your expertise, and build a network that lasts a lifetime.</p>
        <Link href="/sign-up" className="btn btn-primary classic-hero-cta">Get Started <ArrowRight size={21}/></Link>
        <div className="classic-hero-small">New to NetworX? <Link href="/sign-up">Sign up</Link></div>
      </div>
      <img className="classic-hero-image" src="/assets/landingPage.png" alt="Professionals connecting and finding opportunities" width="900" height="720"/>
    </main>
  </div>;
}
