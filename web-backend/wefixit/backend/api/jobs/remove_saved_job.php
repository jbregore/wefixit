<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "DELETE"){
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
$jobs->id= $data->job_post_id;

// delete saved jobs
if($jobs->deleteSavedJob()) {
	echo json_encode(
		array('message' => 'Saved job Deleted')
	);
} else {
	echo json_encode(
		array('message' => 'Saved job Not Deleted')
	);
}