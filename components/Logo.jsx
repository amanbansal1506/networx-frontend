import Link from "next/link";
export default function Logo({href="/", light=false}) {
  return <Link href={href} className={`brand ${light ? "brand-light" : ""}`} aria-label="NetworX home">NetworX</Link>;
}
