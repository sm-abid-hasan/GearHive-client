import Link from "next/link";


export default function EmptyState({ title, message, actionLabel, actionHref, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-base-300 bg-base-200/60 px-6 py-14 text-center">
      {Icon && <Icon className="mb-4 text-5xl text-primary/70" aria-hidden="true" />}
      <h3 className="text-xl font-bold">{title}</h3>
      {message && <p className="mt-2 max-w-md text-base-content/70">{message}</p>}
      {actionLabel && actionHref && (
        <Link href={actionHref} className="btn btn-primary mt-6">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}


export function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div role="alert" className="alert alert-error alert-soft flex-col items-start gap-3 sm:flex-row sm:items-center">
      <span className="flex-1 font-medium">{message}</span>
      {onRetry && (
        <button type="button" className="btn btn-sm btn-error" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
