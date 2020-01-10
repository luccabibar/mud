function Create(json,father){
    let windowx=document.createElement('section'),nome,
    i=document.createElement('i'),
    i2=document.createElement('i'),
    h4=document.createElement('h4'),
    email=document.createElement('p'),
    input=document.createElement('input'),
    input2=document.createElement('input'),
    div=document.createElement('div'); 
    windowx.appendChild(i);  
    div.appendChild(h4);
    div.appendChild(email);
    windowx.appendChild(div);
    windowx.appendChild(input);
    windowx.appendChild(input2);
    windowx.appendChild(i2);
    input2.type='hidden';
    input2.name='id_sessao';
    input.type='hidden';
    input.name='id_paciente';
    email.textContent=json.email;
    input.value=json.usuario_id;
    input2.value=json.id_sessao;
    windowx.addEventListener('click',()=>{window.location.href="./?i_p="+input.value+"&i_s="+input2.value});
    windowx.setAttribute('class','s-childs');
    i2.setAttribute('class','fas fa-greater-than');
    i.setAttribute('class','fas fa-user');
    nome =(json.nome).split(" ")
    h4.textContent=nome[0];
    document.querySelector(father).appendChild(windowx);
}

function RetornarFiltros(){
    let nome = document.querySelector('#nome-paciente'),email=document.querySelector('#email-paciente'); 
    return {nome:nome.value,email:email.value};
}
function RetornarLimite(){
    let width=document.body.clientWidth;
    if(width > 998)
        return 10;
    else 
        return 3;
}
/**
 * @abstract Ele limpa filtros
 */
function LimparFiltros(){
    let nome = document.querySelector('#nome-paciente'),email=document.querySelector('#email-paciente');
    nome.value="",email.value="";
}
/**
 * @abstract Ele organiza a paginação
 * @param  page número de página da paginação na api
 */
async function PaginarPacientes(page){
    let btnLeft=document.querySelector('button.btn-left'),
        btnRight=document.querySelector('button.btn-right'),
        inputLeft=document.querySelector('#input-left'),
        inputRight=document.querySelector('#input-right');
    try{
        let obj ={
            json:{page:page,limite:this.RetornarLimite(),filtros:this.RetornarFiltros()},
            acao:8,
            father:'div.s-father'
            },
            paginacao = await this.CarregarElement(obj);
            console.log(paginacao);
            if(paginacao.sucess)
            {
                
                if(paginacao.pagina.paginaBefore.situacao)
                {
                    if(btnRight.disabled)
                        btnRight.disabled=false;
                    inputLeft.value=paginacao.pagina.paginaBefore.page;
                }
                else
                    btnLeft.disabled=!0;
                if(paginacao.pagina.paginaAfter.situacao){
                    if(btnLeft.disabled)
                        btnLeft.disabled=false;
                    inputRight.value=paginacao.pagina.paginaAfter.page;
                }
                else
                    btnRight.disabled=!0;
            }
            else{
                if(!(paginacao.error.rows) && !(paginacao.error.pesquisa)){
                    (new window_mud).Alert("ALERTA", "Não há nenhum paciente associado.", "Pacientes", "fas fa-user", "w-p-default", !1, "");
                }
                else
                {
                    this.LimparFiltros();
                    (new window_mud).Alert("ALERTA", "Nenhum usuário encontrado.", "Resultado da pesquisa", "fas fa-user", "w-p-default", !1, "");
                    await this.PaginarPacientes(0);
                }
                    
            }
    }catch(e){
        console.exception(e);
    }
}

async function CarregarElement(obj){
    try{
        let objReturn = await Ajax(obj.json,obj.acao);
        if(objReturn.sucess)
        {
            document.querySelector(obj.father).textContent='';
            for(let i in objReturn.pacientes)
                this.Create(objReturn.pacientes[i],obj.father);
            return {sucess:true,pagina:objReturn.pagina,teste:objReturn.teste};
        }
        else
            return {sucess:false,error:objReturn.error};   
    }catch(er){
        console.error(er);
    }
}
