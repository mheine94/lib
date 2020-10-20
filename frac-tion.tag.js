
document.head.insertAdjacentHTML('beforeend', `
<template id='frac-tion'>
    <style>
    :host {
        display: inline-block;
        position: relative;
        vertical-align: middle;
        letter-spacing: 0.001em;
        text-align: center;
    }

    span {
        display: block;
        padding: 0.1em;
        font-size: var(--font-size);
        /* width: 10px; */
    }

    .denom {
        border-top: 1px solid var(--line-color, black);
    }
</style>
    
    <span class="a n num">1</span>
    <span class="b d denom">2</span>

</template>
`);

window.customElements.define('frac-tion', class extends HTMLElement {
	constructor() {
		super();
		// console.log('dommmm',this.innerHTML);
		this.attachShadow({ mode: 'open', delegatesFocus: true }).appendChild(document.querySelector('template#frac-tion').content.cloneNode(true));
		this.addEventListener('click', e => { try { let n = e.composedPath()[0]; this[n.closest('[on-tap]').getAttribute('on-tap')](n.closest('[on-tap]'), e, n) } catch (x) { if (this.DEBUG) console.error(e, x) } });
	}
	$(q) { return this.shadowRoot.querySelector(q) }
	$$(q) { return this.shadowRoot.querySelectorAll(q) }
	static get observedAttributes() { return ['n', 'd', 'num', 'denom']; }
	attributeChangedCallback(name, oldValue, newValue) {
		// console.log(name, newValue); 
		this.$('.' + name).innerHTML = newValue;
	}
});