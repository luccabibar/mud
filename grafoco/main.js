let sql = "SELECT sem.data_inicial, sem.observacao, " +
	"ali.carboidratos, ali.proteinas, ali.laticinios, ali.verd_frut, ali.hidratacao, " +
	"bem.b_realizou, bem.vezes, bem.comentario, " +
	"son.duracao_sono, son.vezes_acordou, son.acordou_naturalmente " +
	"FROM semana AS sem " +
	"JOIN alimentacao AS ali ON sem.id_semana = ali.semana_id " +
	"JOIN bem_estar AS bem ON sem.id_semana = bem.semana_id " +
	"JOIN sono AS son ON sem.id_semana = son.semana_id " +
	"WHERE sem.usuario_id = " + 6 + " ";
"ORDER BY sem.data_inicial; ";

window.onload = () =>
{
	$("#yee").click(() => 
	{		
		let data = {
			'host' : "200.145.153.172",
			'port' : "5423",
			'user' : "mudadmin",
			'pass' : "997091009",
			'db' : "mudadmin",
			'query' : "select * from usuario limit 1;"
		};
		$.get("database.php", data, (resp) => 
		{
			console.log(resp);
		});
	});
}