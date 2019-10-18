
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
	let datasec = [];
	let opts;
	let secopts;
	//carrega um dataset diferente com base no indice selecionado
	switch(opt){
		//case Alimentação
		case 0:{
			//cores custom
			let colors = ['ffa500', 'ff3333', '5cbdbb','9ad318'];

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
							//cores custom
							borderColor: "#" + colors[i] + "ff",
							backgroundColor: "#" + colors[i] + "99",
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

			opts = {};

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
						borderColor: '#' + '1f06f0' + 'ff',
						backgroundColor: '#' + '1f06f0' + '99',
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

			opts = {};

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
						borderColor: '#' + 'ffd700' + 'ff',
						backgroundColor: '#' + 'ffd700' + '99',
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

			opts = {};

			break;
		}
		//case Sono
		case 3:{
			//ok desse aqui eu gosto
			//cores custom
			let colors = ['3399ff', 'ff3333'];
			let i = 0;
			sono.forEach((sem) => 
			{
				let qualDset = (sem.acordNat == 't') ? true : false;
				
				//if for a primeira vez, cria dois objetos datasets, um pras semanas em que acorodu naturalmente e outro pro caso contrario (e tambem o objeto datasec)
				if(i == 0){     
					dataset.push({
						label: "horas dormidas (acorodu natralmente)",
						//adiciona valor caso tenha acordado naturalmente, caso contrario adciona 0
						data: [(qualDset) ? sem.duracao : 0],
						borderColor: '#' + colors[0] + 'ff',
						backgroundColor: '#' + colors[0] + '99',
						fill: false,
						borderWidth: 1
					});
					dataset.push({
						label: "horas dormidas (nao acorodu natralmente)",
						//adiciona valor caso nao tenha acordado naturalmente, caso contrario adciona 0
						data: [(!qualDset) ? sem.duracao : 0],
						borderColor: '#' + colors[1] + 'ff',
						backgroundColor: '#' + colors[1] + '99',
						fill: false,
						borderWidth: 1
					});

				}
				//else so add o valor no dataset correspondente
				else{
					dataset[0].data.push((qualDset) ? sem.duracao : 0);					
					dataset[1].data.push((!qualDset) ? sem.duracao : 0);					
				}

				i++;
			});

			opts = {
				scales: {
					xAxes: [{
						stacked: true
					}],
					yAxes: [{
						stacked: true
					}]
				}
			};

			secopts = {};

			break;
		}	
	}

	return {'data': dataset, 'datasec': datasec, 'options': opts, 'secOptions': secopts};	
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
			datasets: dataset.data
		},
		options: dataset.options
	};

	//cria um objeto grafico caso nao existe
	if(grafObj == null){
		grafObj = new Chart($("#graf")[0], grafStuff);
	}
	//else limpa o obj grafico e add o novo dataset
	else{
		grafObj.data.datasets = dataset.data;
		grafObj.update();
	}

	//faz o mesmo mas pro outro graf
	if(dataset.datasec.length != 0){
		//cria um objeto grafico caso nao existe
		if(grafSec == null){
			//say sike rn
			grafStuff.data.datasets = dataset.datasec;
			grafStuff.options = dataset.secOptions;
			grafSec = new Chart($("#graf-sec")[0], grafStuff);
		}
		//else limpa o obj grafico e add o novo dataset
		else{
			grafSec.data.datasets = dataset.datasec;
			grafSec.update();
		}
	}
}

function changeGraf()
{
	let index = $("#tipo-graf")[0].selectedIndex;
	let dataset = loadDataset(index); 
	updateGraf(dataset);
	//graf secundario
	if(dataset.datasec.length != 0){
		$("#graf-sec").css('visibility', 'visible');
	}
	else{
		$("#graf-sec").css('visibility', 'hidden');
	}
}

//5 arrays principais de dados brutos
let semana = [];
let alimentacao = [];
let hidratacao = [];
let lazer = [];
let sono = [];

//objeto do grafico em si
let grafObj = null;
let grafSec = null;

window.onload = () => 
{
	loadData();

	$("#tipo-graf").change(changeGraf);
	$("#refresh").click(changeGraf)
};

