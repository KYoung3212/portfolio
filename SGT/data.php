<?php

define('fromData',true);

if(empty($_GET['action'])){
	exit('no action specified');
}
require ('mysql_connect.php');


$output = [
	'success'=> false, //we assume we will fail
	'errors'=>[]
];

switch($_GET['action']){
	case 'readAll':
		include('./read.php');
		//include the php file 'read.php'
		break;
	case 'insert':
		include('./insert.php');

		//include the php file insert.php
		break;
	case 'delete':
		include('./delete.php');

		//include the php file delete.php
		break;
	case 'update':
		include('./update.php');

		//include the update.php file
		break;
}

//convert the $output variable to json, store the result in $outputJSON
$outputJSON = json_encode($output);
//print $outputJSON
print($outputJSON);
//end

?>