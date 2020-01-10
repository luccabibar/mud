var formPesquisa = document.querySelector(".envolve-menu-canvas"),
    selectAno = document.querySelector('#select-ano'),
    selectMes = document.querySelector('#select-mes'),
    id_paciente = sessionStorage.getItem('id_paciente'),
    fiAnual = document.querySelector('#fi-anual'),
    fiMensal = document.querySelector('#fi-mensal'),
    fiSemanal = document.querySelector('#fi-semanal'),
    fGrafico = document.querySelector('#f-grafico'),
    fIntervalo = document.querySelector('#f-intervalo'),
    fgAlimentacaoGrafico = document.querySelector('#fg-alimentacao'),
    fgCriseGrafico_1 = document.querySelector('#fg-crise_1'),
    fgCriseGrafico_2 = document.querySelector('#fg-crise_2'),
    fgSonoGrafico_1 = document.querySelector('#fg-sono_1'),
    fgSonoGrafico_2 = document.querySelector('#fg-sono_2'),
    fgLazerGrafico = document.querySelector('#fg-lazer'),
    lblSelectAno = document.querySelector('#label-select-ano'),
    lblFiSemana = document.querySelector('#label-fi-semana'),
    lblSelectMes = document.querySelector('#label-select-mes'),
    filtro = document.querySelector('#f-filtros'),
    tituloGrafico = document.querySelector('.canvas-grafico > header > h3'),
    btnPesquisa = document.querySelector('#btn-pesquisa'),
    btnSair = document.querySelector('#btn-sair'),
    btnHelpGrafico = document.querySelector('.btn-help-grafico'),
    btnHelp= document.querySelector('#btn-help'),
    btnObservacao = document.querySelector('#btn-observacao'),
    grafico = null;
async function DesativarVinculo(){
    let obj ={id_sessao:sessionStorage.getItem('id_sessao')},
    result = await this.Ajax(obj, 13);
    if(result.sucess){
        (new window_mud).Alert("ATENÇÃO",result.msg,'Exclusão do vínculo','fas fa-times',"w-p-default", !1, "");
        window.location.href="./";
    }
    else
        (new window_mud).Alert("ATENÇÃO",result.msg,'Exclusão do vínculo','fas fa-times',"w-p-default", !1, "");
}
/**
 * @abstract Monta os elementos com o seus extras
 */
function MontarExtras(data){
    let p=document.createElement('p'),
        div = document.createElement('div'),
        ptituloLocal = document.createElement('p'),
        pTituloSituacao = document.createElement('p'),
        pTituloAcompanhado = document.createElement('p'),
        pLocal = document.createElement('p'),
        pSituacao = document.createElement('p'),
        pAcompanhado = document.createElement('p');
    semanaString = [];
    for(let i in data){
        const obj = data[i];
        if(i == 0)
            (document.querySelector('.observacoes-section')).textContent="";
        if((fGrafico.getAttribute('data-grafico')) == 'alimentacao' || (fGrafico.getAttribute('data-grafico')) == 'sono1' || (fGrafico.getAttribute('data-grafico')) == 'sono2' || (fGrafico.getAttribute('data-grafico')) == 'lazer'){
            p.textContent = obj.observacao;
            semanaString = (obj.semanaa).split(" ");
            this.CriarElementObservecao(semanaString[0],'.observacoes-section',p);
        }
        else if( (fGrafico.getAttribute('data-grafico')) == 'crise1' || (fGrafico.getAttribute('data-grafico')) == 'crise2'){
            div.appendChild(ptituloLocal);
            div.appendChild(pLocal);
            div.appendChild(pTituloSituacao);
            div.appendChild(pSituacao);
            div.appendChild(pTituloAcompanhado);
            div.appendChild(pAcompanhado);
            div.setAttribute('class','extra-crise');
            ptituloLocal.textContent = 'local';
            pTituloSituacao.textContent = 'situacao';
            pTituloAcompanhado.textContent = 'acompanhado';
            pLocal.textContent = obj.local;
            pSituacao.textContent = obj.situacao;
            pAcompanhado.textContent = obj.acompanhado;
            semanaString = (obj.semanaa).split(" ");
            this.CriarElementObservecao(semanaString[0],'.observacoes-section',div);
        }
    }
}
/**
 * @abstract Cria uma estrutura dinamicamente
 */
