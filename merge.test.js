let data = [
	{
		CAS: ["26787-78-0", "34642-77-8", "61336-70-7"],
		ATC: ["J01CA04"],
		INN: ["amoxicillin"],
		formula: ["C16H19N3O5S"],
		group: ["β-Lactam-Antibiotika"],
		tradeNames: [
			"Aciphen", "Amoclav", "Amox",
			"Amoxanil", "Amoxi-Clavulan", "Amoxi-saar plus",
			"Amoxibeta", "Amoxiclav", "Amoxin"
		],
		title: { de: "amoxicillin", more: { count: 1 } }
	},
	{
		INN: [
			"(2''s'',5''r'',6''r'')-6-{[(2''r'')-2-amino-2-(4-hydroxyphenyl)acetyl]amino}-3,3-dimethyl-7-oxo-4-th..."
		],
		CAS: ["26787-78-0"],
		ATC: ["J01CA04"],
		UNII: ["9EM05410Q9"],
		DrugBank: ["DB01060"],
		KEGG: ["D07452"],
		PubChem: ["33613"],
		formula: ["C16H19N3O5S"],
		title: { en: "Amoxicillin", more: { len: 2 } }
	},
	{
		INN: ["ácido (2s,5r,6r)-6-[(2r)-2-amino-2-(4-hidroxifenil)"],
		CAS: ["26787-78-0"],
		ATC: ["J01CA04QG51AX01"],
		PubChem: ["33613"],
		DrugBank: ["APRD00248"],
		formula: ["C16H19N3O5S"],
		title: { es: "Amoxicilina", more: { count: 3 } }
	}
]


import merge from './merge.js';
let t = merge({ _unique: true, _sort: true }, ...data);
console.log(t)