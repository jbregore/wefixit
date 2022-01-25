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

// $data = json_decode(file_get_contents("php://input"));

$jobs->id = $_GET['id'] ? $_GET['id'] : die();

// get product
$jobs->fetch_single_edit();

// create array
$job_post_arr = array(
	'id' => $jobs->id,
	'user_id' => $jobs->user_id,
	'job_headline' => $jobs->job_headline,
	'job_location' => $jobs->job_location,
	'job_services' => $jobs->job_services,
	'job_age' => $jobs->job_age,
	'job_scope' => $jobs->job_scope,
	'job_rate_desc' => $jobs->job_rate_desc,
    'job_rate' => $jobs->job_rate,
	'job_desc' => $jobs->job_desc,
    'job_createdAt' => $jobs->job_createdAt
);

// make json
echo json_encode($job_post_arr);