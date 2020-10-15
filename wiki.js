export default class wiki {
	static async search(language, query) {
		console.log('search', language, query)
		let result = await fetch(`https://${language}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`).then(x => x.json());
		console.log('search result', result)
		return result.query.search;
	}
	static async page(language, title) {
		let result = await fetch(`https://${language}.wikipedia.org/w/api.php?action=parse&prop=wikitext&page=${title}&format=json&origin=*`).then(x => x.json())
		return result.parse.wikitext['*'];
	}
}