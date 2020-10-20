NOW = ()=>window.performance.now();

HEAR = (t,e)=>window.addEventListener(t,e);

TAPJS = {
    E:e=>{
        // console.log('E',e.target,e.composedPath);
        var base = e.composedPath ? e.composedPath()[0] : e.target;
        // console.log('base',base);
        base.dispatchEvent( new Event('tap', {bubbles: true,composed: true}));
    }
}

HEAR('touchstart', e => TAPJS.TM = false);
HEAR('touchmove', e => TAPJS.TM = true);
HEAR('touchend', e => {
    TAPJS.TE = NOW();
    if (!TAPJS.TM) 
        e.target.dispatchEvent( new Event('click', {bubbles: true,composed: true}));
        // TAPJS.E(e);
});

HEAR('click', e => {
    // if(NOW() - TAPJS.TE > 20) 
        if(NOW() - TAPJS.TE < 400) 
            return e.preventDefault();
    console.log('CLICK',NOW(),e)
    // TAPJS.TE = NOW();
    // TAPJS.E(e);
});

// HEAR('tap', TAPJS.ACT);





