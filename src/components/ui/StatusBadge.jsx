import { titleCase } from "@/lib/format";


const COLORS = {
  pending: "badge-warning",
  approved: "badge-success",
  rejected: "badge-error",
  paid: "badge-success",
  unpaid: "badge-warning",
  confirmed: "badge-info",
  completed: "badge-success",
  cancelled: "badge-error",
  awaiting_payment: "badge-warning",
  available: "badge-success",
  unavailable: "badge-error",
  customer: "badge-info",
  owner: "badge-accent",
  admin: "badge-secondary",
  blocked: "badge-error",
  active: "badge-success",
};

export default function StatusBadge({ status }) {
  return <span className={`badge badge-soft font-semibold ${COLORS[status] || "badge-neutral"}`}>{titleCase(status)}</span>;
}
