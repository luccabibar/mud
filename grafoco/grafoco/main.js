
/**
 * gera uma cor aleatoria
 * 
 * @returns string comm a cor em hexdec
 */
function randColor()
{
	let vals = "0123456789ABCDEF"
	let cor = "#";
	for (let i = 0; i < 6; i++) {
		cor += vals[Math.floor(Math.random() * 16)];
	}
	return cor;
}

/**
 * pega todos os dados da API e joga em variaveis "estaticas"
 */
function loadData()
{
	//query
	let sql = "SELECT sem.data_inicial, sem.observacao, " +
		"ali.carboidratos, ali.proteinas, ali.laticinios, ali.verd_frut, ali.hidratacao, " +
		"bem.b_realizou, bem.vezes, bem.comentario, " +
		"son.duracao_sono, son.vezes_acordou, son.acordou_naturalmente " +
		"FROM semana AS sem " +
		"JOIN alimentacao AS ali ON sem.id_semana = ali.semana_id " +
		"JOIN bem_estar AS bem ON sem.id_semana = bem.semana_id " +
		"JOIN sono AS son ON sem.id_semana = son.semana_id " +
		"WHERE sem.usuario_id = " + 6 + " " +
		"ORDER BY sem.data_inicial; ";
	let data = {
		'sql': sql
	};
	$.get("http://200.145.153.172/mud/teste/api-teste.php", data, (resp) => 
	{
		//error hande 10/10
		if(resp.erro != ""){
			console.log("erro: " + resp.erro);
			return;
		}

		//formatacao inicial dos dados
		let dados = resp.dados;
		dados.forEach((row) => 
		{			
			let dataIni = (row.data_inicial).split('-');
			dataIni = dataIni[2] + "/" + dataIni[1] + "/" + dataIni[0];

			//5 pacotes de dados brutos
			semana.push({
			"data_inicial": dataIni,
			"observacao": row.observacao
			});
			alimentacao.push({
			"carboidratos": row.carboidratos,              
			"proteinas": row.proteinas,              
			"laticinios": row.laticinios,              
			"verd_frut": row.verd_frut,              
			});
			hidratacao.push({
			"hidratacao": row.hidratacao                
			});
			lazer.push({
			"b_realizou": row.b_realizou,
			"vezes": row.vezes,
			"comentario": row.comentario
			});
			sono.push({
			"duracao": row.duracao_sono,
			"acordVezes": row.vezes_acordou,
			"acordNat": row.acordou_naturalmente
			});	
		});
	});
}

/**
 * carrega um dataset pro grafico
 * 
 * @param opt indice do select
 * @returns dataset de dados
 */
function loadDataset(opt)
{
	let dataset = [];
	//carrega um dataset diferente com base no indice selecionado
	switch(opt){
		//case Alimentação
		case 0:{
			let first = true;
			//itera sobre cada semana
			alimentacao.forEach((sem) => 
			{ 
				let i = 0;
				//itera sobre cada indice da semana
				for (var key in sem) { //"foreach"
				if (sem.hasOwnProperty(key)) {
					let value = sem[key];
				
					//if for a primeira vez, cria objeto de dataset
					if(first){     
						dataset.push({
							label: key,
							data: [value],
							borderColor: randColor(),
							fill: false,
							borderWidth: 1
						});
					}
					//else so add o valor no dataset correspondente
					else{
						dataset[i].data.push(value);
					}
					i++;
				}
				}
				first = false;
			});

			break;
		}
		//case Consumno de água
		case 1:{
			let i = 0;
			//itera sobre cada semana
			hidratacao.forEach((sem) => 
			{
				//if for a primeira iter cria o objeto dataset
				if(i == 0){
					dataset.push({
						label: "frequencia",
						data: [sem.hidratacao],
						borderColor: randColor(),
						fill: false,
						borderWidth: 1
					});
				}
				//else apenas pusha valor
				else{
					dataset[0].data.push(sem.vezes);
				}

				i++;
			});
			break;
		}
		//case Lazer
		case 2:{
			let i = 0;
			//itera sobre cada semana 
			lazer.forEach((sem) => 
			{ 
			
				//if for a primeira vez, cria objeto de dataset
				if(i == 0){     
					dataset.push({
						label: "frequencia",
						data: [sem.vezes],
						borderColor: randColor(),
						fill: false,
						borderWidth: 1
					});
				}
				//else so add o valor no dataset correspondente
				else{
					dataset[0].data.push(sem.vezes);
				}

				i++;
			});
			break;
		}
		//case Sono
		case 3:{

			break;
		}	
	}
	return dataset;	
}

/**
 * atualiza a view do grafico em si
 * 
 * @param dataset set de dados formatado pro chartjs 
 */
function updateGraf(dataset)
{
	let grafStuff = {
		type: 'bar',
		data: {
			//labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
			datasets: dataset
		},
		options: {
			scales: {
			yAxes: [{
				ticks: {
				beginAtZero: true
				}
			}]
			}
		}
	};

	//cria um objeto grafico caso nao existe
	if(grafObj == null){
		grafObj = new Chart($("#graf")[0], grafStuff);
	}
	//else limpa o obj grafico e add o novo dataset
	else{
		console.log("yare yare");
		grafObj.data.datasets = dataset;
		grafObj.update();
	}
}

function changeGraf()
{
	let index = $("#tipo-graf")[0].selectedIndex;
	let dataset = loadDataset(index); 
	updateGraf(dataset);
}

//5 arrays principais de dados brutos
let semana = [];
let alimentacao = [];
let hidratacao = [];
let lazer = [];
let sono = [];

//objeto do grafico em si
let grafObj = null;

window.onload = () => 
{
	loadData();

	$("#tipo-graf").change(changeGraf);
};

