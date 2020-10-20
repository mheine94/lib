PushState = {
    root: '/',

    PATH: node => (node ? [node].concat(PushState.PATH(node.parentElement)) : []),

    follow: (node,event) => {
        if(node.hasAttribute('noState')) return;
        var state = node.getAttribute('href');
        if (!state) return;
        event.preventDefault();
        PushState.set(state);
        PushState.event('link', node);
    },

    set: state => {
        var base = state.startsWith('/') ? PushState.root : document.location.pathname + '/';
        // console.log('state',state,push);
        history.pushState(null, null, base + PushState.clean(state));
    },

    get: () => {
    	return '/' + PushState.clean((document.location.pathname+'/').replace(PushState.root, ''))
    },

    clean: p => p.split('/').filter(v => v).join('/'),

    event: (type, source = window) =>
        source.dispatchEvent(new CustomEvent("stateChange", {
            detail: {
                // state: document.location.pathname,
                type: type
            },
            bubbles: true
        })),

    match: (node, attr) => {
        var regex = '^/' + PushState.clean(node.getAttribute(attr)) + '$';
        let match = new RegExp(regex).exec(PushState.get());
        console.log(regex,'match',PushState.get(), match ? "YES" : "NO");
        // console.log('match', match, match ? "YES" : "NO", regex, PushState.get(), new RegExp(regex));
        node.hidden = match ? false : true;
        let callback = node.getAttribute('callback')
        // console.log('callback', callback);
        if (match && callback) window[callback].apply(undefined,match.slice(1));
    }
}




// window.addEventListener("click",console.log);

HEAR = window.addEventListener;

// --------- OBSERVE CHANGES
HEAR("load", e =>
    PushState.event('init')
);
HEAR("click", e => {
    console.log('cick IT');
    console.log('cick',PushState.PATH(e.target));
    PushState.PATH(e.target).forEach(n=>PushState.follow(n,e));
	// if(e.target.hasAttribute('noState')) return;
 //    var state = e.target.getAttribute('href');
 //    if (!state) return;
 //    e.preventDefault();
 //    PushState.set(state);
 //    PushState.event('link', e.target);
});
HEAR("popstate", e =>
    PushState.event('history')
);





// --------- MARK LINKS
HEAR("stateChange", e => {
    var path = PushState.get();
    Array.from(document.links).forEach(l => {
        if (path == l.getAttribute('href')) l.classList.add('currentState');
        else l.classList.remove('currentState');
    });
});



// --------- ON-STATE ATTRIBUTE, SHOW ON STATE-MATCH
HEAR("stateChange", e => {
    document.querySelectorAll('[on-state]').forEach(node =>
        PushState.match(node, 'on-state')
    );
});


// --------- CUSTOM ELEMENT, SHOW ON STATE-MATCH
window.customElements.define('push-state', class extends HTMLElement {
    connectedCallback() {
        HEAR('stateChange', () => PushState.match(this, 'match'));
    }
});



