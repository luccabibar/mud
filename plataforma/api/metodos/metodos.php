<?php
    namespace metodos;
    class Metodos{
        private $c;
        public function OnCriptografia($v){
            return base64_encode($v);
        }
        public function OffCriptografia($v){
            return base64_decode($v);
        }
        public function OffSession(){
            session_destroy();
        }
        public function ReturnBD($session,$sql,$mutline){
            $r=pg_query($session,$sql);
            $num=pg_num_rows($r);
            if($num > 0):
                if($mutline):
                    for($p=0; $p < $num; $p++)
                        $dados[]=pg_fetch_assoc($r,$p);
                    return $dados;
                else:
                    return pg_fetch_assoc($r);
                endif;
            else:
                return false;
            endif;
        }
        public function NotReturnBD($session,$sql){
            $r=pg_query($session,$sql);
            $num=pg_affected_rows($r);
            if($num > 0)
                return true;
            else
                return false;
        }
        /***
         *  @abstract Retorna o maio ano, isso é usado apenas para execução primária da página paciente
         *  @param tabela 
         *  nome da tabela desejada
         *  @param session 
         *  aqui voce manda o pg_connect(...) 
         */
        public function RetornarMaiorAno($session,$tabela){
            $sql="SELECT MAX(EXTRACT('YEAR' FROM data_inicial))  FROM {$tabela};";
            $date=$this->ReturnBD($session,$sql,true);
            return $date;
        }
        public function RetornarAnos($session,$tabela,$id_paciente){
            $sql="SELECT EXTRACT('YEAR' FROM data_inicial) AS ANO FROM {$tabela} WHERE usuario_id = {$id_paciente} GROUP BY ANO ORDER BY ANO DESC;";
            $date=$this->ReturnBD($session,$sql,true);
            return $date;
        }
        public function RetornarDataGrafico($session,$grafico,$paciente,$periodo){
            $colunas="";
            $tabela="";
            $join="";
            $where_group_by="";
            $colunasEspecificas="";
            if($grafico === 'alimentacao'){
                $tabela='semana';
                $join=" AS sem JOIN alimentacao AS ali ON sem.id_semana = ali.semana_id JOIN atividade_fisica AS atv ON sem.id_semana = atv.semana_id JOIN bem_estar AS bem ON sem.id_semana = bem.semana_id JOIN sono AS son ON sem.id_semana = son.semana_id  ";
                switch($periodo['intervalo']){
                    case 'meses':
                        $where_group_by=" WHERE sem.usuario_id ={$paciente} AND  EXTRACT('YEAR' FROM sem.data_inicial) = {$periodo['ano']} GROUP BY {$periodo['intervalo']},ano ORDER BY {$periodo['intervalo']} DESC";
                        $colunasEspecificas = " EXTRACT('MONTH' FROM sem.data_inicial) AS meses,(CASE (EXTRACT('MONTH' FROM sem.data_inicial))WHEN 1 THEN 'janeiro' WHEN  2 THEN 'fevereiro' WHEN  3 THEN 'março' WHEN  4 THEN 'abril' WHEN  5 THEN 'maio' WHEN  6 THEN 'junho' WHEN  7 THEN 'julho' WHEN  8 THEN 'agosto' WHEN  9 THEN 'setembro' WHEN  10 THEN 'outubro' WHEN  11 THEN 'novembro' WHEN  12 THEN 'dezembro' END) AS mesess, ";
                    break;
                    case 'ano':
                        $where_group_by=" WHERE sem.usuario_id ={$paciente} GROUP BY {$periodo['intervalo']},ano ORDER BY {$periodo['intervalo']} DESC";
                    break;
                    case 'semana':
                        $where_group_by=" WHERE sem.usuario_id ={$paciente} AND EXTRACT('YEAR' FROM sem.data_inicial) ={$periodo['ano']} AND EXTRACT('MONTH' FROM sem.data_inicial) = {$periodo['mes']} ORDER BY sem.data_inicial DESC";
                        $colunasEspecificas = " EXTRACT('MONTH' FROM sem.data_inicial) AS meses,(CASE (EXTRACT('MONTH' FROM sem.data_inicial))WHEN 1 THEN 'janeiro' WHEN  2 THEN 'fevereiro' WHEN  3 THEN 'março' WHEN  4 THEN 'abril' WHEN  5 THEN 'maio' WHEN  6 THEN 'junho' WHEN  7 THEN 'julho' WHEN  8 THEN 'agosto' WHEN  9 THEN 'setembro' WHEN  10 THEN 'outubro' WHEN  11 THEN 'novembro' WHEN  12 THEN 'dezembro' END) AS mesess, ";
                    break;
                }
                if($periodo['intervalo'] != 'semana')
                    $colunas=" EXTRACT('YEAR' FROM sem.data_inicial) AS ano, {$colunasEspecificas} AVG (ali.carboidratos) AS carboidratos,AVG (ali.proteinas) AS proteinas,AVG (ali.laticinios) AS laticinios,AVG (ali.laticinios) AS laticinios,AVG (ali.hidratacao) AS hidratacao,AVG (atv.tempo) AS tempo,AVG (atv.intensidade) AS intensidade,AVG (bem.vezes) AS vezes,AVG (son.vezes_acordou) AS vezes_acordou, AVG (ali.verd_frut) AS verd_frut ";
                else
                    $colunas=" sem.data_inicial, EXTRACT('MONTH' FROM sem.data_inicial) AS meses, {$colunasEspecificas} ali.carboidratos AS carboidratos, ali.proteinas AS proteinas, ali.laticinios AS laticinios, ali.laticinios AS laticinios, ali.hidratacao AS hidratacao, atv.tempo AS tempo, atv.intensidade AS intensidade, bem.vezes AS vezes, son.vezes_acordou AS vezes_acordou, ali.verd_frut AS verd_frut ";
            }else if($grafico === 'crise1'){
                $tabela="crise";
                switch($periodo['intervalo']){
                    case 'meses':
                        $where_group_by=" WHERE usuario_id ={$paciente} AND  EXTRACT('YEAR' FROM created_at) = {$periodo['ano']} GROUP BY {$periodo['intervalo']},ano ORDER BY {$periodo['intervalo']} DESC";
                        $colunasEspecificas = " ,EXTRACT('MONTH' FROM created_at) AS meses,(CASE (EXTRACT('MONTH' FROM created_at))WHEN 1 THEN 'janeiro' WHEN  2 THEN 'fevereiro' WHEN  3 THEN 'março' WHEN  4 THEN 'abril' WHEN  5 THEN 'maio' WHEN  6 THEN 'junho' WHEN  7 THEN 'julho' WHEN  8 THEN 'agosto' WHEN  9 THEN 'setembro' WHEN  10 THEN 'outubro' WHEN  11 THEN 'novembro' WHEN  12 THEN 'dezembro' END) AS mesess ";
                    break;
                    case 'ano':
                        $where_group_by=" WHERE usuario_id ={$paciente} GROUP BY {$periodo['intervalo']},ano ORDER BY {$periodo['intervalo']} DESC";
                    break;
                }
                $colunas="EXTRACT('YEAR' FROM created_at) AS ano, AVG(duracao) AS duracao, AVG(intensidade) as intensidade {$colunasEspecificas} ";
            }else if($grafico === 'crise2'){
                $tabela= "crise";
                switch($periodo['intervalo']){
                    case 'meses':
                        $where_group_by=" WHERE usuario_id ={$paciente} AND  EXTRACT('YEAR' FROM created_at) = {$periodo['ano']} GROUP BY {$periodo['intervalo']},ano ORDER BY {$periodo['intervalo']} DESC";
                        $colunasEspecificas = " ,EXTRACT('MONTH' FROM created_at) AS meses,(CASE (EXTRACT('MONTH' FROM created_at))WHEN 1 THEN 'janeiro' WHEN  2 THEN 'fevereiro' WHEN  3 THEN 'março' WHEN  4 THEN 'abril' WHEN  5 THEN 'maio' WHEN  6 THEN 'junho' WHEN  7 THEN 'julho' WHEN  8 THEN 'agosto' WHEN  9 THEN 'setembro' WHEN  10 THEN 'outubro' WHEN  11 THEN 'novembro' WHEN  12 THEN 'dezembro' END) AS mesess ";
                    break;
                    case 'ano':
                        $where_group_by=" WHERE usuario_id ={$paciente} GROUP BY {$periodo['intervalo']},ano ORDER BY {$periodo['intervalo']} DESC";
                    break;

                }
                $colunas="EXTRACT('YEAR' FROM created_at) AS ano, COUNT(id_crise) as num_crises {$colunasEspecificas} ";
            }else if($grafico === 'sono1'){
                $tabela="semana";
                $join=" JOIN sono ON sono.semana_id = semana.id_semana ";
                switch($periodo['intervalo']){
                    case 'meses':
                        $where_group_by=" WHERE usuario_id ={$paciente} AND acordou = FALSE AND  EXTRACT('YEAR' FROM sono.created_at) = {$periodo['ano']} GROUP BY {$periodo['intervalo']},ano ORDER BY {$periodo['intervalo']} DESC";
                        $colunasEspecificas = " EXTRACT('MONTH' FROM sono.created_at) AS meses,(CASE (EXTRACT('MONTH' FROM sono.created_at))WHEN 1 THEN 'janeiro' WHEN  2 THEN 'fevereiro' WHEN  3 THEN 'março' WHEN  4 THEN 'abril' WHEN  5 THEN 'maio' WHEN  6 THEN 'junho' WHEN  7 THEN 'julho' WHEN  8 THEN 'agosto' WHEN  9 THEN 'setembro' WHEN  10 THEN 'outubro' WHEN  11 THEN 'novembro' WHEN  12 THEN 'dezembro' END) AS mesess, ";
                    break;
                    case 'ano':
                        $where_group_by=" WHERE usuario_id ={$paciente} AND acordou = FALSE GROUP BY {$periodo['intervalo']},ano ORDER BY {$periodo['intervalo']} DESC";
                    break;
                    case 'semana':
                        $where_group_by=" WHERE usuario_id ={$paciente} AND EXTRACT('YEAR' FROM sono.created_at) ={$periodo['ano']} AND acordou=FALSE AND EXTRACT('MONTH' FROM sono.created_at) = {$periodo['mes']} ORDER BY sono.created_at DESC";
                        $colunasEspecificas = " EXTRACT('MONTH' FROM sono.created_at) AS meses,(CASE (EXTRACT('MONTH' FROM sono.created_at))WHEN 1 THEN 'janeiro' WHEN  2 THEN 'fevereiro' WHEN  3 THEN 'março' WHEN  4 THEN 'abril' WHEN  5 THEN 'maio' WHEN  6 THEN 'junho' WHEN  7 THEN 'julho' WHEN  8 THEN 'agosto' WHEN  9 THEN 'setembro' WHEN  10 THEN 'outubro' WHEN  11 THEN 'novembro' WHEN  12 THEN 'dezembro' END) AS mesess, ";
                    break;
                }
                if($periodo['intervalo'] != 'semana')
                    $colunas="EXTRACT('YEAR' FROM sono.created_at) AS ano, {$colunasEspecificas} AVG(vezes_acordou) as num_acordou  ";
                else
                    $colunas="EXTRACT('YEAR' FROM sono.created_at) AS ano, {$colunasEspecificas} vezes_acordou as num_acordou  ";
                
            }else if ($grafico === 'sono2'){
                $tabela="semana";
                $join=" JOIN sono ON sono.semana_id = semana.id_semana ";
                switch($periodo['intervalo']){
                    case 'meses':
                        $where_group_by=" WHERE usuario_id ={$paciente} AND  EXTRACT('YEAR' FROM sono.created_at) = {$periodo['ano']} GROUP BY {$periodo['intervalo']},ano ORDER BY {$periodo['intervalo']} DESC";
                        $colunasEspecificas = " EXTRACT('MONTH' FROM sono.created_at) AS meses,(CASE (EXTRACT('MONTH' FROM sono.created_at))WHEN 1 THEN 'janeiro' WHEN  2 THEN 'fevereiro' WHEN  3 THEN 'março' WHEN  4 THEN 'abril' WHEN  5 THEN 'maio' WHEN  6 THEN 'junho' WHEN  7 THEN 'julho' WHEN  8 THEN 'agosto' WHEN  9 THEN 'setembro' WHEN  10 THEN 'outubro' WHEN  11 THEN 'novembro' WHEN  12 THEN 'dezembro' END) AS mesess, ";
                    break;
                    case 'ano':
                        $where_group_by=" WHERE usuario_id ={$paciente} GROUP BY {$periodo['intervalo']},ano ORDER BY {$periodo['intervalo']} DESC";
                    break;
                    case 'semana':
                        $where_group_by=" WHERE usuario_id ={$paciente} AND EXTRACT('YEAR' FROM sono.created_at) ={$periodo['ano']} AND EXTRACT('MONTH' FROM sono.created_at) = {$periodo['mes']} ORDER BY sono.created_at DESC";
                        $colunasEspecificas = " EXTRACT('MONTH' FROM sono.created_at) AS meses,(CASE (EXTRACT('MONTH' FROM sono.created_at))WHEN 1 THEN 'janeiro' WHEN  2 THEN 'fevereiro' WHEN  3 THEN 'março' WHEN  4 THEN 'abril' WHEN  5 THEN 'maio' WHEN  6 THEN 'junho' WHEN  7 THEN 'julho' WHEN  8 THEN 'agosto' WHEN  9 THEN 'setembro' WHEN  10 THEN 'outubro' WHEN  11 THEN 'novembro' WHEN  12 THEN 'dezembro' END) AS mesess, ";
                    break;
                }
                if($periodo['intervalo'] != 'semana')
                    $colunas="EXTRACT('YEAR' FROM sono.created_at) AS ano, {$colunasEspecificas} AVG(duracao_sono) as duracao_sono  ";
                else
                    $colunas="EXTRACT('YEAR' FROM sono.created_at) AS ano, {$colunasEspecificas} duracao_sono  ";
            }
            else if($grafico === 'lazer'){
                $tabela='semana';
                $join=" JOIN atividade_fisica ON atividade_fisica.semana_id = semana.id_semana ";
                switch($periodo['intervalo']){
                    case 'meses':
                        $where_group_by=" WHERE usuario_id ={$paciente} AND  EXTRACT('YEAR' FROM atividade_fisica.created_at) = {$periodo['ano']} GROUP BY {$periodo['intervalo']},ano ORDER BY {$periodo['intervalo']} DESC";
                        $colunasEspecificas = " EXTRACT('MONTH' FROM atividade_fisica.created_at) AS meses,(CASE (EXTRACT('MONTH' FROM atividade_fisica.created_at))WHEN 1 THEN 'janeiro' WHEN  2 THEN 'fevereiro' WHEN  3 THEN 'março' WHEN  4 THEN 'abril' WHEN  5 THEN 'maio' WHEN  6 THEN 'junho' WHEN  7 THEN 'julho' WHEN  8 THEN 'agosto' WHEN  9 THEN 'setembro' WHEN  10 THEN 'outubro' WHEN  11 THEN 'novembro' WHEN  12 THEN 'dezembro' END) AS mesess, ";
                    break;
                    case 'ano':
                        $where_group_by=" WHERE usuario_id ={$paciente} GROUP BY {$periodo['intervalo']},ano ORDER BY {$periodo['intervalo']} DESC";
                    break;
                    case 'semana':
                        $where_group_by=" WHERE usuario_id ={$paciente} AND EXTRACT('YEAR' FROM atividade_fisica.created_at) ={$periodo['ano']} AND EXTRACT('MONTH' FROM atividade_fisica.created_at) = {$periodo['mes']} ORDER BY atividade_fisica.created_at DESC";
                        $colunasEspecificas = " EXTRACT('MONTH' FROM atividade_fisica.created_at) AS meses,(CASE (EXTRACT('MONTH' FROM atividade_fisica.created_at))WHEN 1 THEN 'janeiro' WHEN  2 THEN 'fevereiro' WHEN  3 THEN 'março' WHEN  4 THEN 'abril' WHEN  5 THEN 'maio' WHEN  6 THEN 'junho' WHEN  7 THEN 'julho' WHEN  8 THEN 'agosto' WHEN  9 THEN 'setembro' WHEN  10 THEN 'outubro' WHEN  11 THEN 'novembro' WHEN  12 THEN 'dezembro' END) AS mesess, ";
                    break;
                }
                $colunas="EXTRACT('YEAR' FROM atividade_fisica.created_at) AS ano, {$colunasEspecificas} COUNT(id_atividade) as num_atividade  ";

            }
            else{

            }
            /**
             * montagem dos json que serão retornados
             */
            $sql ="SELECT {$colunas} FROM {$tabela} {$join} {$where_group_by}";
            $grafico =$this->ReturnBD($session,$sql,true);
            if(!empty($grafico)){
                $grafNovo['sucess']=true;
                if($periodo['intervalo'] === 'ano'){
                    foreach ($grafico as $row) 
                        $dado[$periodo['ano']][$row["ano"]] = $row;
                }
                else if($periodo['intervalo'] === 'meses'){
                    foreach ($grafico as $row) 
                        $dado[$periodo['ano']][$row["meses"]] = $row;
                }
                else if($periodo['intervalo'] === 'semana'){
                    foreach ($grafico as $row) 
                        $dado[$periodo['ano']][$row["data_inicial"]] = $row;
                }
                $grafNovo['grafico']=$dado;
                $grafNovo['sql']=['sql'=>$sql];
            }
            else{
                $grafNovo['sucess']=false;
                $grafNovo['erro']=['mensagem'=>'vazio ou erro no banco','sql'=>$sql];
            }
            return $grafNovo;
        }    
    }