function CriarSectionObservacao(father,titulo){
    if( (document.querySelectorAll('.observacoes')).length == 0){
        
        let recebe = document.querySelector(father),
        sectionFather = document.createElement('section'),
        tituloHeader = document.createElement('header'),
        tituloH3 = document.createElement('h3'),
        sectionConteudo = document.createElement('section');
        tituloHeader.appendChild(tituloH3);
        sectionFather.appendChild(tituloHeader);
        sectionFather.appendChild(sectionConteudo);
        sectionFather.setAttribute('class','observacoes');
        sectionConteudo.setAttribute('class','observacoes-section');
        tituloH3.textContent = titulo;
        recebe.appendChild(sectionFather);
    }
}

/**
 * @abstract Criar elementos dinamicamente
 * 
 * @param  titulo título do elemento
 * @param  texto o texto
 * @param  father a onde ele será colocado
 */
function CriarElementObservecao(titulo,father,div){
    let contentFather = document.createElement('section'),
        header = document.createElement('header'),
        tituloH4 = document.createElement('h4'),
        contentDiv = document.createElement('section');
    contentFather.setAttribute('class','observacoes-element');
    contentFather.appendChild(header);
    contentFather.appendChild(contentDiv);
    header.appendChild(tituloH4);
    contentDiv.appendChild(div);
    tituloH4.textContent=titulo;
    document.querySelector(father).appendChild(contentFather);
}

/**
 * @abstract Essa função retorna os dados para os gráficos no formato json
 */
async function BuscarDados(tipo) {
    /**
     * @var obj ele é um objeto que é composto pelo período(ano,mes,semana) e pelo valor desse respectivo ano ou mes.
     *  Para um dado no período de semanas, ele necessita de ano e mês. Para dados com intervalo de um mês, basta ano.
     *  Para ano ele não necessita de nenhum.
     */
    try {
        //console.log(selectMes.getAttribute('data-select'));
        let obj = {
                grafico: fGrafico.getAttribute('data-grafico'),
                paciente: id_paciente,
                intervalo: fIntervalo.getAttribute('data-periodo'),
                ano: selectAno.getAttribute('data-select'),
                mes: this.CorresponderMes(selectMes.value)
            }
            comando = (tipo == 'grafico')? 11: (tipo == 'observacao-extra')? 12: (tipo == 'lazer-extra')? 13:0,
            dados = await this.Ajax(obj, comando);
        if (dados.sucess)
            return dados.grafico;
        else
            return dados.erro;
    } catch (e) {
        console.log(e);
    }
}
/**
 * @abstract Montas o gráfico lazer
 * @param  data 
 * @param  intervalo 
 */
function MontarDadosGraficoLazer(data, intervalo){
    /**
     * @var num_atividade números de atividaes
     */
    let num_atividade = [],
        retornarGrafico,
        returnLabelPeriodo=[];
    const obj = new Object(data),
        corTransparente = 'rgb(0,0,0,0)';
    switch (intervalo) {
        case 'meses':
                num_atividade = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let i in obj) {
                const objIntermediario = obj[i];
                for (let a in objIntermediario) {
                    const objIntermediarioPosicao = objIntermediario[a];
                    for (let nomePosicao in objIntermediarioPosicao) {
                        if (!(Number.isNaN(objIntermediarioPosicao[nomePosicao]))) {
                            num_atividade[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.num_atividade, 10);
                        }
                    }
                }
            }
            returnLabelPeriodo = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            break;
        case 'ano':
                num_atividade,returnLabelPeriodo = [];
            for (let i in obj) {
                const objIntermediario = obj[i];
                for (let a in objIntermediario) {
                    const objIntermediarioPosicao = objIntermediario[a];
                    num_atividade.push(parseInt(objIntermediarioPosicao.num_atividade, 10));
                    returnLabelPeriodo.push(a);
                }
            }
            break;
    }
    retornarGrafico = {
        valores: {
            num_atividade: {
                nome: "N° de atividades realizadas",
                data: num_atividade,
                borderColor: 'rgb(44,214,198)',
                backgroundColor: corTransparente
            }
        },
        returnPeriodo: returnLabelPeriodo
    }
    return (retornarGrafico);
}
/**
 * 
 * @param {*} data 
 * @param {*} intervalo 
 */
