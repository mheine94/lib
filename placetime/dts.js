DTS = {
	Y4y9: 'ABCDEFGHIJKLMNOPQRSTUVWXY01234abcdefghijklmnopqrstuvwxy56789'.split(''),
	enc60: v => {
		v = Math.floor(v);
		console.log('enc60', v);
		for (var tmp = []; v > 0; v = Math.floor(v / 60))
			tmp.unshift(Math.floor(v % 60));
		return tmp.map(x => DTS.Y4y9[x]).join('');
	},
	pad0: v => v < 10 ? '0' + v : '' + v,

	lat:{
		rebase: lat => 180-(lat + 90), // north is zero
		encode: (lat, len=3) => lat = DTS.enc60(DTS.lat.rebase(lat*1) * 1000000).substr(0,len)
	},
	lon:{
		rebase: lon => lon + 180, // pacific is zero
		encode: (lon, len=3) => lon = DTS.enc60(DTS.lon.rebase(lon*1) * 1000000).substr(0,len)
	},

	time: {
		d: v => DTS.pad0(DTS.Y4y9.indexOf(v)),
		encode: t => {
			let p = t.split(':');
			return DTS.Y4y9[p[0] * 1] + DTS.Y4y9[p[1] * 1] + DTS.Y4y9[p[2] * 1];
		},
		decode: c => {
			return DTS.time.d(c[0]) + ':' + DTS.time.d(c[1]) + ':' + DTS.time.d(c[2]);
		}
	},

	date: {
		// baseYear: 16300,
		// baseYear: -24000,
		baseYear: -22500,
		M1: 'ABCDEFGHIJKLMNOPQRSTUVWXY01234Z',
		M2: 'abcdefghijklmnopqrstuvwxy56789z',
		encode: (d, l = 3) => {
			let date = new Date(Date.parse(d));
			let y = date.getFullYear() - DTS.date.baseYear;
			// let MIL = DTS.enc60(Math.floor( y / 600));
			// console.log('MIL',MIL);
			let DEC = DTS.enc60(Math.floor( y / 10)); // converts 2 digits
			console.log('DEC',DEC);
			let MON = DTS.Y4y9[(date.getFullYear() % 10 * 6) + Math.floor(date.getMonth() / 2)]; // MONTH...... one year takes 6 AN chars... 2 months take 1
			if (date.getMonth() % 2 == 0) var DAY = DTS.date.M1[date.getDate() - 1]; // DAY
			if (date.getMonth() % 2 == 1) var DAY = DTS.date.M2[date.getDate() - 1]; // DAY
			// if (date.getMonth() % 2 == 0) out += DTS.Y4y9.slice(0, 30).concat('Z')[date.getDate() - 1]; // DAY
			// if (date.getMonth() % 2 == 1) out += DTS.Y4y9.slice(30).concat('z')[date.getDate() - 1]; // DAY
			return (DEC+MON+DAY).slice(4-l);

		},
		decode: c => {
			let y = -DTS.date.baseYear;
			y += DTS.Y4y9.indexOf(c[0]) * 600;
			y += DTS.Y4y9.indexOf(c[1]) * 10;
			y += Math.floor(DTS.Y4y9.indexOf(c[2]) / 6);
			let m = DTS.Y4y9.indexOf(c[2]) % 6 * 2 + 1;
			let m1 = DTS.Y4y9.slice(0, 30).concat('Z').indexOf(c[3])
			let m2 = DTS.Y4y9.slice(30).concat('z').indexOf(c[3]);
			if (m2 > -1) m++;
			if (m1 > -1) var d = m1 + 1;
			if (m2 > -1) var d = m2 + 1;
			return `${y}-${DTS.pad0(m)}-${DTS.pad0(d)}`;
		}
	}


}





	// space: {
	// 	enc: {
	// 		// lon: lon => lon < 0 ? 180-lon : lon,
	// 		// lat: lat => lat < 0 ? -lat + 180 : Math.abs(90 - lat),
	// 		enc: (val) => {
	// 			let out = DTS.enc60(val * 10000);
	// 			while (out.length < 2) out = 'A' + out;
	// 			let decimals = (val + 0.000000001 + '').split('.')[1].slice(1, -3) * 1; // after the comma + 1
	// 			out += DTS.enc60(decimals).slice(0, 2);
	// 			return out;
	// 		}
	// 	},
	// 	lon: lon => lon + 180, // pacific is zero
	// 	lat: lat => 180-(lat + 90), // north is zero
	// 	encode: (lon, lat, len=3, block=0) => {
	// 		if (lon.includes(',')) {
	// 			let tmp = lon.split(',');
	// 			lon = tmp[0];
	// 			lat = tmp[1];
	// 		}
	// 		// var lon = DTS.space.enc.lon(lon * 1);
	// 		// var lat = DTS.space.enc.lat(lat * 1);
	// 		var lon = DTS.enc60(DTS.space.lon(lon*1) * 1000000);
	// 		var lat = DTS.enc60(DTS.space.lat(lat*1) * 1000000);
	// 		console.log('space', lon, lat);
	// 		// var out = '';
	// 		// for(var i=0;i<len;i++) out += lon[i]+lat[i]+'.';
	// 		// console.log('map',v,i);
	// 		// console.log('map',lon.split('').map((v,i)=>{console.log('map',v,i,lon[i],lat[i]);return lon[i]+''+lat[i]}));
	// 		if(block)
	// 			return lon.substr(0,len) + ':' + lat.substr(0,len);
	// 		else
	// 			return lon.split('').map((v,i)=>{return lon[i]+''+lat[i]}).slice(0,len).join('.');
	// 	}
	// },




