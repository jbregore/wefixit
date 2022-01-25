<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "PUT"){
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

$jobs->id = $data->job_id_edit;            
$jobs->job_headline = $data->job_headline;
$jobs->job_location = $data->job_location;
$jobs->job_services = $data->job_services;
$jobs->job_age = $data->job_age;

$jobs->job_scope = $data->job_scope;            
$jobs->job_rate_desc = $data->job_rate_desc;
$jobs->job_rate = $data->job_rate;
$jobs->job_desc = $data->job_desc;

if($jobs->updateJobPost()) {
	http_response_code(201);
	echo json_encode(
		array("message" => "Job Post Updated")
	);
} else {
	echo json_encode(
		array("message" => "Job Post Not Updated")
	);
}