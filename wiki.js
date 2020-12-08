
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

function extractBoxText(text){
	//escape newlines
	let escapedText = text.replace(/(?<=[^\\])\n/g,"\\n")
	let boxLocalisations = ["Infobox","Ficha"]
	const regex = (boxLocalisation)=>`{{(${boxLocalisation}.*)\\\\n}}(?:\\s)*\\\\n`

	let result;

	//Try to find Infobox first then Ficha
	if(!(result=(new RegExp(regex(boxLocalisations[0]))).exec(escapedText))){
		result=(new RegExp(regex(boxLocalisations[1]))).exec(escapedText)
	}
	//return the group
	result = result? result[1]: null
	return result
}
function extractBracketExpressions(text){
	let textCopy = text
	const regex = /{{[^{}]*?}}|\[\[[^\[\]]*?\]\]/gm;
	let matchIndex = 0
	let matchName = (index)=> `_match_${index}`
	let m;
	let boxes= {}
	while ((m = regex.exec(textCopy)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		
		if(m && m[0]){
			let currentMatchName = matchName(matchIndex++)
			//console.log(`Found and replace match ${m[0]}`)
			textCopy = textCopy.replace(m[0],currentMatchName)
			boxes[currentMatchName] = m[0]
		}
		// The result can be accessed through the `m`-variable.
		m.forEach((match, groupIndex) => {
			//console.log(`Found match, group ${groupIndex}: ${match}`);
		});	
	}
	while ((m = regex.exec(textCopy)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		
		if(m && m[0]){
			let currentMatchName = matchName(matchIndex++)
			//console.log(`Found and replace match ${m[0]}`)
			textCopy = textCopy.replace(m[0],currentMatchName)
			boxes[currentMatchName] = m[0]
		}
		// The result can be accessed through the `m`-variable.
		m.forEach((match, groupIndex) => {
			//console.log(`Found match, group ${groupIndex}: ${match}`);
		});	
	}
	let result = { text:textCopy, subBoxCount:matchIndex ,subBoxes:boxes}
	return result
}

function buildResult(data,subboxes){
	let result = Object.keys(data).reduce((p,c)=>{
		//parse list entrys
		let listSplit = data[c]?.split("*")
		if(listSplit.length > 1){
			p[c] = listSplit.map(e=> resubstitude(e,subboxes)?.trim().replace(/\n|\\n|\\\\n/,"")).filter(e=>e?true:false)
		}else{
			p[c] = resubstitude(data[c],subboxes)?.trim().replace(/\n|\\n|\\\\n/,"")
		}
	return p	 
	},{})
	return result;
}


function resubstitude(text,subboxes){
	if(!subboxes){
		return text
	}
		let regex = /_match_\d{1,5}/
		let m;
		let value = text;
		while ((m = regex.exec(value)) !== null) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			
			if(m && m[0]){
				//console.log(`Found and replace match ${m[0]}`)
				value = value.replace(m[0], subboxes[m[0]])
			}
			
		}
		
		return value
}


export function parseBox(text){
	let infoBoxText = extractBoxText(text)
	let extractedSubboxes = extractBracketExpressions(infoBoxText)
	let fieldSplit = extractedSubboxes?.text?.split("|")
	fieldSplit = fieldSplit.slice(1,fieldSplit.length)
	fieldSplit = fieldSplit.map(e=> e.trim()).filter(e=>e.length>0)
	let boxObj = fieldSplit.reduce((o,f)=>{
		let keyValSplit = f.split("=")
		if(keyValSplit.length> 0){
			o[keyValSplit[0]]= keyValSplit[1] ?? null 
		}
		return o
	},{})
	let result = buildResult(boxObj,extractedSubboxes.subBoxes)
	return result
}

export default {
	search, page, category, languages, parseBox
}