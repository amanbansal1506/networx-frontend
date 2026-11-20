export default function Loading({ label = "Loading your NetworX experience…" }) {
  return <div className="page-loading"><div className="spinner"/><span>{label}</span></div>;
}
