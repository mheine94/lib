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
