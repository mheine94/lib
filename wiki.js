export default class wiki {
	static async search(language, query) {
		// console.log('search', language, query)
		let result = await fetch(`https://${language}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`).then(x => x.json());
		// console.log('search result', result)
		return result?.query?.search;
	}

	static async page(language, title) {
		let result = await fetch(`https://${language}.wikipedia.org/w/api.php?action=parse&prop=wikitext&page=${title}&format=json&origin=*`).then(x => x.json())
		return result?.parse?.wikitext?.['*'];
	}

	static async category(language, categoryName) {
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

}