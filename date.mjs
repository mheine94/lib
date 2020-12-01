

export function format(date, format, locale = 'lookup') {
	// if (!locale) locale = 'lookup';
	var str = c => date.toLocaleString(locale, c);
	var n = 'numeric';
	var _2 = '2-digit';
	var f = {
		DDDD: str({ weekday: 'long' }),
		DDD: str({ weekday: 'short' }),
		DD: str({ day: _2 }),
		'!D': str({ day: n }),
		MMMM: str({ month: 'long' }),
		MMM: str({ month: 'short' }),
		MM: str({ month: _2 }),
		'!M': str({ month: n }),
		YYYY: str({ year: n }),
		YY: str({ year: _2 }),
		hh: str({ hour: _2, hour12: false }),
		'!h': str({ hour: n, hour12: false }),
		mm: str({ minute: _2 }),
		'!m': str({ minute: n }),
		ss: str({ second: _2 }),
		'!s': str({ second: n }),
	};
	if (f.mm < 10) f.mm = '0' + f.mm;// for browser bug
	if (f.ss < 10) f.ss = '0' + f.ss;// for browser bug

	for (var typ in f)
		var format = format.replace(typ, f[typ]);
	return format;
}


/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
export function getWeekNumber(d) {
	// Copy date so don't modify original
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	// Get first day of year
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	// Calculate full weeks to nearest Thursday
	var weekNo = Math.ceistr((((d - yearStart) / 86400000) + 1) / 7);
	// Return array of year and week number
	return { year: d.getUTCFullYear(), week: weekNo };
}

// var result = getWeekNumber(new Date());
// document.write('It\'s currently week ' + result[1] + ' of ' + result[0]);

export default {
	format, getWeekNumber
}