function MontarDadosGraficoSono2(data, intervalo) {
    let duracao_sono, returnLabelPeriodo = [],
        retornarGrafico;
    const obj = new Object(data),
        corTransparente = 'rgb(0,0,0,0)';
    switch (intervalo) {
        case 'meses':
                duracao_sono = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let i in obj) {
                const objIntermediario = obj[i];
                for (let a in objIntermediario) {
                    const objIntermediarioPosicao = objIntermediario[a];
                    for (let nomePosicao in objIntermediarioPosicao) {
                        if (!(Number.isNaN(objIntermediarioPosicao[nomePosicao]))) {
                            duracao_sono[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.duracao_sono, 10);
                        }
                    }
                }
            }
            returnLabelPeriodo = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            break;
        case 'semana':
        case 'ano':
                duracao_sono = [];
            for (let i in obj) {
                const objIntermediario = obj[i];
                for (let a in objIntermediario) {
                    const objIntermediarioPosicao = objIntermediario[a];
                    duracao_sono.push(parseInt(objIntermediarioPosicao.duracao_sono, 10));
                    returnLabelPeriodo.push(a);
                }
            }
            break;
    }
    retornarGrafico = {
        valores: {
            duracao_sono: {
                nome: "Tempo dormido",
                data: duracao_sono,
                borderColor: 'rgb(44,214,198)',
                backgroundColor: corTransparente
            },
            
        },
        returnPeriodo: returnLabelPeriodo
    }
    return (retornarGrafico);

}
/**
 * 
 * @param  data 
 * @param  intervalo 
 */
function MontarDadosGraficoSono1(data, intervalo) {
    let num_acordou, returnLabelPeriodo = [],
        retornarGrafico;
    const obj = new Object(data),
        corTransparente = 'rgb(0,0,0,0)';
    switch (intervalo) {
        case 'meses':
            num_acordou = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let i in obj) {
                const objIntermediario = obj[i];
                for (let a in objIntermediario) {
                    const objIntermediarioPosicao = objIntermediario[a];
                    for (let nomePosicao in objIntermediarioPosicao) {
                        if (!(Number.isNaN(objIntermediarioPosicao[nomePosicao]))) {
                            num_acordou[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.num_acordou, 10);
                        }
                    }
                }
            }
            returnLabelPeriodo = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            break;
        case 'semana':
        case 'ano':
                num_acordou = [];
            for (let i in obj) {
                const objIntermediario = obj[i];
                for (let a in objIntermediario) {
                    const objIntermediarioPosicao = objIntermediario[a];
                    num_acordou.push(parseInt(objIntermediarioPosicao.num_acordou, 10));
                    returnLabelPeriodo.push(a);
                }
            }
            break;
    }
    retornarGrafico = {
        valores: {
            acordou: {
                nome: "Nº que acordou durante a noite",
                data: num_acordou,
                borderColor: 'rgb(44,214,198)',
                backgroundColor: corTransparente
            },
            
        },
        returnPeriodo: returnLabelPeriodo
    }
    return (retornarGrafico);

}
function VerificarIntensidade(intensidade){
    if(intensidade >= 0 && intensidade < 1)
        return 0;
    else if(intensidade >=1 && intensidade < 3)
        return 2;
    else if(intensidade >= 3 && intensidade < 5)
        return 4;
    else if(intensidade >=5 && intensidade <= 6)
        return 6;
}
/**
 * 
 */
