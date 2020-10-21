export const base60 = {
	BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXY01234abcdefghijklmnopqrstuvwxy56789'.split(''),
	// Y4: 'ABCDEFGHIJKLMNOPQRSTUVWXY01234'.split(''),
	// y9: 'abcdefghijklmnopqrstuvwxy56789'.split(''),
	encode: v => {
		v = Math.floor(v);
		// console.log('enc60', v);
		for (var tmp = []; v > 0; v = Math.floor(v / 60))
			tmp.unshift(Math.floor(v % 60));
		// console.log('enc60', tmp);
		return tmp.map(x => base60.BASE[x]).join('');
	},
	decode: v => {
		// console.log('dec60', v);
		return v.split('').reverse().map((v, i) => {
			// console.log('dec60', v, i, P60.BASE.indexOf(v) * Math.pow(60,i),'||',P60.BASE.indexOf(v),Math.pow(60,i));
			return base60.BASE.indexOf(v) * Math.pow(60, i);
		}).reduce((a, b) => a + b, 0);
		// 
	},
}


export const time = {
	encode: function (number) {

	},
	decode: function (string) {

	},
}