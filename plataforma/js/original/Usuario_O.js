function Usuario() {
    this.a, this.windowMud = new window_mud, this.Salvar = function () {
            let e = document.querySelector("#cpf"),
                t = document.querySelector("#nome"),
                o = document.querySelector("#email"),
                a = document.querySelector("#celular"),
                r = document.querySelector("#senha");
            if ("" == e.value || "" == t.value || "" == o.value || "" == a.value || "" == r.value)(new window_mud).Alert("ATENÇÃO", "Preencha todos os campos.", "Formulário", "fas fa-exclamation", "w-p-default", !1, "");
            else {
                let x = {
                        cpf: ((e.value.replace(".", "")).replace(".", "")).replace("-", ""),
                        nome: t.value,
                        email: o.value,
                        celular: (a.value.replace(" ", "")).replace("-", ""),
                        senha: r.value
                    },
                    ç = document.querySelector('#l-login > a');
                Ajax(x, 3).then((e) => {
                        (new window_mud).Alert("ALERTA", e.sucess, "Banco de dados", "fas fa-check", "w-p-default", !1, "");
                        document.querySelector("#submitUS").disabled = !0;
                        let o = document.querySelector("#cpf + span"),
                            a = document.querySelector("#cpf"),
                            r = document.querySelector("#nome + span"),
                            n = document.querySelector("#nome"),
                            s = document.querySelector("#email + span"),
                            l = document.querySelector("#email"),
                            u = document.querySelector("#celular + span"),
                            d = document.querySelector("#celular"),
                            c = document.querySelector("#senha + span"),
                            nn = (t.value).split(" "),
                            icon = document.createElement('i'),
                            txt = document.createTextNode(nn[0]),
                            m = document.querySelector("#senha");
                        icon.setAttribute('class', 'fas fa-caret-down');
                        a.value = "", n.value = "", l.value = "", d.value = "", m.value = "", o.textContent = "cpf:" + x.cpf, r.textContent = "nome:" + x.nome, s.textContent = "email:" + x.email, u.textContent = "celular:" + x.celular, c.textContent = "senha:" + x.senha, ç.textContent = "", ç.appendChild(txt), ç.appendChild(icon)
                    })
                    .catch((e) => {
                        console.log(e), (new window_mud).Alert("ALERTA", "Houve um erro em salvar." + e.error, "Banco de dados", "fas fa-times", "w-p-default", !1, "")
                    })
            }
        }, this.gambiarra = () => {

        },
        this.CaminhoExclusao = () => {
            document.location = './api/index.php?A=5';
        },
        this.Excluir = function () {
            if (localStorage.getItem('login')) {
                let pp = new window_mud;
                pp.Confirm('ALERTA', 'Você deseja excluir o seu Usuário? Lembre-se que ao excluir a sua conta, não poderá utilizar o MUD.', 'Usuário', 'far fa-user', 'w-p-default', this.CaminhoExclusao, this.gambiarra);
            } else
                this.windowMud.Alert("ALERTA", "Você tem que estar logado", "Usuário!", "far fa-user", "w-p-default", !1)
        }, this.BtnAlterar = function () {
            document.querySelector("#submitUS").disabled = !1, this.windowMud.Alert("ALERTA", "Habilitado para alteração.", "Banco de dados", "fas fa-check", "w-p-default", !1, "")
        }, this.SubmitLogin = function () {
            let e = document.querySelector("#nome-l"),
                t = document.querySelector("#senha-l"),
                o = document.querySelector("#form-l-json"),
                a = {
                    host: localStorage.getItem("host"),
                    port: localStorage.getItem("port"),
                    dbname: localStorage.getItem("dbname"),
                    user: localStorage.getItem("user"),
                    password: localStorage.getItem("password"),
                    nameL: e.value,
                    senhaL: t.value
                },
                r = JSON.stringify(a);
            o.value = r
        }, this.SetFormDefault = function () {
            let e = document.querySelector("#cpf + span"),
                t = document.querySelector("#nome + span"),
                o = document.querySelector("#email + span"),
                a = document.querySelector("#celular + span"),
                r = document.querySelector("#senha + span");
            Ajax('', 4).then((n) => {
                    e.textContent = "cpf:" + n.cpf, t.textContent = "nome:" + n.nome, o.textContent = "email:" + n.email, a.textContent = "celular:" + n.celular, r.textContent = "senha:" + n.senha
                })
                .catch((e) => {
                    console.log(e), (new window_mud).Alert("ALERTA", "Erro em pegar seus dados como usuário. Provavelmente há um erro no banco." + e.error, "Banco de dados", "far fan-bar", "w-p-default", !1, "")
                })
        }
}