function MontarDadosGraficoCrise1(data, intervalo){
    console.log(data);
    let intensidade,dataSet =[],data1,data2,data3,data4,obj1,obj2,obj3,obj4,
        retornarGrafico,
        returnLabelPeriodo=[];
    const obj = new Object(data),
        corTransparente = 'rgb(0,0,0,0)';
    switch (intervalo) {
        case 'meses':
            data1=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            data2=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            data3=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            data4=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let i in obj) {
                const objIntermediario = obj[i];
                for (let a in objIntermediario) {
                    const objIntermediarioPosicao = objIntermediario[a];
                    for (let nomePosicao in objIntermediarioPosicao) {
                        if (!(Number.isNaN(objIntermediarioPosicao[nomePosicao]))) {
                            intensidade = this.VerificarIntensidade(objIntermediarioPosicao['intensidade']);
                            switch(intensidade){
                                case 0:
                                    data1[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao['duracao'],10);
                                    break;
                                case 2:
                                    data2[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao['duracao'],10);
                                    break;                            
                                case 4:
                                    data3[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao['duracao'],10);
                                    break;
                                case 6:
                                    data4[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao['duracao'],10);
                                    break;
                            }   
                        }
                    }
                }
            }
            returnLabelPeriodo = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            break;
        case 'ano':
            data1=[];
            data2=[];
            data3=[];
            data4=[];
            returnLabelPeriodo = [];
            for (let i in obj) {
                const objIntermediario = obj[i];
                for (let a in objIntermediario) {
                    const objIntermediarioPosicao = objIntermediario[a];
                    intensidade = this.VerificarIntensidade(objIntermediarioPosicao['intensidade']);
                    switch(intensidade){
                        case 0:
                            data1.push(parseInt(objIntermediarioPosicao['duracao'],10));
                            break;
                        case 2:
                            data2.push(parseInt(objIntermediarioPosicao['duracao'],10));
                            break;                            
                        case 4:
                            data3.push(parseInt(objIntermediarioPosicao['duracao'],10));
                            break;
                        case 6:
                            data4.push(parseInt(objIntermediarioPosicao['duracao'],10));
                            break;
                    } 
                    returnLabelPeriodo.push(a);
                }
            }
            break;
    }
    obj1={
        label:'leve',
        data:data1,
        borderColor:'rgb(44,214,198)',
        backgroundColor:'rgb(44,214,198)',
        fill:true,
        borderWidth:1
    };
    obj2={
        label:'moderado',
        data:data2,
        borderColor:'rgb(0,189,255)',
        backgroundColor:'rgb(0,189,255)',
        fill:true,
        borderWidth:1
    };
    obj3={
        label:'forte',
        data:data3,
        borderColor:'rgb(0,255,218)',
        backgroundColor:'rgb(0,255,218)',
        fill:true,
        borderWidth:1
    };
    obj4={
        label:'extremo',
        data:data4,
        borderColor:'rgb(14,237,118)',
        backgroundColor:'rgb(14,237,118)',
        fill:true,
        borderWidth:1
    };
    dataSet=[obj1,obj2,obj3,obj4];
    retornarGrafico = {
        valores: dataSet,
        returnPeriodo: returnLabelPeriodo
    }
    return (retornarGrafico);
}
/**
 * 
 */
function MontarDadosGraficoCrise2(data, intervalo){
    let numCrises = [],
        retornarGrafico,
        returnLabelPeriodo=[];
    const obj = new Object(data),
        corTransparente = 'rgb(0,0,0,0)';
    switch (intervalo) {
        case 'meses':
            numCrises = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let i in obj) {
                const objIntermediario = obj[i];
                for (let a in objIntermediario) {
                    const objIntermediarioPosicao = objIntermediario[a];
                    for (let nomePosicao in objIntermediarioPosicao) {
                        if (!(Number.isNaN(objIntermediarioPosicao[nomePosicao]))) {
                            numCrises[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.num_crises, 10);
                        }
                    }
                }
            }
            returnLabelPeriodo = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            break;
        case 'ano':
            numCrises,returnLabelPeriodo = [];
            for (let i in obj) {
                const objIntermediario = obj[i];
                for (let a in objIntermediario) {
                    const objIntermediarioPosicao = objIntermediario[a];
                    numCrises.push(parseInt(objIntermediarioPosicao.num_crises, 10));
                    returnLabelPeriodo.push(a);
                }
            }
            break;
    }
    retornarGrafico = {
        valores: {
            crise: {
                nome: "N° de crises",
                data: numCrises,
                borderColor: 'rgb(44,214,198)',
                backgroundColor: corTransparente
            }
        },
        returnPeriodo: returnLabelPeriodo
    }
    return (retornarGrafico);
}
/**
 * 
 * @param {} data 
 * @param {**} intervalo 
 */
