
Object.defineProperties(Array.prototype, {
	trim: {
		value: function () {
			return this.map(x => x.trim());
		}
	},
	unique: {
		value: function () {
			return [...new Set(this)]
		}
	},
	clearEmpty: {
		value: function () {
			return this.filter(x => x);
		}
	},
	intersection: {
		value: function (other) {
			return this.filter(value => other.includes(value))
		}
	},
	union: {
		value: function (other) {
			return [...this, ...other]
		}
	},
	shuffle: {
		value: function () {
			let a = JSON.parse(JSON.stringify(this)); // deep copy
			for (let i = a.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[a[i], a[j]] = [a[j], a[i]];
			}
			return a;
		}
	},
});






export function array(a) {
	return Array.isArray(a) ? a : [];
}
export function intersection(...arrays) {
	// if (arrays.length < 2) return [];
	let output = arrays[0] ?? [];
	for (let a of arrays?.slice(1) ?? [])
		output = output.intersection(a)
	return output;
}






// Array.prototype.trim = function () {
// 	return this.map(x => x.trim());
// }
// Array.prototype.unique = function () {
// 	return [...new Set(this)]
// }
// Array.prototype.clearEmpty = function () {
// 	return this.filter(x => x);
// }
// Array.prototype.intersection = function (other) {
// 	return this.filter(value => other.includes(value))
// }
// Array.prototype.union = function (other) {
// 	return [...this, ...other]
// }


// Array.prototype.shuffle = function () {
// 	let a = JSON.parse(JSON.stringify(this)); // deep copy
// 	for (let i = a.length - 1; i > 0; i--) {
// 		const j = Math.floor(Math.random() * (i + 1));
// 		[a[i], a[j]] = [a[j], a[i]];
// 	}
// 	return a;
// }









// function define(name, func) {
// 	Object.defineProperty(Array.prototype, name, { value: func });
// }

// Object.defineProperty(Array.prototype, 'trim', {
// 	value: function () {
// 		return this.map(x => x.trim());
// 	}
// });

// define('trim', function () {
// 	return this.map(x => x.trim());
// })