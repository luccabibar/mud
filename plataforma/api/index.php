<?php
    session_start();
    require_once 'metodos/metodos.php';
    use metodos\Metodos;
    $m = new Metodos();
    $a= $_GET['A'];
    $acao=filter_input(INPUT_POST,'acao',FILTER_SANITIZE_SPECIAL_CHARS);
    $teste=filter_input(INPUT_POST,'json');
    //$acao = $_POST['acao'];
    if($a != null)
        $acao =$a;
    $ary = json_decode($_POST['json']);
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
        case 1://loagr
            $sql = "SELECT id_usuario FROM public.usuario WHERE nome= '".$ary->nameL."' AND senha='".$ary->senhaL."';";
            $_SESSION['con']="host=".$m->OffCriptografia($ary->host)." port=".$m->OffCriptografia($ary->port)." dbname=".$m->OffCriptografia($ary->dbname)." user=".$m->OffCriptografia($ary->user)." password=".$m->OffCriptografia($ary->password);
            $rr=$m->ReturnBD(pg_connect($_SESSION['con']),$sql);
            if(!empty($rr)):
                $_SESSION['id_usuario']=$rr['id_usuario'];
                $nome = explode(' ',$ary->nameL);
                $_SESSION['nome']= $nome[0];
                header("Location: ../"); 
            else:
                echo 'not';
            endif;
        exit();
        case 2://descriptografa e retorna para o usuario
            $d = array();
            $d['host']=$m->OffCriptografia($ary->host);
            $d['port']=$m->OffCriptografia($ary->port);
            $d['dbname']=$m->OffCriptografia($ary->dbname);
            $d['user']=$m->OffCriptografia($ary->user);
            $d['password']=$m->OffCriptografia($ary->password);
            echo json_encode($d, JSON_PRETTY_PRINT);
        exit();
        case 3://Alterar os dados
            $sql="UPDATE public.usuario SET cpf='".$ary->cpf."', nome='".$ary->nome."', email='".$ary->email."', celular='".$ary->celular."', senha='".$ary->senha."', updated_at=NOW() WHERE id_usuario=".$_SESSION['id_usuario'].";";
            if($m->NotReturnBD(pg_connect($_SESSION['con']),$sql)):
                $nome = explode(' ',$ary->nome);
                $_SESSION['nome']= $nome[0];
                echo 'Os seus dados foram atualizados com sucesso.';
            else:
                echo 'Houve um erro em atualizar os seus dados. Erro, provavelmente no banco ou servidor php.';
            endif;
        exit();
        case 4://retorna dados do usuário
            $sql="SELECT cpf, nome, email, celular, senha FROM usuario WHERE id_usuario=".$_SESSION['id_usuario'];
            $rr=$m->ReturnBD(pg_connect($_SESSION['con']),$sql);
            if(!empty($rr))
                echo json_encode($rr, JSON_PRETTY_PRINT);
        exit();
        case 5://
            $sql="DELETE FROM usuario WHERE id_usuario=".$_SESSION['id_usuario'].";";
            if($m->NotReturnBD(pg_connect($_SESSION['con']),$sql)):
                echo 'Os seus dados foram atualizados com sucesso.';
            else:
                echo 'Houve um erro em atualizar os seus dados. Erro, provavelmente no banco ou servidor php.'.'<BR>'.$sql;
            endif;
        exit();
        case 6:
            $ar= json_decode($teste);
            echo 'deus'.$ar->status;
        exit();
    }

