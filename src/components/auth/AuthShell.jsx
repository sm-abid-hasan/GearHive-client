
export default function AuthShell({ title, subtitle, children }) {
  return (
    <section className="container-page flex min-h-[calc(100vh-8rem)] items-center justify-center py-10 lg:py-16">
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-2 text-base-content/70">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}