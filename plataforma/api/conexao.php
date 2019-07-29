<?php
    namespace Conexao;
    class Conexao{
        private $con;
        public function getPP(){return 'terra';}
        private $conArray = array();
        public function verPort($port){
            $regex = '/[1-9]/';
            return preg_replace($regex,'',$port);
        }
        public function __set($n,$v){
            if($n == 'port'):
                $this->$conArray[$n] = $this->verPort($v);
            else:
                $this->$conArray[$n] = $v;
            endif;
            $this->conArray[$n]=$v;
        }
        public function __get($n){return $this->conArray[$n];}
        public function Conectar(){
            try{
                if(!isset($this->con)):
                    return $this->con = pg_connect("host=".$this->conArray['host']." port=".$this->conArray['port']." dbname=".$this->conArray['dbname']." user=".$this->conArray['user']." password=".$this->conArray['password']);
                else:
                    return $this->con;
                endif;
            }
            catch(Exception $e){
                echo "messagem:".$e->getMessage()."<br>"."código:".$e->getCode()."<br>"."linha:".$e->getLine();    
            }
        }
    }
