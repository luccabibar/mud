<?php
    require_once 'metodos/metodos.php';
    use metodos\Metodos;
    $con = pg_connect("host=localhost port=5432 dbname=mud user=mudadmin password=997091009");
    $m = $m = new Metodos();
    $grafico=$_GET['g'];
    $paciente =$_GET['p'];
    $intervalo=$_GET['i'];
    $ano=$_GET['a'];
    $meses=$_GET['m'];
    $periodo['intervalo']=$intervalo;
    $periodo['ano']=$ano;
    $periodo['mes']=$meses;
    $teste=$m->RetornarDataGrafico($con,$grafico,$paciente,$periodo);
    print_r($teste);