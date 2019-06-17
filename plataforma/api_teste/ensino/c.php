<?php
namespace aprendizagem;
class Pessoa {
    const poder = "POVO";
    private $nome;
    private $cpf;
    private $idade;
    private $status;
    private $dados = array(); 
    function __construct(){
        $nome = '';
        $cpg = '';
        $idade = 0;
    }
    public function soma(){return $this->a+$this->b;}
    public function __set($n,$v){$this->dados[$n]=$v;}
    public function __get($n){return $this->dados[$n];}
    public function mostra(){echo self::poder;}
    public function setNome($n){$this->nome = $n;}
    public function getNome(){return $this->nome;}
    public function setCPF($c){$this->cpf = $c;}
    public function getCPF(){return $this->cpf;}
    public function setIdade($i){$this->idate = $i;}
    public function getIdade(){return $this->idade;}
}

class Homem {
    private static $lenghtPau;
    private static $apelido;
    function __construct(){
    }
    public static function setApelido($nome){
        try{
            $regex="/[^A-Za-z$]/";
            self::$apelido=preg_replace($regex,'',$nome);
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
    }
    public static function getApelido(){
        return self::$apelido;
    }
    public static function setPau($p){
        self::$lenghtPau=$p;
    }
    public static function getPau(){
        return self::$lenghtPau;
    }

}
