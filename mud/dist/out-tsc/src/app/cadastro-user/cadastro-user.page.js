import * as tslib_1 from "tslib";
import { CpfValidator } from '../validators/cpf';
import { CelularValidator } from '../validators/celular';
import { BancoService } from './../banco.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, IonSlides, AlertController } from '@ionic/angular';
import { Validators, FormBuilder } from '@angular/forms';
var CadastroUserPage = /** @class */ (function () {
    function CadastroUserPage(navCtrl, BD, formBuilder, AlertController) {
        this.navCtrl = navCtrl;
        this.BD = BD;
        this.formBuilder = formBuilder;
        this.AlertController = AlertController;
        this.submitAttempt1 = false;
        this.submitAttempt2 = false;
        this.sintomas = [
            { val: 'Dificuldade para Respirar', id: 0 },
            { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
            { val: 'Sensações de Asfixia', isChecked: false },
            { val: 'Sudorese', isChecked: false },
            { val: 'Tremores/abalos', isChecked: false },
            { val: 'Naúsea/indisposição abdominal', isChecked: false },
            { val: 'Dor/desconforto torácido', isChecked: false },
            { val: 'Ondas de calor/frio', isChecked: false },
            { val: 'Anestesia/formigamento', isChecked: false },
            { val: 'Sensações de irrealidade', isChecked: false },
            { val: 'Instabilidade/tontura/desmaio', isChecked: false },
            { val: 'Medo de morrer', isChecked: false },
            { val: 'Medo de perder o controle/enlouquecer', isChecked: false }
        ];
        this.slideOneForm = formBuilder.group({
            nome: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[ A-Za-zÀ-ú ]*')])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            datanasc: ['', Validators.compose([Validators.required])],
            celular: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CelularValidator.checkCelular])],
            cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CpfValidator.checkCpf])],
            senha: ['', Validators.required],
            confirmasenha: ['', Validators.required]
        }, { validator: this.matchingPasswords('senha', 'confirmasenha') });
        this.slideTwoForm = formBuilder.group({
            nome_contato1: ['', Validators.compose([Validators.required, Validators.pattern('[ A-Za-zÀ-ú ]*')])],
            num_contato1: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CelularValidator.checkCelular])],
            nome_contato2: ['', Validators.compose([Validators.pattern('[ A-Za-zÀ-ú ]*')])],
            num_contato2: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+')])]
        });
    }
    CadastroUserPage.prototype.matchingPasswords = function (senhaKey, confirmasenhaKey) {
        return function (group) {
            var senha = group.controls[senhaKey];
            var confirmasenha = group.controls[confirmasenhaKey];
            if (confirmasenha.value != senha.value) {
                return {
                    mismatchedPasswords: true
                };
            }
            return null;
        };
    };
    /* public slideOneForm:FormGroup = new FormGroup({
       'nome' : new FormControl(null, [Validators.required, Validators.minLength(1), Validators.pattern('[ A-Za-zÀ-ú ]*')]),
       'email' : new FormControl(null, [Validators.required, Validators.email]),
       'datanasc' : new FormControl(null, [Validators.required]),
       'celular' : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CelularValidator.checkCelular]),
       'cpf' : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CpfValidator.checkCpf]),
       'senha' : new FormControl(null, [Validators.required, Validators.minLength(2)]),
       'confirmasenha' : new FormControl(null, [Validators.required, Validators.minLength(2), ConfirmaSenha.checkSenha])},
       {validator: this.matchingPasswords('senha', 'confirmasenha')}
     })*/
    CadastroUserPage.prototype.proxSlide = function () {
        this.IonSlides.lockSwipes(false);
        this.IonSlides.slideNext();
        this.IonSlides.lockSwipes(true);
    };
    CadastroUserPage.prototype.addcontato = function () {
        document.getElementById("contato2").style.display = 'unset';
        document.getElementById("fab").style.display = 'none';
    };
    CadastroUserPage.prototype.save = function () {
        if (this.slideOneForm.invalid) {
            this.IonSlides.slideTo(0);
            this.submitAttempt1 = true;
        }
        if (this.slideTwoForm.invalid) {
            this.IonSlides.slideTo(0);
            this.submitAttempt2 = true;
        }
        else {
            this.IonSlides.lockSwipes(false);
            this.IonSlides.slideNext();
            this.IonSlides.lockSwipes(true);
        }
    };
    CadastroUserPage.prototype.cadastra = function () {
        var _this = this;
        var nome = document.getElementById("0").value;
        var email = document.getElementById("1").value;
        var dt_nasc = document.getElementById("2").value;
        var celular = document.getElementById("3").value;
        var cpf = document.getElementById("4").value;
        var senha = document.getElementById("5").value;
        var cont1_nome = document.getElementById("6").value;
        var cont1_tell = document.getElementById("7").value;
        var cont2_nome = document.getElementById("8").value;
        var cont3_nome = document.getElementById("9").value;
        /* this.BD.insertGenerico("INSERT INTO usuario(nome,email,data_nasc,cpf,celular,senha,data_primeira_crise,sintoma,situacoes_sintoma) VALUES('"+nome+"','"+email+"','"+dt_nasc+"','"+cpf+"','"+celular+"','','','','','');")
       .then(async(response)=>{
           const alert = await this.AlertController.create({
             header: 'Confirmação',
             subHeader: 'Sucesso!',
             message: JSON.stringify(response),
             buttons: ['OK']
           });
           
           await alert.present();
         }
       )*/
        this.BD.cadUsu1(nome, cpf, email, dt_nasc, celular, senha)
            .then(function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AlertController.create({
                            header: 'Confirmação',
                            subHeader: 'Sucesso!',
                            message: JSON.stringify(response),
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })
            .catch(function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AlertController.create({
                            header: 'Confirmação',
                            subHeader: 'Erro!',
                            message: JSON.stringify(response),
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /*
   public Validar(name:string)
    {
      if(name == 'confirmasenha')
      {
        if(this.slideOneForm.controls.confirmasenha.value != this.slideOneForm.controls.senha.value)
          document.getElementById(name).style.outlineColor='#020B04';
        else if(!this.slideOneForm.controls.nome.valid)
          document.getElementById(name).style.backgroundColor='#f53d3d';
      }
    }
  
    inserirUsuario()
    {
      let nome = (<HTMLInputElement>document.getElementById("0")).value;
      let email = (<HTMLInputElement>document.getElementById("1")).value;
      let datanasc = (<HTMLIonDatetimeElement>document.getElementById("2")).value;
      let celular = (<HTMLInputElement>document.getElementById("3")).value;
      let cpf = (<HTMLInputElement>document.getElementById("4")).value;
      let senha = (<HTMLInputElement>document.getElementById("5")).value;
      let sql = "INSERT INTO usuario (id_usuario, nome)"
      this.BD.selectGenerico(sql);
  
  }*/
    CadastroUserPage.prototype.ngOnInit = function () {
        this.IonSlides.lockSwipes(true);
    };
    tslib_1.__decorate([
        ViewChild(IonSlides),
        tslib_1.__metadata("design:type", IonSlides)
    ], CadastroUserPage.prototype, "IonSlides", void 0);
    CadastroUserPage = tslib_1.__decorate([
        Component({
            selector: 'app-cadastro-user',
            templateUrl: './cadastro-user.page.html',
            styleUrls: ['./cadastro-user.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, BancoService, FormBuilder, AlertController])
    ], CadastroUserPage);
    return CadastroUserPage;
}());
export { CadastroUserPage };
//# sourceMappingURL=cadastro-user.page.js.map