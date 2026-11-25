
export function Spinner({ className = "" }) {
  return <span className={`loading loading-spinner ${className}`} aria-label="Loading" />;
}


export function PageLoader({ message = "Loading..." }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4" role="status">
      <span className="loading loading-ring loading-lg text-primary" />
      <p className="text-sm font-semibold text-base-content/70">{message}</p>
    </div>
  );
}


export function SectionLoader({ message = "Loading..." }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3" role="status">
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm text-base-content/70">{message}</p>
    </div>
  );
}
