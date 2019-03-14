<?php

$param = json_decode($_REQUEST["param"]);

if( !isset($param->name) || strlen(trim($param->name)) == 0 || !isset($param->email) || strlen(trim($param->email)) == 0) {
    echo "0";
}
if( $f = @fopen('d-day.txt', 'a') ) {
    fwrite($f, trim($param->name).";".trim($param->org).";".trim($param->email)."\n");
    fclose($f);
    echo "1";
} else {
	echo "0";
}
?>