function MontarDadosGraficoAlimentacao(data, intervalo) {
    let carboidratos, proteinas, laticinios, verd_frut, hidratacao, vezes_acordou, tempo, intensidade, vezes, returnLabelPeriodo = [],
        retornarGrafico;
    const obj = new Object(data),
        corTransparente = 'rgb(0,0,0,0)';
    switch (intervalo) {
        case 'meses':
            carboidratos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            proteinas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            laticinios = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            verd_frut = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            hidratacao = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            vezes_acordou = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            tempo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            intensidade = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            vezes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let i in obj) {
                const objIntermediario = obj[i];
                for (let a in objIntermediario) {
                    const objIntermediarioPosicao = objIntermediario[a];
                    for (let nomePosicao in objIntermediarioPosicao) {
                        if (!(Number.isNaN(objIntermediarioPosicao[nomePosicao]))) {
                            carboidratos[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.carboidratos, 10);
                            hidratacao[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.hidratacao, 10);
                            laticinios[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.laticinios, 10);
                            proteinas[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.proteinas, 10);
                            verd_frut[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.verd_frut, 10);
                            vezes_acordou[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.vezes_acordou, 10);
                            tempo[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.tempo, 10);
                            intensidade[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.intensidade, 10);
                            vezes[objIntermediarioPosicao['meses'] - 1] = parseInt(objIntermediarioPosicao.vezes, 10);
                        }
                    }
                }
            }
            returnLabelPeriodo = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            break;
        case 'semana':
        case 'ano':
            carboidratos = [];
            proteinas = [];
            laticinios = [];
            verd_frut = [];
            hidratacao = [];
            vezes_acordou = [];
            tempo = [];
            intensidade = [];
            vezes = [];
            for (let i in obj) {
                const objIntermediario = obj[i];
                for (let a in objIntermediario) {
                    const objIntermediarioPosicao = objIntermediario[a];
                    carboidratos.push(parseInt(objIntermediarioPosicao.carboidratos, 10));
                    hidratacao.push(parseInt(objIntermediarioPosicao.hidratacao, 10));
                    laticinios.push(parseInt(objIntermediarioPosicao.laticinios, 10));
                    proteinas.push(parseInt(objIntermediarioPosicao.proteinas, 10));
                    verd_frut.push(parseInt(objIntermediarioPosicao.verd_frut, 10));
                    vezes_acordou.push(parseInt(objIntermediarioPosicao.vezes_acordou, 10));
                    tempo.push(parseInt(objIntermediarioPosicao.tempo, 10));
                    intensidade.push(parseInt(objIntermediarioPosicao.intensidade, 10));
                    vezes.push(parseInt(objIntermediarioPosicao.vezes, 10));
                    returnLabelPeriodo.push(a);
                }
            }
            break;
    }
    retornarGrafico = {
        valores: {
            carboidratos: {
                nome: "CARBOIDRATOS",
                data: carboidratos,
                borderColor: 'rgb(44,214,198)',
                backgroundColor: corTransparente
            },
            proteinas: {
                nome: "PROTEÍNAS",
                data: proteinas,
                borderColor: 'rgb(0,189,255)',
                backgroundColor: corTransparente
            },
            laticinios: {
                nome: "LATICÍNIOS",
                data: laticinios,
                borderColor: 'rgb(0,255,218)',
                backgroundColor: corTransparente
            },
            verd_frut: {
                nome: "VERDURAS E FRUTAS",
                data: verd_frut,
                borderColor: 'rgb(14,237,137)',
                backgroundColor: corTransparente
            },
            hidratacao: {
                nome: "HIDRATAÇÃO",
                data: hidratacao,
                borderColor: '#0070ff',
                backgroundColor: corTransparente
            },
            vezes_acordou: {
                nome: "VEZES QUE ACORDOU",
                data: vezes_acordou,
                borderColor: '#3dc88d',
                backgroundColor: corTransparente
            },
            tempo: {
                nome: "TEMPO",
                data: tempo,
                borderColor: '#165044',
                backgroundColor: corTransparente
            },
            intensidade: {
                nome: "INTENSIDADE",
                data: intensidade,
                borderColor: 'rgb(42,202,41)',
                backgroundColor: corTransparente
            },
            vezes: {
                nome: "VEZES",
                data: vezes,
                borderColor: 'rgb(68,141,218)',
                backgroundColor: corTransparente
            }
        },
        returnPeriodo: returnLabelPeriodo
    }
    return (retornarGrafico);

}
/**
 * 
 * @param { } father elemento pai
 * @param {*} valor 
 */
