<?php
$student_id = $_GET['student_id'];

//check if you have all the data you need from the client-side call.  
//if not, add an appropriate error to errors

//write a query that deletes the student by the given student ID  
$query = "DELETE FROM `student_data` WHERE `id` = $student_id";
$result = null;
$result = mysqli_query($conn, $query);//send the query to the database, store the result of the query into $result

if(empty($result)){
	$output['errors'][]='database error';
} else {
	if(mysqli_affected_rows($conn) === 1) {//check if any data came back
		$output['success']=true;
	} else {
		$output['errors'][]='delete error';
	}	
}
//check if $result is empty.  
	//if it is, add 'database error' to errors
//else: 
	//check if the number of affected rows is 1
		//if it did, change output success to true
		
	//if not, add to the errors: 'delete error'

?>

