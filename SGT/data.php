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
		include('./dataApi/read.php');
		//include the php file 'read.php'
		break;
	case 'insert':
		include('./dataApi/insert.php');

		//include the php file insert.php
		break;
	case 'delete':
		include('./dataApi/delete.php');

		//include the php file delete.php
		break;
	case 'update':
		include('./dataApi/update.php');

		//include the update.php file
		break;
	case 'all':
		include('./dataApi/all.php');
		//include the course.php file
		break;
	case 'name':
		include('./dataApi/name.php');
		//include the name.php file
		break;
	case 'course':
		include('./dataApi/course.php');
		//include the course.php file
		break;
	case 'grade':
		include('./dataApi/grade.php');
		//include the course.php file
		break;
}

//convert the $output variable to json, store the result in $outputJSON
$outputJSON = json_encode($output);
//print $outputJSON
print($outputJSON);
//end

?>