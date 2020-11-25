
export async function search(language, query) {
	// console.log('search', language, query)
	let result = await fetch(`https://${language}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`).then(x => x.json());
	// console.log('search result', result)
	return result?.query?.search;
}

export async function page(language, title) {
	let result = await fetch(`https://${language}.wikipedia.org/w/api.php?action=parse&prop=wikitext&page=${title}&format=json&origin=*`).then(x => x.json())
	return result?.parse?.wikitext?.['*'];
}

export async function category(language, categoryName) {
	let prefix = {
		de: 'Kategorie',
		en: 'Category',
	}
	let titles = []
	let gcmcontinue;
	do {
		let result = await fetch(`https://${language}.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=info&generator=categorymembers&gcmtitle=${prefix[language]}:${categoryName}&gcmlimit=max${gcmcontinue ? `&gcmcontinue=${gcmcontinue}` : ""}`).then(x => x.json());
		titles = [...titles, ...Object.values(result.query.pages).map(x => x.title)]
		console.log(`loaded ${titles.length} results`)
		gcmcontinue = result?.continue?.gcmcontinue;
	} while (gcmcontinue)
	return titles;
}


export async function languages(language, title, options = {}) {
	let output = [];
	var llcontinue;
	do {
		let res = await fetch(`https://${language}.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=langlinks&titles=${title}&llprop=autonym%7Clangname%7Curl&lllimit=max${llcontinue ? `&llcontinue=${llcontinue}` : ''}`).then(data => data.json())
		output = [...output, ...Object.values(res?.query?.pages)[0]?.langlinks ?? []]
		// console.log('o', output)
		llcontinue = res?.continue?.llcontinue
	} while (llcontinue)
	return options.raw ? output : Object.fromEntries(output.map(x => [x.lang, x['*']]));
}

export default {
	search, page, category, languages
}