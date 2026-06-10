const { pad, formatDateStr, parseDate, compareDate } = require('./trip');

const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六'];

function buildCalendarMonths(minDateStr, maxDateStr) {
  const min = parseDate(minDateStr);
  const max = parseDate(maxDateStr);
  const todayStr = formatDateStr(new Date());
  const months = [];

  const cursor = new Date(min.getFullYear(), min.getMonth(), 1);
  const endMonth = new Date(max.getFullYear(), max.getMonth(), 1);

  while (cursor <= endMonth) {
    const year = cursor.getFullYear();
    const month = cursor.getMonth() + 1;
    const monthKey = `${year}-${pad(month)}`;
    const firstDow = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const cells = [];

    for (let i = 0; i < firstDow; i += 1) {
      cells.push({ type: 'empty', key: `${monthKey}-e${i}` });
    }

    for (let d = 1; d <= daysInMonth; d += 1) {
      const dateStr = `${year}-${pad(month)}-${pad(d)}`;
      const disabled = compareDate(dateStr, minDateStr) < 0 || compareDate(dateStr, maxDateStr) > 0;
      cells.push({
        type: 'day',
        key: dateStr,
        dateStr,
        day: d,
        disabled,
        isToday: dateStr === todayStr,
      });
    }

    while (cells.length % 7 !== 0) {
      cells.push({ type: 'empty', key: `${monthKey}-t${cells.length}` });
    }

    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push({ key: `${monthKey}-r${i / 7}`, cells: cells.slice(i, i + 7) });
    }

    months.push({
      key: monthKey,
      label: `${year}年${pad(month)}月`,
      rows,
    });

    cursor.setMonth(cursor.getMonth() + 1);
  }

  return months;
}

function getRangeState(dateStr, startDate, endDate) {
  if (!startDate) return '';
  if (!endDate) {
    return dateStr === startDate ? 'start' : '';
  }
  if (dateStr === startDate && dateStr === endDate) return 'single';
  if (dateStr === startDate) return 'start';
  if (dateStr === endDate) return 'end';
  if (compareDate(dateStr, startDate) > 0 && compareDate(dateStr, endDate) < 0) return 'in-range';
  return '';
}

function decorateCalendarMonths(months, startDate, endDate) {
  return months.map((month) => ({
    ...month,
    rows: month.rows.map((row) => ({
      ...row,
      cells: row.cells.map((cell) => {
        if (cell.type !== 'day') return cell;
        return {
          ...cell,
          rangeState: getRangeState(cell.dateStr, startDate, endDate),
        };
      }),
    })),
  }));
}

function applyRangeTap(dateStr, startDate, endDate) {
  if (!startDate || (startDate && endDate)) {
    return { startDate: dateStr, endDate: '' };
  }
  if (compareDate(dateStr, startDate) < 0) {
    return { startDate: dateStr, endDate: '' };
  }
  return { startDate, endDate: dateStr };
}

function formatFooterDate(dateStr) {
  if (!dateStr) return '请选择';
  const [, m, d] = dateStr.split('-');
  return `${m}-${d}`;
}

module.exports = {
  WEEKDAY_LABELS,
  buildCalendarMonths,
  decorateCalendarMonths,
  applyRangeTap,
  formatFooterDate,
  getRangeState,
};
