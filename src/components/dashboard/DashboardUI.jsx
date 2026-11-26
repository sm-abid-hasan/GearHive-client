
// export function PageHeader({ title, subtitle, children }) {
//   return (
//     <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//       <div>
//         <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
//         {subtitle && <p className="mt-1 text-base-content/70">{subtitle}</p>}
//       </div>
//       {children && <div className="flex flex-wrap gap-2">{children}</div>}
//     </div>
//   );
// }


// export function Panel({ title, children, className = "" }) {
//   return (
//     <section className={`rounded-2xl border border-base-300 bg-base-100 ${className}`}>
//       {title && <h2 className="border-b border-base-300 px-5 py-4 text-lg font-bold">{title}</h2>}
//       {children}
//     </section>
//   );
// }


// export function TableWrap({ children }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="table">{children}</table>
//     </div>
//   );
// }


// export function StatCard({ label, value, icon: Icon, tone = "primary" }) {
//   const tones = {
//     primary: "bg-primary/10 text-primary",
//     accent: "bg-accent/20 text-accent",
//     info: "bg-info/10 text-info",
//     success: "bg-success/10 text-success",
//     warning: "bg-warning/20 text-warning",
//     secondary: "bg-secondary/10 text-secondary",
//   };

//   return (
//     <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
//       <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${tones[tone]}`}>
//         {Icon && <Icon aria-hidden="true" />}
//       </span>
//       <div className="min-w-0">
//         <p className="text-sm text-base-content/70">{label}</p>
//         <p className="truncate text-2xl font-extrabold">{value}</p>
//       </div>
//     </div>
//   );
// }


export function PageHeader({ title, subtitle, children }) {
  return (
    <header className="relative mb-8 overflow-hidden rounded-3xl border border-base-300/80 bg-gradient-to-br from-base-100 via-base-100 to-base-200/70 p-6 shadow-sm sm:p-7">
      {/* Subtle Ambient Corner Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3.5">
          {/* Vertical Accent Bar */}
          <span
            aria-hidden="true"
            className="mt-1 hidden h-10 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-primary to-primary/40 sm:block"
          />
          <div>
            <h1 className="text-2xl font-black tracking-tight text-base-content sm:text-3xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-base-content/70 sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {children && (
          <div className="flex flex-wrap items-center gap-2.5 sm:shrink-0">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}

export function Panel({ title, children, className = "" }) {
  return (
    <section
      className={`overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 shadow-sm transition-shadow duration-300 hover:shadow-md ${className}`}
    >
      {title && (
        <div className="flex items-center gap-2.5 border-b border-base-300/70 bg-base-200/40 px-6 py-4">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-primary ring-4 ring-primary/15"
          />
          <h2 className="text-base font-extrabold tracking-tight text-base-content sm:text-lg">
            {title}
          </h2>
        </div>
      )}
      {children}
    </section>
  );
}

export function TableWrap({ children }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full [&_thead_tr]:border-b [&_thead_tr]:border-base-300/80 [&_thead_tr]:bg-base-200/60 [&_thead_th]:py-3.5 [&_thead_th]:text-xs [&_thead_th]:font-bold [&_thead_th]:tracking-wider [&_thead_th]:uppercase [&_thead_th]:text-base-content/65 [&_tbody_tr]:border-b [&_tbody_tr]:border-base-300/50 [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-primary/[0.03] [&_tbody_td]:py-3.5">
        {children}
      </table>
    </div>
  );
}

export function StatCard({ label, value, icon: Icon, tone = "primary" }) {
  const tones = {
    primary: {
      badge: "bg-primary/12 text-primary ring-primary/20",
      glow: "bg-primary/15",
      bar: "from-primary to-primary/40",
    },
    accent: {
      badge: "bg-accent/15 text-accent ring-accent/25",
      glow: "bg-accent/20",
      bar: "from-accent to-accent/40",
    },
    info: {
      badge: "bg-info/12 text-info ring-info/20",
      glow: "bg-info/15",
      bar: "from-info to-info/40",
    },
    success: {
      badge: "bg-success/12 text-success ring-success/20",
      glow: "bg-success/15",
      bar: "from-success to-success/40",
    },
    warning: {
      badge: "bg-warning/15 text-warning ring-warning/25",
      glow: "bg-warning/20",
      bar: "from-warning to-warning/40",
    },
    secondary: {
      badge: "bg-secondary/12 text-secondary ring-secondary/20",
      glow: "bg-secondary/15",
      bar: "from-secondary to-secondary/40",
    },
  };

  const currentTone = tones[tone] || tones.primary;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-base-content/5 sm:p-6">
      {/* Top Accent Gradient Line */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-75 transition-opacity duration-300 group-hover:opacity-100 ${currentTone.bar}`}
      />

      {/* Ambient Corner Glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125 ${currentTone.glow}`}
      />

      {/* Giant Faint Background Watermark Icon */}
      {Icon && (
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute right-4 bottom-3 h-16 w-16 text-base-content/[0.035] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
        />
      )}

      <div className="relative flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-wider uppercase text-base-content/60">
            {label}
          </p>
          <p className="mt-2 truncate text-2xl font-black tracking-tight text-base-content sm:text-3xl">
            {value}
          </p>
        </div>

        <span
          className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl text-2xl ring-1 transition-transform duration-300 group-hover:scale-105 ${currentTone.badge}`}
        >
          {Icon && <Icon aria-hidden="true" />}
        </span>
      </div>
    </div>
  );
}