// decade: d => {
// 	let dek = Math.floor((16300 + (d.split('-')[0] * 1)) / 10);
// 	var out = [];
// 	for (; dek > 0; dek = Math.floor(dek / 60))
// 		out.push(dek % 60);
// 	return out.reverse().map(x => DTS.Y4y9[x]).join('');
// },
// day: d => {
// 	let date = new Date(Date.parse(d));
// 	let out = DTS.Y4y9[(date.getFullYear() % 10 * 6) + Math.floor(date.getMonth() / 2)]; // one year takes 6 AN chars... 2 months take 1
// 	console.log('month', date.getMonth(), date.getMonth() % 2, date.getDate(), date.getDate() - 1, out);
// 	if (date.getMonth() % 2 == 0) out += DTS.Y4y9.slice(0, 30).concat('Z')[date.getDate() - 1];
// 	if (date.getMonth() % 2 == 1) out += DTS.Y4y9.slice(30).concat('z')[date.getDate() - 1];
// 	return out;
// },
// encode2: (d, l = 0) => (DTS.date.decade(d) + DTS.date.day(d)).slice(l),

// console.log('month', date.getMonth(), date.getMonth() % 2, date.getDate(), date.getDate() - 1, out);


// return (((DTS.Y4y9.indexOf(c[0]) * 60) + (DTS.Y4y9.indexOf(c[1]) * 1)) * 10) - DTS.date.baseYear;

// AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
// az = AZ.map(x => x.toLowerCase());
// N = '0123456789'.split('');
// NaA = N.concat(az).concat(AZ);

// sixty = NaA.slice(0,60);
// while (dek > 0) {
// 	out.push(dek % 60);
// 	dek = Math.floor(dek / 60);
// }
// let diff = date - new Date(date.getFullYear(), 0, 0);
// out += NaA[(d.split('-')[0].slice(-1) * 6) + Math.floor(days / 61)]; // one year takes 6 AN chars...

// console.log('dek', dek);
// console.log(out);

// let diff = date - new Date(date.getFullYear(), Math.floor(date.getMonth() / 2) * 2, 0);
// return out + Y4y9[Math.floor(diff / 24 / 60 / 60 / 1000)];
// return out + DTS.Y4y9[Math.floor(diff / 24 / 60 / 60 / 1000)];

// enc3: d => date.encode(d).slice(1),
// console.log(NaA.indexOf(c[0]), NaA.indexOf(c[1]));