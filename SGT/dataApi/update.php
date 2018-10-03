<?php
if(empty($_GET['editedName']) || empty($_GET['editedCourse']) || empty($_GET['editedGrade']) || empty($_GET['buttonID'])){
    $output['errors'][] = 'Editing Failed';
}
$editedName = $_GET['editedName'];
$editedCourse = $_GET['editedCourse'];
$editedGrade = $_GET['editedGrade'];
$id = $_GET['buttonID'];
//check if you have all the data you need from the client-side call.  This should include the fields being changed and the ID of the student to be changed
//if not, add an appropriate error to errors
$query = "UPDATE `student_data` SET `name`='$editedName',`grade`='$editedGrade',`course_name`='$editedCourse' WHERE `id` = $id";
//write a query that updates the data at the given student ID.  
$result = mysqli_query($conn, $query);
//send the query to the database, store the result of the query into $result
if(empty($result)){
    $output['errors'][] = 'database error';
} else {
    if(mysqli_affected_rows($conn) > 0){
        $output['success'] = true;
    } else {
        $output['errors'][] = 'update error';
    }
}
//check if $result is empty.  
    //if it is, add 'database error' to errors
//else: 
    //check if the number of affected rows is 1.  Please note that if the data updated is EXCACTLY the same as the original data, it will show a result of 0
        //if it did, change output success to true
    //if not, add to the errors: 'update error'
?>