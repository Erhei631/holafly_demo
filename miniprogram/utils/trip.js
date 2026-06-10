function pad(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDateStr(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addYears(date, years) {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + years);
  return next;
}

function compareDate(a, b) {
  return parseDate(a).getTime() - parseDate(b).getTime();
}

function getDateBounds() {
  const today = new Date();
  return {
    minDate: formatDateStr(today),
    maxDate: formatDateStr(addYears(today, 1)),
  };
}

function getDefaultTripDates(dayCount = 7) {
  const today = new Date();
  const startDate = formatDateStr(today);
  const endDate = formatDateStr(addDays(today, Math.max(0, dayCount - 1)));
  return { startDate, endDate };
}

function parseDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function tripDays(startDate, endDate) {
  const diff = parseDate(endDate).getTime() - parseDate(startDate).getTime();
  return Math.round(diff / 86400000) + 1;
}

function formatShortLabel(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-').map(Number);
  return `${parts[1]}月${parts[2]}日`;
}

function formatLongLabel(dateStr) {
  if (!dateStr) return '请选择';
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${y}年${m}月${d}日`;
}

function buildYears(minDate, maxDate) {
  const minY = parseDate(minDate).getFullYear();
  const maxY = parseDate(maxDate).getFullYear();
  const years = [];
  for (let y = minY; y <= maxY; y += 1) years.push(y);
  return years;
}

function buildMonths() {
  return Array.from({ length: 12 }, (_, i) => i + 1);
}

function buildDays(year, month) {
  const count = new Date(year, month, 0).getDate();
  return Array.from({ length: count }, (_, i) => i + 1);
}

function indicesFromDate(dateStr, years) {
  const date = parseDate(dateStr);
  const year = date.getFullYear();
  const yearIndex = Math.max(0, years.indexOf(year));
  return [yearIndex, date.getMonth(), date.getDate() - 1];
}

function dateFromIndices(years, indices) {
  const year = years[indices[0]] || years[0];
  const month = (indices[1] ?? 0) + 1;
  const days = buildDays(year, month);
  const day = days[indices[2]] || days[days.length - 1];
  return formatDateStr(new Date(year, month - 1, day));
}

function clampPickerValue(value, years, minDate, maxDate) {
  let date = dateFromIndices(years, value);
  if (compareDate(date, minDate) < 0) date = minDate;
  if (compareDate(date, maxDate) > 0) date = maxDate;
  return indicesFromDate(date, years);
}

function formatRangeLabel(startDate, endDate) {
  return `${formatShortLabel(startDate)} — ${formatShortLabel(endDate)}`;
}

function estimateTripUnitPrice(days) {
  const d = Math.max(1, Number(days) || 1);
  return Math.round((9.9 + d * 5.9) * 100) / 100;
}

function formatYuan(amount) {
  return `¥${Number(amount).toFixed(2)}`;
}

module.exports = {
  pad,
  formatDateStr,
  addDays,
  addYears,
  compareDate,
  getDateBounds,
  getDefaultTripDates,
  parseDate,
  tripDays,
  formatShortLabel,
  formatLongLabel,
  buildYears,
  buildMonths,
  buildDays,
  indicesFromDate,
  dateFromIndices,
  clampPickerValue,
  formatRangeLabel,
  estimateTripUnitPrice,
  formatYuan,
};
