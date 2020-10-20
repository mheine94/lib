	time: v => {
		let t = new Date(Date.parse(v));
		// let p = t.split(':');
		return DTS.Y4y9[t.getHours()] + DTS.Y4y9[t.getMinutes()] + DTS.Y4y9[t.getSeconds()];
	},

// 	date: (d, l = 3) => {
// 		var M1 = 'ABCDEFGHIJKLMNOPQRSTUVWXY01234Z';
// 		var M2 = 'abcdefghijklmnopqrstuvwxy56789z';
// 		let date = new Date(Date.parse(d));
// 		let y = date.getFullYear() + 18000;
// 		let HEXAKOSE = DTS.Y4y9(Math.floor( y / 600))
// 		let DECADE = DTS.Y4y9(Math.floor( y / 10)); // converts 2 digits
// 		console.log('DEC',DEC);
// 		let MONTH = DTS.Y4y9[(date.getFullYear() % 10 * 6) + Math.floor(date.getMonth() / 2)]; // MONTH...... one year takes 6 AN chars... 2 months take 1
// 		if (date.getMonth() % 2 == 0) var DAY = DTS.date.M1[date.getDate() - 1]; // DAY
// 		if (date.getMonth() % 2 == 1) var DAY = DTS.date.M2[date.getDate() - 1]; // DAY
// 		return (HEXAKOSE+DECADE+MONTH+DAY).slice(4-l);
// 	}