function CriarOption(father, valor) {
    let option = document.createElement('option');
    option.value = valor;
    option.textContent = valor;
    father.add(option);
}
/**
 * @param {} mesString recebe um mes
 * @abstract Retorna o número correspondente ao mes do parâmetro. Ex setembro --> 9
 */
function CorresponderMes(mesString) {
    /**
     * @var mesNumerico varíavel com o valor númerico do mês correspondente.
     */
    let mesNumerico;
    switch (mesString) {
        case 'janeiro':
            mesNumerico = 1;
            break;
        case 'fevereiro':
            mesNumerico = 2;
            break;
        case 'março':
            mesNumerico = 3;
            break;
        case 'abril':
            mesNumerico = 4;
            break;
        case 'maio':
            mesNumerico = 5;
            break;
        case 'junho':
            mesNumerico = 6;
            break;
        case 'julho':
            mesNumerico = 7;
            break;
        case 'agosto':
            mesNumerico = 8;
            break;
        case 'setembro':
            mesNumerico = 9;
            break;
        case 'outubro':
            mesNumerico = 10;
            break;
        case 'novembro':
            mesNumerico = 11;
            break;
        case 'dezembro':
            mesNumerico = 12;
            break;
    }
    return mesNumerico;
}
/**
 * @abstract Retorna todos os anos em que há dado de um paciente
 * @param nomeTabela nome da tabela:semana,crise,lazer
 * @param idPaciente id do paciente
 */
async function RetornarAnoDisponiveisTabela(nomeTabela, idPaciente) {
    /**
     * @var obj é um objeto que passa as informações para api. Quando o Ajax é executado ele transforma obj é um json.
     */
    let obj = {
        tabela: nomeTabela,
        paciente: idPaciente
    }
    let anos = await this.Ajax(obj, 9),
        vetorAnos = [];
    for (let a in anos['anos']) {
        const anosIntermediaro = anos['anos'][a];
        for (let t in anosIntermediaro)
            vetorAnos.push(anosIntermediaro[t]);
    }
    return (vetorAnos);
}
/**
 * 
 * @abstract Retorna todos os meses em que há dado de um paciente.
 */
async function RetornarMesDisponiveisTabela(nomeTabela, idPaciente, ano) {
    try {
        let obj = {
                tabela: nomeTabela,
                paciente: idPaciente,
                ano: ano
            },
            mes = await this.Ajax(obj, 10),
            vetorMeses = [];
        for (let i in mes)
            vetorMeses.push(mes[i]);
        return vetorMeses;
    } catch (error) {
        console.error(error);
    }
}
/**
 * 
 * @abstract Montas os dois selects, tanto de ano quanto de mês.
 * @param nomeTabela o nome da tabela.
 * @param select o obj select que tem correspondência no html. Pode ser o ano ou mes. Cada select tem um atributo data-tipo que guarda o tipo de select(mes,ano).
 */
async function MontarSelect(nomeTabela,select) {
    let valor, ano = selectAno.getAttribute('data-select');
    switch (select.getAttribute('data-tipo')){
        case 'ano':
            valor = await this.RetornarAnoDisponiveisTabela(nomeTabela, id_paciente);
            break;
        case 'mes':
            valor = await this.RetornarMesDisponiveisTabela(nomeTabela, id_paciente, ano);
            break;
    }
    let total = select.length;
    if (select.length > 0) {
        for (let i = 0; i < total; i++)
            select.remove(0);
    }
    for (let i in valor)
        this.CriarOption(select, valor[i]);
}
/**
 * 
 * @abstract Monta o vetor de objetos que serão utilizados para montar gráfico(chart.js)
 * @param {*} dataGrafico 
 * @param {*} borderWidth 
 */
function VetorDataSets(dataGrafico, borderWidth) {
    let vetorObjGraficos = [];
    for (let a in dataGrafico.valores) {
        valoresObj = dataGrafico.valores[a];
        vetorObjGraficos.push({
            label: valoresObj.nome,
            data: valoresObj.data,
            borderColor: valoresObj.borderColor,
            backgroundColor: valoresObj.backgroundColor,
            borderWidth: borderWidth
        })
    }
    return vetorObjGraficos;
}
/**
 * @abstract Gerar o gráfico
 * 
 * @param type tipo de gráfico
 * @param dataGraficoVetor valor do dataset
 * @param father o seletor relacionado ao canvas que receberá
 * @param labels recebe o vetor de labels
 */
