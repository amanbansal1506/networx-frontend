import { AlertCircle, CheckCircle2 } from "lucide-react";
export default function Notice({ message, success = false }) {
  if (!message) return null;
  return <div className={`notice ${success ? "notice-success" : "notice-error"}`} role={success ? "status" : "alert"}>
    {success ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />} <span>{message}</span>
  </div>;
}
