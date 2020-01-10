function window_mud() {
    var t = document.createElement("section"),
        e = document.createElement("header"),
        n = document.createElement("h2"),
        i = document.createElement("div"),
        d = document.createElement("button"),
        s = document.createElement("button"),
        l = document.createElement("button"),
        c = document.createElement("section"),
        o = document.createElement("footer"),
        h = document.createElement("i"),
        a = document.createElement("i"),
        m = document.createElement("i");
        divBack = null;//É usado no confirm
    this.SetAppendChild = function(t, e) {
        t.appendChild(e)
    }, this.Create = function(r) {
        this.SetAppendChild(t, e), this.SetAppendChild(t, c), this.SetAppendChild(t, o), this.SetAppendChild(e, n), this.SetAppendChild(e, i), this.SetAppendChild(d, h), this.SetAppendChild(s, a), this.SetAppendChild(l, m), this.SetAppendChild(i, d), this.SetAppendChild(i, s), this.SetAppendChild(i, l), this.SetAppendChild(r, t)
    }, this.WindowMUD = function(i, r, u) {
        let p = document.querySelector(i);
        this.Create(p), this.SetElementAttribute(t, "class", "component-window"), this.SetElementAttribute(e, "class", "window-header"), this.SetElementAttribute(h, "class", "fas fa-window-minimize"), this.SetElementAttribute(a, "class", "fas fa-plus"), this.SetElementAttribute(m, "class", "fas fa-times"), this.SetElementAttribute(c, "class", "window-contains-content"), this.SetElementAttribute(o, "class", "window-footer"), d.addEventListener("click", function() {
            $(".window-contains-content").slideUp(500, "linear")
        }), s.addEventListener("click", function() {
            $(".window-contains-content").slideDown(500, "swing")
        }), l.addEventListener("click", function() {
            p.removeChild(t)
        }), this.SetText(n, r)
    }, this.SetElementAttribute = function(t, e, n) {
        t.setAttribute(e, n)
    }, this.SetText = function(t, e) {
        let n = document.createTextNode(e);
        t.appendChild(n)
    }, this.AddElementWindowContains = function(t) {
        let e = document.querySelector(t);
        this.SetAppendChild(c, e)
    }, this.Modal = function(i, d, s, h, a, r) {
        let u = document.body,
            p = document.createElement("div");
        divBack= p;
        this.SetElementAttribute(p, "class", "background-window " + h), this.Create(p, 2), 1 == s ? this.AddElementWindowContains(d) : this.SetAppendChild(c, d);
        this.SetElementAttribute(t, "class", "component-window"), this.SetElementAttribute(e, "class", "window-header"), this.SetElementAttribute(m, "class", "fas fa-times"), this.SetElementAttribute(c, "class", "window-contains-content"), this.SetElementAttribute(o, "class", "window-footer"), l.addEventListener("click", function() {
            if (a) {
                let t = document.querySelector(r),
                    e = document.querySelector(d);
                e.style.display = "none", t.appendChild(e)
            }
            u.removeChild(p)
        }), this.SetText(n, i), this.SetAppendChild(u, p)
    }, this.Alert = function(t, e, n, i, d, s, l) {
        let c = document.createElement("section"),
            o = document.createElement("h3"),
            h = document.createElement("i"),
            a = document.createElement("p");
        this.SetElementAttribute(c, "class", "section-a-c"), this.SetElementAttribute(h, "class", i), this.SetText(o, n), this.SetText(a, e), this.SetAppendChild(c, o), this.SetAppendChild(c, h), this.SetAppendChild(c, a), this.Modal(t, c, 2, d, s, l)
    }, this.Confirm = function(titP,txtP,titS,ico,pD,funcaoT,funcaoF){
        let by=document.body,
            c = document.createElement("section"),
            o = document.createElement("h3"),
            h = document.createElement("i"),
            a = document.createElement("p");
            div = document.createElement('div'),
            bCan=document.createElement('button'),
            bSim=document.createElement('button'),
            spCan=document.createElement('span'),
            spSub=document.createElement('span');
        bCan.textContent='Não';
        bSim.textContent='Sim';
        this.SetAppendChild(bCan,spCan);this.SetAppendChild(bSim,spSub);
        this.SetAppendChild(div,bSim);this.SetAppendChild(div,bCan);
        this.SetElementAttribute(bCan,'class','button');
        this.SetElementAttribute(bSim,'class','button');
        this.SetElementAttribute(div,'class','div-submit-confirm');
        this.SetElementAttribute(c, "class", "section-a-c"),
        this.SetElementAttribute(h, "class", ico),
        this.SetText(o,titS),
        this.SetText(a,txtP),
        this.SetAppendChild(c,o),
        this.SetAppendChild(c,h),
        this.SetAppendChild(c,a),
        this.SetAppendChild(c,div);
        this.Modal(titP,c,2,pD,!1,'');
        bSim.addEventListener('click',function(){funcaoT();by.removeChild(divBack)});  
        bCan.addEventListener('click',function(){funcaoF();by.removeChild(divBack)});
              
    }
}