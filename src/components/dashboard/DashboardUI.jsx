
export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-base-content/70">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}


export function Panel({ title, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-base-300 bg-base-100 ${className}`}>
      {title && <h2 className="border-b border-base-300 px-5 py-4 text-lg font-bold">{title}</h2>}
      {children}
    </section>
  );
}


export function TableWrap({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">{children}</table>
    </div>
  );
}


export function StatCard({ label, value, icon: Icon, tone = "primary" }) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/20 text-accent",
    info: "bg-info/10 text-info",
    success: "bg-success/10 text-success",
    warning: "bg-warning/20 text-warning",
    secondary: "bg-secondary/10 text-secondary",
  };

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
      <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${tones[tone]}`}>
        {Icon && <Icon aria-hidden="true" />}
      </span>
      <div className="min-w-0">
        <p className="text-sm text-base-content/70">{label}</p>
        <p className="truncate text-2xl font-extrabold">{value}</p>
      </div>
    </div>
  );
}