function Gambiarra(){

}
function GerarGrafico(type, dataGraficoVetor, labels, father) {
    console.log(dataGraficoVetor);
    if (grafico == null) {
        grafico = new Chart(document.querySelector(father), {
            type: type,
            data: {
                labels: labels,
                datasets: dataGraficoVetor
            }    
        });
    } else {
        if(type == 'bar'){
            grafico.options = {scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'duração da crise(segundos)'
                    } 
                }]
            }}
        }
        else{
            grafico.options = {scales: {
                xAxes: [{
                    stacked: false
                }],
                yAxes: [{
                    stacked: false
                }]
            }}
        }
        grafico.config.type = type;
        grafico.data.labels = labels;
        grafico.data.datasets = dataGraficoVetor;
        grafico.update();
    }
}
selectAno.addEventListener('change', valor => {
    let ano = valor.target.value;
    selectAno.setAttribute('data-select', ano);
    this.MontarSelect('semana', selectMes);
})
selectMes.addEventListener('change', valor => {
    let mes = valor.target.value;
    console.log(mes);
    selectMes.setAttribute('data-select', mes);
})
window.addEventListener('load', () => {
    this.MontarSelect('semana', selectAno);
    this.MontarSelect('semana', selectMes);
    lblSelectMes.style.display = 'none';
})
formPesquisa.addEventListener('submit', e => {
    e.preventDefault();
})

fiAnual.addEventListener('change', () => {
    filtro.style.display = 'none';
    selectAno.setAttribute('data-select', 'todos');
    fIntervalo.setAttribute('data-periodo', fiAnual.value);
})
fiMensal.addEventListener('change', () => {
    lblSelectMes.style.display = 'none';
    filtro.style.display = 'grid';
    selectAno.setAttribute('data-select', selectAno.value);
    fIntervalo.setAttribute('data-periodo', fiMensal.value);
})
fiSemanal.addEventListener('change', () => {
    lblSelectMes.style.display = 'inline-flex';
    filtro.style.display = 'grid';
    selectAno.setAttribute('data-select', selectAno.value);
    fIntervalo.setAttribute('data-periodo', fiSemanal.value);
})
/**
 * gráficos
 */
fgAlimentacaoGrafico.addEventListener('change', () => {
    fGrafico.setAttribute('data-grafico',fgAlimentacaoGrafico.value);
    lblFiSemana.style.display='inline-flex';
})
fgLazerGrafico.addEventListener('change', () => {
    fGrafico.setAttribute('data-grafico', fgLazerGrafico.value);
    lblFiSemana.style.display='none';
})
fgCriseGrafico_1.addEventListener('change', () => {
    fGrafico.setAttribute('data-grafico', fgCriseGrafico_1.value);
    lblFiSemana.style.display='none';

})
fgCriseGrafico_2.addEventListener('change', () => {
    fGrafico.setAttribute('data-grafico', fgCriseGrafico_2.value);
    lblFiSemana.style.display='none';
})
fgSonoGrafico_1.addEventListener('change', () => {
    fGrafico.setAttribute('data-grafico', fgSonoGrafico_1.value);
    lblFiSemana.style.display='inline-flex';
})
fgSonoGrafico_2.addEventListener('change', () => {
    fGrafico.setAttribute('data-grafico', fgSonoGrafico_2.value);
    lblFiSemana.style.display='inline-flex';
})
/**
 * botões
 */
