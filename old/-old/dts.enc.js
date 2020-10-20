DTSenc = {
	Y4y9: 'ABCDEFGHIJKLMNOPQRSTUVWXY01234abcdefghijklmnopqrstuvwxy56789'.split(''),
	enc60: v => {
		v = Math.floor(v);
		console.log('enc60', v);
		for (var tmp = []; v > 0; v = Math.floor(v / 60))
			tmp.unshift(Math.floor(v % 60));
		return tmp.map(x => DTS.Y4y9[x]).join('');
	},

	lat: (lat, len=3) => {
		var rebase = lat => 180-(lat*1 + 90); // north is zero
		return DTS.enc60(rebase(lat) * 1000000).substr(0,len)
	},

	lon: (lon, len=3) => {
		var rebase = lon => lon*1 + 180; // pacific is zero
		return DTS.enc60(DTS.lon.rebase(lon) * 1000000).substr(0,len)
	},

	time: t => {
		let p = t.split(':');
		return DTS.Y4y9[p[0] * 1] + DTS.Y4y9[p[1] * 1] + DTS.Y4y9[p[2] * 1];
	},

	date: (d, l = 3) => {
		var M1 = 'ABCDEFGHIJKLMNOPQRSTUVWXY01234Z';
		var M2 = 'abcdefghijklmnopqrstuvwxy56789z';
		let date = new Date(Date.parse(d));
		let y = date.getFullYear() + 22500;
		let DEC = DTS.enc60(Math.floor( y / 10)); // converts 2 digits
		console.log('DEC',DEC);
		let MON = DTS.Y4y9[(date.getFullYear() % 10 * 6) + Math.floor(date.getMonth() / 2)]; // MONTH...... one year takes 6 AN chars... 2 months take 1
		if (date.getMonth() % 2 == 0) var DAY = DTS.date.M1[date.getDate() - 1]; // DAY
		if (date.getMonth() % 2 == 1) var DAY = DTS.date.M2[date.getDate() - 1]; // DAY
		return (DEC+MON+DAY).slice(4-l);
	}

}
