String.prototype.toTitleCase = function () {
	return this.split(' ')
		.map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
		.join(' ')
}

String.prototype.groups = function (regex) {
	return Array.from(this.matchAll(regex)).map(i => i.slice(1)).flat();
}