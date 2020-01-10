<?php
    session_start();
    require_once 'metodos/metodos.php';
    use metodos\Metodos;
    $m = new Metodos();
    $acao=$_POST['acao'];
    $ary = json_decode($_POST['json']);
    $a= $_GET['A'];
    if($a != null)
        $acao =$a;
    switch($acao){
        case 0://salvar ou alterar a variável de conexao
            $d = array();
            $d['host']=$m->OnCriptografia($ary->host);
            $d['port']=$m->OnCriptografia($ary->port);
            $d['dbname']=$m->OnCriptografia($ary->dbname);
            $d['user']=$m->OnCriptografia($ary->user);
            $d['password']=$m->OnCriptografia($ary->password);
            echo json_encode($d, JSON_PRETTY_PRINT);
        exit();
        case 1://LOGAR
            $sql = "SELECT id_usuario FROM public.usuario WHERE nome= '".$ary->nameL."' AND profissional=TRUE AND senha='".$ary->senhaL."';";
            $_SESSION['con']="host=".$m->OffCriptografia($ary->host)." port=".$m->OffCriptografia($ary->port)." dbname=".$m->OffCriptografia($ary->dbname)." user=".$m->OffCriptografia($ary->user)." password=".$m->OffCriptografia($ary->password);
            $rr=$m->ReturnBD(pg_connect($_SESSION['con']),$sql,FALSE);
            if(!empty($rr)):
                $_SESSION['id_usuario']=$rr['id_usuario'];
                $nome = explode(' ',$ary->nameL);
                $_SESSION['nome']= $nome[0];
                $_SESSION['FOI']=0;
                header("Location: ../?situacao=1"); 
            else:
                header("Location: ../?situacao=0");
            endif;
            break;
        exit();
        case 2://descriptografa e retorna para o usuario
            $d = array();
            $d['host']=$m->OffCriptografia($ary->host);
            $d['port']=$m->OffCriptografia($ary->port);
            $d['dbname']=$m->OffCriptografia($ary->dbname);
            $d['user']=$m->OffCriptografia($ary->user);
            $d['password']=$m->OffCriptografia($ary->password);
            echo json_encode($d, JSON_PRETTY_PRINT);
            break;
        exit();
        case 3://Alterar os dados
            $r=array();
            $sql="UPDATE public.usuario SET cpf='".$ary->cpf."', nome='".$ary->nome."', email='".$ary->email."', celular='".$ary->celular."', senha='".$ary->senha."', updated_at=NOW() WHERE id_usuario=".$_SESSION['id_usuario'].";";
            if($m->NotReturnBD(pg_connect($_SESSION['con']),$sql)):
                $nome = explode(' ',$ary->nome);
                $_SESSION['nome']= $nome[0];
                $r['sucess']='Os seus dados foram atualizados com sucesso.';
                echo json_encode($r, JSON_PRETTY_PRINT);
            else:
                $r['error']='Houve um erro em atualizar os seus dados. Erro, provavelmente no banco ou servidor php.';
                echo json_encode($r, JSON_PRETTY_PRINT);
            endif;
            break;
        exit();
        case 4://retorna dados do usuário
            $sql="SELECT cpf, nome, email, celular, senha FROM usuario WHERE id_usuario=".$_SESSION['id_usuario'];
            $rr=$m->ReturnBD(pg_connect($_SESSION['con']),$sql,FALSE);
            if(!empty($rr))
                echo json_encode($rr, JSON_PRETTY_PRINT);
        exit();
        case 5://
            $sql="DELETE FROM usuario WHERE id_usuario=".$_SESSION['id_usuario'].";";
            if($m->NotReturnBD(pg_connect($_SESSION['con']),$sql))://ATUALIZAR O CÓDIGO
                header("Location: ../?situacao=1"); 
            else:
                echo 'Houve um erro em atualizar os seus dados. Erro, provavelmente no banco ou servidor php.<BR>'.$sql;
            endif;
            break;
        exit();
        case 6://GERAR SESSAO O QUE NÃO SIGNIFICA QUE ELAS JÁ SÃO FUNCIONAIS
            $sql="INSERT INTO public.sessao VALUES(DEFAULT,'".$ary->hash."', NULL, ".$_SESSION['id_usuario'].",0,DEFAULT,NULL,NULL)";
            if($m->NotReturnBD(pg_connect($_SESSION['con']),$sql)):
                $r['sucess']=TRUE;
                $r['sql']= $sql;
                echo json_encode($r, JSON_PRETTY_PRINT);
            else:
                $r['sucess']=FALSE;
                echo json_encode($r, JSON_PRETTY_PRINT);
            endif;
            break;
        exit();
        case 7://Exclui sessões geradas, mas que não serão utilizadas
            $sql="DELETE FROM public.sessao WHERE hash='".$ary->hash."' AND profissional_id=".$_SESSION['id_usuario']." AND status=0";
            if($m->NotReturnBD(pg_connect($_SESSION['con']),$sql)):
                $r['excluir']=TRUE;
                $r['sql']= $sql;
                echo json_encode($r, JSON_PRETTY_PRINT);
            else:
                $r['excluir']=FALSE;
                echo json_encode($r, JSON_PRETTY_PRINT);
            endif;
            break;
        exit();
        case 8:
            $pacientes=array();
            $nome=$ary->filtros->nome;
            $email=$ary->filtros->email;
            $sqlContagem="SELECT COUNT(id_sessao) FROM sessao INNER JOIN usuario ON usuario_id = id_usuario WHERE profissional_id ={$_SESSION['id_usuario']} AND status=1 ";
            $filtros="";
            if(!empty($nome))
                $filtros.=" AND usuario.nome LIKE '%{$nome}%' ";
            if(!empty($email))
                $filtros.=" AND usuario.email LIKE '%{$email}%' ";
            $sqlContagem.=$filtros;
            $rr=$m->ReturnBD(pg_connect($_SESSION['con']),$sqlContagem,FALSE);
            if(!empty($rr)):
                $total=$rr['count'];
                if($total > 0):       
                    $limite=$ary->limite;
                    $pagina=$ary->page;
                    $totalPaginas = ceil($total / $limite);
                    $sql="SELECT id_sessao, usuario_id, nome, email FROM sessao INNER JOIN usuario ON usuario_id = id_usuario WHERE profissional_id ={$_SESSION['id_usuario']} $filtros AND status=1 LIMIT $limite OFFSET $pagina";
                    $rpag=$m->ReturnBD(pg_connect($_SESSION['con']),$sql,TRUE);
                    if(!empty($rpag))           
                        $pacientes['pacientes']=$rpag;
                    $pacientes['sucess']=true;
                    //$pacientes['teste']=["limite"=>$limite,"pagina"=>$pagina,"totalPagina"=>$totalPaginas,"sql"=>$sql];      
                    //Verifica a relação de páginas, em que caso tenha chegado no limite máx ou min o btn na view bloqueia
                    if($pagina==($totalPaginas-1)){//index da paginação[0,1,2,...,n]
                        $situacaoAfter = false;//bloqueado btnAfter
                        $paginaRight=$pagina;
                    }
                    else{
                        $situacaoAfter=true;
                        $paginaRight=$pagina+1;
                    }
                    if($pagina==0){
                        $situacaoBefore = false;//bloqueado btnBefore
                        $paginaLeft = 0;
                    }
                    else{
                        $situacaoBefore=true;
                        $paginaLeft = $pagina-1;
                    }
                    
                    //$pacientes['teste']=["sqlContagem"=>$sqlContagem,"sql"=>$sql,"nome"=>$nome,"email"=>$email];
                    $pacientes['pagina']=["paginaBefore"=>["situacao"=>$situacaoBefore,"page"=>$paginaLeft],"paginaAfter"=>["situacao"=>$situacaoAfter,"page"=>$paginaRight]];
                else:
                    $pacientes['sucess']=false;
                    if($filtros == "")
                        $pacientes['error']=["rows"=>false,"pesquisa"=>false];
                    else
                        $pacientes['error']=["rows"=>false,"pesquisa"=>true];
                endif;
            else:
                $pacientes['sucess']=false;
                $pacientes['error']=["situacao"=>"SEM SESSÕES","rows"=>$rr['count']];
            endif;
            echo json_encode($pacientes,JSON_PRETTY_PRINT);
            break;
        case 9:
            $nomeTabela=$ary->tabela;
            $id_paciente=$ary->paciente;
            $dado = $m->RetornarAnos(pg_connect($_SESSION['con']),$nomeTabela,$id_paciente);
            $anos=["anos"=>$dado];
            echo json_encode($anos,JSON_PRETTY_PRINT);
        break;
        case 10:
            $tabela = $ary->tabela;
            $id_paciente = $ary->paciente;
            $ano=$ary->ano;
            $sql="SELECT EXTRACT('MONTH' FROM data_inicial) AS MESES, (CASE (EXTRACT('MONTH' FROM data_inicial))WHEN 1 THEN 'janeiro' WHEN  2 THEN 'fevereiro' WHEN  3 THEN 'marco' WHEN  4 THEN 'abril' WHEN  5 THEN 'maio' WHEN  6 THEN 'junho' WHEN  7 THEN 'julho' WHEN  8 THEN 'agosto' WHEN  9 THEN 'setembro' WHEN  10 THEN 'outubro' WHEN  11 THEN 'novembro' WHEN  12 THEN 'dezembro' END) AS mesess FROM {$tabela} WHERE usuario_id = {$id_paciente} AND EXTRACT('YEAR' FROM data_inicial) = $ano GROUP BY MESES ORDER BY MESES DESC;";
            $dado=$m->ReturnBD(pg_connect($_SESSION['con']),$sql,true);
            foreach($dado as $row)
            {
                foreach($row as $key => $mes){
                    if($key == 'mesess')
                    $vetorMeses[] = $mes;
                }
            }
            echo json_encode($vetorMeses ,JSON_PRETTY_PRINT);
        break;
        case 11:
            $grafico=$ary->grafico;
            $paciente=$ary->paciente;
            $periodo=["intervalo"=>$ary->intervalo,"ano"=>$ary->ano,"mes"=>$ary->mes];
            $rr = $m->RetornarDataGrafico(pg_connect($_SESSION['con']),$grafico,$paciente,$periodo);
            if(empty($rr)):
                $dado['sucess']=false;
                $dado['erro']='Erro na classe metódos ou em index.';
            endif;
            echo json_encode($rr,JSON_PRETTY_PRINT);
        break;
        case 12:
            $grafico=$ary->grafico;
            $paciente=$ary->paciente;
            $periodo=["intervalo"=>$ary->intervalo,"ano"=>$ary->ano,"mes"=>$ary->mes];
            $colunas = "";
            $tabela = "";
            $join= "";
            $where_group_by = "";
            if($grafico != 'lazer' && $grafico != 'crise1' && $grafico != 'crise2'){
                $tabela = 'semana';
                switch($periodo['intervalo']){
                    case 'meses':
                        $where_group_by=" WHERE usuario_id ={$paciente}  AND  EXTRACT('YEAR' FROM created_at) = {$periodo['ano']}  ORDER BY semanaa DESC";
                    break;
                    case 'ano':
                        $where_group_by=" WHERE usuario_id ={$paciente}  ORDER BY semanaa DESC";
                    break;
                    case 'semana':
                        $where_group_by=" WHERE usuario_id ={$paciente} AND EXTRACT('YEAR' FROM created_at) ={$periodo['ano']} AND  EXTRACT('MONTH' FROM created_at) = {$periodo['mes']} ORDER BY semanaa DESC";
                    break;
                }
                $colunas = " created_at AS semanaa, {$colunasEspecificas} observacao";
            }
            else if($grafico == 'crise1' || $grafico == 'crise2'){
                $tabela = 'crise';
                $join=" JOIN sintoma ON sintoma.id_sintoma = ANY(crise.sintoma_inicial) ";
                switch($periodo['intervalo']){
                    case 'meses':
                        $where_group_by=" WHERE crise.usuario_id ={$paciente}  AND  EXTRACT('YEAR' FROM crise.created_at) = {$periodo['ano']}  ORDER BY semanaa DESC";
                    break;
                    case 'ano':
                        $where_group_by=" WHERE crise.usuario_id ={$paciente}  ORDER BY semanaa DESC";
                    break;
                }
                $colunas = " crise.created_at AS semanaa, local, {$colunasEspecificas} situacao, (CASE (acompanhamento) WHEN 1 THEN 'SIM' ELSE 'NÃO' END) AS acompanhado ";
            }
            $sql ="SELECT {$colunas} FROM {$tabela} {$join} {$where_group_by}";
            $rr = $m->ReturnBD(pg_connect($_SESSION['con']),$sql,true);
            if(!empty($rr)):
                $dado['sucess']=true;
                $dado['grafico']=$rr;
                $dado['sql']=$sql;
            else:
                $dado['sucess']=false;
                $dado['erro']=["msm"=>'Erro na classe metódos ou em index.',"sql"=>$sql];
            endif;
            echo json_encode($dado,JSON_PRETTY_PRINT); 
        break;
        case 13:
            $id_sessao = $ary->id_sessao;
            $sql = "UPDATE sessao SET deleted_at=NOW(), status=2 WHERE id_sessao = {$id_sessao}";
            $rr=$m->NotReturnBD(pg_connect($_SESSION['con']),$sql);
            if(!empty($rr)):
                $dado['sucess']=true;
                $dado['msg']="O vínculo desfeito.";
            else:
                $dado['sucess']=false;
                $dado['msg']=$sql;
            endif;
            echo json_encode($dado,JSON_PRETTY_PRINT); 
        break;
        exit();
    }


