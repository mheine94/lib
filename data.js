// copy to clipboard
// https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
export function copy(text) {
	var dummy = document.createElement("textarea");
	// to avoid breaking orgain page when copying more words
	// cant copy when adding below this code
	// dummy.style.display = 'none'
	document.body.appendChild(dummy);
	//Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
	dummy.value = text;
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
}
// function copyToClipboard(text){
//     // console.log('copy',text);
//     var textarea = document.createElement("textarea");
//     textarea.value = text;
//     textarea.style.opacity = 0;
//     document.body.appendChild(textarea);
//     textarea.select();
//     // console.log('textarea',textarea);
//     document.execCommand('copy');
//     textarea.remove();
// }



// save data to file
// https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
export function save(data, filename, type) {
	var file = new Blob([data], { type: type });
	if (window.navigator.msSaveOrOpenBlob) // IE10+
		window.navigator.msSaveOrOpenBlob(file, filename);
	else { // Others
		var a = document.createElement("a"),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}

// deep merge js-objects
// arrays are not merged... do that too?
export function merge2(target, source) {
	// console.log(target, source)
	// Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
	for (const key of Object.keys(source)) {
		if (source[key] instanceof Object) Object.assign(source[key], merge(target?.[key], source[key]))
	}
	// Join `target` and modified `source`
	Object.assign(target || {}, source)
	return target
}



