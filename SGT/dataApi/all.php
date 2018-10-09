<?php
$filter = $_GET['filter'];
//write a query that selects all the students from the database, all the data from each row
$query = "SELECT * FROM `student_data` WHERE `student_data` LIKE '%".$filter."%'";
// SELECT * FROM `student_data` WHERE `course_name` LIKE '%kevin%';
$result = mysqli_query($conn, $query);
//send the query to the database, store the result of the query into $result


//check if $result is empty.  
if(empty($result)){
	$output['errors'][]='database error';
} else {
	if(mysqli_num_rows($result) > 0) {//check if any data came back
		$output['success']=true; //if it did, change output success to true
		while($row =  mysqli_fetch_assoc($result)){
			//do a while look to collect all the data
			foreach($row as $key=>$value){
				$row["$key"] = stripslashes(html_entity_decode($value));
			}
			$output['data'][]=$row; //add each row of data to the $output['data']
			}
		}
		else {
			$output['error'][]='no data'; //if not, add to the errors:' no data'
		}
		}
	

	//if it is, add 'database error' to errors
//else: 
	//check if any data came back
		// $output['data']=[];
		//if it did, change output success to true
		//do a while loop to collect all the data 
			//add each row of data to the $output['data'] array
	//if not, add to the errors: 'no data'

?>