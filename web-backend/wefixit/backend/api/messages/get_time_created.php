<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "POST"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/messages.php";

$database = new Database();
$db = $database->getConnection();

$messages = new Messages($db);

$data = json_decode(file_get_contents("php://input"));
$messages->created_at = $data->createdAt;

// echo strtotime($data->createdAt);
// echo time();
// echo $data->createdAt;

// $unix_timeStamp = get_time_ago($time);
//     echo convertToAgoFormat($unix_timeStamp);

// $str_time = strtotime($data->createdAt);
// echo $str_time;
$unix_timeStamp = $messages->get_time_ago($data->createdAt);
$result = $messages->convertToAgoFormat($unix_timeStamp);
echo json_encode($result);
// $job_arr = array();

// while($row = $result->fetch_assoc()) {
//     array_push($job_arr, $row);
// }

// http_response_code(200);
// echo json_encode($job_arr);
