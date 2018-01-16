<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/geo_solution/config.php';
session_start();
$id= $_SESSION['username'];
$array_result = array();


//SQL Statement

$sql = "SELECT course.subject, course.topic, teacher.nickname, course.start_time, assign_course.star, assign_course.course_id
        FROM course, teacher, assign_course 
        WHERE course.course_id = assign_course.course_id 
        AND course.teacher_id = teacher.teacher_id 
        AND assign_course.attending_status = 1 
        AND assign_course.student_id = '$id'". $selector .";";

$results = query($sql);

while($result = mysqli_fetch_assoc($results)) {
    $array_result[] = $result;
}
echo json_encode($array_result, JSON_UNESCAPED_UNICODE);

mysqli_free_result($results);
?>