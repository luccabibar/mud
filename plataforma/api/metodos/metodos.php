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
        public function ReturnBD($session,$sql){
            $r=pg_query($session,$sql);
            $num=pg_num_rows($r);
            if($num > 0)
                return pg_fetch_assoc($r);
            else
                return false;
        }
        public function NotReturnBD($session,$sql){
            $r=pg_query($session,$sql);
            $num=pg_affected_rows($r);
            if($num > 0)
                return true;
            else
                return false;
        }
    }