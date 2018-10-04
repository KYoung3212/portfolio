

<?php

$conn =mysqli_connect("52.9.94.17", "sgt_main_user", "password", "SGT");
$query = "DELETE FROM `student_data`";
$delete = mysqli_query($conn, $query);
$query2 = "INSERT INTO `student_data` (`id`, `name`, `grade`, `course_name`) VALUES
(1, 'Kevin Young', 90, 'Math'),
(2, 'Henry Lee', 99, 'Math'),
(3, 'Jordan Yang', 85, 'Math'),
(4, 'Julie Chen', 45, 'Science'),
(5, 'Peter Knox', 89, 'Science'),
(6, 'Allen Bridges', 92, 'Science'),
(7, 'Jordan Clarkson', 100, 'Writing'),
(8, 'Julius Randle', 75, 'Writing'),
(9, 'Kobe Bryant', 100, 'Writing'),
(10, 'Scottie Pippen', 57, 'Advanced Reading'),
(11, 'Michael Yim', 86, 'Advanced Reading'),
(12, 'Todd Gurley', 35, 'Advanced Reading'),
(13, 'Kanye West', 99, 'Music'),
(14, 'John Mayer', 78, 'Music'),
(15, 'Justin Timberlake', 89, 'Music')";

$add = mysqli_query($conn, $query2);
?>
