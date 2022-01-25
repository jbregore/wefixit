<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "POST"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/jobs.php";

$database = new Database();
$db = $database->getConnection();

$jobs = new Jobs($db);

$data = json_decode(file_get_contents("php://input"));

session_start();
$jobs->user_id = $_SESSION['user_id'];
$jobs->search = $data->search;
$jobs->filter_search = $data->filter;
$jobs->page = $data->pagee;

$result = $jobs->fetch_search_job_result_my_count();

//total array
$dash_arr = array();

// job count
while($row = $result->fetch_assoc()){
	$dash_arr['total_job_count'] = $row;
}

// set http status code to - 200 ok
http_response_code(200);
echo json_encode($dash_arr);
