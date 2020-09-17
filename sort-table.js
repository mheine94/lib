
document.querySelectorAll('th[sort]').forEach(th => th.addEventListener('click', (() => {
	let sortValueModifiers = {
		string: x=>x.toLowerCase(),
		number: x=>x.replace('%', '').replace(/\s/g,'').replace('\u221E',Infinity).replace('x','NaN').replace('NaN',-Infinity) * 1
	}
	let sortValueModifier = sortValueModifiers[th.getAttribute('sort')];
	// console.log('sort',sortType);
	let sortDirection = th.getAttribute('sort-direction');
	let sortValue = x => x.hasAttribute('sort') ? sortValueModifier(x.getAttribute('sort')) : sortValueModifier(x.innerText);
	// console.log('sv',sortValue('-1232'));
	let sortFunction = (a,b) => sortValue(a) < sortValue(b) ? 1 : (sortValue(a) > sortValue(b) ? -1 : 0);
	let sortFunctionOrder = (a,b) => sortDirection=='asc' ? sortFunction(a,b) : -sortFunction(a,b);
	const table = th.closest('table');
	let columnIndex = Array.from(table.querySelectorAll('th')).indexOf(th);
	console.log('index', columnIndex);
	let column = Array.from(table.querySelectorAll(`tr td:nth-child(${columnIndex + 1})`));
	console.log('column', column);
	column.sort(sortFunctionOrder).forEach(td => table.appendChild(td.parentElement));
	table.querySelectorAll('th').forEach(th=>th.removeAttribute('sort-direction'));
	th.setAttribute('sort-direction', sortDirection=='asc' ? 'desc' : 'asc');
})));



