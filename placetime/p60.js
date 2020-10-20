P60 = {
    BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXY01234abcdefghijklmnopqrstuvwxy56789'.split(''),
    // Y4: 'ABCDEFGHIJKLMNOPQRSTUVWXY01234'.split(''),
    // y9: 'abcdefghijklmnopqrstuvwxy56789'.split(''),
    enc60: v => {
        v = Math.floor(v);
        // console.log('enc60', v);
        for (var tmp = []; v > 0; v = Math.floor(v / 60))
            tmp.unshift(Math.floor(v % 60));
        // console.log('enc60', tmp);
        return tmp.map(x => P60.BASE[x]).join('');
    },
    dec60: v => {
        // console.log('dec60', v);
        return v.split('').reverse().map((v, i) => {
            // console.log('dec60', v, i, P60.BASE.indexOf(v) * Math.pow(60,i),'||',P60.BASE.indexOf(v),Math.pow(60,i));
            return P60.BASE.indexOf(v) * Math.pow(60, i);
        }).reduce((a, b) => a + b, 0);
        // 
    },

    enc: v => {
        var p1 = P60.enc60(v >= 0 ? v * 10 : 1800 - v * 10).padStart(2, 'A');
        var p2 = P60.enc60((Math.round(v * 1000000) + '').substr(-5));
        // console.log("ENC",p1 + p2);
        return p1 + p2;
    },
    dec: v => {
    	v = v.padEnd(5,'A'); // NEW... try to unify p1/p2 now...
        var p1 = P60.dec60(v.substr(0, 2)) / 10;
        // if(p1>180) p1 = 180 - p1;
        // console.log('dec1',p1);
        var p2 = P60.dec60(v.substr(2)) / 1000000;
        // console.log('dec2',p2);
        var x = p1 > 180 ? 180 - p1 - p2 : p1 + p2;
        // if(p1>180) p1 = 180 - p1;
        // var x = (p1+p2).toFixed(7)*1;
        // if(x>180) x = 180 - x;
        // console.log('dec2',x);
        // console.log("DEC",(p1+p2).toFixed(7)*1);
        return x.toFixed(7) * 1;
    }

}






// var BASE10 = "0123456789";
// var BASE60 = "ABCDEFGHIJKLMNOPQRSTUVWXY01234abcdefghijklmnopqrstuvwxy56789";

// function convert(src, srctable, desttable) {
//     var srclen = srctable.length;
//     var destlen = desttable.length;
//     var val = 0;
//     var numlen = src.length;
//     for (var i = 0; i < numlen; i++) { val = val * srclen + srctable.indexOf(src.charAt(i)); }
//     if (val < 0) { return 0; }
//     var r = val % destlen;
//     var res = desttable.charAt(r);
//     var q = Math.floor(val / destlen);
//     while (q) { r = q % destlen;
//         q = Math.floor(q / destlen);
//         res = desttable.charAt(r) + res; }
//     return res;
// }





// }