
import date from './date.mjs';

Object.defineProperties(Date.prototype, {
	format: { value: (f, l) => date.format(this, f, l) },
	weekNumber: { value: () => date.getWeekNumber(this) },
});