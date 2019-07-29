function Banco() {
    this.a, this.windowMud = new window_mud, this.Salvar = function() {
        let e = document.querySelector("#host"),
            t = document.querySelector("#port"),
            o = document.querySelector("#dbname"),
            a = document.querySelector("#user"),
            r = document.querySelector("#password");
        if ("" == e.value || "" == t.value || "" == o.value || "" == a || "" == r)(new window_mud).Alert("ATENÇÃO", "Preencha todos os campos.", "Formulário", "fas fa-exclamation", "w-p-default", !1, "");
        else {
            localStorage.setItem("host", e.value), localStorage.setItem("port", t.value), localStorage.setItem("dbname", o.value), localStorage.setItem("user", a.value), localStorage.setItem("password", r.value);
            let n = {
                host: localStorage.getItem("host"),
                port: localStorage.getItem("port"),
                dbname: localStorage.getItem("dbname"),
                user: localStorage.getItem("user"),
                password: localStorage.getItem("password")
            };
            Banco.a = n;
            let s = JSON.stringify(n);
            $.ajax({
                url: "./api/",
                method: "POST",
                cache: !1,
                dataType: "JSON",
                data: {
                    json: s,
                    acao: "0"
                },
                error: function(e) {
                    console.log(e), (new window_mud).Alert("ALERTA", "Houve um erro em salvar.", "Banco de dados", "far fan-bar", "w-p-default", !1, "")
                }
            }).done(function(e) {
                document.querySelector("#submitBD").disabled = !0, localStorage.setItem("host", e.host), localStorage.setItem("port", e.port), localStorage.setItem("dbname", e.dbname), localStorage.setItem("user", e.user), localStorage.setItem("password", e.password), (new window_mud).Alert("ALERTA", "Os dados do banco foram salvo com sucesso!", "Banco de dados", "fas fa-check", "w-p-default", !1, "");
                let t = Banco.a,
                    o = document.querySelector("#host + span"),
                    a = document.querySelector("#host"),
                    r = document.querySelector("#port + span"),
                    n = document.querySelector("#port"),
                    s = document.querySelector("#dbname + span"),
                    l = document.querySelector("#dbname"),
                    u = document.querySelector("#user + span"),
                    d = document.querySelector("#user"),
                    c = document.querySelector("#password + span"),
                    m = document.querySelector("#password");
                a.value = "", n.value = "", l.value = "", d.value = "", m.value = "", o.textContent = "host:" + t.host, r.textContent = "port:" + t.port, s.textContent = "dbname:" + t.dbname, u.textContent = "user:" + t.user, c.textContent = "password:" + t.password
            })
        }
    }, this.Excluir = function() {
        localStorage.removeItem("host"), localStorage.removeItem("port"), localStorage.removeItem("dbname"), localStorage.removeItem("user"), localStorage.removeItem("password");
        let e = document.querySelector("#host + span"),
            t = document.querySelector("#port + span"),
            o = document.querySelector("#dbname + span"),
            a = document.querySelector("#user + span"),
            r = document.querySelector("#password + span");
        e.textContent = "host", t.textContent = "port", o.textContent = "dbname", a.textContent = "user", r.textContent = "password", document.querySelector("#submitBD").disabled = !1, this.windowMud.Alert("ALERTA", "Lembre-se, que agora é necessário um banco postrgres.", "Banco de dados", "fas fa-database", "w-p-default", !1, "")
    }, this.BtnAlterar = function() {
        document.querySelector("#submitBD").disabled = !1, this.windowMud.Alert("ALERTA", "Habilitado para alteração.", "Banco de dados", "fas fa-check", "w-p-default", !1, "")
    }, this.SetFormDefault = function() {
        let e = document.querySelector("#host + span"),
            t = document.querySelector("#port + span"),
            o = document.querySelector("#dbname + span"),
            a = document.querySelector("#user + span"),
            r = document.querySelector("#password + span"),
            n = {
                host: localStorage.getItem("host"),
                port: localStorage.getItem("port"),
                dbname: localStorage.getItem("dbname"),
                user: localStorage.getItem("user"),
                password: localStorage.getItem("password")
            },
            s = JSON.stringify(n);
        $.ajax({
            url: "./api/",
            method: "POST",
            cache: !1,
            dataType: "JSON",
            data: {
                json: s,
                acao: "2"
            },
            error: function(e) {
                console.log(e), (new window_mud).Alert("ALERTA", "Houve um erro em pegar valores. Provavelmente, há algum problema no servidor(hospedagem do site).", "Banco de dados", "far fan-bar", "w-p-default", !1, "")
            }
        }).done(function(n) {
            e.textContent = "host:" + n.host, t.textContent = "port:" + n.port, o.textContent = "dbname:" + n.dbname, a.textContent = "user:" + n.user, r.textContent = "password:" + n.password
        })
    }
}