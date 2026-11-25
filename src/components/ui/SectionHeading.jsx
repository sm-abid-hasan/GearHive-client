
export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`mb-12 max-w-3xl ${alignment}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title mt-2">{title}</h2>
      {subtitle && <p className={`section-subtitle ${align === "center" ? "mx-auto" : ""}`}>{subtitle}</p>}
    </div>
  );
}
