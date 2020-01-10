/**
 * @abstract Gerar um hash
 * @param  tamanho limite do hash gerado
 */
function GerarHash(tamanho) {
  let chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
  let text = "";
  for (let c = 0; c < tamanho; c++)
    text += chars[Math.floor(Math.random() * 61)];
  return text;
}
/**
 * @abstract Gerar uma qrCode
 * @param  hash recebe um valor randomico
 * @param  seletor elemento que recebera img-qrCode gerada
 */
function GerarQrCode(hash, seletor) {
  qr = window.qr = new QRious({
    element: document.querySelector(seletor),
    size: 450,
    value: hash
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * @abstract gerar uma sessao
 * @param  hash valor que será utilizado
 */
function GerarSessao(hash) {
  return new Promise(resolve => {
    let n = {
      hash: hash
    };
    Ajax(n, 6)
      .then((e) => {
        resolve(e)
      })
  })
}
/**
 * @abstract Verificar se o usuário já pareou.
 * @param  hash esse valor será utilizada para verificar no banco.
 */
function VerificarSessao(hash) {
  return new Promise((resolve) => {
    let n = {
      hash: hash
    };
    Ajax(n, 7).then(e => {
      resolve(e)
    })
  })
}
/**
 * @abstract
 */
async function IniciarSessao() {
  let r = !0;
  let hash = '';
  const especialista = document.querySelector('#id_especialista').value;
  do {
    hash = especialista + '-' + this.GerarHash(20);
    this.GerarQrCode(hash, '.qr-c-f-img > img');
    let RGS = await this.GerarSessao(hash);
    if (RGS.sucess) {
      await this.sleep(20000);
      let RVS = await this.VerificarSessao(hash);
      if (!RVS.excluir)
        r = !1;
    } else
      (new window_mud).Alert("ATENÇÃO", "Erro no Banco ou na API.", "Banco e API", "fas fa-exclamation", "w-p-default", !1, "");
  } while (r);
  muda_session('page', 'sessoes.php')
}