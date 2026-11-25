

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});


export const formatCurrency = (amount) => currencyFormatter.format(Number(amount) || 0);


export function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}


export const rentalUnit = (rentalType) => ({ Daily: "day", Weekly: "week", Monthly: "month" })[rentalType] || "day";


export const titleCase = (text = "") =>
  text
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());


export const todayInputValue = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};
