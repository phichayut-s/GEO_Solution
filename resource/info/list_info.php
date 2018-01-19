<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/geo_solution/config.php';

$course_id = check_input($_POST["course_id"]);

$array_result = array();

//SQL Statement

$sql = "SELECT s.title,s.firstname,s.lastname,s.faculty,s.department,s.tel,s.facebook,s.line,s.email 
		FROM student s INNER JOIN assign_course ac ON s.student_id = ac.student_id
		WHERE ac.course_id = ";

$results = query($sql);

while($result = mysqli_fetch_assoc($results)) {
    $array_result[] = $result;
}
echo json_encode($array_result, JSON_UNESCAPED_UNICODE);

mysqli_free_result($results);
?>