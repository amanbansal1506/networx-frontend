import {MessageCircle,ArrowRight} from "lucide-react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
export default function Messages(){return <div className="content-stack"><div className="page-heading"><div className="eyebrow"><MessageCircle size={15}/> YOUR CONVERSATIONS</div><h1>Messages</h1><p>Make every conversation count.</p></div><div className="panel"><EmptyState icon={MessageCircle} title="Messaging is on the roadmap" description="Your current Express backend does not include messaging endpoints or real-time chat. This page is intentionally a placeholder until those APIs are built." action={<Link href="/mynetwork" className="btn btn-primary">Explore connections <ArrowRight size={16}/></Link>}/></div></div>}
