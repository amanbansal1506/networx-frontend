import {BriefcaseBusiness,ArrowRight} from "lucide-react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
export default function Jobs(){return <div className="content-stack"><div className="page-heading"><div className="eyebrow"><BriefcaseBusiness size={15}/> FIND YOUR NEXT STEP</div><h1>Jobs</h1><p>Opportunity meets preparation.</p></div><div className="panel"><EmptyState icon={BriefcaseBusiness} title="Jobs are coming next" description="The reconstructed backend doesn't yet have job posting or application routes. Once those APIs are added, this space can show real opportunities without mock listings." action={<Link href="/home" className="btn btn-primary">Explore the feed <ArrowRight size={16}/></Link>}/></div></div>}
