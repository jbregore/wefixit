<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "GET"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/jobs.php";

$database = new Database();
$db = $database->getConnection();

$jobs = new Jobs($db);

session_start();
$jobs->user_id = $_SESSION['user_id'];
//fetch my job form db
$result_my_jobs = $jobs->job_total_saved();

//total array
$dash_arr = array();

// job count
while($row = $result_my_jobs->fetch_assoc()){
	$dash_arr['total_job_count'] = $row;
}

// set http status code to - 200 ok
http_response_code(200);
echo json_encode($dash_arr);
