Array.prototype.unique = function () {
	return [...new Set(this)]
}

Array.prototype.shuffle = function () {
	let a = JSON.parse(JSON.stringify(this)); // deep copy
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}


Array.prototype.trim = function () {
	return this.map(x => x.trim());
}

Array.prototype.clearEmpty = function () {
	return this.filter(x => x);
}
Array.prototype.intersection = function (other) {
	return this.filter(value => other.includes(value))
}
Array.prototype.union = function (other) {
	return [...this, ...other]
}
