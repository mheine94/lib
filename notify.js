import './dist/noti-fy.tag.js';
if(!document.querySelector('noti-fy'))
	document.body.appendChild(document.createElement('noti-fy'))

let notify = document.querySelector('noti-fy')
export default function(text){
	notify.show({text});
}