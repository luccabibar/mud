<?php session_start();use metodos\Metodos;if(isset($_SESSION['id_usuario'])): require_once './api/metodos/metodos.php'; $m = new Metodos(); $maiorAno=$m->RetornarMaiorAno(pg_connect($_SESSION['con']),'semana'); $periodo = ['intervalo'=>'meses','ano'=>$maiorAno[0]['max']]; $dadoInicial = $m->RetornarDataGrafico(pg_connect($_SESSION['con']),'alimentacao',$id_paciente,$periodo);?><div class='banner'><i class="far fa-chart-bar"></i> <div class="banner-p"> <h2>GRÁFICOS</h2> <p> Nessa página há visualização das informações do paciente através de gráficos. </p> </div></div><script src="./js/chart.js"></script><link rel="stylesheet" href="./css/paciente.css"><div class="envolve-canvas"> <section class="canvas-grafico" data-periodo='meses'> <header> <h3>ALIMENTAÇÃO</h3><button class="btn-help-grafico"><i class="fas fa-question"></i></button> </header> <div class="div-canvas"><canvas id='canvas'></canvas></div> </section></div><form class='envolve-menu-canvas'> <div class="e-m-c-show"> <div class="e-m-c-s-opcoes"> <fieldset id='f-grafico' class="fieldset" data-grafico='alimentacao'> <h5>GRÁFICOS</h5> <div class='f-select'> <label for="fg-alimentacao" class="label-envolve"> ALIMENTAÇÃO<input type="radio" value='alimentacao' name="grafico" id="fg-alimentacao" checked='checked'></label> <label for="fg-crise_1" class="label-envolve"> CRISE-1<input type="radio" value='crise1' name="grafico" id="fg-crise_1"></label> <label for="fg-sono_1" class="label-envolve"> SONO-1<input type="radio" value='sono1' name="grafico" id="fg-sono_1"></label> <label for="fg-crise_1" class="label-envolve"> CRISE-2<input type="radio" value='crise2' name="grafico" id="fg-crise_2"></label> <label for="fg-sono_2" class="label-envolve"> SONO-2<input type="radio" value='sono2' name="grafico" id="fg-sono_2"></label> <label for="fg-lazer" class="label-envolve"> LAZER<input type="radio" value='lazer' name="grafico" id="fg-lazer"></label> </div> </fieldset> <fieldset id='f-intervalo' class="fieldset" data-periodo='meses'> <h5>INTERVALOS</h5><label for="fi-anual" class="label-envolve"> ANUAL<input type="radio" value='ano' name="intervalo" id="fi-anual"></label><label for="fi-mensal" class="label-envolve"> MENSAL<input type="radio" value='meses' name="intervalo" id="fi-mensal" checked='checked'></label><label for="fi-semanal" id='label-fi-semana' class="label-envolve"> SEMANAL<input type="radio" value='semana' name="intervalo" id="fi-semanal"></label> </fieldset> <fieldset id='f-filtros' class="fieldset"> <h5>FILTROS</h5> <div class="label-envolve" id='label-select-ano'> ANO <label for="select-ano" class="select-label"><select name="" id="select-ano" class="select-select" data-tipo='ano' data-select='<?= $maiorAno[0]['max'] ?>'></select><i class="fas fa-chevron-down"></i></label></div> <div class="label-envolve" id='label-select-mes'> MÊS <label for="select-mes" class="select-label"><select name="" id="select-mes" class="select-select" data-tipo='mes' data-select=''></select><i class="fas fa-chevron-down"></i></label></div> </fieldset> </div> </div> <div class="e-m-c-button"><button id='btn-help' class="button button-paciente"><span></span><i class="fas fa-question"></i></button><button id='btn-observacao' class="button button-paciente"><span></span><i class="fas fa-book-open"></i></button><button id='btn-pesquisa' class="button button-paciente"><span></span><i class="fas fa-search"></i></button><button id='btn-fechar' class="button button-paciente"><span></span><i class="fas fa-times"></i></button><button id='btn-sair' class="button button-paciente"><span></span><i class="fas fa-sign-out-alt"></i></button></div></form><div class="envolve-extras"> </section></div><script src="./js/paciente.js"></script><script> sessionStorage.setItem('id_paciente', <?= $id_paciente ?> ); sessionStorage.setItem('id_sessao', <?= $id_sessao ?> ); dadosT = this.MontarDadosGraficoAlimentacao( <?= json_encode($dadoInicial['grafico'])?> , 'meses'); vetorDataSet = this.VetorDataSets(dadosT, 3); this.GerarGrafico('line', vetorDataSet, dadosT.returnPeriodo, '#canvas');</script><?php else: ?><script> muda_session('page', 'home.php')</script><?php endif; ?>