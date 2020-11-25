// String.prototype.toTitleCase = function () {
// 	return this.split(' ')
// 		.map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
// 		.join(' ')
// }

// String.prototype.groups = function (regex) {
// 	return Array.from(this.matchAll(regex)).map(i => i.slice(1)).flat();
// }



Object.defineProperties(String.prototype, {
	toTitleCase: {
		value: function () {
			return this.split(' ')
				.map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
				.join(' ')
		}
	},
	groups: {
		value: function (regex) {
			return Array.from(this.matchAll(regex))
				.map(i => i.slice(1)) // only groups, not full match
			// .flat();
		}
	},

	clearTags: {
		value: function () {
			return this.replace(/<.*?>/g, '')
		}
	},

});