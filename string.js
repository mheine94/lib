String.prototype.toTitleCase = function () {
	return this.split(' ')
		.map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
		.join(' ')
}