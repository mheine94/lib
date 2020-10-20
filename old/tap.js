TAPJS = {
    E:e=>{
        // console.log('E',e.target,e.composedPath);
        var base = e.composedPath ? e.composedPath()[0] : e.target;
        // console.log('base',base);
        base.dispatchEvent( new Event('tap', {bubbles: true,composed: true}));
    },
    P:()=>window.performance.now(),
    L:(t,e)=>window.addEventListener(t,e),


    ACT: ev => {
        // console.log('event', ev.target);
        var path = ev.composedPath ? ev.composedPath() : TAPJS.PATH(ev.target);
        // console.log('PATH', path);
        TAPJS.BUBBLE(path);
    },
    PATH: node => {
        return node ? [node].concat(TAPJS.PATH(node.parentElement)) : [];
        // console.log('TREE-rec', node);
        // if(!node) return [];
        // return [node].concat(TAPJS.TREE(node.parentElement))
    },
    BUBBLE: path => {
        // console.log('BUBBLE', path.length);
        var node = path.shift();
        if (!node) return;
        console.log('dispatchEvent',node);
        // node.dispatchEvent(new Event('tap2'));
        if (node.getAttribute) {
            var fn = node.getAttribute('on-tap');
            if (fn) {
                var CEs = [node].concat(path.filter(x => (x.tagName && x.tagName.includes('-')))).concat([window]);
                var CEsFN = CEs.filter(CE=>CE[fn]);
                if(CEsFN.length) CEsFN[0][fn]({target:node});
                //else if(fn=='click') node.dispatchEvent(new MouseEvent('click',{bubbles:false}));
                // else console.warn(fn,'not found in',CEs);
                console.log(fn,'found in',CEsFN);
                
                // ces.forEach(ce=>ce[fn](ev));
            } else {
        // console.log('tagname', path[0]);
                
                if(node.tagName=='LABEL') 
                    var input = path[0].querySelector('#'+node.getAttribute('for'));
                if(node.tagName=='INPUT') 
                    var input = node;
                if(input){
                    console.log('INPUT2',input);
                    input.dispatchEvent(new MouseEvent('click'));
                }
                // node.dispatchEvent(new MouseEvent('click',{bubbles:false}));
            }
        }
        TAPJS.BUBBLE(path);
    }
}










TAPJS.L('tap', TAPJS.ACT);
TAPJS.L('touchstart', e => TAPJS.TM = false);
TAPJS.L('touchmove', e => TAPJS.TM = true);
TAPJS.L('touchend', e => {
    TAPJS.TE = TAPJS.P();
    if (!TAPJS.TM) 
        TAPJS.E(e);
});
TAPJS.L('click', ev => {
    if(TAPJS.P() - TAPJS.TE < 400) 
        return ev.preventDefault();
    // console.log('CLICK')
    TAPJS.TE = TAPJS.P();
    TAPJS.E(ev);
});










//REQ: tap.js



                    // var input = node.parentElement.querySelector('#'+node.getAttribute('for'));





                // console.log('CICK-event',node,node.tagName,node.parentElement);
                // console.log('CES',CEs);
                    // var input = CEs[1].querySelector('#'+node.getAttribute('for'));





    // TAPJS.TOUCHEND = window.performance.now();

    // TAPJS.TOUCHEND = window.performance.now();
    // console.log('click-it3', ev, window.performance.now() - TAPJS.TOUCHEND);
    // if(window.performance.now() - TAPJS.TOUCHEND < 400) {
// window.addEventListener('click', ev => {
// window.addEventListener('touchstart', ev => TAPJS.TOUCHMOVE = false);
// window.addEventListener('touchmove', ev => TAPJS.TOUCHMOVE = true);
// window.addEventListener('touchend', ev => {
