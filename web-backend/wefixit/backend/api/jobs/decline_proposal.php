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

$jobs->id = $data->job_idd;
$jobs->user_id = $data->user_idd;

// delete product
if($jobs->declineProposal()) {
	echo json_encode(
		array('message' => 'Proposal Deleted')
	);
} else {
	echo json_encode(
		array('message' => 'Proposal Deleted')
	);
}