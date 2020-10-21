Date.prototype.format = function(format,locale) {
    if(!locale)locale = 'lookup';
    var L = function(c){return this.toLocaleString(locale, c);}.bind(this);
    var n = 'numeric';
    var d = '2-digit';
    var f = {
        DDDD: L({weekday:'long'}),
        DDD: L({weekday:'short'}),
        DD: L({day:d}),
        '!D': L({day:n}),
        MMMM: L({month:'long'}),
        MMM: L({month:'short'}),
        MM: L({month:d}),
        '!M': L({month:n}),
        YYYY: L({year:n}),
        YY: L({year:d}), 
        hh: L({hour:d,hour12:false}),
        '!h': L({hour:n,hour12:false}),
        mm: L({minute:d}),
        '!m': L({minute:n}),
        ss: L({second:d}),
        '!s': L({second:n}),
    };
    if(f.mm<10)f.mm='0'+f.mm;// for browser bug
    if(f.ss<10)f.ss='0'+f.ss;// for browser bug
    
    for (var typ in f)
        var format = format.replace(typ, f[typ]);
    return format;
}