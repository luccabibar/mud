
function GerarHash(){
  let chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
    let text = "";
    for (let c = 0; c < tam; c++) 
      text += chars[Math.floor(Math.random() * 61)];
    return text;
}
function GerarQrCode(hash,seletor){
  qr = window.qr = new QRious({
    element: document.querySelector(seletor),
    size: 450,
    value: hash
  });
}

function Ajax(json,acao){
  let j = JSON.stringify(json);
  s= JSON.stringify(n);
  return new Promise((resolve,reject)=>{
    const ajax= new XMLHttpRequest();
    ajax.open('POST','./api/',true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("json="+s+"&acao="+acao);
    ajax.onload = function(e){
      resolve(this.responseText);
    }
    ajax.onerror = function(e){
      reject (new Error('erro'));
    }
    
  })
}
function GerarSessao(id,hash){
  return new Promise((resolve)=>{
    //let sql ="INSERT INTO public.sessao VALUES ("+"default, "+"'" + hash + "', "+"NULL, "+id + ", " +"0, "+"NOW(), "+"NULL, "+    "NULL "+");";  });
    let n = {
      id_ss: 'DEFAULT',
      hash:hash,
      us_id:'DEFAULT',
      pf_id:'DEFAULT',
      status:0,
      cr:'NOW()'
    },
    s= JSON.stringify(n);
    /*$.ajax({
      url: "./api/",
      method: "POST",
      cache: !1,
      dataType: "JSON",
      data: {
          json: s,
          acao: "6"
      },
      error: function(e) {
          resolve=false;
      }
  }).done(function(n) {
      resolve=true;
  })*/
  })
}

function LimparQrCode(){

}