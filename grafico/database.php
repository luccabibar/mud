<?php

function get($host, $port, $user, $pass, $db, $query)
{
    $url = "host=$host port=$port dbname=$db user=$user password=$pass";
    $conn = pg_connect($url);

    $resp = pg_query($conn, $query);
    $resp = json_encode(pg_fetch_all($resp));
    echo $resp;
}

(isset($_GET) && !empty($_GET)) ? get($_GET["host"], $_GET["port"], $_GET["user"], $_GET["pass"], $_GET["db"], $_GET["query"]) : null;