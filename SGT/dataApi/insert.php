<?php
if(empty($_GET['name']) || empty($_GET['course_name'] || empty($_GET['grade']))){
    $output['errors'][] = 'Missing Information';
}
$name = $_GET['name'];
$course_name = $_GET['course_name'];
$grade = $_GET['grade'];
//check if you have all the data you need from the client-side call.  
//if not, add an appropriate error to errors
$query = "INSERT INTO `student_data`(`name`, `grade`, `course_name`) VALUES ('$name', '$grade', '$course_name')";
//write a query that inserts the data into the database.  remember that ID doesn't need to be set as it is auto incrementing
$result = mysqli_query($conn, $query);
//send the query to the database, store the result of the query into $result
if(empty($result)){
    $output['errors'][] = 'database error';
} else {
    //if at least one thing changed in the database...
    if(mysqli_affected_rows($conn) === 1){
        $output['success'] = true;
        $output['insertID'] = mysqli_insert_id($conn);
    } else {
        $output['errors'][] = 'insert error';
    }
}
//check if $result is empty.  
    //if it is, add 'database error' to errors
//else: 
    //check if the number of affected rows is 1
        //if it did, change output success to true
        //get the insert ID of the row that was added
        //add 'insertID' to $outut and set the value to the row's insert ID
    //if not, add to the errors: 'insert error'
?>