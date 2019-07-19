<?php
    require 'terra/c.php';
    require 'ensino/c.php';

    use aprendizagem\Homem;
    use aprendizagem\Pessoa;
    /*Homem::setPau(18);
    echo Homem::getPau();
    Homem::setApelido('Pega_aqui_vai');
    echo Homem::getApelido()."<br>";    */
    $p = new Pessoa();
    $p->sex = 'man';
    $p->TamanhoPau = '18cm';
    $p->a=10;
    $p->b=5;
    $p->setNome('Marcos');
    echo "<p>".$p->sex."</p><p>tamanho do amigo: ".$p->TamanhoPau."</p><p>".$p->getNome()."</p>";
    echo "<br><p>".$p->soma()."<p>";
