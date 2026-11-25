

const PERIOD_DAYS = { Daily: 1, Weekly: 7, Monthly: 30 };


export function countRentalDays(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);
  const days = Math.round((end - start) / (24 * 60 * 60 * 1000)) + 1;
  return Number.isFinite(days) && days > 0 ? days : 0;
}


export function calculateTotal({ price, rentalType, days, quantity }) {
  if (!days || !quantity) return 0;
  const periods = Math.ceil(days / (PERIOD_DAYS[rentalType] || 1));
  return Math.round(Number(price) * periods * Number(quantity) * 100) / 100;
}
