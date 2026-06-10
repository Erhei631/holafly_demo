/* eslint-disable no-unused-vars */
function calendarPad(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function calendarFormatDateStr(date) {
  return `${date.getFullYear()}-${calendarPad(date.getMonth() + 1)}-${calendarPad(date.getDate())}`;
}

function calendarParseDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function calendarCompareDate(a, b) {
  return calendarParseDate(a) - calendarParseDate(b);
}

const CALENDAR_WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

function buildCalendarMonths(minDateStr, maxDateStr) {
  const min = calendarParseDate(minDateStr);
  const max = calendarParseDate(maxDateStr);
  const todayStr = calendarFormatDateStr(new Date());
  const months = [];
  const cursor = new Date(min.getFullYear(), min.getMonth(), 1);
  const endMonth = new Date(max.getFullYear(), max.getMonth(), 1);

  while (cursor <= endMonth) {
    const year = cursor.getFullYear();
    const month = cursor.getMonth() + 1;
    const monthKey = `${year}-${calendarPad(month)}`;
    const firstDow = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const cells = [];

    for (let i = 0; i < firstDow; i += 1) {
      cells.push({ type: 'empty' });
    }

    for (let d = 1; d <= daysInMonth; d += 1) {
      const dateStr = `${year}-${calendarPad(month)}-${calendarPad(d)}`;
      const disabled = calendarCompareDate(dateStr, minDateStr) < 0 || calendarCompareDate(dateStr, maxDateStr) > 0;
      cells.push({
        type: 'day',
        dateStr,
        day: d,
        disabled,
        isToday: dateStr === todayStr,
      });
    }

    while (cells.length % 7 !== 0) cells.push({ type: 'empty' });

    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(cells.slice(i, i + 7));
    }

    months.push({ key: monthKey, label: `${year}年${calendarPad(month)}月`, rows });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return months;
}

function getRangeState(dateStr, startDate, endDate) {
  if (!startDate) return '';
  if (!endDate) return dateStr === startDate ? 'start' : '';
  if (dateStr === startDate && dateStr === endDate) return 'single';
  if (dateStr === startDate) return 'start';
  if (dateStr === endDate) return 'end';
  if (calendarCompareDate(dateStr, startDate) > 0 && calendarCompareDate(dateStr, endDate) < 0) return 'in-range';
  return '';
}

function formatFooterDate(dateStr) {
  if (!dateStr) return '请选择';
  const [, m, d] = dateStr.split('-');
  return `${m}-${d}`;
}

function applyRangeTap(dateStr, startDate, endDate) {
  if (!startDate || (startDate && endDate)) return { startDate: dateStr, endDate: '' };
  if (calendarCompareDate(dateStr, startDate) < 0) return { startDate: dateStr, endDate: '' };
  return { startDate, endDate: dateStr };
}

function renderCalendarHtml(months, startDate, endDate) {
  return months.map((month) => `
    <section class="cal-month" data-month="${month.key}">
      <h3 class="cal-month__title">${month.label}</h3>
      <div class="cal-month__grid">
        ${month.rows.map((row) => `
          <div class="cal-week">
            ${row.map((cell) => {
              if (cell.type === 'empty') return '<div class="cal-day cal-day--empty"></div>';
              const state = getRangeState(cell.dateStr, startDate, endDate);
              const cls = [
                'cal-day',
                cell.disabled ? 'cal-day--disabled' : '',
                state ? `cal-day--${state}` : '',
                cell.isToday ? 'cal-day--today' : '',
              ].filter(Boolean).join(' ');
              const sub = cell.isToday ? '<span class="cal-day__tag">今天</span>' : '';
              return `<button type="button" class="${cls}" data-date="${cell.dateStr}" ${cell.disabled ? 'disabled' : ''}>
                <span class="cal-day__num">${cell.day}</span>${sub}
              </button>`;
            }).join('')}
          </div>
        `).join('')}
      </div>
    </section>
  `).join('');
}