btnPesquisa.addEventListener('click', async e => {
    let dadosBrutos = await this.BuscarDados('grafico'),
    dadosTrabalhados,vetorObjGraficos;
    switch(fGrafico.getAttribute('data-grafico')){
        case 'alimentacao':
            dadosTrabalhados = this.MontarDadosGraficoAlimentacao(dadosBrutos, fIntervalo.getAttribute('data-periodo'));
            vetorObjGraficos = this.VetorDataSets(dadosTrabalhados, 3);
            this.GerarGrafico('line', vetorObjGraficos, dadosTrabalhados.returnPeriodo,'#canvas');
            tituloGrafico.textContent = 'ALIMENTAÇÃO'
            break;
        case 'crise1':
            dadosTrabalhados = this.MontarDadosGraficoCrise1(dadosBrutos, fIntervalo.getAttribute('data-periodo'));
            this.GerarGrafico('bar', dadosTrabalhados.valores,dadosTrabalhados.returnPeriodo,'#canvas');
            tituloGrafico.textContent = 'CRISE 1'
            break;
        case 'crise2':
            dadosTrabalhados = this.MontarDadosGraficoCrise2(dadosBrutos, fIntervalo.getAttribute('data-periodo'));
            vetorObjGraficos = this.VetorDataSets(dadosTrabalhados, 3);
            this.GerarGrafico('line', vetorObjGraficos, dadosTrabalhados.returnPeriodo,'#canvas');
            tituloGrafico.textContent = 'CRISE 2'
            break;
        case 'sono1':
            dadosTrabalhados = this.MontarDadosGraficoSono1(dadosBrutos, fIntervalo.getAttribute('data-periodo'));
            vetorObjGraficos = this.VetorDataSets(dadosTrabalhados, 3);
            this.GerarGrafico('line', vetorObjGraficos, dadosTrabalhados.returnPeriodo,'#canvas');
            tituloGrafico.textContent = 'SONO 1'
            break;
        case 'sono2':
            dadosTrabalhados = this.MontarDadosGraficoSono2(dadosBrutos, fIntervalo.getAttribute('data-periodo'));
            vetorObjGraficos = this.VetorDataSets(dadosTrabalhados, 3);
            this.GerarGrafico('line', vetorObjGraficos, dadosTrabalhados.returnPeriodo,'#canvas');
            tituloGrafico.textContent = 'SONO 2'
            break;
        case 'lazer':
            dadosTrabalhados = this.MontarDadosGraficoLazer(dadosBrutos, fIntervalo.getAttribute('data-periodo'));
            vetorObjGraficos = this.VetorDataSets(dadosTrabalhados, 3);
            this.GerarGrafico('line', vetorObjGraficos, dadosTrabalhados.returnPeriodo,'#canvas');
            tituloGrafico.textContent = 'LAZER'
            break;
    }
})
btnHelpGrafico.addEventListener('click', ()=>{
    let p= document.createElement('p');
    p.setAttribute('class','b-h-g-p-help');
    switch(fGrafico.getAttribute('data-grafico')){
        case 'alimentacao':
            p.textContent="Esse gráfico retorna informações referente a alimentação do seu paciente. No caso, não em valores nutricionais, mas se foi consumido um alimento do tipo que predomina carboidratos, protéínas ou semelhante";
            break;
        case 'sono1':
            p.textContent="Esse gráfico retorna informações referente ao sono do seu paciente. No caso, ele retorna nº vezes que uma pessoa acordou DURANTE A NOITE.";
            break;
        case 'sono2':
            p.textContent="Esse gráfico retorna informações referente ao sono do seu paciente. No caso, ele retorna a média do tempo dormido no intervalo estabelecido.";
            break;
        case 'crise1':
            p.textContent="Esse gráfico retorna informações referente as crises do seu paciente. No caso, ele retorna a média da duração das crises no intervalo estabelecido. Ele identifica a intensidade dessa crises através das cores.";
            break
        case 'crise2':
            p.textContent="Esse gráfico retorna informações referente as crises do seu paciente. No caso, ele retorna a média do n° de crises no intervalo estabelecido.";
            break;
        case 'lazer':
            p.textContent="Esse gráfico retorna informações referente as atividades físicas do seu paciente. No caso, ele retorna a média do n° de atividades realizadas no intervalo estabelecido.";
            break;
    }
    (new window_mud).Modal("HELP",p,2,"w-p-default", !1, "");
})
btnObservacao.addEventListener('click', async ()=>{
    let dadosExtraBruto = await this.BuscarDados('observacao-extra');
    this.CriarSectionObservacao('.envolve-extras','OBSERVAÇÃO');
    this.MontarExtras(dadosExtraBruto);
    console.log(dadosExtraBruto);
})
btnSair.addEventListener('click',()=>{
    (new window_mud).Confirm("ATENÇÃO",'Deseja excluir esse vínculo?','Exclusão','fas fa-times',"w-p-default",this.DesativarVinculo,this.Gambiarra);    
})
btnHelp.addEventListener('click',()=>{
    (new window_mud).Alert("HELP",'Página de gráficos','Gráficos','fas fa-question',"w-p-default", !1, "");
})